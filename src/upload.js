import Tone from 'tone'
const player = []; // プレーヤー格納

window.onload = function () {
  function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {

      // Only process audio files.
      if (!f.type.match('audio/*')) {
        continue;
      }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function (event) {
        let audioData = event.target.result; // 
        // console.log(e.target.result);
        player.push(new Tone.Player(audioData).toMaster());

        let span = document.createElement('span');
        span.innerHTML = ['<audio class="thumb" src="', event.target.result,
          '" title="', escape(event.target.name), '" controls/>'
        ].join('');
        document.getElementById('list').insertBefore(span, null);
      };

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
