# kadena-chainweaver-keygen

Two scripts, one to quickly generate a 1st public key from a mnemonic phrase which is compatible with Kadena Chainweaver.

Usage: 

```
npm install
nodejs kadena-chainweaver-pub-keygen.js -m "abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident access"
```

Output

```
[2021/07/14 22:28:53.446] [LOG]    Checking mnemonic abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident access...
[2021/07/14 22:28:53.501] [LOG]    Public key for menomic is c2166c60702ab6c226570a474e25173e67567d4b311fdcef715cc0ba7de59f53
 ```

Second one to bruteforce a known 1st public key from mnemonic words. The more words you put in the txt file, the longer it takes obviously.
Duplicates are included. This is mainly meant for the use case where you know your 12 words, you know your public key but you may have swapped some words or
 duplicated a word by accident. It can be used to bruteforce any key but you will have to wait a long time :)

Usage:

```
npm install
nodejs kadena-brute.js -f example-words.txt -p c2166c60702ab6c226570a474e25173e67567d4b311fdcef715cc0ba7de59f53
```

Output:

```
...
[2021/07/14 22:31:25.168] [LOG]    d54358a633cb13f93f621549df4fc028c7d98562fd4c8d3232519f0f7d8b690b - abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident absurd
[2021/07/14 22:31:25.172] [LOG]    481af915ecbeed4b2e288109a1c59cec3c9b7bf777163931bb27edf672b36e57 - abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident abuse
[2021/07/14 22:31:25.176] [LOG]    c2166c60702ab6c226570a474e25173e67567d4b311fdcef715cc0ba7de59f53 - abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident access
[2021/07/14 22:31:25.176] [LOG]    Your public key c2166c60702ab6c226570a474e25173e67567d4b311fdcef715cc0ba7de59f53 has been found.
[2021/07/14 22:31:25.176] [LOG]    Mnemonic is abandon abandon abandon abandon abandon abandon abandon abandon abandon abuse accident access.
```

## Credits

I didn't use https://github.com/kadena-io/cardano-crypto.js/tree/jam%40chainweaver-keygen but it showed me the proper path to take from mnemonic to Kadena
 public key.
