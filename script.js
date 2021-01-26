function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

setInterval(() => {
    currentTime();
}, 1000);

function currentTime() {
    var Now = new Date();
    var YYYY = Now.getFullYear().toString();
    var MM = formatNumber(Now.getMonth() + 1);
    var DD = formatNumber(Now.getDate());
    var hh = formatNumber(Now.getHours());
    var mm = formatNumber(Now.getMinutes());
    var ss = formatNumber(Now.getSeconds());

    var CurrentTime = hh + ":" + mm + ":" + ss;
    var CurrentDay = DD + "." + MM + "." + YYYY;

    document.getElementById("datetime2").textContent = CurrentTime;
    document.getElementById("datetime1").textContent = CurrentDay;

    document.getElementById("datetime3").src =
        "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" +
        CurrentTime +
        " " +
        CurrentDay;
}

function formatNumber(number) {
    if (number < 10) {
        number = "0" + number.toString();
    } else {
        number = number.toString();
    }
    return number;
}

// Create a new instance of an audio object and adjust some of its properties
var audio;
async function newAudio(sourceLink) {
    audio = new Audio();
    audio.src = sourceLink;
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;
    audio.preload = "metadata";
    audio.id = await "audio1";
    player = document.getElementById("audio1");
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
        newAudio("./media/KissTheRain.mp3");
        document.getElementById("audio_box").appendChild(audio);
    },
    false
);

var player;

player.addEventListener("pause", () => {
    console.log(audio, player);
    console.log("Audio played");
    initMp3Player();
});

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency

function initMp3Player() {
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById("analyser_render");
    ctx = canvas.getContext("2d");
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
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
