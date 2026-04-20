import * as MusicTools from "/pinky/MusicTools.js";
let ctx = new Tone.Context();
const masterGain = new Tone.Gain();
masterGain.gain.value = -70;
let now = ctx.currentTime;
//create my synth using Tone.js
//const masterGain = new GainNode(ctx);
//masterGain.gain.value = 1;


const filter = new Tone.Filter({
    type: "lowpass",
    cutoff: 5000,
    rolloff: -24,
    context: ctx,
}).toDestination();

document.getElementById("filter").addEventListener("click", () =>{
    if (filter.isConnected === true){
        filter.disconnect(ctx);
    }
    else {
        filter.connect(ctx);
    }
})




let synth;

synth = new Tone.PolySynth({
    oscillator: {
        type: "sawtooth",
        modulationType: "sawtooth",
        harmonicity: 1.5,
    },
    context: ctx,
    envelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 1,
        release: 0.25,
    },
    volume: -70,
}).connect(filter);



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
    key.addEventListener("mousedown", async()=>{
        await playNote();
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



controls.appendChild(freqControl);

document.body.insertBefore(controls, piano);

// Add event listeners for the controls
document.getElementById("frequency").addEventListener("input", (e) => {
    const value = e.target.value;
    filter.cutoff = value;

    document.getElementById("freqValue").textContent = value;
});

//master gain slider
document.querySelector("#gainSlider").addEventListener("input", (event) => {
    let sliderValue = event.target.value;
    document.querySelector("#gainLabel").innerText = sliderValue + `dbFS`
    sliderValue = Number(sliderValue); //dB
    masterGain.gain.linearRampToValueAtTime(
        MusicTools.dbtoa(sliderValue),
        ctx.currentTime + 0.1,
    );
    console.log(sliderValue);
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
});

//decay slider
    document.querySelector("#decaySlider").addEventListener("input", (event) => {
        console.log(ctx.decay);
        let sliderValue = event.target.value;
        document.querySelector("#decayLabel").innerText = sliderValue + `sec.`
        sliderValue = Number(sliderValue); //sec
        synth.options.envelope.decay = sliderValue;
        console.log(sliderValue);
    });

// sustain slider
    document.querySelector("#susSlider").addEventListener("input", (event) => {
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
    }).connect(masterGain);


document.addEventListener("input", () => {
    document.addEventListener("keydown",  async(e) => {
        let now = ctx.currentTime
        switch (e.code) {
            case "Numpad1": {
                await drumMachine.player("kick").start(now);
            }
                break;
            case "Numpad2": {
                await drumMachine.player("snare").start(now);
            }
                break;
            case "Numpad3": {
                await drumMachine.player("hat").start(now);
            }
                break;
            case "Numpad4": {
                await drumMachine.player("bass").start(now);
            }
                break;
            case "Numpad5": {
                await drumMachine.player("openHat").start(now);
            }
        }
    });
    });
    /*document.getElementById("kick").addEventListener("mousedown", async () => {
        await drumMachine.player("kick").start();
    })

    document.getElementById("snare").addEventListener("keydown", async (e) => {
        console.log(e);
        if (e.code === "Numpad2") {
            await drumMachine.player("snare").start();
        }

    })
    document.getElementById("snare").addEventListener("mousedown", async () => {
        await drumMachine.player("snare").start();
    })

    document.getElementById("hat").addEventListener("keydown", async (e) => {
        console.log(e);
        if (e.code === "Numpad3") {
            await drumMachine.player("hat").start();
        }
    });
    document.getElementById("hat").addEventListener("mousedown", async () => {
        await drumMachine.player("hat").start();
    });
*/
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
                    seq.triggerAttackRelease(note, "8n");
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
                    seq.triggerAttackRelease(cell.dataset.note, "16n", time);
                });
        }, "16n").start(0);
    });

    // drum sequencer
document.addEventListener("DOMContentLoaded", () => {
    const drumSeq = new Tone.Players({
        seqKick: "./Sounds/kick.wav",
        seqHat: "./Sounds/hat.wav",
        seqSnare: "./Sounds/snare.wav",
        seqBass: "./Sounds/bass.wav",
        seqOpenHat: "./Sounds/open hat.wav",
    }).connect(masterGain);

    // Create a 16-step sequencer with 8 different notes
    const sequencerSteps = 16;
    const player =  ["seqKick", "seqHat", "seqSnare", "seqBass", "seqOpenHat"]

    // Get the grid container
    const sequencerGrid = document.getElementById("drumSequencerGrid");

    // Create grid cells
    player.forEach((player, rowIndex) => {
        const rowElement = document.createElement("div");
        rowElement.className = "sequencer-row";

        for (let step = 0; step < sequencerSteps; step++) {
            const cell = document.createElement("div");
            cell.className = "sequencer-cell";
            cell.dataset.player = player;
            cell.dataset.step = step;

            cell.addEventListener("click", () => {
                cell.classList.toggle("active");
                drumSeq.player(player).start();
                console.log(cell.dataset.player);
            });

            rowElement.appendChild(cell);
        }
        sequencerGrid.appendChild(rowElement);
    });

    // Set up control buttons
    document
        .querySelector(".controls #drumStartButton")
        .addEventListener("click", () => {
            Tone.start();
            Tone.Transport.start();
        });

    document.getElementById("drumStopButton").addEventListener("click", () => {
        Tone.Transport.stop();
    });

    // Create the playback loop
    const drumSequencerLoop = new Tone.Loop(() => {
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
            .forEach( async(cell) => {
                console.log(cell.dataset.player);
                switch (cell.dataset.player) {
                    case "seqKick": {
                        drumSeq.player("seqKick").start(now);
                    }
                    break
                    case "seqSnare": {
                        drumSeq.player("seqSnare").start(now);
                    }
                    break
                    case "seqHat": {
                        drumSeq.player("seqHat").start(now);
                    }
                    break
                    case "seqBass": {
                        drumSeq.player("seqBass").start(now);
                    }
                    break
                    case "seqOpenHat": {
                        drumSeq.player("seqOpenHat").start(now);
                    }
                }
            });
    }, ).start(0);
});
