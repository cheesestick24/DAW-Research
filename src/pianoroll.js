import Tone from 'tone'

let firstFlag
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

const length = 16;

firstFlag = true;
var loop = new Tone.Sequence(function (time, col) {
    var column = document.querySelector("tone-step-sequencer").currentColumn;
    column.forEach(function (val, i) {
        if (firstFlag && col == length - 1) {
            firstFlag = null;
            return false;
        } else if (val) {
            if (firstFlag && col == 0) {
                firstFlag = null;
                return false;
            }
            console.log(col)

            //slightly randomized velocities
            var vel = Math.random() * 0.5 + 0.5;
            playTone(i);
        } else {
            // firstFlag = null;
        }
    });
    //set the columne on the correct draw frame
    Tone.Draw.schedule(function () {
        document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
    }, time);
}, [...length], "16n").start(0, 0);

//bind the interface
document.querySelector("tone-transport").bind(Tone.Transport);

Tone.Transport.on("stop", () => {
    firstFlag = true;

    setTimeout(() => {
        document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
    }, 100);
});

