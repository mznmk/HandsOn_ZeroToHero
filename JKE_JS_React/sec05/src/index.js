'use strict'

//
// add ToDo
//

// [ add event ]
document.getElementById("add-button")
        .addEventListener("click", () => createTodo());

// [ create ToDo event ]
const createTodo = () => {
  // [ get ToDo name ]
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // [ guard clause ]
  if (inputText == "")
    return;

  // [ create inconplete ToDo ]
  createIncompleteTodo(inputText);
}

// -------------------------------------------------------------------------- //

//
// incomplete ToDo
//

// [ create incomplete ToDo event ]
const createIncompleteTodo = (inputText) => {
  // [ create HTML tag ]
  // < li > < div > < p >
  const li = createLi();
  const div = createDiv("list-row");
  const p = createP(inputText);
  // < button (complete) >
  const buttonComplete = createButton("完了");
  buttonComplete.addEventListener("click", () => {
    deleteIncompleteTodo(buttonComplete.closest("li"));
    createCompleteTodo(inputText);
  });
  // < button (delete) >
  const buttonDelete = createButton("削除");
  buttonDelete.addEventListener("click", () => {
    deleteIncompleteTodo(buttonDelete.closest("li"));
  });

  // [ add event ]
  div.appendChild(p);
  div.appendChild(buttonComplete);
  div.appendChild(buttonDelete);
  li.appendChild(div);
  document.getElementById("incomplete-list").appendChild(li);
};

// [ delete ToDo event ]
const deleteIncompleteTodo = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// -------------------------------------------------------------------------- //

//
// complete ToDo
//

// [ create complete ToDo event ]
const createCompleteTodo = (inputText) => {
  // [ create HTML tag ]
  // < li > < div > < p >
  const li = createLi();
  const div = createDiv("list-row");
  const p = createP(inputText);
  // < button (back) >
  const buttonBack = createButton("戻す");
  buttonBack.addEventListener("click", () => {
    deleteCompleteTodo(buttonBack.closest("li"));
    createIncompleteTodo(inputText);
  });
  // < button (delete) >
  const buttonDelete = createButton("削除");
  buttonDelete.addEventListener("click", () => {
    deleteCompleteTodo(buttonDelete.closest("li"));
  });

  // [ add event ]
  div.appendChild(p);
  div.appendChild(buttonBack);
  div.appendChild(buttonDelete);
  li.appendChild(div);
  document.getElementById("complete-list").appendChild(li);
};

// [ delete complete ToDo event]
const deleteCompleteTodo = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

// -------------------------------------------------------------------------- //

//
// helper functions
//

const createLi = () => {
  const li = document.createElement("li");
  return li;
};

const createDiv = (className) => {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

const createP = (innerText) => {
  const p = document.createElement("p");
  p.innerText = innerText;
  return p;
}

const createButton = (innerText) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  return button;
}
