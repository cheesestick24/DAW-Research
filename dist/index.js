import './mic.js'

$(function () {

  var two = new Two({
    fullscreen: false,
    autostart: true
  }).appendTo(document.body);

  let rect = [];
  const scale = [
    'C4',
    'D4',
    'E4',
    'F4',
    'G4',
    'A4',
    'B4',
    'C5',
    'D5',
    'E5',
    'F5',
    'G5',
    'A5',
    'B5',
  ];
  for (let i = 0; i < scale.length; i++) {
    rect[i] = two.makeRectangle(two.width / 5, two.height / 2, 50, 250);
    two.width = two.width + 300;
    rect[i].noStroke().fill = getRandomColor();
    // two.height = two.height + 10;
  }

  // Update the renderer in order to generate corresponding DOM Elements.
  two.update();

  for (let i = 0; i < scale.length; i++) {
    $(rect[i]._renderer.elem)
      .css('cursor', 'pointer')
      .click(function (e) {
        //rect.fill = getRandomColor();
        playTone(i);
      });
  }

  // two.bind('update', function (frameCount, timeDelta) {
  //   rect.rotation = frameCount / 60;
  // });

  function getRandomColor() {
    return 'rgb('
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ')';
  }

  function playTone(index) {
    //鍵盤
    const synth = new Tone.Synth().toMaster();

    //ピアノ音階作成

    synth.triggerAttackRelease(scale[index], '8n');
  }

});