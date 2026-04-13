import * as MusicTools from "/Galloza_Pinky_Final_Project/pinky/MusicTools.js";
let ctx = new AudioContext();
//create my synth using Tone.js

const filter = new Tone.AutoFilter({
    frequency: 9,
    type: "sine",
    depth: 0.6,
    baseFrequency: 50,
    octaves: 4,
    filter: {
        type: "lowpass",
        rolloff: -12,
        Q: 1,
    },
}).toDestination();

filter.start();


let synth;

synth = new Tone.PolySynth({
    oscillator: {
        type: "sine",
    },
    envelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 1,
        release: 0.25,
    },

}).toDestination();


const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const octaves = [4,5,6];

octaves.forEach((octave) => {
    notes.forEach((note) => {
    const key = document.createElement("div");
    const isBlackKey = note.includes("#");
    key.className = isBlackKey ? "key black-key" : "key white-key";

    const playNote = () => {
        synth.triggerAttackRelease(`${note}${octave}`,synth.options.envelope.release);
    };
    key.addEventListener("click", ()=>{
        playNote();
    });


    piano.appendChild(key);
    });
});
//gets stylesheet info
const controls = document.createElement("div");
controls.className = "controls";

// Frequency control
const freqControl = document.createElement("div");
freqControl.innerHTML = `
  <label>Filter Frequency: <span id="freqValue">9</span> Hz</label>
  <input type="range" min="0.1" max="20" step="0.1" value="9" id="frequency">
`;

// Depth control
const depthControl = document.createElement("div");
depthControl.innerHTML = `
  <label>Filter Depth: <span id="depthValue">0.6</span></label>
  <input type="range" min="0" max="1" step="0.01" value="0.6" id="depth">
`;

controls.appendChild(freqControl);
controls.appendChild(depthControl);
document.body.insertBefore(controls, piano);

// Add event listeners for the controls
document.getElementById("frequency").addEventListener("input", (e) => {
    const value = e.target.value;
    filter.frequency.value = value;
    document.getElementById("freqValue").textContent = value;
});

document.getElementById("depth").addEventListener("input", (e) => {
    const value = e.target.value;
    filter.depth.value = value;
    document.getElementById("depthValue").textContent = value;
});
//volume slider
document.querySelector("#volSlider").addEventListener("input", (event) => {
    let sliderValue = event.target.value;
    document.querySelector("#volLabel").innerText = sliderValue + `dbFS`
    sliderValue = Number(sliderValue); //dB
    synth.volume.linearRampToValueAtTime(
        MusicTools.dbtoa(sliderValue),
        ctx.currentTime + 0.1,
    );
    console.log(sliderValue);
    synth.volume.value = sliderValue;
});
//ADSR controls :)
//attack slider
document.querySelector("#attackSlider").addEventListener("input", (event) => {
    console.log(ctx.attack);
    let sliderValue = event.target.value;
    document.querySelector("#attackLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    synth.options.envelope.attack = sliderValue;
    console.log(sliderValue);
});


//decay slider
document.querySelector("#decaySlider").addEventListener("input", (event) =>{
    console.log(ctx.decay);
    let sliderValue = event.target.value;
    document.querySelector("#decayLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    synth.options.envelope.decay = sliderValue;
    console.log(sliderValue);
});

// sustain slider
document.querySelector("#susSlider").addEventListener("input", (event) =>{
    let sliderValue = event.target.value;
    document.querySelector("#susLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    synth.options.envelope.sustain = sliderValue;
    console.log(sliderValue);
});
//release slider
document.querySelector("#relSlider").addEventListener("input", (event) => {
    console.log(ctx.release);
    let sliderValue = event.target.value;
    document.querySelector("#relLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    synth.options.envelope.release = sliderValue;
    console.log(sliderValue);
});

const drumMachine = new Tone.Players({
    kick: "./Sounds/kick.wav",
    hat: "./Sounds/hat.wav",
    snare: "./Sounds/snare.wav",
    bass: "./Sounds/bass.wav",
    openHat: "./Sounds/open hat.wav",
}).toDestination();

document.getElementById("kick").addEventListener("keydown", async (e)=>{
    console.log(e);
    if(e.code === "Numpad1"){
        await drumMachine.player("kick").start();
        if(drumMachine.player("kick").isPlaying === true) {

        }
    }

})
document.getElementById("kick").addEventListener("mousedown", async ()=>{
    await drumMachine.player("kick").start();
})

document.getElementById("snare").addEventListener("keydown", async (e)=>{
    console.log(e);
    if(e.code === "Numpad2"){
        await drumMachine.player("snare").start();
    }

})
document.getElementById("snare").addEventListener("mousedown", async ()=>{
    await drumMachine.player("snare").start();
})

document.getElementById("hat").addEventListener("keydown", async (e)=>{
    console.log(e);
    if(e.code === "Numpad3") {
        await drumMachine.player("hat").start();
    }
});
document.getElementById("hat").addEventListener("mousedown", async ()=>{
    await drumMachine.player("hat").start();
});

document.addEventListener("DOMContentLoaded", () => {
    const seq = new Tone.PolySynth().toDestination();

    // Create a 16-step sequencer with 8 different notes
    const sequencerSteps = 16;
    const seqNotes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"];

    // Get the grid container
    const sequencerGrid = document.getElementById("sequencerGrid");

    // Create grid cells
    seqNotes.forEach((note, rowIndex) => {
        const rowElement = document.createElement("div");
        rowElement.className = "sequencer-row";

        for (let step = 0; step < sequencerSteps; step++) {
            const cell = document.createElement("div");
            cell.className = "sequencer-cell";
            cell.dataset.note = note;
            cell.dataset.step = step;

            cell.addEventListener("click", () => {
                cell.classList.toggle("active");
                synth.triggerAttackRelease(note, "8n");
            });

            rowElement.appendChild(cell);
        }
        sequencerGrid.appendChild(rowElement);
    });

    // Set up control buttons
    document
        .querySelector(".controls #startButton")
        .addEventListener("click", () => {
            Tone.start();
            Tone.Transport.start();
        });

    document.getElementById("stopButton").addEventListener("click", () => {
        Tone.Transport.stop();
    });

    // Create the playback loop
    const sequencerLoop = new Tone.Loop((time) => {
        const position = Tone.Transport.position.split(":");
        console.log(position);
        const quarterNote = parseInt(position[1]);
        const sixteenthNote = parseInt(position[2]);
        const currentStep = (quarterNote * 4 + sixteenthNote) % sequencerSteps;

        // Remove previous column highlighting
        document.querySelectorAll(".current-step").forEach((cell) => {
            cell.classList.remove("current-step");
        });

        // Add highlighting to current column
        document
            .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"]`)
            .forEach((cell) => {
                cell.classList.add("current-step");
            });

        // Play active notes
        document
            .querySelectorAll(`.sequencer-cell[data-step="${currentStep}"].active`)
            .forEach((cell) => {
                synth.triggerAttackRelease(cell.dataset.note, "16n", time);
            });
    }, "16n").start(0);
});

