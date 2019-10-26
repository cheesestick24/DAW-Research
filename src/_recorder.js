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



const canvas = document.getElementById('analyzer')
const canvasCtx = canvas.getContext('2d')

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

let source = audioCtx.createMediaStreamSource(mediaStream);
source.connect(analyser);
// analyser.connect(audioCtx.destination);
// distortion.connect(audioCtx.destination);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
const WIDTH = 1000;
const HEIGHT = 250;
analyser.getByteTimeDomainData(dataArray);
canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  var drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  canvasCtx.beginPath();
  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;
  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * HEIGHT / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();





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
