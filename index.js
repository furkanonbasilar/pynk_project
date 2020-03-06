const mainContent = document.getElementById("container");
const sideBar = document.getElementById("sidebar");
const openButton = document.getElementById("open-menu");
const closeButton = document.getElementById("close-menu");
const form = document.getElementById("form");
const priceInput = document.getElementById("price");
const sidebarList = document.getElementById("sidebar-list");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const modalButton = document.getElementById("modal-button");
const itemInput = document.getElementById("item-input");
const addButton = document.querySelector(".add-button");

const alertMessage = document.createElement("p");

const MIN_VALUE = 1000;
const MAX_VALUE = 2000;

let enteredPrice;
let itemName;

const itemList = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8"
];

// Modal
modalButton.onclick = () => openModal();
backdrop.onclick = () => closeModal();

openModal = () => {
  modal.style.display = "flex";
  backdrop.style.display = "block";
};

closeModal = () => {
  modal.style.display = "none";
  backdrop.style.display = "none";
};

itemInput.onchange = event => {
  itemName = event.target.value;
};

addButton.addEventListener("click", () => {
  if (itemName) {
    itemList.push(itemName);
  }
  itemInput.value = "";
  itemName = "";
});

// Open menu
openButton.onclick = () => {
  sideBar.style.width = "187px";
  mainContent.style.marginLeft = "187px";
  sidebarList.style.visibility = "visible";
  openButton.disabled = true;
  openButton.className = "active";

  itemList.forEach(item => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    sidebarList.appendChild(li);
  });
};

// Close menu
closeButton.onclick = () => {
  sideBar.style.width = "0";
  mainContent.style.marginLeft = "0";
  sidebarList.style.visibility = "hidden"; // in order to remove flash on items
  sidebarList.textContent = "";
  openButton.disabled = false;
  openButton.classList.remove("active");
};

// Input Handling
priceInput.onchange = event => {
  enteredPrice = event.target.value; // $55,555 && 55555

  let regex = /^\$(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\,\d*)?$/g;
  if (enteredPrice.match(regex)) {
    let priceWithoutDollar = enteredPrice.substring(1, enteredPrice.length); // 55,555 string
    priceWithoutDollar = parseFloat(priceWithoutDollar.replace(/,/g, ".")); // 55555 number

    priceInput.value = enteredPrice; // $55,555

    enteredPrice = priceWithoutDollar; // 55.555 number
  }
};

// Alert Handling
form.addEventListener("submit", event => {
  event.preventDefault();
  if (enteredPrice >= MIN_VALUE && enteredPrice <= MAX_VALUE) {
    alertMessage.id = "success-message";
    alertMessage.textContent = "Successfully saved!";
    form.insertBefore(alertMessage, form.children[2]);
  } else if (enteredPrice > MAX_VALUE) {
    alertMessage.id = "error-message";
    alertMessage.textContent = `Price can't be above $${MAX_VALUE}`;
    form.insertBefore(alertMessage, form.children[2]);
  } else if (enteredPrice < MAX_VALUE) {
    alertMessage.id = "error-message";
    alertMessage.textContent = `Price can't be below $${MIN_VALUE}`;
    form.insertBefore(alertMessage, form.children[2]);
  }
});
