//和暦⇒西暦
function JCtoAD(jc, year){
    let d;
    switch (jc) {
        case "1": //大正のとき
            d = 1911;
            break;
        case "2": //昭和のとき
            d = 1925;
            break;
        case "3": //平成のとき
            d = 1988;
            break;
        case "4": //令和のとき
            d = 2018;
            break;
        default: //西暦のとき
            d = 0;
            break;
    }
    return year + d;
}

//西暦⇒和暦
function ADtoJC(ad){
    let jc;
    switch(ad){
        case 1912:
            jc = "大正元年";
            break;
        case 1926:
            jc = "昭和元年";
            break;
        case 1989:
            jc = "平成元年";
            break;
        case 2019:
            jc = "令和元年";
            break;
        default:
            if(ad < 1926){
                jc = "大正" + (ad - 1911) + "年";
            }else if(ad < 1989){
                jc = "昭和" + (ad - 1925) + "年";
            }else if(ad < 2019){
                jc = "平成" + (ad - 1988) + "年";
            }else{
                jc = "令和" + (ad - 2018) + "年";
            }
            break;
    }
    return jc
}

//うるう年を判定し、日付の最大値の配列を返す
function leapYear(year){
    let check; 
    if (year % 400 == 0) {
        check = true;
    } else if (year % 4 == 0 && year % 100 != 0) {
        check = true;
    }
    return check;
}

//本日の日付の表示
$("#today").click(function (){
    let today = new Date();
    $("#year11").val(0);
    $("#year12").val(today.getFullYear());
    $("#month1").val(today.getMonth());
    $("#date1").val(today.getDate());
});

//和暦や西暦への変更時の処理
$("#year11, #year21").change(function () {
    let num;
    switch($(this).val()){
        case "0": //西暦のとき
            num = 2000;
            break;
        default:
            num = 1;
            break;
    }
    switch($(this).attr("id")){
        case "year11":
            $("#year12").val(num);
            break;
        case "year21":
            $("#year22").val(num);
            break;
    } 
});

//月ごとに日付の最大値を設定
$("#month1, #year11, #year12, #month2, #year12, #year22").change(function maximum() {
    let max = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
    let year1, year2, month, date;
    
    switch($(this).attr("id")){
        case "month1":
        case "year11":
        case "year12":
            year1 = parseInt($("#year11").val());
            year2 = parseInt($("#year12").val());
            month = parseInt($("#month1").val());
            date = "#date1"
            break;
        case "month2":
        case "year21":
        case "year22":
            year1 = parseInt($("#year21").val());
            year2 = parseInt($("#year22").val());
            month = parseInt($("#month2").val());
            date = "#date2"
            break;
    }
    //和暦→西暦
    year2 = JCtoAD(year1, year2);
    //うるう年の判定
    if (leapYear(year2)) {
        max[2] = 29;
    }
    //最大値の設定
    if(month < 13 && month > 0 ){
        $(date).attr("max", max[month]);
    }else{
        $(date).attr("max", 31);
    }
});
$(function(){ //reload時
    $("#year12").val(2000);
    $("#year22").val(2000);
});

//年齢、日数の計算
$("#cul1").click(function () { 
    let year11 = parseInt($("#year11").val());
    let year12 = parseInt($("#year12").val());
    let month1 = parseInt($("#month1").val());
    let date1 = parseInt($("#date1").val());
    let year21 = parseInt($("#year21").val());
    let year22 = parseInt($("#year22").val());
    let month2 = parseInt($("#month2").val());
    let date2 = parseInt($("#date2").val());
    
    //西暦に変換
    let year1 = JCtoAD(year11,year12);
    let year2 = JCtoAD(year21,year22);
    
    //誕生日を越えているかのチェック
    let check; //超えている：0、超えていない：1
    if(year1 >= year2){
        if(month1 > month2){
            check = 0;
        }else if(month1 === month2 && date1 >= date2){
            check = 0;
        }else{
            if(year1 > year2 ){
                check = 1;
            }else{
                alert("日付のエラーです。計算できません。");
                return;    
            }  
        }
    }else{ //計算する都市の方が前の時
        alert("年のエラーです。計算できません。");
        return;
    }

    //年齢の計算
    let a, m, d, all;
    a = year1 - year2 - check;
    if(month1 > month2){ //誕生月を超えている
        if(date1 >= date2){ 
            m = month1 - month2;
            d = date1 - date2;
        }else{
            m = month1 - month2 - 1;
            d = parseInt($("#date2").attr("max")) - date2 + date1;
        }
    }else if(month1 === month2 && date1 >= date2){ //誕生月で誕生日を超えている時
        m = month1 - month2;
        d = date1 - date2;
    }else{ //誕生日より前の時
        if(date1 >= date2){
            m = 12 - month2 + month1;
            d = date1 - date2;
        }else{
            m = 11 - month2 + month1;
            d = parseInt($("#date2").attr("max")) - date2 + date1;
        }
    }
    $("#return").text("計算結果：" + a + "歳" + m + "ヶ月" + d + "日");
});

//生まれ年の推測
$("#cul2").click(function () {
    let eto = parseInt($("#eto").val());
    //1924がねずみ年
    let SY = 1924;
    let today = new Date();
    let thisYear = today.getFullYear();
    let i = SY + eto;
    $("#guess").html("<h2>結果</h2>");
    while (i <= thisYear){
        let code;
        let age = thisYear - i;
        code = "<p>" + i + "年（" + ADtoJC(i) + "）生まれ（現在" + age + "歳）</p>";
        $("#guess").append(code);
        i += 12;
    }        
});