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
  
});

