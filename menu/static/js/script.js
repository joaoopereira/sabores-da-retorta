$(".nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});

$(".custom-menu-img").on("click", function () {
  $(".imagepreview").attr("src", $(this).find("img").attr("src"));
});