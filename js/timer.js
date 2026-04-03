const defaultSeconds = 25 * 60;
const timerDisplay = document.getElementById("timerDisplay");
const timerStatus = document.getElementById("timerStatus");
const startButton = document.getElementById("startTimer");
const pauseButton = document.getElementById("pauseTimer");
const resetButton = document.getElementById("resetTimer");

let remainingSeconds = defaultSeconds;
let timerId = null;

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  if (!timerDisplay) {
    return;
  }

  timerDisplay.textContent = formatTime(remainingSeconds);
}

function updateStatus(message) {
  if (timerStatus) {
    timerStatus.textContent = message;
  }
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  if (timerId || !timerDisplay) {
    return;
  }

  updateStatus("Focus mode is active. Stay with this session until the timer ends.");

  timerId = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds -= 1;
      renderTimer();
      return;
    }

    stopTimer();
    updateStatus("Session complete. Take a short break before starting the next round.");
  }, 1000);
}

function pauseTimer() {
  if (!timerId) {
    updateStatus("The timer is already paused. Resume whenever you are ready.");
    return;
  }

  stopTimer();
  updateStatus("Timer paused. Take a breath, then continue when your focus returns.");
}

function resetTimer() {
  stopTimer();
  remainingSeconds = defaultSeconds;
  renderTimer();
  updateStatus("Reset to 25:00. Your next focus session is ready to begin.");
}

if (startButton && pauseButton && resetButton) {
  renderTimer();
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);
}
