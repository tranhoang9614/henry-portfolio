// Create a new instance of an audio object and adjust some of its properties

var audio;
async function newAudio(sourceLink) {
    audio = new Audio();
    audio.src = sourceLink;
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;
    audio.preload = "metadata";

    audio.addEventListener("play", () => {
        initMp3Player();
        frameLooper();
    });

    document.getElementById("audio_box").appendChild(audio);
    // initMp3Player();
}

// Establish all variables that your Analyser will use
var canvas,
    ctx,
    source,
    context,
    analyser,
    fbc_array,
    bars,
    bar_x,
    bar_width,
    bar_height;

// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener(
    "load",
    () => {
        musicStatus = true;

        document.getElementById("MusicTab").addEventListener(
            "click",
            () => {
                newAudio("./Html/media/KissTheRain.mp3");
            },
            { once: true }
        );
    },
    false
);

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency

var musicStatus;

function initMp3Player() {
    // Create for new Audio only
    if (musicStatus) {
        context = new AudioContext();
        source = context.createMediaElementSource(audio);
        musicStatus = false;
    }
    // context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById("analyser_render");
    ctx = canvas.getContext("2d");
    // Re-route audio playback into the processing graph of the AudioContext
    source.connect(analyser);
    analyser.connect(context.destination);
    // frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper() {
    // window.webkitRequestAnimationFrame(frameLooper);
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "#1d5e98"; // Color of the bars
    bars = 100;
    for (var i = 0; i < bars; i++) {
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}
