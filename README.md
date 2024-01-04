## Generating RSA Key Pair

```
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
	modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
})

console.log(Buffer.from(publicKey).toString('base64'))
console.log(Buffer.from(privateKey).toString('base64'))
```
