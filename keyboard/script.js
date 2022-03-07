/*  Keith Burgess
 - Identify the key that was pressed (on key up)
 - map the key to the character 
 - Display the charcter in the display.
  Version 1.0
*/

let disp = document.getElementById("display");
let tx = "";
let num = 0;

const escPress = () => {
  tx = "";
  disp.innerText = "";
};
const txtBtPress = (btn) => {
  tx += btn;
  disp.innerText = tx;
};
const numBtPress = (num) => {
  tx += num;
  disp.innerText = tx;
};
const delPress = (num) => {
  tx = tx.slice(0, tx.length - 1);
  disp.innerText = tx;
};
