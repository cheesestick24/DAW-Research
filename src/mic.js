import Tone from "tone";
import * as recorder from "./recorder.js";
import timer from './timer'
const state = {
  recording: false,
  playing: false
};

const recordArray = recorder.recordArray;

// import effect from './effect';
$(function () {

  const delay = new Tone.PingPongDelay({
    wet: 0
  }).toMaster();

  const reverb = new Tone.JCReverb({
    wet: 0
  }).toMaster();

  $('input[type="range_1"]').rangeslider({
    polyfill: false,
    onInit: function () {
      this.output = $('<br><div class="range-output" />')
        .insertAfter(this.$range)
        .html("ボリューム:" + this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html("ボリューム:" + value);
      setVol(value);
      // console.log(value);
      function setVol(val) {
        for (let i = 0; i < recordArray.length; i++) {
          // p.volume.value = val;
          recordArray[i].volume.value = val;
          console.log(i + ":" + recordArray[i].volume.value);
        }
      }
    }
  });

  $('input[type="range_2"]').rangeslider({
    polyfill: false,
    onInit: function () {
      this.output = $('<br><div class="range-output" />')
        .insertAfter(this.$range)
        .html("リバーブ：" + this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html("リバーブ：" + value);

      setDelay(value);

      function setDelay(val) {
        for (let i = 0; i < recordArray.length; i++) {
          delay.wet.value = val;
          recordArray[i].connect(delay);
          console.log("delay:" + delay.wet.value);
        }
      }
    }
  });

  $('input[type="range_3"]').rangeslider({
    polyfill: false,
    onInit: function () {
      this.output = $('<br><div class="range-output" />')
        .insertAfter(this.$range)
        .html("ディレイ：" + this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html("ディレイ：" + value);

      setReverb(value);

      function setReverb(val) {
        for (let i = 0; i < recordArray.length; i++) {
          reverb.wet.value = val;
          recordArray[i].connect(reverb);
          console.log("reverb:" + reverb.wet.value);
        }
      }
    }
  });

});

const micPlay = () => {
  if (state.recording === false) {
    if (state.playing === false) {
      // console.log('playing')
      $("#play").text("再生中")
      state.playing = true;
      for (let p of recordArray) {
        p.start();
      }
    } else {
      $("#play").text("再生停止")
      // console.log('stop')
      state.playing = false;
      for (let p of recordArray) {
        p.stop();
      }
    }
  }
}

const recClick = () => {
  if (state.recording === false) {
    $("#record").text("録音中")
    recorder.recstart();
    state.recording = true;
    timer.timerStart();
  } else {
    $("#record").text("録音停止")
    recorder.recstop();
    state.recording = false;
    timer.timerStop();
  }
}

const init = () => {
  console.log("初期化");
  // $('#playSeq').attr('onclick', 'micPlay()');
};

window.micPlay = micPlay;
window.recClick = recClick;
window.onload = init();
