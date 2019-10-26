import Tone from 'tone'

export const recordArray = [] // プレーヤー格納

window.onload = function () {
  // 様々なブラウザでマイクへのアクセス権を取得する
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

  //audioのみtrue。Web Audio APIが問題なく使えるのであれば、第二引数で指定した関数を実行する
  navigator.getUserMedia({
    audio: true,
    video: false
  }, successFunc, errorFunc);

  function successFunc(error) {
    console.log('マイク使えます')
  }
  // Web Audio APIが使えなかった時
  function errorFunc(error) {
    alert('error');
  }
}

// マイク入力↓
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

let mediaRecorder = null;
let mediaStream = null;

export function recstart() {

  const chunks = [];
  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: 'audio/webm'
  });

  mediaRecorder.addEventListener('dataavailable', e => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  });

  mediaRecorder.addEventListener('stop', () => {
    const recData = URL.createObjectURL(new Blob(chunks));
    //tumami izirumade otonaranai
    // recordArray.push(new Tone.Player(recData));
    recordArray.push(new Tone.Player(recData).toMaster());

    // console.log(URL.createObjectURL(new Blob(chunks)));
    // console.log(new Blob(chunks));
  });

  mediaRecorder.start();
};

export function recstop() {
  if (mediaRecorder === null) {
    return;
  }

  mediaRecorder.stop();
  mediaRecorder = null;
};

navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
}).then(stream => {
  mediaStream = stream;

  // ...
}).catch(error => {
  console.log(error);
});
