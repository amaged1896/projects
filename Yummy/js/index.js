let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById('searchContainer');

function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li")
            .eq(i)
            .animate({ top: 0 }, (i + 5) * 100);
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({ left: -boxWidth }, 500);
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate({ top: 300 }, 500);
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});



function displayMeals(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                        <div class="meal-layer position-absolute d-flex justify-content-center align-items-center p-2">
                         <h3 class="text-center text-black">${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}
searchByName("");

async function getCategories() {
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    console.log(response.categories);
    displayCategories(response.categories.slice(0, 12));
}

function displayCategories(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                         <h3 class="text-center text-black">${arr[i].strCategory}</h3>
                         <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}

async function getArea() {
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    console.log(response);
    displayArea(response.meals);
}

function displayArea(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal text-center rounded-2 cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x text-center"></i>
                            <h3 class="text-center text-white">${arr[i].strArea}</h3>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}

async function getIngredient() {
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    console.log(response);
    displayIngredient(response.meals.slice(0, 20));
}


function displayIngredient(arr) {

    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="text-center text-white rounded-2 cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x  text-center"></i>
                            <h3 class="text-center">${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}

async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
}
async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
}
async function getIngredientsMeals(ingredients) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
}

async function getMealDetails(mealId) {
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();
    console.log(response.meals[0]);
    displayMealDetails(response.meals[0]);
}

function displayMealDetails(meal) {

    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    console.log(ingredients);
    let tags = meal.strTags?.split(',');
    if (!tags) tags = [];
    let tagsStr = ``;
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let box = `
    <div class="col-md-4">
              <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
              <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span> ${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span> ${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${ingredients}
              </ul>
              <h3>Tags : </h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${tagsStr}
              </ul>
              <a href="${meal.strSource}"  target="_blank" class="btn btn-success">Source</a>
              <a href="${meal.strYoutube}" target="_blank"  class="btn btn-danger">Youtube</a>
              </div>`;
    rowData.innerHTML = box;
}

function showSearchInput() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6">
          <input onkeyup="searchByName(this.value)" type="text" class="form-control text-white bg-transparent" placeholder="Search By Name" />
        </div>
        <div class="col-md-6">
          <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control text-white bg-transparent" placeholder="Search By First Letter" />
        </div>
      </div>
      `;
    // hide data 
    rowData.innerHTML = "";
}

async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    console.log(response.meals);
    response.meals ? displayMeals(response.meals) : displayMeals([]);
}

async function searchByFirstLetter(term) {
    term = term.charAt(0);
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    console.log(response.meals);
    response.meals ? displayMeals(response.meals) : displayMeals([]);
}