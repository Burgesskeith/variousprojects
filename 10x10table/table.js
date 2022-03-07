// Build 10 x 10 table

function tensTable(cols) {
  const myTable = document.getElementById("table");

  let newTab = document.createElement("table");
  let tBody = document.createElement("tBody");
  let td = document.createElement("td");
  let tRow = document.createElement("tr");
  let cellNum;

  for (let i = 0; i <= cols - 1; i++) {
    tRow = document.createElement("tr");

    for (let j = 1; j <= 10; j++) {
      td = document.createElement("td");

      j % 10 === 0
        ? (cellNum = document.createTextNode(`${(i + 1) * 10}`))
        : (cellNum = document.createTextNode(i + "" + j));

      td.appendChild(cellNum);
      tRow.appendChild(td);
    }
    tBody.appendChild(tRow);
  }

  newTab.appendChild(tBody);
  myTable.appendChild(newTab);

  newTab.style.width = "80%";
  newTab.style.border = "1px solid #ccc";
  newTab.style.boxShadow = "2px 2px 4px #ccc";
  newTab.style.padding = "0.5em";
  newTab.style.margin = "5% auto";
  tBody.style.color = "#333";
  tBody.style.textAlign = "center";
}

tensTable(10);
