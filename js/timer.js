//既存のタイマーの表示
function showExistingTimer(){
    const exist_min = [3, 5, 10, 15, 30, 60, 90, 120];
    exist_min.forEach((val)=>{
        let hour = Math.floor(val / 60);
        let min = Math.floor(val % 60);
        createExistingTimer(hour,min);
    });
}

//既存のタイマーの作成
function createExistingTimer(h,m){
    let addContent = `<div class="eTimer btn" onclick = "timer(${h},${m},0)"><p>`;
    if(h > 0){
        addContent += `<span>${h}</span>時間`
    }
    if(m > 0){
        addContent += `<span>${m}</span>分`
    }
    addContent += '</p></div>'
    $('#existingTimer').append(addContent);
}

//ボタンのカーソル変化
function btnONOFF(id,on){
	if(on === 'on'){
		$(id).prop('disabled', false);
		$(id).css('cursor','pointer');
	}else{
		$(id).prop('disabled', true);
		$(id).css('cursor','default');	
	}
}

//時間の桁数を２桁にする関数
function changeDigits(t){
    let time = parseInt(t);
    // 1桁の場合は0を足して2桁に
    if(time < 10){time = "0" + time;}
    return time;
}

//入力欄を2桁で表示
$('.inputTime').change(function(){
    let time = changeDigits($(this).val());
    $(this).val(time);
});

//CLEARボタンが押されたとき
$('#clear').click(function(){
    $('#hour').val("00");
    $('#min').val("00");
    $('#sec').val("00");
});

function getEndingTime(h, m){
    // 現在の時刻の情報を取得
    const d = new Date();
    // 時と分を取得し、入力されている時間を足す。24時間や60分を超えないように調整
    let preHr = parseInt(d.getHours()) + parseInt(h);
　　let preMin = parseInt(d.getMinutes())+ parseInt(m);
    while(preMin >= 60){
        preMin -= 60;
	preHr ++;
    }
    let hour = changeDigits(preHr);
    let min = changeDigits(preMin);
    // 日付・時刻の文字列を作成
    let time = `終了時刻　${hour}:${min}`;
    // 文字列を出力
    $("#endingTime").text(time);
}
    
//タイマーの処理部分
function timer(h, m, s){
	const hour = changeDigits(h);
	const min = changeDigits(m);
	const sec = changeDigits(s);
	const time = `${hour}:${min}:${sec}`;
    $('#clock-time').text(time);
    
	let allsec = 3600 * parseInt(h) + 60 * parseInt(m) + parseInt(s);
    getEndingTime(h, m);

	if(allsec === 0){
	        alert("時間を入力してください");
    	}else{
        	//カウントエリアの表示
        	btnONOFF('#start','on');
	        btnONOFF('#stop','off');
        	btnONOFF('#reset','off');
        	$('#modal').show();
	        $('#modal-wrapper').show();
        }

	function start(){
        const timer = () => {
            //STOPが押されたとき
            $('#stop').click(function() {
                clearInterval(timerInterval);
                btnONOFF('#start','on');
        	    btnONOFF('#stop','off');
        	    btnONOFF('#reset','on');
            });            

            if (allsec <= 0.1) {
                clearInterval(timerInterval);
                btnONOFF('#stop','off');
     		    btnONOFF('#reset','on');
                $('#endingTime').text('終了しました');
                alert('終了しました');
            }else{
                allsec -= 0.1;
                let tHour = changeDigits(Math.floor(allsec / 3600));
                let tMin = changeDigits(Math.floor((allsec % 3600) / 60));
                let tSec = changeDigits(Math.floor(allsec % 60));
                let tTime = `${tHour}:${tMin}:${tSec}`;
                $('#clock-time').text(tTime);
            }
        }
        //100msごとに実行(ラグの防止)
        timer(allsec);
        const timerInterval = setInterval(timer, 100);
    }

    //STARTが押されたときの処理
    $('#start').click(function(){
        btnONOFF('#start','off');
        btnONOFF('#stop','on');
        btnONOFF('#reset','off');
        start();
    });

    //RESETが押されたとき
    $('#reset').click(function(){
        btnONOFF('#start','on');
        btnONOFF('#stop','off');
        btnONOFF('#reset','off');
	    allsec = 3600 * parseInt(hour) + 60 * parseInt(min) + parseInt(sec);
        $('#clock-time').text(time);
        getEndingTime(hour, min);
    });
}

//タイマーの起動(数字が入力されている場合)
$('#ok').click(function(){
    //計測する時間を取得
    const hour = $('#hour').val();
    const min = $('#min').val();
    const sec = $('#sec').val();
    timer(hour, min, sec);
});

$('#close').click(function(){
    $('#modal').fadeOut();
    $('#modal-wrapper').fadeOut(400,function(){
        document.location.reload();
    });
});