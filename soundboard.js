//creates audio context

const soundCtx = new AudioContext();

//creates gain node

const masterGain = new GainNode(soundCtx);
masterGain.gain.value = 1.0;
masterGain.connect(soundCtx.destination);

//sets up my sound bank (so to speak)
let kick;
let snare;
let hat;
let bass;
let openHat;

//activating my audio start/stop functions one by one starting with...
//kick
const loadPlayKick = async function () {
    //fetches the audio file for future use
    console.log("kick");
    const file = await fetch ("kick.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await soundCtx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for kick

    kick = new AudioBufferSourceNode(soundCtx);

    kick.buffer = audioBuffer;

    kick.connect(masterGain);

    kick.start();
}

const stopKick = async function() {
    kick.stop();
}

document.getElementById("kick").addEventListener("keydown",async ()=> {
    if (event.code === "KeyZ"){
        await loadPlayKick();
    }
})
document.getElementById("kick").addEventListener("mousedown", loadPlayKick);
document.getElementById("kick").addEventListener("mouseup", stopKick);


//snare
const loadPlaySnare = async function () {
    //fetches the audio file for future use
    const file = await fetch ("snare.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await soundCtx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for kick

    snare = new AudioBufferSourceNode(soundCtx);

    snare.buffer = audioBuffer;

    snare.connect(masterGain);

    snare.start();
};

const stopSnare = async function () {
    snare.stop();
}
document.getElementById("snare").addEventListener("mousedown", loadPlaySnare);
document.getElementById("snare").addEventListener("mouseup", stopSnare);
document.getElementById("snare").addEventListener("keydown",()=> {
    if (event.code === "KeyX"){
        loadPlaySnare();
    }
})

//hat
const loadPlayHat = async function () {
    //fetches the audio file for future use
    const file = await fetch ("hat.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await soundCtx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for kick

    hat = new AudioBufferSourceNode(soundCtx);

    hat.buffer = audioBuffer;

    hat.connect(masterGain);

    hat.start();
}

const stopHat = async function() {
    hat.stop();
}

document.getElementById("hat").addEventListener("keydown",()=> {
    if (event.code === "KeyC"){
        loadPlayHat();
    }
})
/*document.getElementById("hat").addEventListener("keyup",()=> {
    if (event.code === "KeyC"){
        stopHat();
    }
})*/
document.getElementById("hat").addEventListener("mousedown", loadPlayHat);
document.getElementById("hat").addEventListener("mouseup", stopHat);

//bass
const loadPlayBass = async function () {
    //fetches the audio file for future use
    const file = await fetch ("bass.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for bass

    const audioBuffer = await soundCtx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for bass

    bass = new AudioBufferSourceNode(soundCtx);

    bass.buffer = audioBuffer;

    bass.connect(masterGain);

    bass.start();
};

const stopBass = async function () {
    bass.stop();
}
document.getElementById("bass").addEventListener("mousedown", loadPlayBass);
document.getElementById("bass").addEventListener("mouseup", stopBass);
document.getElementById("bass").addEventListener("keypress",(event)=> {
    if (event.code === "KeyV"){
        loadPlayBass();
    }
})
/*document.getElementById("bass").addEventListener("keyup",()=> {
    if (event.code === "KeyV"){
        stopBass();
    }
})*/

//open hat
const loadPlayOpenHat = async function () {
    //fetches the audio file for future use
    const file = await fetch ("open hat.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for bass

    const audioBuffer = await soundCtx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for bass

    openHat = new AudioBufferSourceNode(soundCtx);

    openHat.buffer = audioBuffer;

    openHat.connect(masterGain);

    openHat.start();
};

const stopOpenHat = async function () {
    openHat.stop();
}
document.getElementById("open hat").onclick = () => loadPlayHat();
document.getElementById("open hat").addEventListener("keypress",(b)=> loadPlayHat());

