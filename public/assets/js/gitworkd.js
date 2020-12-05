var reposToAdd = [];

$(".select").on("click", function() {

    $(this).closest(".repo-card").css("background-color", "rgba(0, 128, 0, 0.5)");

    var repoTitle = $(this).closest(".repoDiv").attr("data-id");
    console.log(repoTitle);
    if (reposToAdd.indexOf(repoTitle) < 0) {
        reposToAdd.push(repoTitle);
    }

    console.log(reposToAdd);
});

$(".deselect").on("click", function() {

    $(this).closest(".repo-card").css("background-color", "black");
    var spliced = $(this).closest(".repoDiv").attr("data-id");
    var index = reposToAdd.indexOf(spliced);
    if (index < 0) {
        console.log("Index not found");
        return;
    }
    reposToAdd.splice(index, 1);

    console.log(reposToAdd);
});

$("#submitRepos").on("click", function() {
    $("#submitRepos").attr("disable", "disable");
    var reposToSend = {
        Repos: reposToAdd
    }
    $.ajax("/api/postRepo", {
        data: reposToSend,
        method: "POST"
    }).done((res) => {
        console.log("Successfully added to DB");
        window.location.href = location.origin + "/main"
    }).fail((err) => {
        console.log("Failed to add to DB");
        alert("FAILED");
    });
});

$(".save-repo").on("click", function() {
    var repoId = $(this).closest("repo-card").attr("data-repoId");
    $.ajax("/api/saveRepo", {
        data: {
            repoId: repoId
        },
        method: "POST"
    }).then((res) => {
        console.log("SAVED REPO!!!!");
    })
});