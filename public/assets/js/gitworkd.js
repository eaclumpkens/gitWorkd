var repos = [];

$(".select").on("click", function(){
    
    $(this).parent().parent().parent().css("background-color", "rgba(0, 128, 0, 0.7)");

    var repoTitle = $(this).parent().parent().siblings().siblings().children().children("h2").text();
    console.log(repoTitle);
    if(repos.indexOf(repoTitle) < 0){
        repos.push(repoTitle);
    }
    
    console.log(repos);
});

$(".deselect").on("click", function(){
    
    $(this).parent().parent().parent().css("background-color", "black");
    var spliced = $(this).parent().parent().siblings().siblings().children().children("h2").text();
    repos.splice(spliced, 1);

    console.log(repos);
});
