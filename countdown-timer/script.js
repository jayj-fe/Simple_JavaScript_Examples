
const dayEl = document.getElementById('day');
const hoursEl = document.getElementById('hours');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');

const newYears = '1 jan 2022';

function countdown(){
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate-currentDate) / 1000;

    // Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환합니다
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours =  Math.floor(totalSeconds / 3600) % 24;
    const minutes =  Math.floor(totalSeconds / 60) % 60;
    const sconds =  Math.floor(totalSeconds) % 60;

    // console.log(days, hours, minutes, sconds)

    dayEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minuteEl.innerHTML = formatTime(minutes);
    secondEl.innerHTML = formatTime(sconds);
}

function formatTime(time){
    return time < 10 ? (`0${time}`) : time;
}

countdown();

setInterval(countdown, 1000);