let rowData = document.getElementById('rowData');

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

async function searchByName(term) {
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
    console.log(response.meals);
    displayMeals(response.meals);
}

function displayMeals(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
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
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    console.log(response.categories);
    displayCategories(response.categories);
}

function displayCategories(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
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
                    <div class="meal text-center rounded-2 cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x text-center"></i>
                            <h3 class="text-center text-white">${arr[i].strArea}</h3>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}

async function getIngredient() {
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
                    <div class="text-center text-white rounded-2 cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x  text-center"></i>
                            <h3 class="text-center">${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
                    </div>
                </div>`;
    }
    rowData.innerHTML = box;
}