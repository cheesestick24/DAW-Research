import Tone from 'tone'


let firstFlag
let instrument = [
    "./audio/drum/Kick10.mp3",
    "./audio/drum/Snare07.mp3",
    "./audio/drum/CHH Edge06.mp3",
    "./audio/drum/OHH Edge06.mp3",
    // "./audio/drum/Kick10.mp3",
    // "./audio/drum/Snare07.mp3",
    // "./audio/drum/CHH Edge06.mp3",
    // "./audio/drum/OHH Edge06.mp3",
    // "./audio/drum/Kick10.mp3",
    // "./audio/drum/Snare07.mp3",
    // "./audio/drum/CHH Edge06.mp3",
    // "./audio/drum/OHH Edge06.mp3",
    // "./audio/drum/Kick10.mp3",
    // "./audio/drum/Snare07.mp3",
    // "./audio/drum/CHH Edge06.mp3",
    // "./audio/drum/OHH Edge06.mp3",
    "/src/audio/drum/Crash Cymbal-L05.mp3",
    "/src/audio/drum/Crash Cymbal-R06.mp3"
]

let synthVol = 10;

$('input[type="range_4"]').rangeslider({
    polyfill: false,
    onInit: function () {
        this.output = $('<div class="range-output" />')
            .insertAfter(this.$range)
            .html("ボリューム" + '<br>'+ (Number(this.$element.val()) + 100));
        synthVol = this.$element.val();
    },
    onSlide: function (position, value) {
        this.output.html("ボリューム" + '<br>'+ (value + 100).toFixed(1));
        synthVol = value;
        // setVol(value);
        // function setVol(val) {
        //     synth.volume.value = val;
        // }
    }
});


function loadPlayers(index, vol, time) {
    // console.log(instrument[index]);
    const drum = new Tone.Player(instrument[index]).toMaster({
        volume: vol
    });
    drum.autostart = true;

}
const length = 6;

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

            loadPlayers(i, synthVol, time);
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
