import Tone from 'tone'

let firstFlag
const original_scale = [
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

const scale = original_scale.reverse();
let synthVol = 0;

$('input[type="range_4"]').rangeslider({
    polyfill: false,
    onInit: function () {
        this.output = $('<br><div class="range-output" />')
            .insertAfter(this.$range)
            .html("ボリューム:" + this.$element.val());
        synthVol = this.$element.val();
    },
    onSlide: function (position, value) {
        this.output.html("ボリューム:" + value);
        synthVol = value;
        // setVol(value);
        // function setVol(val) {
        //     synth.volume.value = val;
        // }
    }
});
function playTone(index, vol) {
    //鍵盤
    const synth = new Tone.Synth({
        volume: vol
    }).toMaster();

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
            // console.log(col);

            //slightly randomized velocities
            var vel = Math.random() * 0.5 + 0.5;
            playTone(i, synthVol);
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

