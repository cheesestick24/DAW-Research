export default {
    drawAnalyzer(mediaStream) {

        const canvas = document.getElementById('analyzer')
        const canvasCtx = canvas.getContext('2d')

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();

        let source = audioCtx.createMediaStreamSource(mediaStream);
        source.connect(analyser);
        // analyser.connect(audioCtx.destination);
        // distortion.connect(audioCtx.destination);

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        const WIDTH = 1000;
        const HEIGHT = 150;
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {
            var drawVisual = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            canvasCtx.beginPath();
            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        }

        draw();

    }
}