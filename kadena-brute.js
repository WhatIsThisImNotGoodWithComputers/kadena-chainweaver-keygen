"use strict";

const bip39 = require('bip39');
const cardanoCryptoLib = require('cardano-crypto.js');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

require('console-stamp')(console, 'yyyy/mm/dd HH:MM:ss.l');

const sampleHardenedIndex = 0x80000000;
const index = 0x00;

console.log('STARTING...');
console.log(argv);

const p = argv.p ? argv.p.toLowerCase() : null;

if (p) {
    console.log(`Checking for public key ${p}`);
} else {
    console.log('No public key to check given (-p), hope you know what you\'re doing...');
}

const f = argv.f ? argv.f : null;
if (!f) {
    console.log('No wordlist file given... (-f) I\'m gonna need some mnemonic words...');
    return;
} else {
    console.log(`Using wordlist ${f}.`);
    console.log(`Words are not checked for validity. Longer wordlists result in longer processing.`)
}

const startUpDelay = 5000;
console.log(`Starting in 5s...`);

setTimeout(async () => {
    await start();
}, startUpDelay);

async function start() {
    let rawdata = fs.readFileSync(f).toString('utf-8');
    const words = rawdata.split("\n");

    if (words[words.length - 1] === '') {
        words.pop()
    }

    if (words.length >= 12) {
        console.log(`Running with ${words.length} words.`)
    } else {
        console.log('Failed to parse words or not enough words, 12 minimum.');
        return;
    }

    let counterArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let running = true;
    while (running) {

        let mnemonic = '';
        for (let i = 11; i > 0; i--) {
            if (counterArray[i] === words.length-1) {
                counterArray[i] = 0;
            } else {
                counterArray[i]++;
                break;
            }
        }

        if (counterArray[0] === words.length-1) {
            running = false;
        }

        for (const c of counterArray) {
            mnemonic = mnemonic + ' ' + words[c];
        }
        mnemonic = mnemonic.trim();

        const pubkey = getPublicKeyOneForMnemonic(mnemonic);

        if (p) {
            if (pubkey === p) {
                console.log(`Your public key ${p} has been found.`);
                console.log(`Mnemonic is ${mnemonic}.`);
                return;
            }
        }
    }

    console.log('FINISHED testing, no match :(');
}

function getPublicKeyOneForMnemonic(mnemonic) {

    const seed = Buffer.from(bip39.mnemonicToSeedSync(mnemonic), 'hex');
    let rootKeyPair = cardanoCryptoLib._seedToKeypairV1(seed);

    const rootBuffer = Buffer.from(rootKeyPair);
    const xprv = cardanoCryptoLib.derivePrivate(rootBuffer, sampleHardenedIndex | index, 2);
    const xpub = new Buffer(xprv.slice(64, 96));

    console.log(`${xpub.toString('hex')} - ${mnemonic}`);

    return xpub.toString('hex');
}
