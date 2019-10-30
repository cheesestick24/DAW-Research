import Tone from 'tone'
import './mic'
import './upload'
import './timer'
import './pianoroll'

$(function () {


  var two = new Two({
    fullscreen: false,
    autostart: true
  }).appendTo(document.body);

  let rect = [];
  


  // Update the renderer in order to generate corresponding DOM Elements.
  two.update();
  

  
  // let button = false;

  // function colorselect(i) {
  //   if (button == true) {
  //     console.log("true")
  //     rect[i].noStroke().fill = pushbutton();
  //     button = false;
  //   } else {
  //     console.log("false")
  //     rect[i].noStroke().fill = getRandomColor();
  //     button = true;
  //   }
  // }


  // function getRandomColor() {
  //   return 'rgb('
  //     + Math.floor(Math.random() * 255) + ','
  //     + Math.floor(Math.random() * 255) + ','
  //     + Math.floor(Math.random() * 255) + ')';
  // }
  // function pushbutton() {
  //   return 'rgb('
  //     + 0 + ','
  //     + 0 + ','
  //     + 0 + ')';
  // }


});

