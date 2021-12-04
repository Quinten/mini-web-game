let ctx = undefined;
let noteNodes = undefined;
let index = 0;
let biquadFilter = undefined;
let musicVolume = undefined;
let delayEffect = undefined;
let feedback = undefined;
let delayVolume = undefined;

let initCtx = (bpm = 138) => {
    if (ctx !== undefined && ctx.state === 'running') {
        return;
    }
    ctx = new AudioContext();
    if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
        ctx.sampleRate !== 48000) {
        let buffer = ctx.createBuffer(1, 1, 48000);
        let dummy = ctx.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(ctx.destination);
        dummy.start(0);
        dummy.disconnect();
        ctx.close() // dispose old context
        ctx = new AudioContext();
    }
    biquadFilter = ctx.createBiquadFilter();
    biquadFilter.connect(ctx.destination);
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.value = 920;
    //biquadFilter.gain.value = 25;

    musicVolume = ctx.createGain();
    musicVolume.connect(biquadFilter);
    musicVolume.gain.value = 0.8;

    delayEffect = ctx.createDelay(60 / bpm);
    delayEffect.delayTime.value = 60 / bpm;
    feedback = ctx.createGain();
    feedback.gain.value = 0.25;
    delayEffect.connect(feedback);
    feedback.connect(delayEffect);
    delayVolume = ctx.createGain();
    delayVolume.gain.value = 0.5;
    delayVolume.connect(musicVolume);
    delayEffect.connect(delayVolume);

    noteNodes = [0, 1, 2, 3, 4, 5, 6, 7].map(() => {
        let node = ctx.createGain();
        node.connect(musicVolume);
        node.connect(delayEffect);
        return node;
    });
};

let noteNames = 'AbBCdDeEFgGa';

let playNote = (node, note, start, bpm = 120, shape = 'triangle') => {
    if (node.context.state === 'closed') {
        return;
    }

    let notes = note.split('+');

    let noteName = notes[0].replace(/\d/g, '');
    let length = notes.reduce((l, n) => l + 1 / Number(n.match(/^\d+/g)[0]) * 240 / bpm, 0);
    let octave = notes[0].match(/\d+$/g);
    octave = (octave) ? +octave[0] : 4;

    let noteIndex = noteNames.indexOf(noteName);
    if (noteIndex === -1) {
        // a pause in between the notes
        return length;
    }

    let detune = noteIndex * 100 + 1200 * (octave - 4);

    let o = node.context.createOscillator();
    o.connect(node);

    o.frequency.value = 440;
    o.detune.value = detune;
    o.type = shape;

    node.gain.setValueAtTime(0, start);
    node.gain.linearRampToValueAtTime(0.60, start + length * 0.03);
    node.gain.setValueAtTime(0.56, start + length * 0.24);
    node.gain.setValueAtTime(0.55, start + length * 0.3);
    node.gain.linearRampToValueAtTime(0, start + length * 1.5);

    o.start(start);
    o.stop(start + length * 1.5);

    return length;
};

let preupdate = c => {

    let {component} = c;

    if (!component.play) {
        return;
    }

    let {
        melody,
        bpm = 120,
        loop = false,
        nextNote = 0,
        nextNoteTick = ctx.currentTime,
    } = component;

    initCtx(bpm);

    let anticipate = 60 / bpm * 7;

    if (ctx.currentTime > nextNoteTick + .35) {
        nextNote = 0;
        nextNoteTick = ctx.currentTime;
    }
    while (nextNoteTick < ctx.currentTime + anticipate) {
        let noteLength = playNote(noteNodes[index], melody[nextNote], nextNoteTick, bpm);
        index = (index + 1) % noteNodes.length;
        nextNote = (nextNote + 1) % melody.length;
        nextNoteTick += noteLength;
        if (nextNote === 0) {
            if (!loop) {
                component.play = false;
                break;
            }
        }
    }
    component.nextNote = nextNote;
    component.nextNoteTick = nextNoteTick;
};

export default Object.freeze({
    preupdate,
    initCtx
});
