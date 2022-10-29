var arrayContainer = [];
var row = document.getElementById("rowData");

// Get Data From API
async function getDataFromApi() {
  apiResponse = await fetch(
    "https:www.themealdb.com/api/json/v1/1/categories.php"
  );
  apiData = await apiResponse.json();
  return apiData;
}
getDataFromApi().then((apiData) => {
  arrayContainer.push(apiData);
});

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
