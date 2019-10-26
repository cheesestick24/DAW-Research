let timer;
export const timerStart = () => {
  const oldTime = Date.now();
  timer = setInterval(() => {
    const currentTime = Date.now();

    // ミリ秒取得
    const milliSec = currentTime - oldTime;

    let sec = Math.floor(milliSec / 1000);
    const min = Math.floor(sec / 60);
    let mil = milliSec - sec * 1000;
    if (sec >= 60) {
        sec = sec % 60;
        mil = milliSec - (sec*1000) - 60000
    }
    console.log(min + "分" + sec + "秒" + mil);
  }, 1);
};

export const timerStop = () => {
  clearInterval(timer);
};

window.timerStart = timerStart;
window.timerStop = timerStop;
