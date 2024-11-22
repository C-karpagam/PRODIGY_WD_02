let startTime;
let updatedTime;
let running = false;
let timeElapsed = 0;
let interval;
let lapCounter = 1;

// Get DOM elements
const timeDisplay = document.getElementById('timeDisplay');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

// Function to start the stopwatch
function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - timeElapsed; // Set the start time
        interval = setInterval(updateTime, 1); // Update every millisecond
        startPauseButton.innerText = 'Pause';
    } else {
        running = false;
        clearInterval(interval);
        startPauseButton.innerText = 'Resume';
    }
}

// Function to update the time display
function updateTime() {
    updatedTime = new Date().getTime();
    timeElapsed = updatedTime - startTime; // Calculate elapsed time
    const time = new Date(timeElapsed);
    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    timeDisplay.innerText = ${hours}:${minutes}:${seconds};
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    running = false;
    timeElapsed = 0;
    timeDisplay.innerText = '00:00:00';
    startPauseButton.innerText = 'Start';
}

// Function to record a lap time
function recordLap() {
    if (running) {
        const lapTime = new Date(timeElapsed);
        const hours = String(lapTime.getUTCHours()).padStart(2, '0');
        const minutes = String(lapTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(lapTime.getUTCSeconds()).padStart(2, '0');
        const lapItem = document.createElement('li');
        lapItem.innerText = Lap ${lapCounter++}: ${hours}:${minutes}:${seconds};
        lapList.appendChild(lapItem);
    }
}

// Add event listeners to buttons
startPauseButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
