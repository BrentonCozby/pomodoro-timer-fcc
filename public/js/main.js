(function() {
    'use strict';

    const workInput = $('#workInput');
    const restInput = $('#restInput');
    const playPause = $('#playPause');
    const playPauseIcon = $('#playPauseIcon');
    const reset = $('#reset');
    const timerLabel = $('#timerLabel');
    const clock = $('#clock');
    const completed = $('#completed');

    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let totalTime = 0;
    let resting = false;
    let timer;

    function startTimer() {
        if(!resting) {
            $('body').css('background-color', '#ff944d');
            timerLabel.html('Working').css('opacity', '1');
        }
        else {
            $('body').css('background-color', '#99ccff');
        }
        timer = setInterval(timerFunction, 1000);
        return false;
    }

    function resetTimer() {
        clearInterval(timer);
        totalTime = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        return false;
    }

    function resetAll() {
        resetTimer();
        resting = false;
        playPauseIcon.removeClass('fa-pause').addClass('fa-play');
        clock.html('0:00:00');
        timerLabel.css('opacity', '0');
        $('body').css('background-color', '#fff');
        completed.html('');
        return false;
    }

    function timerFunction() {
        seconds++;
        totalTime++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        if (hours > 9) {
            resetTimer();
        }
        // Switch to resting phase
        if (!resting && totalTime >= workInput.val() * 60) {
            timerLabel.html('Resting');
            resting = true;
            $('body').css('background-color', '#99ccff');
            completed.append(`<div class="tomato">${workInput.val()}</div>`);
            resetTimer();
            startTimer();
        }
        // switch to working phase
        if (resting && totalTime >= restInput.val() * 60) {
            resting = false;
            $('body').css('background-color', '#ff944d');
            resetTimer();
            startTimer();
        }

        let timeString = hours +
            ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
            ':' + (seconds > 9 ? seconds : '0' + seconds);

        clock.html(timeString);
        return false;
    }

    playPause.click(function(e) {
        e.preventDefault();
        if (playPauseIcon.hasClass('fa-pause')) {
            clearInterval(timer);
            playPauseIcon.removeClass('fa-pause').addClass('fa-play');
            timerLabel.html('Paused');
            $('body').css('background-color', '#bbb');
            return false;
        }
        playPauseIcon.removeClass('fa-play').addClass('fa-pause');
        if(resting) timerLabel.html('Resting');
        else timerLabel.html('Working');
        startTimer();
        return false;
    });

    reset.click(function(e) {
        e.preventDefault();
        resetAll();
        return false;
    });

})();
