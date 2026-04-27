//importing necessary modules
import * as MusicTools from "/pinky/MusicTools.js"; //contains functions like
//initiating context
let ctx = new Tone.Context();
//setting up masterGain
const masterGain = new Tone.Gain().toDestination();
masterGain.gain.value = -70;
masterGain.context = ctx;
//now variable is useful
let now = ctx.currentTime;
//grabbing CSS info
const controls = document.createElement("div");
Tone.Transport.bpm.value = 100;
//stylesheet info necessary to create button controls for sequencers
controls.className = "controls";


const filter = new Tone.Filter({
    type: "lowpass",
    cutoff: 9000,
    rolloff: -12,
}).connect(masterGain);


//create synth
const synth = new Tone.PolySynth({
    voice: Tone.FMSynth,
    oscillator: {
        type: "sawtooth",
        modulationType: "sawtooth",
        harmonicity: 1.5,
        polyphony: 8,
    },
    envelope: {
        mode: "amplitude",
        attack: 0.01,
        decay: 0.5,
        sustain: 1,
        release: 0.25,
    },
    volume: -70

}).connect(filter);




const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const octaves = [4,5];

octaves.forEach((octave) => {
    notes.forEach((note) => {
    const key = document.createElement("div");
    const isBlackKey = note.includes("#");
    key.className = isBlackKey ? "key black-key" : "key white-key";

    const playNote = () => {
        synth.triggerAttackRelease(`${note}${octave}`, synth.options.envelope.attack + synth.options.envelope.release);
    };
    key.addEventListener("mousedown", async()=>{
        await playNote();
    });


    piano.appendChild(key);
    });
});

    document.addEventListener("keypress",  async(e) => {
        switch (e.code) {
            case "KeyZ": {
                await synth.triggerAttackRelease("C4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyS": {
                await synth.triggerAttackRelease("C#4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyX": {
                await synth.triggerAttackRelease("D4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyD": {
                await synth.triggerAttackRelease("D#4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyC": {
                await synth.triggerAttackRelease("E4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyV": {
                await synth.triggerAttackRelease("F4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyG": {
                await synth.triggerAttackRelease("F#4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyB": {
                await synth.triggerAttackRelease("G4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyH": {
                await synth.triggerAttackRelease("G#4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyN": {
                await synth.triggerAttackRelease("A4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyJ": {
                await synth.triggerAttackRelease("A#4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyM": {
                await synth.triggerAttackRelease("B4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyZ": {
                await synth.triggerAttackRelease("C4", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Comma": {
                await synth.triggerAttackRelease("C5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyAQ": {
                await synth.triggerAttackRelease("C5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Digit2": {
                await synth.triggerAttackRelease("C#5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyW": {
                await synth.triggerAttackRelease("D5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Digit3": {
                await synth.triggerAttackRelease("D#5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyE": {
                await synth.triggerAttackRelease("E5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyR": {
                await synth.triggerAttackRelease("F5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Digit5": {
                await synth.triggerAttackRelease("F#5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
                case "KeyT": {
                await synth.triggerAttackRelease("G5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Digit6": {
                await synth.triggerAttackRelease("G#5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyY": {
                await synth.triggerAttackRelease("A5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "Digit7": {
                await synth.triggerAttackRelease("A#5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
            case "KeyU": {
                await synth.triggerAttackRelease("B5", synth.options.envelope.attack + synth.options.envelope.release);
            }
                break;
        }
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
    let sliderValue = event.target.value;
    document.querySelector("#attackLabel").innerText = sliderValue + `sec.`
    sliderValue = Number(sliderValue); //sec
    synth.set({
        envelope: {
            attack: sliderValue,
        }
    })
    console.log(synth.options.envelope.attack);
});

//decay slider
    document.querySelector("#decaySlider").addEventListener("input", (event) => {
        console.log(synth.options.envelope.decay);
        let sliderValue = event.target.value;
        document.querySelector("#decayLabel").innerText = sliderValue + `sec.`
        sliderValue = Number(sliderValue); //sec
        synth.set({
            envelope: {
                decay: sliderValue,
            }
        })
        console.log(synth.options.envelope.decay);
    });

// sustain slider
    document.querySelector("#susSlider").addEventListener("input", (event) => {
        console.log(synth.options.envelope.sustain);
        let sliderValue = event.target.value;
        document.querySelector("#susLabel").innerText = sliderValue + `sec.`
        sliderValue = Number(sliderValue); //sec
        synth.options.envelope.sustain = sliderValue;
        console.log(sliderValue);
    });
//release slider
    document.querySelector("#relSlider").addEventListener("input", (event) => {
        console.log(synth.options.envelope.release);
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

//bpm slider
document.querySelector("#tempoSlider").addEventListener("input", (event) => {
    let sliderValue = event.target.value;
    document.querySelector("#tempoLabel").innerText = sliderValue + `bpm`
    sliderValue = Number(sliderValue); //dB
    Tone.Transport.bpm.rampTo (sliderValue);
    console.log(Tone.Transport.bpm.value);
});
    document.addEventListener("DOMContentLoaded", () => {
        const seq = new Tone.PolySynth({
            voice: Tone.DuoSynth,
            oscillator: {
                type: "triangle",
                modulationType: "square",
            },
            filter: {
                type: "lowpass",
                cutoff: 1000,
                rolloff: -24
            },
            volume: -0.5
        }).connect(masterGain);

        // Create a 16-step sequencer with 8 different notes
        const sequencerSteps = 16;
        const seqNotes = ["C3", "B2", "A#2", "A2", "G#2", "G2", "F#2", "F2", "E2", "D#2", "D2", "C#2", "C2" ];

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
            .querySelector("#startButton")
            .addEventListener("click", () => {
                Tone.start();
                Tone.Transport.start();
            });

        document.querySelector("#stopButton").addEventListener("click", () => {
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

    //creating drum sequencer
document.addEventListener("DOMContentLoaded", () => {
    const drumSeq = new Tone.Players({
        seqHat: "./Sounds/hat.wav",
        seqSnare: "./Sounds/snare.wav",
        seqBass: "./Sounds/bass.wav",
        seqOpenHat: "./Sounds/open hat.wav",
        seqKick: "./Sounds/kick.wav",
        volume: 0
    }).connect(masterGain);

    // Create a 16-step sequencer with drum sounds
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
                drumSeq.player(player).start(step);
                console.log(cell.dataset.player);
            });

            rowElement.appendChild(cell);
        }
        sequencerGrid.appendChild(rowElement);
    });

    // Set up control buttons for sequencers
    document
        .getElementById("drumStartButton").addEventListener("click", () => {
            Tone.start();
            Tone.Transport.start();
        });

    document.getElementById("drumStopButton").addEventListener("click", () => {
        Tone.Transport.stop();
    });

    // Create the playback loop
    const drumSequencerLoop = new Tone.Loop((time) => {
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
            .forEach( (cell) => {
                console.log(cell.dataset.player);
                switch (cell.dataset.player) {
                    case "seqKick": {
                        console.log(time);
                        drumSeq.player("seqKick").start(time);
                    }
                    break
                    case "seqSnare": {
                        drumSeq.player("seqSnare").start(time);
                    }
                    break
                    case "seqHat": {
                        drumSeq.player("seqHat").start(time);
                    }
                    break
                    case "seqBass": {
                        drumSeq.player("seqBass").start(time);
                    }
                    break
                    case "seqOpenHat": {
                        drumSeq.player("seqOpenHat").start(time);
                    }
                }
            });
    }, "16n").start(0);
});

