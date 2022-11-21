// 사용한 버튼, 이미지 변수
const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");

const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

const startBtnImg = document.querySelector(".start-btn-img");
const resetBtnImg = document.querySelector(".reset-btn-img");
const stopBtn = document.querySelector(".stop-btn");

// 시간 관련 변수들
// time : 클릭한 전체시간을 초로 저장
// timer : 다른 함수에서 clearInterval을 사용하기 위해 전역변수로 선언 (나중에 setInterval 할당)
// timeHour : 시간계산
// timeMin : 분 계산
// timeSec : 초 계산
let time = 0;
let timer;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

// 처음 textContent를 00으로 할당???????
// .padStart 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다.
hrsBtn.textContent = timeHour.toString().padStart(2, "0");
minBtn.textContent = timeMin.toString().padStart(2, "0");
secBtn.textContent = timeSec.toString().padStart(2, "0");

//time이 0일 경우 버튼을 비활성화 처음에 비활성화로 시작하기 위함.
if (time === 0) {
    startBtn.disabled = true;
    resetBtn.disabled = true;
}

// 타이머 함수
const timerStart = () => {
    timer = setInterval(() => {
        time--;
        timeSec--;
    // 초가 10보다 작을경우 09, 08 식으로 0을 붙여서 나오게 하기
        if (timeSec < 10) {
            secBtn.textContent = timeSec.toString().padStart(2, "0");
        } else {
            secBtn.textContent = timeSec;
        }

    // 초가 0 이 됐을 때 분이 0 이상이면 분을 --; 하고 초를 60초로 할당.
        if (timeMin >= 1 && timeSec === 0) {
            timeMin--;
            if (timeMin < 10) {
                minBtn.textContent = timeMin.toString().padStart(2, "0");
            } else {
                minBtn.textContent = timeMin;
            }
            timeSec = 60;
            secBtn.textContent = timeSec;
        }
    // 분만 있고 초가 없을 경우 바로 59로 가야하기에 첫 timeSec--; 를 하게 되면 -1인걸 이용해서 59초 할당.
        if (timeSec < 1 && timeMin >= 1) {
            timeMin--;
            if (timeMin < 10) {
                minBtn.textContent = timeMin.toString().padStart(2, "0");
            } else {
                minBtn.textContent = timeMin;
            }
            timeSec = 59;
            secBtn.textContent = timeSec;
        }

    // 시간이 0 이상일때 시간을 제외한 분, 초가 0 일 경우 시간을 하나 줄이고 분과 초에 59 할당
        if (timeSec < 1 && timeMin < 1 && timeHour >= 1) {
            timeHour--;
            if (timeHour < 10) {
                hrsBtn.textContent = timeHour.toString().padStart(2, "0");
            } else {
                hrsBtn.textContent = timeHour;
            }
            timeMin = 59;
            minBtn.textContent = timeMin;
            timeSec = 59;
            secBtn.textContent = timeSec;
        }

    // 전부 0이 됐을경우 타이머를 멈추고 초기 상태로 되돌리기
        if (timeSec < 1 && timeMin < 1 && timeHour < 1) {
            clearInterval(timer);

            startBtn.disabled = true;
            resetBtn.disabled = true;
            startBtnImg.src = "assets/icon-start-disabled.svg";
            resetBtnImg.src = "assets/icon-reset-disabled.svg";
            stopBtn.classList.remove("active");
            startBtn.classList.add("active");
        }
    }, 1000);
};

// 리셋 누를 경우 타이머 멈추고 리셋
const timerReset = () => {
    clearInterval(timer);
    time = 0;
    timeHour = 0;
    timeMin = 0;
    timeSec = 0;
    startBtn.disabled = true;
    resetBtn.disabled = true;
    startBtnImg.src = "assets/icon-start-disabled.svg";
    resetBtnImg.src = "assets/icon-reset-disabled.svg";
    hrsBtn.textContent = timeHour.toString().padStart(2, "0");
    minBtn.textContent = timeMin.toString().padStart(2, "0");
    secBtn.textContent = timeSec.toString().padStart(2, "0");
};

// 반복되는 구문 함수로 넣어놓고 사용하기 인자로 버튼과 변수만 넣어주면 됨.
const setBtnImg = (button, time) => {
    button.textContent = time.toString().padStart(2, "0");
    startBtn.disabled = false;
    resetBtn.disabled = false;
    startBtnImg.src = "assets/icon-start.svg";
    resetBtnImg.src = "assets/icon-start.svg";
};

// type을 넣어서 반복구문 줄이고 addEventListener 깨끗하게 관리하기
const addTime = (type) => {
    if (type === "sec") {
        time += 10;
        timeSec = time % 60;
    } else if (type === "min") {
        timeMin++;
        if (timeMin > 60) {
            timeMin = 60;
        } else {
            time += 60;
        }
    } else if (type === "hrs") {
        time += 3600;
        timeHour = Math.floor(time / 3600);
    }
};

// 초 증가 버튼 클릭 이벤트
secBtn.addEventListener("click", () => {
    addTime("sec");
    setBtnImg(secBtn, timeSec);
});

// 분 증가 버튼 클릭 이벤트
minBtn.addEventListener("click", () => {
    addTime("min");
    setBtnImg(minBtn, timeMin);
});

// 시간 증가 버튼 클릭 이벤트
hrsBtn.addEventListener("click", () => {
    addTime("hrs");
    setBtnImg(hrsBtn, timeHour);
});

// 스타트 버튼 클릭 시 타이머 시작되고 스타트 버튼 숨기고 퍼즈 버튼 보이도록하기
startBtn.addEventListener("click", () => {
    stopBtn.classList.add("active");
    startBtn.classList.remove("active");
    timerStart();
});

// 퍼즈 버튼 클릭시 타이머 멈추고 다시 스타트 버튼 보이도록 하기
stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    stopBtn.classList.remove("active");
    startBtn.classList.add("active");
});

// 리셋 버튼 클릭 시 리셋
resetBtn.addEventListener("click", () => {
    timerReset();
});

const test = [1, 2, 3, 4, 5];
test.reduce((acc, cur) => {
    acc += cur;
    return acc;
}, 0);

const testObj = { name: "희지", price: 500, ship: 1000 };