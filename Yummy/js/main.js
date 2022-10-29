let arrayContainer = [],
  areaContainer = [];

let row = document.getElementById("rowData");

// Get Data From API For Display Categories
async function getDataFromApi() {
  apiResponse = await fetch(
    "https:www.themealdb.com/api/json/v1/1/categories.php"
  );
  apiData = await apiResponse.json();
  return apiData;
}
getDataFromApi().then((apiData) => {
  arrayContainer.push(apiData);
  displayCategories();
});

// Display Categories
function displayCategories() {
  let box = "";
  for (let i = 0; i < arrayContainer.length; i++) {
    // console.log(arrayContainer[i].categories);
    for (let j = 0; j < arrayContainer[i].categories.length; j++) {
      // console.log(arrayContainer[i].categories[j]);
      box += `
                  <div class="meal col-md-6 col-lg-3 ">
                      <div class="meal-photo">
                          <div class="my-img">
                              <div class="over-flow">
                                  <img class="rounded" src="${
                                    arrayContainer[i].categories[j]
                                      .strCategoryThumb
                                  }" alt="" />
                                  <div class="categories-img-caption">
                                      <div class="title w-20">
                                          ${
                                            arrayContainer[i].categories[j]
                                              .strCategory
                                          }
                                      </div>
                                      <div class="desc w-80">
                                          <p>${arrayContainer[i].categories[
                                            j
                                          ].strCategoryDescription
                                            .split(" ")
                                            .slice(0, 20)
                                            .join(" ")}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
    }
  }
  row.innerHTML = box;
}

// Get Data From API For Area
async function getAreaData() {
  apiArea = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  apiDataArea = await apiArea.json();
  return apiDataArea;
}
getAreaData().then((apiDataArea) => {
  areaContainer.push(apiDataArea);
  displayArea();
});
getAreaData();

// Display Area Data
console.log(areaContainer);
function displayArea() {
  let area = "";
  for (let i = 0; i < areaContainer.length; i++) {
    // console.log(arrayContainer[i].categories);
    for (let j = 0; j < 20; j++) {
      // console.log(arrayContainer[i].categories[j]);
      area += `
      <div class=" col-md-6 col-lg-3 ">
      <div class="meal-photo">
          <div class="my-img">
              <div class="area-img over-flow">
                  <i class="fa-solid fa-city fa-3x"></i>
                  <h2>${areaContainer[i].meals[j].strArea}</h2>
              </div>
          </div>
      </div>
  </div>
                  `;
    }
  }
  row.innerHTML = area;
}

// Side-bar Slider
$("#iconBtn").click(function () {
  let boxWidth = $(".side-bar").outerWidth();
  if ($(".side-bar").css("left") == "0px") {
    $(".side-title1").animate({ paddingTop: "100px" }, 500);
    $(".side-title2").animate({ paddingTop: "100px" }, 600);
    $(".side-title3").animate({ paddingTop: "100px" }, 700);
    $(".side-title4").animate({ paddingTop: "100px" }, 800);
    $(".side-title5").animate({ paddingTop: "100px" }, 900);
    $(".side-title6").animate({ paddingTop: "100px" }, 1000);
    $(".side-bar").animate({ left: `-${boxWidth}` }, 500);
  } else {
    $(".side-bar").animate({ left: "0px" }, 500);
    $(".side-title1").animate({ paddingTop: "20px" }, 500);
    $(".side-title2").animate({ paddingTop: "20px" }, 600);
    $(".side-title3").animate({ paddingTop: "20px" }, 700);
    $(".side-title4").animate({ paddingTop: "20px" }, 800);
    $(".side-title5").animate({ paddingTop: "20px" }, 900);
    $(".side-title6").animate({ paddingTop: "20px" }, 1000);
  }
});
