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
  var two = new Two({
    fullscreen: false,
    autostart: true
  }).appendTo(document.body);

  let recbutton = two.makeRectangle(
    two.width / 2,
    (two.height * 6) / 8,
    100,
    50
  );
  recbutton.fill = "#FF8000";

  let micstart = two.makeRectangle(
    two.width / 2,
    (two.height * 7) / 8,
    100,
    50
  );
  micstart.fill = "#ff0000";

  two.update();

  $(recbutton._renderer.elem)
    .css("cursor", "pointer")
    .click(function (e) {
      //recbutton.fill = getRandomColor();
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
    });

  const channel = new Tone.Channel({
    volume: 0
  }).toMaster();

  const delay = new Tone.PingPongDelay({
    wet: 0
  }).toMaster();

  const reverb = new Tone.JCReverb({
    wet: 0
  }).toMaster();

  let playing = false;
  $(micstart._renderer.elem)
    .css("cursor", "pointer")
    .click(function (e) {
      // if (state.recording === false) {
      //   if (state.playing === false) {
      //     $("#play").text("再生中")
      //     state.playing = true;
      //     for (let p of recordArray) {
      //       p.start();
      //     }
      //   } else {
      //     $("#play").text("再生停止")
      //     state.playing = false;
      //     for (let p of recordArray) {
      //       p.stop();
      //     }
      //   }
      // }
    });


  $('input[type="range_1"]').rangeslider({
    polyfill: false,
    onInit: function () {
      this.output = $('<div class="range-output" />')
        .insertAfter(this.$range)
        .html(this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html(value);
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
      this.output = $('<div class="range-output" />')
        .insertAfter(this.$range)
        .html(this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html(value);

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
      this.output = $('<div class="range-output" />')
        .insertAfter(this.$range)
        .html(this.$element.val());
    },
    onSlide: function (position, value) {
      this.output.html(value);

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
      $("#play").text("再生中")
      state.playing = true;
      for (let p of recordArray) {
        p.start();
      }
    } else {
      $("#play").text("再生停止")
      state.playing = false;
      for (let p of recordArray) {
        p.stop();
      }
    }
  }
}

const init = () => {
  console.log("初期化");
  // $('#playSeq').attr('onclick', 'micPlay()');
};

window.micPlay = micPlay;
window.onload = init();
