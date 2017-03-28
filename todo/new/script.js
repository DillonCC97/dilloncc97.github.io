$("ul").on("click", "li", function() {
    $(this).toggleClass('checked');
});
$("ul").on("click", "span", function(event) {
    $(this).parent().animate({
            height: 0
        }, 200, function() {
            $(this).remove();
        });
    event.stopPropagation();
});
$("input").keypress(function(event) {
    if(event.keyCode === 13) {
        var todoItem = $("input").val();
        $("input").val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span>" + todoItem + "</li>");
    }
});
$(".fa-plus-square").click(function() {
    if($("#text-input").css("display") == "none") {
        $("#text-input").show(function() {
            $("#text-input").animate({
                height: 53
            }, 200, function() {});
        });
    } else {
        $("#text-input").animate({
            height: 0
        }, 200, function() {
            $("#text-input").hide();
        });
    }
});
