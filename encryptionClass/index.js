/*
    Demonstrates the use of encryption and decryption on a piece of text.
    Also demonstrates a few simple javascript string methods.
*/

  let textToEncrypt =   "Do not go gentle into that good night,\n\
Old age should burn and rave at close of day;\n\
Rage, rage against the dying of the light.\n\
\n\
Though wise men at their end know dark is right,\n\
Because their words had forked no lightning they\n\
Do not go gentle into that good night.\n\
\n\
Good men, the last wave by, crying how bright\n\
Their frail deeds might have danced in a green bay,\n\
Rage, rage against the dying of the light."

class Encryption {
  constructor(message) {
    (this.message = message),
      (this.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),
      (this.cipher = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm");
  }


  rot13Encode() {
    return this.message.replace(
      /[a-z]/gi,
      (elem) => this.cipher[this.alpha.indexOf(elem)]
    );
  }
  rot13Decode(coded) {
    return coded.replace(
      /[a-z]/gi,
      (elem) => this.alpha[this.cipher.indexOf(elem)]
    );
  }
  reverseTheString() {
    return this.message.split("").reverse().join("");
  }
  allCapitals() {
    return this.message.toUpperCase();
  }
  allLowerCase() {
    return this.message.toLowerCase();
  }
  firstLetterUpperCase() {
    let newStr = this.message.replace(/\n/g, " ");
    let returnStr = newStr.toLowerCase().split(" ");
    for (var i = 0; i < returnStr.length; i++) {
      returnStr[i] =
        returnStr[i].charAt(0).toUpperCase() + returnStr[i].slice(1);
    }
    return returnStr.join(" ");
  }
  sentenceCase() {
    return this.message.charAt(0).toUpperCase() + this.message.slice(1);
  }
}

let n = new Encryption(
  textToEncrypt
);

console.log("Here's the text we will encrypt: \n\n");
console.log(textToEncrypt);
console.log("-------------------\n");
console.log("Here's the textencoded: \n\n");
let coded = n.rot13Encode();
console.log(coded);
console.log("-------------------\n");
console.log("here's the text decoded: \n\n");
let decoded = n.rot13Decode(coded);
console.log(decoded);
console.log("-------------------\n");
console.log("Here's the text string reversed: \n\n");
let reverse = n.reverseTheString();
console.log(reverse);
console.log("-------------------\n");
console.log("Here's the text in all capitals: \n\n");
let upper = n.allCapitals();
console.log(upper);
console.log("-------------------\n");
console.log("Here's the text in lower case: \n\n");
let lower = n.allLowerCase();
console.log(lower);
console.log("-------------------\n");
console.log("Here's the text with the first letter in uppercase and the rest lowercase: \n\n");
let firstUp = n.firstLetterUpperCase();
console.log(firstUp);
console.log("-------------------\n");
console.log("Here's the text in sentence case: \n\n");
let sentence = n.sentenceCase();
console.log(sentence);
