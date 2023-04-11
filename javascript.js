let myLibrary = [];
const display = document.querySelector(".display");
const addBookButton = document.querySelector("#add");
const addBookCard = document.querySelector(".add-book-card");
const backdrop = document.querySelector(".backdrop");
const backdrop2 = document.querySelector(".backdrop2");
const backdrop3 = document.querySelector(".backdrop3");
const card = document.querySelectorAll(".card");
const information = document.querySelector(".information");
let newBookAdded;
let i = myLibrary.length;
let j = 0;
let currentNum;
function Book(number, title, author, alreadyread, pages, url) {
  this.number = number;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.alreadyread = alreadyread;
  this.url = url;
}
function newBook(number) {
  this.number = number;
}
newBook.prototype = Object.create(Book.prototype);

const theHobbit = new Book(
  0,
  "The Hobbit",
  "JRR Tolkien",
  190,
  296,
  "resources/hobbit.jpg"
);
const harry = new Book(
  1,
  "Harry Potter and the Prisoner of Azkaban",
  "JK Rowling",
  100,
  400,
  "resources/R.jpg"
);
const throne = new Book(
  2,
  "Game of Thrones",
  "George RR Martin",
  504,
  504,
  "resources/songoficeandfire.png"
);
function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(theHobbit);
addBookToLibrary(harry);
addBookToLibrary(throne);

myLibrary.forEach(function (e) {
  let div = document.createElement("div");
  let cardWrap = document.createElement("div");
  let cardFoot = document.createElement("div");
  let progressText = document.createElement("div");
  let alreadyreadText = document.createElement("input");
  let progress = document.createElement("progress");
  let buttonWrap = document.createElement("div");
  let plusPage = document.createElement("div");
  let minusPage = document.createElement("div");
  let removeBook = document.createElement("div");
  let infoBook = document.createElement("div");
  let editBook = document.createElement("div");
  let bookButtonsWrap = document.createElement("div");

  progressText.classList.add("progresstext");
  alreadyreadText.setAttribute("type", "number");
  alreadyreadText.setAttribute("value", `${parseInt(e.alreadyread)}`);
  alreadyreadText.classList.add("alreadyreadtext");
  alreadyreadText.setAttribute("max", `${e.pages}`);

  editBook.classList.add("edit");
  removeBook.classList.add("remove");
  infoBook.classList.add("info");
  bookButtonsWrap.classList.add("buttonsbook");
  bookButtonsWrap.appendChild(infoBook);
  bookButtonsWrap.appendChild(editBook);
  bookButtonsWrap.appendChild(removeBook);

  plusPage.classList.add("plus");
  minusPage.classList.add("minus");
  buttonWrap.classList.add("buttonsfoot");
  buttonWrap.appendChild(plusPage);
  buttonWrap.appendChild(minusPage);

  progress.setAttribute("max", `${e.pages}`);
  progress.setAttribute("value", `${e.alreadyread}`);
  cardWrap.classList.add("cardwrap");
  cardFoot.classList.add("cardfoot");
  div.classList.add("card");
  infoBook.setAttribute("number", `${myLibrary.indexOf(e)}`);
  removeBook.setAttribute("number", `${myLibrary.indexOf(e)}`);
  cardWrap.setAttribute("number", `${myLibrary.indexOf(e)}`);
  j++;
  let text = document.createElement("div");
  text.classList.add("text");
  cardWrap.appendChild(bookButtonsWrap);
  cardWrap.appendChild(div);
  display.appendChild(cardWrap);
  div.appendChild(text);
  text.setAttribute(
    "style",
    `grid-area: 2 / 2 / 3 / 3;background-image: url(${e.url}); color:transparent;`
  );
  for (let key in e) {
    let titles = document.createElement("div");
    let subtext = document.createElement("div");
    titles.classList.add(key);
    titles.textContent = key + ":";
    subtext.classList.add(key);
    subtext.setAttribute("id", `${e[key]}`);
    progressText.textContent = "/ " + e.pages;
    resize(alreadyreadText);
    cardFoot.appendChild(progress);
    cardFoot.appendChild(alreadyreadText);
    cardFoot.appendChild(progressText);
    cardFoot.appendChild(buttonWrap);
    cardWrap.appendChild(cardFoot);
    text.appendChild(titles);
    text.appendChild(subtext);
    if (e.alreadyread === e.pages) {
      progress.setAttribute("style", "accent-color:green;");
    }
  }
  div.addEventListener("pointerover", function () {
    div.classList.add("hover");
  });
  div.addEventListener("pointerleave", function () {
    div.classList.remove("hover");
  });
  infoBook.addEventListener("pointerdown", function (e) {
    div.classList.remove("hover");
    currentNum = cardWrap.getAttribute("number");
    console.log(currentNum);
    if (backdrop2.style.display !== "none") {
      backdrop2.style.display = "none";
    } else {
      backdrop2.style.display = "flex";
    }
    for (let key in myLibrary[currentNum]) {
      let divwrap = document.createElement("div");
      let titles = document.createElement("div");
      let subtext = document.createElement("div");
      titles.classList.add(key);
      titles.textContent = key + ":";
      subtext.classList.add(key);
      subtext.textContent = myLibrary[currentNum][key];
      subtext.setAttribute("id", `${e[key]}`);
      divwrap.appendChild(titles);
      divwrap.appendChild(subtext);
      information.appendChild(divwrap);
    }
  });
  removeBook.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    console.log(currentNum);
    const child = document.querySelector(
      `.display > :nth-child(${currentNum + 1}`
    );
    myLibrary.splice(currentNum, 1);
    display.removeChild(child);
    const divs = document.querySelectorAll(".display > div");
    let k = 0;
    Array.from(divs).forEach((e) => {
      e.setAttribute("number", `${k}`);
      k++;
    });
    k = 0;
    let j = 0;
    myLibrary.forEach((e) => {
      e.number = j;
      j++;
    });
    j = 0;
    i = myLibrary.length;
    console.log(i);
    console.log(myLibrary);
  });
  editBook.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    if (backdrop3.style.display !== "none") {
      backdrop3.style.display = "none";
    } else {
      backdrop3.style.display = "flex";
    }
  });
  plusPage.addEventListener("pointerdown", function () {
    if (e.alreadyread === e.pages) {
      return;
    }
    e.alreadyread += 1;
    alreadyreadText.value = e.alreadyread;
    resize(alreadyreadText);
    progress.value = e.alreadyread;
    if (e.alreadyread === e.pages) {
      progress.setAttribute("style", "accent-color:green;");
    }
    
  });
  minusPage.addEventListener("pointerdown", function () {
    if (e.alreadyread === 0) {
      return;
    } else if (e.alreadyread <= e.pages) {
      progress.setAttribute("style", "accent-color:#74ea74;");
      e.alreadyread -= 1;
      alreadyreadText.value = e.alreadyread;
      resize(alreadyreadText);
      progress.value = e.alreadyread;
    }
  });
  alreadyreadText.addEventListener("focusout", function () {
    e.alreadyread = parseInt(alreadyreadText.value);
    alreadyreadText.value = e.alreadyread;
    resize(alreadyreadText);
    progress.setAttribute("value", `${e.alreadyread}`);
    if (e.alreadyread < 0) {
      e.alreadyread = 0;
      alreadyreadText.value = e.alreadyread;
      resize(alreadyreadText);
      progress.setAttribute("value", `${0}`);
    }
    if (e.alreadyread > e.pages) {
      e.alreadyread = parseInt(e.pages);
      alreadyreadText.value = e.pages;
      resize(alreadyreadText);
      progress.setAttribute("value", `${e.pages}`);
    }
    if (e.alreadyread < e.pages) {
      progress.setAttribute("style", "accent-color:#74ea74;");
    }
    if (e.alreadyread === parseInt(e.pages)) {
      progress.setAttribute("style", "accent-color:green;");
    }
  });
  alreadyreadText.addEventListener("input", function () {
    resize(alreadyreadText);
  });
});

function resize(input) {
  const tempSpan = document.createElement("span");
  tempSpan.style.cssText =
    "position: absolute; left: -9999px; top: -9999px; white-space: pre; font-size: 16px; padding: 5px;";
  tempSpan.textContent = input.value;
  document.body.appendChild(tempSpan);

  const newWidth = tempSpan.getBoundingClientRect().width - 10;
  input.style.width = newWidth + "px";
  document.body.removeChild(tempSpan);
}

Book.prototype.infor = function () {
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    this.pages +
    " pages, " +
    this.read
  );
};

addBookButton.addEventListener("click", function () {
  if (backdrop.style.display === "none") {
    backdrop.style.display = "flex";
  } else {
    backdrop.style.display = "none";
  }
});
backdrop.addEventListener("mousedown", function (e) {
  if (e.target !== backdrop) {
    return;
  } else {
    if (backdrop.style.display === "none") {
      backdrop.style.display = "flex";
    } else {
      backdrop.style.display = "none";
    }
  }
});

backdrop2.addEventListener("mousedown", function (e) {
  if (e.target !== backdrop2) {
    return;
  } else {
    if (backdrop2.style.display === "none") {
      backdrop2.style.display = "flex";
    } else {
      backdrop2.style.display = "none";
    }
  }
  while (information.childElementCount !== 0) {
    let divs = document.querySelector(".information  div");
    information.removeChild(divs);
  }
});

backdrop3.addEventListener("mousedown", function (e) {
  if (e.target !== backdrop3) {
    return;
  } else {
    if (backdrop3.style.display === "none") {
      backdrop3.style.display = "flex";
    } else {
      backdrop3.style.display = "none";
    }
  }
});

addBookCard.addEventListener("submit", function (e) {
  e.preventDefault();
  const newBookJson = new FormData(e.target);
  let div = document.createElement("div");
  let text = document.createElement("div");
  let cardWrap = document.createElement("div");
  let cardFoot = document.createElement("div");
  let progress = document.createElement("progress");
  let alreadyreadText = document.createElement("input");
  let progressText = document.createElement("div");
  let buttonWrap = document.createElement("div");
  let plusPage = document.createElement("div");
  let minusPage = document.createElement("div");
  let removeBook = document.createElement("div");
  let infoBook = document.createElement("div");
  let editBook = document.createElement("div");
  let bookButtonsWrap = document.createElement("div");

  currentNum = parseInt(cardWrap.getAttribute("number"));

  progressText.classList.add("progresstext");

  editBook.classList.add("edit");
  removeBook.classList.add("remove");
  infoBook.classList.add("info");
  bookButtonsWrap.classList.add("buttonsbook");
  bookButtonsWrap.appendChild(infoBook);
  bookButtonsWrap.appendChild(editBook);
  bookButtonsWrap.appendChild(removeBook);

  plusPage.classList.add("plus");
  minusPage.classList.add("minus");
  buttonWrap.classList.add("buttonsfoot");
  buttonWrap.appendChild(plusPage);
  buttonWrap.appendChild(minusPage);

  cardWrap.classList.add("cardwrap");
  cardFoot.classList.add("cardfoot");

  newBookAdded = new newBook(i);
  newBookJson.forEach((value, key) => {
    newBookAdded[key] = value;
  });
  alreadyreadText.setAttribute("type", "number");
  alreadyreadText.setAttribute("value", `${newBookAdded.alreadyread}`);
  alreadyreadText.classList.add("alreadyreadtext");
  alreadyreadText.setAttribute("max", `${newBookAdded.pages}`);

  progress.setAttribute("max", `${newBookAdded.pages}`);
  progress.setAttribute("value", `${newBookAdded.alreadyread}`);
  if (newBookAdded.pages === newBookAdded.alreadyread) {
    progress.setAttribute("style", "accent-color:green;");
  }
  let title = document.createElement("div");
  let author = document.createElement("div");
  let pages = document.createElement("div");

  let titlesubtext = document.createElement("div");
  let authorsubtext = document.createElement("div");
  let pagessubtext = document.createElement("div");

  let wrap1 = document.createElement("div");
  let wrap2 = document.createElement("div");
  let wrap3 = document.createElement("div");

  title.classList.add("title");
  title.textContent = "Title :";

  author.classList.add("author");
  author.textContent = "Author: ";

  pages.classList.add("pages");
  pages.textContent = "Pages: ";

  titlesubtext.textContent = newBookAdded.title;
  authorsubtext.textContent = newBookAdded.author;
  pagessubtext.textContent = newBookAdded.pages;

  progressText.textContent = "/ " + newBookAdded.pages;

  cardFoot.appendChild(progress);
  cardFoot.appendChild(alreadyreadText);
  resize(alreadyreadText);
  cardFoot.appendChild(progressText);
  cardFoot.appendChild(buttonWrap);

  wrap1.appendChild(title);
  wrap1.appendChild(titlesubtext);

  wrap2.appendChild(author);
  wrap2.appendChild(authorsubtext);

  wrap3.appendChild(pages);
  wrap3.appendChild(pagessubtext);

  text.appendChild(wrap1);
  text.appendChild(wrap2);
  text.appendChild(wrap3);

  if (newBookAdded.url === "") {
    text.setAttribute("style", "grid-area: 2 / 2 / 3 / 3;");
  } else {
    text.setAttribute(
      "style",
      `grid-area: 2 / 2 / 3 / 3;background-image: url(${newBookAdded.url});  color:transparent;`
    );
  }
  addBookToLibrary(newBookAdded);
  i = myLibrary.length;
  text.classList.add("text");
  div.classList.add("card");
  infoBook.setAttribute("number", `${j}`);
  removeBook.setAttribute("number", `${j}`);
  cardWrap.setAttribute("number", `${j}`);
  j++;
  cardWrap.appendChild(bookButtonsWrap);
  cardWrap.appendChild(div);
  cardWrap.appendChild(cardFoot);
  display.appendChild(cardWrap);
  div.appendChild(text);
  console.log(myLibrary);

  div.addEventListener("pointerover", function () {
    div.classList.add("hover");
  });
  div.addEventListener("pointerleave", function () {
    div.classList.remove("hover");
  });
  infoBook.addEventListener("pointerdown", function (e) {
    div.classList.remove("hover");
    currentNum = parseInt(cardWrap.getAttribute("number"));
    if (backdrop2.style.display !== "none") {
      backdrop2.style.display = "none";
    } else {
      backdrop2.style.display = "flex";
    }
    for (let key in myLibrary[currentNum]) {
      let divwrap = document.createElement("div");
      let titles = document.createElement("div");
      let subtext = document.createElement("div");
      titles.classList.add(key);
      titles.textContent = key + ":";
      subtext.classList.add(key);
      subtext.textContent = myLibrary[currentNum][key];
      subtext.setAttribute("id", `${e[key]}`);
      divwrap.appendChild(titles);
      divwrap.appendChild(subtext);
      information.appendChild(divwrap);
    }
  });
  const divs = document.querySelectorAll(".display > div");
  let k = 0;
  Array.from(divs).forEach((e) => {
    e.setAttribute("number", `${k}`);
    k++;
  });
  k = 0;
  let d = 0;
  myLibrary.forEach((e) => {
    e.number = d;
    d++;
  });
  d = 0;

  removeBook.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    console.log(currentNum);
    const child = document.querySelector(
      `.display > :nth-child(${currentNum + 1}`
    );
    myLibrary.splice(currentNum, 1);
    display.removeChild(child);

    const divs = document.querySelectorAll(".display > div");
    let k = 0;
    Array.from(divs).forEach((e) => {
      e.setAttribute("number", `${k}`);
      k++;
    });
    k = 0;
    let j = 0;
    myLibrary.forEach((e) => {
      e.number = j;
      j++;
    });
    j = 0;
    console.log(myLibrary);
  });
  plusPage.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    if (
      myLibrary[currentNum].alreadyread ===
      parseInt(myLibrary[currentNum].pages)
    ) {
      progress.setAttribute("style", "accent-color:green;");
      return;
    }

    myLibrary[currentNum].alreadyread =
      parseInt(myLibrary[currentNum].alreadyread) + 1;
    console.log(myLibrary[currentNum].alreadyread);
    console.log(myLibrary[currentNum].pages);
    progress.setAttribute("value", `${myLibrary[currentNum].alreadyread}`);
    alreadyreadText.value = parseInt(alreadyreadText.value) + 1;
    resize(alreadyreadText);
    if (
      myLibrary[currentNum].alreadyread ===
      parseInt(myLibrary[currentNum].pages)
    ) {
      progress.setAttribute("style", "accent-color:green;");
    }
  });
  minusPage.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    if (myLibrary[currentNum].alreadyread === 0) {
      return;
    } else if (
      myLibrary[currentNum].alreadyread <= parseInt(myLibrary[currentNum].pages)
    ) {
      progress.setAttribute("style", "accent-color:#74ea74;");
      myLibrary[currentNum].alreadyread -= 1;
      resize(alreadyreadText);
      alreadyreadText.value = parseInt(alreadyreadText.value) - 1;
      progress.setAttribute("value", `${myLibrary[currentNum].alreadyread}`);
    }
  });
  alreadyreadText.addEventListener("focusout", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    myLibrary[currentNum].alreadyread = parseInt(alreadyreadText.value);
    myLibrary[currentNum].value = myLibrary[currentNum].alreadyread;
    resize(alreadyreadText);
    progress.setAttribute("value", `${myLibrary[currentNum].alreadyread}`);
    if (myLibrary[currentNum].alreadyread < 0) {
      myLibrary[currentNum].alreadyread = 0;
      alreadyreadText.value = myLibrary[currentNum].alreadyread;
      resize(alreadyreadText);
      progress.setAttribute("value", `${0}`);
    }
    if (myLibrary[currentNum].alreadyread > myLibrary[currentNum].pages) {
      myLibrary[currentNum].alreadyread = parseInt(myLibrary[currentNum].pages);
      alreadyreadText.value = myLibrary[currentNum].pages;
      resize(alreadyreadText);
      progress.setAttribute("value", `${myLibrary[currentNum].pages}`);
    }
    if (myLibrary[currentNum].alreadyread < myLibrary[currentNum].pages) {
      progress.setAttribute("style", "accent-color:#74ea74;");
    }
    if (
      myLibrary[currentNum].alreadyread ===
      parseInt(myLibrary[currentNum].pages)
    ) {
      progress.setAttribute("style", "accent-color:green;");
    }
  });
  alreadyreadText.addEventListener("input", function () {
    resize(alreadyreadText);
  });
  editBook.addEventListener("pointerdown", function () {
    currentNum = parseInt(cardWrap.getAttribute("number"));
    if (backdrop3.style.display !== "none") {
      backdrop3.style.display = "none";
    } else {
      backdrop3.style.display = "flex";
    }
  });
});
