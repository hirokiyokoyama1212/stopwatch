$(function(){
    'use strict';

    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    stop.disabled = true;
    var reset = document.getElementById('reset');
    reset.disabled = true;
    
    
    var startTime;

    var elapsedTime = 0;

    var timerId;

    var timeToadd = 0;


    function updateTimetText(){
        
        var h = Math.floor(elapsedTime/3600000);
        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        var m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        var ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        h = ('0' + h).slice(-1);
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = h + ':' + m + ':' + s + ':' + ms;
    }

    function countUp(){

        timerId = setTimeout(function(){

            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            countUp();

        },10);
    }

    start.addEventListener('click',function(){

        $(this).prop('disabled', true);
        $('#stop').prop('disabled',false);
        $('#reset').prop('disabled',true);
        startTime = Date.now();

        countUp();
    });

    stop.addEventListener('click',function(){

       clearTimeout(timerId);
       
       $(this).prop('disabled', true);
       $('#start').prop("disabled", false);
       $('#reset').prop('disabled',false);

       timeToadd += Date.now() - startTime;
    });

    reset.addEventListener('click',function(){

        elapsedTime = 0;

        timeToadd = 0;
        
        $(this).prop('disabled',true);
        $('#stop').prop('disabled',true);
        

        updateTimetText();

    });
})();
 