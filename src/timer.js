let timer;
export default {
    timerStart() {
        const oldTime = Date.now();
        timer = setInterval(() => {
            const currentTime = Date.now();

            // ミリ秒取得
            const milliSec = currentTime - oldTime;

            let sec = Math.floor(milliSec / 1000);
            let min = Math.floor(sec / 60);
            let mil = milliSec - sec * 1000;
            if (sec >= 60) {
                sec = sec % 60;
                mil = milliSec - (60000 * min) - (sec * 1000)
                console.log(mil,sec,min)
            }
            // console.log(min + "分" + sec + "秒" + mil);
            $("#timer").text("録音時間" + min + "分" + sec + "秒" + mil);
        }, 1);
    },

    timerStop() {
        clearInterval(timer);
    }
}