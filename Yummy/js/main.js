// Side-bar Slider

$("#iconBtn").click(function () {
  let boxWidth = $(".side-bar").outerWidth();
  if ($(".side-bar").css("left") == "0px") {
    $(".side-bar").animate({ left: `-${boxWidth}` }, 500);
  } else {
    $(".side-bar").animate({ left: "0px" }, 500);
  }
});
