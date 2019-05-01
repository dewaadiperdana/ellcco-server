const fs = require('fs');
const randomstring = require('randomstring');
const base64 = require('base-64');

const secret = randomstring.generate(32);
const encodeSecret = base64.encode(secret);

try {
  fs.appendFileSync('.env', `\nSECRET_KEY=${encodeSecret}`);
  console.log('Secret key successfully generated');
} catch (error) {
  throw error;
}