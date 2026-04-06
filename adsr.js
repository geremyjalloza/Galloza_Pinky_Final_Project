export class Trigger {
    constructor(myAudioContext, dest, file){
        this.ctx = myAudioContext;
        this.gain = new GainNode(this.ctx);
        this.gain.connect(this.ctx.destination);
        this.file = fetch (file);
        this.arrayBuff = file.arrayBuffer();
        this.audioBuffer = ctx.decodeAudioData(this.arrayBuff);


    }
}

