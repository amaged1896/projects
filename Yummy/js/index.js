let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById('searchContainer');
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
        $(".inner-loading-screen").fadeOut(300);
    });
});

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

async function getCategories() {
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    console.log(response.categories);
    displayCategories(response.categories.slice(0, 12));
    $(".inner-loading-screen").fadeOut(300);
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
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    console.log(response);
    displayArea(response.meals);
    $(".inner-loading-screen").fadeOut(300);
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
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    console.log(response);
    displayIngredient(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
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
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
    $(".inner-loading-screen").fadeOut(300);
}
async function getAreaMeals(area) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
    $(".inner-loading-screen").fadeOut(300);
}
async function getIngredientsMeals(ingredients) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals);
    $(".inner-loading-screen").fadeOut(300);
}

async function getMealDetails(mealId) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();
    console.log(response.meals[0]);
    displayMealDetails(response.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {

    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
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
    closeSideNav();
    rowData.innerHTML = "";
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
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    console.log(response.meals);
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}

async function searchByFirstLetter(term) {
    $(".inner-loading-screen").fadeIn(300);
    term = term.charAt(0);
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    console.log(response.meals);
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}

function showContacts() {
    closeSideNav();
    searchContainer.innerHTML = "";
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age ( Must be between 16 & 80 )
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
    submitBtn = document.getElementById("submitBtn");


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true;
    });

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true;
    });

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true;
    });

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true;
    });

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true;
    });

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true;
    });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
            document.getElementById("nameInput").classList.add("is-valid");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            document.getElementById("nameInput").classList.remove("is-invalid");
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
            document.getElementById("emailInput").classList.add("is-valid");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
            document.getElementById("emailInput").classList.remove("is-invalid");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
            document.getElementById("phoneInput").classList.add("is-valid");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
            document.getElementById("phoneInput").classList.remove("is-invalid");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
            document.getElementById("ageInput").classList.add("is-valid");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
            document.getElementById("ageInput").classList.remove("is-invalid");
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
            document.getElementById("passwordInput").classList.add("is-valid");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
            document.getElementById("passwordInput").classList.remove("is-invalid");
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
            document.getElementById("repasswordInput").classList.add("is-valid");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
            document.getElementById("repasswordInput").classList.remove("is-invalid");
        }
    }
    

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.replace("btn-outline-danger", "btn-outline-success");
    } else {
        submitBtn.setAttribute("disabled", true);
        submitBtn.classList.replace("btn-outline-success", "btn-outline-danger");
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value));
}

function ageValidation() {
    return (/^([1-7][6-9]|[2-7][0-9]|80)$/.test(document.getElementById("ageInput").value));
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value));
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}