// import Tone from 'tone'
import * as recorder from './recorder.js'

const state = {
  recording: false,
  playing: false
}

// import effect from './effect';
$(function () {

  var two = new Two({
    fullscreen: false,
    autostart: true
  }).appendTo(document.body);

  let recbutton = two.makeRectangle(two.width / 2, two.height * 7 / 8, 100, 50);
  recbutton.fill = '#FF8000';



  let micstart = two.makeRectangle(two.width / 2, two.height * 6 / 8, 100, 50);
  micstart.fill = '#ff0000';



  two.update();

  $(recbutton._renderer.elem)
    .css('cursor', 'pointer')
    .click(function (e) {
      //recbutton.fill = getRandomColor();
      if (state.recording === false) {
        console.log("start, recording: " + state.recording);
        recorder.recstart();
        state.recording = true;
      }
      else {
        console.log("stop, recording: " + state.recording)
        recorder.recstop();
        state.recording = false;
      }
    });


  const recordArray = recorder.recordArray


  const delay = new Tone.PingPongDelay({
    'wet': 0
  }).toMaster();

  const reverb = new Tone.JCReverb({
    'wet': 0
  }).toMaster();



  let playing = false;
  $(micstart._renderer.elem)
    .css('cursor', 'pointer')
    .click(function (e) {
      if (state.recording === false) {
        console.log("play + recording: " + state.recording);
        if (state.playing === false) {
          state.playing = true;
          for (let p of recordArray) {
            p.start();
          }
        } else {
          state.playing = false;
          for (let p of recordArray) {
            p.stop();
          }
        }
      }
    });


  window.setVol = val => {
    for (let p of recordArray) {
      p.volume.value = val;
    }
  }

  window.delaytrig = delayval => {
    for (let p of recordArray) {
      delay.wet.value = delayval;
      p.connect(delay)
    }
  }

  window.reverbtrig = reverbval => {
    for (let p of recordArray) {
      reverb.wet.value = reverbval;
      p.connect(reverb)
    }
  }

})