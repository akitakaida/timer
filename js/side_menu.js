const side_menu_list = [
    {class: "side_menu_title", name: "title", icon:"fa-bars", text: "Menu"},
    {class: "side_menu_item", name: "timer", icon:"fa-hourglass", text: "タイマー"},
    {class: "side_menu_item", name: "stopwatch", icon: "fa-stopwatch", text: "ストップウォッチ"},
    {class: "side_menu_item", name: "age", icon: "fa-person", text: "年齢計算"}
];

function CreateSideMenu(n){
    let area = document.getElementById("side_menu");
    //contentsの作成
    for(let i = 0; i < side_menu_list.length; i++){
        //divを作る
        let div = document.createElement("div");
        div.className = side_menu_list[i]["class"];
        div.id = side_menu_list[i]["name"];
        if(n === side_menu_list[i]["name"]){
            div.id = "selected";
            let icon = document.createElement("i");
            icon.className = "fa-solid fa-ellipsis-vertical";
            div.appendChild(icon);
        }
        //アイコンの設定
        let icon = document.createElement("i");
        icon.className = "fa-solid " + side_menu_list[i]["icon"] + " side_menu_icon";
        div.appendChild(icon);
        //テキストの設定
        let p = document.createElement("p");
        p.className = "side_menu_name";
        p.textContent = side_menu_list[i]["text"];
        div.appendChild(p);
        area.appendChild(div);
    }
}

$("#side_menu").hover(function () {
        // over
        $(".side_menu_name").fadeIn()
            .css("display", "inline-block");
    }, function () {
        // out
        $(".side_menu_name").fadeOut();
    }
);

$('#side_menu').on('click', '.side_menu_item', function () {
    let link = $(this).attr('id') + ".html";
    location.replace(link);
});