function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  let newItem = db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    let text = items.length + " items";
    document.querySelector(".items-left").innerHTML = text;
    generateItems(items);
  });
}

getItems();

function generateItems(items) {
  let itemsHtml = "";

  items.forEach((item) => {
    itemsHtml += `
    <div class="todo-item">
            <div class="check">
              <div data-id="${item.id}" class="check-mark ${
      item.status == "completed" ? "checked" : ""
    }" data->
                <img src="images/icon-check.svg" alt="" />
              </div>
            </div>
            <div class="todo-text ${
              item.status == "completed" ? "checked" : ""
            }"> ${item.text}</div>
          </div>
    `;
  });

  document.querySelector(".todo-items").innerHTML = itemsHtml;
  createEventListeners();
}

function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id);
    });
  });
}

function markCompleted(id) {
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().status == "active") {
        item.update({
          status: "completed",
        });
      } else {
        item.update({
          status: "active",
        });
      }
    }
  });
}
