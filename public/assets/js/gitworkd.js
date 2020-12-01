
$(".add-btn").on("click", function(){
    $(".loader").attr("style", "display:block");
});

$(".save-repo").on("click", function(){
    var id = $(this).attr("data-id");
    console.log(id);
})