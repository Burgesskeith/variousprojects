// switch between home page and cart page
const goHome = document.getElementById("home");
const homePage = document.getElementById("homeContainer");
const goCart = document.getElementById("cart");
const cartPage = document.getElementById("cartContainer");
const checkOutPage = document.getElementById("checkOut");
let carts = document.querySelectorAll(".add-cart");

cartPage.style.display = "none";
checkOutPage.style.display = "none";

home.addEventListener("click", (e) => {
  homePage.style.display = "flex";
  cartPage.style.display = "none";
  checkOutPage.style.display = "none";
});
goCart.addEventListener("click", (e) => {
  homePage.style.display = "none";
  cartPage.style.display = "block";
  checkOutPage.style.display = "none";
  // console.log("Cart was clicked");
  prepareData(products);
  addcheckBtn();
});

let products = [
  {
    name: "Blue Dot Tie",
    tag: "bluedot",
    desc: "Blue tie with nice dots",
    price: 15,
    inCart: 0,
  },
  {
    name: "Yellow Pattern Tie",
    tag: "yellowpattern",
    desc: "Yellow pattern that stands out",
    price: 20,
    inCart: 0,
  },
  {
    name: "Paisley Tie",
    tag: "paisley",
    desc: "Be different with this paisley tie",
    price: 10,
    inCart: 0,
  },
  {
    name: "Maroon Dot Tie",
    tag: "maroondot",
    desc: "Formal tie for the executive",
    price: 20,
    inCart: 0,
  },
];

// keep the product numbers in sync with local storage
const onLoadCartNumbers = () => {
  let productNumbers = localStorage.getItem("updateCartNumber");
  if (productNumbers) {
    document.getElementById("cartNum").innerText = productNumbers;
    for (let i = 0; i < localStorage.length; i++) {
      let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
      for (j = 0; j < products.length; j++) {
        if (x.tag === products[j].tag) {
          products[j].inCart = x.inCart;
        }
      }
    }
  }
};

// add product count to cart button
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    let qtySelected = document.getElementById("qt" + (i + 1));
    qtySelected = qtySelected.value;
    if (!qtySelected) {
      qtySelected = 1;
    }
    updateCartNumber(products[i], qtySelected);
  });
}

const updateCartNumber = (prod, qty) => {
  let productNumbers = localStorage.getItem("updateCartNumber");
  let cartTarget = document.getElementById("cartNum");
  cartTarget.innerText = productNumbers;
  productNumbers = parseInt(productNumbers);
  qty = parseInt(qty);

  if (productNumbers) {
    localStorage.setItem("updateCartNumber", productNumbers + qty);
    cartTarget.innerText = productNumbers + qty;
    products.inCart = productNumbers + qty;
  } else {
    localStorage.setItem("updateCartNumber", 1);
    cartTarget.innerText = 1;
    products.inCart = 1;
  }
  prod.inCart = prod.inCart + qty;
  saveProduct(prod);
};

// Save product to local storage & add details to cart
const saveProduct = (prod) => {
  let item = prod.tag;
  localStorage.setItem(item, JSON.stringify(prod));
};

// prepare data for building checkout page
const prepareData = (result) => {
  let x = document.getElementById("cartItems");
  x.innerHTML = buildCheckoutPage(result);
  x.addTotal = addTotal(result);
  addcheckBtn();
};

// build the checkout page using numbers in object
const buildCheckoutPage = (result) => {
  return result
    .map((item) => {
      while (item.inCart !== 0) {
        return `<tr id = "${item.tag}">
        <td>${item.name}</td>
        <td>$${item.price}.00</td>
        <td>${item.inCart}</td>
        <td>$${item.price * item.inCart}.00</td>
        <td><button onclick = "removeRow(${item.tag});">delete</button></td>
    </tr>`;
      }
    })
    .join("");
};

//  Add the total row and add total.
const addTotal = (result) => {
  let total = 0;
  for (let i = 0; i < result.length; i++) {
    total += result[i].inCart * result[i].price;
  }
  // for (let i of Object.values(result)) {
  //   // this does not work - the last count is NaN
  //   total = total + i.inCart * i.price;
  // }
  if (total > 0) {
    let table = document.getElementById("cartTable");
    let totRow = table.insertRow(-1);
    let newCell1 = totRow.insertCell(0);
    let totText = document.createTextNode("");
    newCell1.appendChild(totText);
    let newCell2 = totRow.insertCell(0);
    totText = document.createTextNode("");
    newCell2.appendChild(totText);
    let newCell3 = totRow.insertCell(2);
    totText = document.createTextNode("TOTAL:");
    newCell3.appendChild(totText);

    let newCell4 = document.createElement("td");
    newCell4.setAttribute("id", "totalAmount");
    newCell4.innerText = `$${total}.00`;
    totRow.appendChild(newCell4);

    // let newCell4 = totRow.insertCell(3);
    // totText = document.createTextNode(`$${total}.00`);
    // newCell4.appendChild(totText);
  }
};

//  Add checkout button to checkout page below the table
const addcheckBtn = () => {
  let btnExists = document.getElementById("checkoutButton");
  if (!btnExists) {
    const afterTable = document.getElementById("cartMain");
    const btn = document.createElement("button");
    btn.setAttribute("id", "checkoutButton");
    btn.setAttribute("onclick", "clearCart();");
    btn.innerText = "Checkout";
    afterTable.appendChild(btn);
  }
};

const clearCart = () => {
  localStorage.clear();
  cartPage.style.display = "none";
  checkOutPage.style.display = "block";
  setTimeout(() => {
    location.reload();
  }, 4000);
};

const removeRow = (tag) => {
  let cartButton = document.getElementById("cart");
  cartButton.addEventListener("click", (e) => {
    location.reload();
  });
  let row = document.getElementById(tag.id);
  let table = document.getElementById("cartItems");

  // remove row from checkout
  table.removeChild(row);

  // remove item from local storage & update total in cart
  let localCartNum = localStorage.getItem("updateCartNumber");
  localCartNum = parseInt(localCartNum);
  let obj = JSON.parse(localStorage.getItem(tag.id));
  let val = obj.inCart;

  let toBeRemoved = val * obj.price;
  let NewVal = localCartNum - val;
  localStorage.setItem("updateCartNumber", NewVal);

  localStorage.removeItem(tag.id);

  let cartButtonNum = document.getElementById("cartNum");
  console.log(`Showing in cart: ${cartButtonNum}`);
  cartButtonNum.innerText = NewVal;

  // set products inCart in products object to zero
  products.find((element) => {
    if ((element.tag = tag.id)) {
      element.inCart = 0;
    }
  });

  // update total in the table.
  let totVal = document.getElementById("totalAmount");
  let currTot = totVal.innerText;
  currTot = parseInt(currTot.slice(1));
  console.log(toBeRemoved, typeof toBeRemoved);
  console.log(currTot, typeof currTot);
  totVal.innerText = `$${currTot - toBeRemoved}.00`;
};

onLoadCartNumbers();
