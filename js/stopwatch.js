//ボタンのカーソル変化
function btnONOFF(id, on) {
    if (on === 'on') {
        $(id).prop('disabled', false);
        $(id).css('cursor', 'pointer');
    } else {
        $(id).prop('disabled', true);
        $(id).css('cursor', 'default');
    }
}

//時間の桁数を２桁にする関数
function changeDigits(t) {
    let time = parseInt(t);
    // 1桁の場合は0を足して2桁に
    if (time < 10) { time = "0" + time; }
    return time;
}

//入力欄を2桁で表示
$('.inputTime').change(function () {
    let time = changeDigits($(this).val());
    $(this).val(time);
});

//CLEARボタンが押されたとき
$('#clear').click(function () {
    document.location.reload();
});



//ストップウォッチの処理部分
$("#start").click(function () { 
    //ボタンの設定
    $("#stop").show();
    $("#start").hide();
    btnONOFF('#lap', 'on');
    btnONOFF('#clear', 'off');

    //stopが押されたとき
    $('#stop').click(function () {
        clearInterval(watchInterval);
        btnONOFF('#lap', 'off');
        btnONOFF('#clear', 'on');
        $("#stop").hide();
        $("#start").show();
    });

    let min = parseInt($("#min").text());
    let sec = parseInt($("#sec").text());
    let ms = parseInt($("#ms").text());
    let allsec = 6000 * min + 100 * sec + ms;
    
    const stopwatch = () =>{
        allsec ++;
        min = changeDigits(Math.floor((allsec % 360000) / 6000));
        sec = changeDigits(Math.floor(allsec % 6000)/100);
        ms = changeDigits(Math.floor(allsec % 100));
        $("#min").text(min);
        $("#sec").text(sec);
        $("#ms").text(ms);
    }
    //10msごとに実行
    stopwatch(allsec);
    const watchInterval = setInterval(stopwatch, 10);
    
    //lapが押されたとき
    $("#lap").click(function () {
        $("#lapArea").append(`<li>${min}:${sec}.${ms}</li>`);
    })
});