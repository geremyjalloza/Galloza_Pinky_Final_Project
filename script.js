import * as MusicTools from "./MusicTools.js"
import {Default} from "./note.js"
const ctx = new AudioContext();
const masterGain = new GainNode(ctx);
masterGain.gain.value = 0;
masterGain.connect(ctx.destination);
const theButtons = document.querySelectorAll("button")
const myNotes = Array(13)
const pitches = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]



document.querySelector("#volSlider").addEventListener("input", (event) => {
    let sliderValue = event.target.value;
    document.querySelector("#volLabel").innerText = sliderValue + `dbFS`
    sliderValue = Number(sliderValue); //dB
        masterGain.gain.linearRampToValueAtTime(
        MusicTools.dbtoa(sliderValue),
        ctx.currentTime + 0.1,
        );
});

// attack slider~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.querySelector("#attackSlider").addEventListener("input", (event) =>{
    let sliderValue = event.target.value;
    let now = ctx.currentTime;
    document.querySelector("#attackLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    this.attack.setValueAtTime(sliderValue, now + 0.1);
})
// decay slider~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.querySelector("#decaySlider").addEventListener("input", (event) =>{
    console.log(ctx.decay);
    let sliderValue = event.target.value;
    let now = ctx.currentTime;
    document.querySelector("#decayLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    ctx.decay = event.target.value;
    Default.setDecay(sliderValue);
    Default.decay = event.target.value;
})

// sustain slider~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.querySelector("#susSlider").addEventListener("input", (event) =>{
    let sliderValue = event.target.value /10;
    let now = ctx.currentTime;
    document.querySelector("#susLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    ctx.sustain = event.target.value;
    Default.setSustain(sliderValue);
})

// release slider~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.querySelector("#relSlider").addEventListener("input", (event) =>{
    console.log(ctx.release);
    let sliderValue = event.target.value;
    let now = ctx.currentTime;
    document.querySelector("#relLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    ctx.release = event.target.value;
    Default.setRelease(sliderValue);
})



/*document.querySelector("#attackSlider").addEventListener("input", (event) =>{
    MusicTools.changeAttack();


})*/



/*document.querySelector("button").addEventListener("mousedown", () => {
    myOsc = new Note(ctx, masterGain, MusicTools.mtof(60));
    myOsc.play();
})

document.querySelector("button").addEventListener("mouseup", () => {
    myOsc.end();
})
*/

theButtons.forEach((aButton, index) => {
    aButton.addEventListener("pointerdown", () => {

        myNotes[index] = new Default(ctx, masterGain, MusicTools.mtof(pitches[index]));
        myNotes[index].play();
    });
    aButton.addEventListener("pointerup", () => {
        myNotes[index].end();
    })
})



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
    const file = await fetch("kick.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await ctx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    kick = new AudioBufferSourceNode(ctx);

    kick.buffer = audioBuffer;

    kick.connect(masterGain);

    kick.start();
}

const stopKick = async function() {
    kick.end();
}


document.getElementById("kick").addEventListener("mousedown", loadPlayKick);
document.getElementById("kick").addEventListener("mouseup", stopKick);


//snare
const loadPlaySnare = async function () {
    //fetches the audio file for future use
    const file = await fetch ("snare.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await ctx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for kick

    snare = new AudioBufferSourceNode(ctx);

    snare.buffer = audioBuffer;

    snare.connect(masterGain);

    snare.start();

};

const stopSnare = async function (snare) {
    await snare.end().then(null);
    return snare;

}
document.getElementById("snare").addEventListener("mousedown", loadPlaySnare);
document.getElementById("snare").addEventListener("mouseup", stopSnare);
document.getElementById("snare").addEventListener("keydown",(event)=> {
    if (event.code === "KeyX"){
        loadPlaySnare().then(stopSnare);
        }
    })


//hat
const loadPlayHat = async function () {
    //fetches the audio file for future use
    const file = await fetch ("hat.wav");

    //await because this takes time

    const arrayBuff = await file.arrayBuffer();

    //create audio buffer for kick

    const audioBuffer = await ctx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for kick

    hat = new AudioBufferSourceNode(ctx);

    hat.buffer = audioBuffer;

    hat.connect(masterGain);

    hat.start();
}

const stopHat = async function() {
    hat.stop();
}

document.getElementById("hat").addEventListener("keydown",()=> {
    if (event.code === "KeyC"){
        loadPlayHat().then(hat.cancelScheduledValues);
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

    const audioBuffer = await ctx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for bass

    bass = new AudioBufferSourceNode(ctx);

    bass.buffer = audioBuffer;

    bass.connect(masterGain);

    bass.start();
};

const stopBass = async function () {
    bass.stop();
}
document.getElementById("bass").addEventListener("mousedown", loadPlayBass);
document.getElementById("bass").addEventListener("mouseup", stopBass);
document.getElementById("bass").addEventListener("keydown",()=> {
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

    const audioBuffer = await ctx.decodeAudioData(arrayBuff);

    console.log(arrayBuff);

    //creates audio buffer source node for bass

    openHat = new AudioBufferSourceNode(ctx);

    openHat.buffer = audioBuffer;

    openHat.connect(masterGain);

    openHat.start();
};

document.getElementById("kick").addEventListener("keyZ", loadPlayKick);

const stopOpenHat = async function () {
    openHat.stop();
}
document.getElementById("open hat").addEventListener("mousedown", loadPlayOpenHat);
document.getElementById("open hat").addEventListener("mouseup", stopOpenHat);
document.getElementById("open hat").addEventListener("keydown",(event)=> {
    if (event.code === "KeyB"){
        loadPlayOpenHat();
    }
})
