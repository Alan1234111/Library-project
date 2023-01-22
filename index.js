const addBookBtn = document.querySelector(".add-book__button");
const addBookPopup = document.querySelector(".add-book-popup");
const overlay = document.querySelector(".overlay");
const isReadBookBtns = document.querySelectorAll(".book-isread");
const bookInformationForm = document.querySelector(".add-book-popup__form");
const library = document.querySelector(".library");

const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const isreadBook = document.getElementById("read");

let myLibrary = [];

function Book() {}

function removeBookFromLibrary() {}

function addBookToLibrary(e) {
  e.preventDefault();
  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
    pages: bookPages.value,
    isRead: isreadBook.checked,
  };

  console.log(book);

  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  library.innerHTML = "";

  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("book");
    library.appendChild(div);

    const title = document.createElement("p");
    title.classList.add("book-title");
    title.textContent = `"${book.title}"`;
    div.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("book-author");
    author.textContent = book.author;
    div.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("pages-title");
    pages.textContent = `${book.pages} pages`;
    div.appendChild(pages);

    const isread = document.createElement("button");
    isread.classList.add("book-isread");
    if (book.isRead) {
      isread.textContent = "Read";
      isread.classList = "read";
    } else {
      isread.textContent = "Not read";
      isread.classList = "not-read";
    }
    div.appendChild(isread);
    isread.addEventListener("click", isBookRead);

    const remove = document.createElement("button");
    remove.classList.add("book-remove");
    remove.textContent = "Remove";
    div.appendChild(remove);
    remove.addEventListener("click", removeBookFromLibrary);
  });
}

function showHideFromAddBook() {
  if (addBookPopup.classList.contains("hide")) {
    addBookPopup.classList.remove("hide");
    overlay.classList.add("active");
  } else {
    addBookPopup.classList.add("hide");
    overlay.classList.remove("active");
  }
}

function isBookRead() {
  if (this.classList.contains("not-read")) {
    this.classList.add("read");
    this.classList.remove("not-read");
    this.textContent = "Read";
  } else {
    this.classList.add("not-read");
    this.classList.remove("read");
    this.textContent = "Not read";
  }
}

addBookBtn.addEventListener("click", showHideFromAddBook);
overlay.addEventListener("click", showHideFromAddBook);
isReadBookBtns.forEach((btn) => btn.addEventListener("click", isBookRead));
bookInformationForm.addEventListener("submit", addBookToLibrary);
bookInformationForm.addEventListener("submit", showHideFromAddBook);
