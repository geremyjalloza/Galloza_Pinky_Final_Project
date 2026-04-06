/**
 * My Special Music Tools
 * @module MusicTools
 */
/**
 * converts linear amp to decibels Full Scale
 * @param {number} amp - linear amplitude
 * @returns {number} decibels Full Scale
 */


export function atodb(amp) {
    return 20 * Math.log10(amp);
}

/**
 * Converts decibels to linear amplitude
 * @param {number} db - decibels full scale (dbFS)
 * @returns {number} linear amplitude
 */

/**
 * Detune function
 * @param db
 * @returns {number}
 */

export function detune(freq) {
    return freq - 20
}
export function dbtoa(db) {
    return 10 ** (db/20);
}
//the tuning in Hz of A4 (4 means octave desig.)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tuningRef = 440
/**
 * Converts MIDI to frequency
 */

export function mtof (midi) {
    return tuningRef * 2 ** ((midi-69)/12);
}

/**
 * Converts frequency to MIDI
 */

export function ftom (freq) {
    return Math.log2(freq/tuningRef) * 12 + 69
}


/*export function changeAttack () {
    this.attack.setValueAtTime(this.attack, now)
    let now = ctx.currentTime;
    let sliderValue = event.target.value;
    document.querySelector("#attackLabel").innerText = sliderValue + `sec`;

}*/