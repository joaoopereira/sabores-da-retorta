$(".nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});

$(".pop").on("click", function () {
  $(".imagepreview").attr("src", $(this).find("img").attr("src"));
  $("#imagemodal").modal("show");
});