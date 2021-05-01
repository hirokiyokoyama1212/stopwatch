$(function(){
    

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

        var m = Math.floor(elapsedTime / 60000);

        var s = Math.floor(elapsedTime % 60000 / 1000);

        var ms = elapsedTime % 1000;

        h = ('0' + h).slice(-1);
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);

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
 