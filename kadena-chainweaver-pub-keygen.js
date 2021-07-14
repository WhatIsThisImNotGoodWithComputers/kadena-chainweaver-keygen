"use strict";

const bip39 = require('bip39');
const cardanoCryptoLib = require('cardano-crypto.js');
const argv = require('minimist')(process.argv.slice(2));

require('console-stamp')(console, 'yyyy/mm/dd HH:MM:ss.l');

const sampleHardenedIndex = 0x80000000;
const index = 0x00;

console.log('STARTING...');
console.log(argv);

const m = argv.m ? argv.m.toLowerCase() : null;

if (m) {
    console.log(`Checking mnemonic ${m}...`);
} else {
    console.log('Give me a mnemonic phrase (-m)...');
    return;
}

console.log('Public key for menomic is ' + getPublicKeyOneForMnemonic(m));

function getPublicKeyOneForMnemonic(mnemonic) {

    const seed = Buffer.from(bip39.mnemonicToSeedSync(mnemonic), 'hex');
    const rootKeyPair = cardanoCryptoLib._seedToKeypairV1(seed);

    const rootBuffer = Buffer.from(rootKeyPair);
    const xprv = cardanoCryptoLib.derivePrivate(rootBuffer, sampleHardenedIndex | index, 2);
    const xpub = new Buffer(xprv.slice(64, 96));

    return xpub.toString('hex');
}
