// 사용한 버튼, 이미지 변수
const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");

const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

// 왜 이미지에 따로 주는건지???
const startBtnImg = document.querySelector(".start-btn-img");
const resetBtnImg = document.querySelector(".reset-btn-img");
const stopBtn = document.querySelector(".stop-btn");

// 시간 관련 변수들
// time : 클릭한 전체시간을 초로 저장
// timer : 다른 함수에서 clearInterval을 사용하기 위해 전역변수로 선언 (나중에 setInterval 할당);
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

        if (time < 1 && timeMin >= 1) {
            timeMin--;
            if (timeMin < 10) {
                minBtn.textContent = timeMin.toString().padStart(2, "0");
            } else {
                minBtn.textContent = timeMin;
            }
            timeSec = 59;
            secBtn.textContent = timeSec;
        }

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
