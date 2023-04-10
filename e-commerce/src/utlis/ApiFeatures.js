export class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    // 1) pagination
    paginate() {
        let page = this.queryString.page || 1;
        if (this.queryString.page <= 0) page = 1;
        let skip = (page - 1) * 5;
        this.page = page;
        this.mongooseQuery.skip(skip).limit(5);
        return this;
    }
    // 2) filtration
    filter() {
        let filterdObject = { ...this.queryString };
        let excludedQuery = ['page', 'sort', 'fields', 'keyword'];
        excludedQuery.forEach((q) => {
            delete filterdObject[q];
        });

        filterdObject = JSON.stringify(filterdObject);
        filterdObject = filterdObject.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterdObject = JSON.parse(filterdObject);
        this.mongooseQuery.find(filterdObject);
        return this;
    }
    // 3) sort
    sort() {
        if (this.queryString.sort) {
            console.log(this.queryString.sort);
            let sortedBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }
    // 3) search
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },]
            });
        }
        return this;
    }
    // 5) selected fields
    fields() {
        if (this.queryString.fields) {
            console.log(this.queryString.fields);
            let fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(fields);
        }
        return this;
    }
}