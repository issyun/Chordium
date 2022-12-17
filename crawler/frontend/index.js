const note2number = {
    'B#': 0,
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'Fb': 4,
    'E#': 5,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11,
    'Cb': 11,
};

const number2note_sharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const number2note_flat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const keys = {
    // tonic: [MajorSharp?, MinorSharp?]
    'Cb': [null, null],
    'C': [true, false],
    'C#': [null, true],
    'Db': [false, null],
    'D': [true, false],
    'D#': [null, true],
    'Eb': [false, false],
    'E': [true, true],
    'F': [false, false],
    'F#': [true, true],
    'Gb': [false, null],
    'G': [true, false],
    'G#': [null, true],
    'Ab': [false, null],
    'A': [true, true],
    'A#': [null, null],
    'Bb': [false, false],
    'B': [true, true]
};

function convertChord(s, tonic, isSharp) {
    const chords = s.split(' ');
    console.log(`chords: ${chords}`);
    const converted = [];
    for (const chord of chords) {
        console.log(`chord: ${chord}`);
        let firstDash = 0;
        let secondDash = 0;
        for (const [idx, char] of Object.entries(chord)) {
            if (char == '-' && firstDash == 0) firstDash = parseInt(idx);
            else if (char == '-' && secondDash == 0) secondDash = parseInt(idx);
            if (secondDash != 0) break;
        }
        console.log(`first dash: ${firstDash}`);
        console.log(`second dash: ${secondDash}`);
        console.log(typeof(firstDash), typeof(secondDash));
        const rootRelative = parseInt(chord.slice(firstDash + 1, secondDash));
        console.log(`root relative: ${rootRelative}`);
        const rootAbsolute = (rootRelative + tonic > 11) ? (rootRelative + tonic - 12) : (rootRelative + tonic);
        console.log(`root absolute: ${rootAbsolute}`);
        const rootNote = isSharp ? number2note_sharp[rootAbsolute] : number2note_flat[rootAbsolute];
        console.log(`root note: ${rootNote}`);
        console.log(`converted chord: ${rootNote + chord.slice(secondDash + 1)}`);
        converted.push(rootNote + chord.slice(secondDash + 1));
    }
    return converted;
};

const tonicInput = document.getElementById('tonic');
const tonics = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'Bb', 'B'];
tonics.forEach((tonic) => {
    const option = document.createElement('option');
    option.innerText = tonic;
    tonicInput.appendChild(option);
});

const tonalityInput = document.getElementById('tonality');
document.getElementById('tonic').addEventListener('change', () => {
    let selectDone = false;
    if (keys[tonicInput.value][0] == null) {
        document.getElementById('tonality-major').disabled = true;
    } else {
        document.getElementById('tonality-major').disabled = false;
        tonalityInput.value = 'Major';
        selectDone = true;
    }
    if (keys[tonicInput.value][1] == null) {
        document.getElementById('tonality-minor').disabled = true;
    } else {
        document.getElementById('tonality-minor').disabled = false;
        if (!selectDone) {
            tonalityInput.value = 'Minor';
        }
    }
});

const inputField = document.getElementById('chord-input');

document.getElementById('submit-button').addEventListener('click', () => {
    const isSharp = tonalityInput.value == 'Major' ? keys[tonicInput.value][0] : keys[tonicInput.value][1];
    const converted = convertChord(inputField.value, note2number[tonicInput.value], isSharp);
    let convertedString = '';
    for (chord of converted) convertedString += ' ' + chord;
    document.getElementById('chord-output').innerText = convertedString;
});

