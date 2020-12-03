var repos = [];

$(".select").on("click", function() {

    $(this).parent().parent().parent().css("background-color", "rgba(0, 128, 0, 0.7)");

    var repoTitle = $(this).closest(".repoDiv").attr("data-id");
    console.log(repoTitle);
    if (repos.indexOf(repoTitle) < 0) {
        repos.push(repoTitle);
    }

    console.log(repos);
});

$(".deselect").on("click", function() {

    $(this).parent().parent().parent().css("background-color", "black");
    var spliced = $(this).closest(".repoDiv").attr("data-id");
    var index = repos.indexOf(spliced);
    if (index < 0) {
        console.log("Index not found");
        return;
    }
    repos.splice(index, 1);

    console.log(repos);
});

$("#submitRepos").on("click", function() {
    $.ajax("/api/postRepo");
});