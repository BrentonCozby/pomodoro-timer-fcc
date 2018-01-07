const workInput = $('#workInput')
const restInput = $('#restInput')
const playPause = $('#playPause')
const playPauseIcon = $('#playPauseIcon')
const reset = $('#reset')
const timerLabel = $('#timerLabel')
const clock = $('#clock')
const completed = $('#completed')

let seconds = 0
let minutes = 0
let hours = 0
let totalTime = 0
let resting = false
let timer

function resetTimer() {
    clearInterval(timer)

    totalTime = 0
    seconds = 0
    minutes = 0
    hours = 0

    return false
}

function startTimer() {
    if (!resting) {
        $('body').css('background-color', '#ff944d')
        timerLabel.html('Working').css('opacity', '1')
    } else {
        $('body').css('background-color', '#99ccff')
    }

    timer = setInterval(timerFunction, 1000) // eslint-disable-line no-use-before-define
}

function timerFunction() {
    seconds += 1
    totalTime += 1

    if (seconds >= 60) {
        seconds = 0
        minutes += 1
    }

    if (minutes >= 60) {
        minutes = 0
        hours += 1
    }

    if (hours > 9) {
        resetTimer()
    }

    // Switch to resting phase
    if (!resting && totalTime >= workInput.val() * 60) {
        timerLabel.html('Resting')

        resting = true

        $('body').css('background-color', '#99ccff')

        completed.append(`<div class="tomato">${workInput.val()}</div>`)

        resetTimer()
        startTimer()
    }

    // switch to working phase
    if (resting && totalTime >= restInput.val() * 60) {
        resting = false

        $('body').css('background-color', '#ff944d')

        resetTimer()
        startTimer()
    }

    const hoursString = hours
    let minutesString
    const secondsString = seconds > 9 ? seconds : `0${seconds}`

    if (minutes) {
        minutesString = minutes > 9 ? minutes : `0${minutes}`
    } else {
        minutesString = '00'
    }

    const timeString = `${hoursString}:${minutesString}:${secondsString}`

    clock.html(timeString)
}

function resetAll() {
    resetTimer()

    resting = false

    playPauseIcon.removeClass('fa-pause').addClass('fa-play')

    clock.html('0:00:00')

    timerLabel.css('opacity', '0')

    $('body').css('background-color', '#fff')

    completed.html('')
}

playPause.click((e) => {
    e.preventDefault()

    if (playPauseIcon.hasClass('fa-pause')) {
        clearInterval(timer)

        playPauseIcon.removeClass('fa-pause').addClass('fa-play')
        timerLabel.html('Paused')

        $('body').css('background-color', '#bbb')

        return
    }

    playPauseIcon.removeClass('fa-play').addClass('fa-pause')

    if (resting) {
        timerLabel.html('Resting')
    } else {
        timerLabel.html('Working')
    }

    startTimer()
})

reset.click((e) => {
    e.preventDefault()
    resetAll()
})
