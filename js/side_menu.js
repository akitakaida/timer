$("#side_menu").hover(function () {
        // over
        $(".side_menu_name").fadeIn()
            .css("display", "inline-block");
    }, function () {
        // out
        $(".side_menu_name").fadeOut();
    }
);

$(".side_menu_item").click(function () { 
    let name = $(this).attr("name");
    location.replace(name)
});