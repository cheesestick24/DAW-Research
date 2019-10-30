import Tone from 'tone'
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
function playTone(index) {
    //鍵盤
    const synth = new Tone.Synth().toMaster();

    //ピアノ音階作成

    synth.triggerAttackRelease(scale[index], '32n');
    // (time, 0, "32n", 0, vel);
  }




var loop = new Tone.Sequence(function (time, col) {
    var column = document.querySelector("tone-step-sequencer").currentColumn;
    column.forEach(function (val, i) {
        if (val) {
            //slightly randomized velocities
            var vel = Math.random() * 0.5 + 0.5;
            playTone(i);
        }
    });
    //set the columne on the correct draw frame
    Tone.Draw.schedule(function () {
        document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
    }, time);
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

//bind the interface
document.querySelector("tone-transport").bind(Tone.Transport);

Tone.Transport.on("stop", () => {
    setTimeout(() => {
        document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
    }, 100);
});

