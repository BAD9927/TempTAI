let time = 300; // 5 minutes default
let isRunning = false;
let interval;

const timerElement = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerElement.textContent = formatTime(time);
    if (time <= 10) {
        timerElement.classList.add('red');
    } else {
        timerElement.classList.remove('red');
    }
}

function startTimer() {
    isRunning = true;
    startPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>';
    startPauseBtn.classList.remove('start');
    startPauseBtn.classList.add('pause');
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            handleTimeUp();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    startPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
    clearInterval(interval);
}

function handleTimeUp() {
    pauseTimer();
    alert('Time is up!');
}

function resetTimer() {
    pauseTimer();
    time = 300;
    timeInput.value = '05:00';
    updateDisplay();
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

timeInput.addEventListener('change', (e) => {
    const [mins, secs] = e.target.value.split(':').map(Number);
    if (!isNaN(mins) && !isNaN(secs)) {
        time = mins * 60 + secs;
        updateDisplay();
    }
});

updateDisplay();