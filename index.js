class Book {
  myLibrary = [];

  constructor({addBookBtn, addBookPopup, overlay, isReadBookBtns, bookInformationForm, library, bookTitle, bookAuthor, bookPages, isreadBook}) {
    this.addBookBtn = addBookBtn;
    this.addBookPopup = addBookPopup;
    this.overlay = overlay;
    this.isReadBookBtns = isReadBookBtns;
    this.bookInformationForm = bookInformationForm;
    this.library = library;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookPages = bookPages;
    this.isreadBook = isreadBook;

    this.addBookBtn.addEventListener("click", this.showHideFromAddBook.bind(this));
    this.overlay.addEventListener("click", this.showHideFromAddBook.bind(this));
    this.isReadBookBtns.forEach((btn) => btn.addEventListener("click", this.isBookRead));
    this.bookInformationForm.addEventListener("submit", this.addBookToLibrary.bind(this));
    this.bookInformationForm.addEventListener("submit", this.showHideFromAddBook.bind(this));
  }

  removeBookFromLibrary(e) {
    const bookSection = e.target.parentNode;
    this.myLibrary.splice(bookSection.dataset.index, 1);
    bookSection.remove();
  }

  addBookToLibrary(e) {
    e.preventDefault();
    const book = {
      title: this.bookTitle.value,
      author: this.bookAuthor.value,
      pages: this.bookPages.value,
      isRead: this.isreadBook.checked,
    };

    this.myLibrary.push(book);
    this.displayBooks();
  }

  displayBooks() {
    this.library.innerHTML = "";

    this.myLibrary.forEach((book, index) => {
      const div = document.createElement("div");
      div.dataset.index = index;
      div.classList.add("book");
      this.library.appendChild(div);

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
      isread.addEventListener("click", this.isBookRead);

      const remove = document.createElement("button");
      remove.classList.add("book-remove");
      remove.textContent = "Remove";
      div.appendChild(remove);
      remove.addEventListener("click", this.removeBookFromLibrary.bind(this));
    });
  }

  showHideFromAddBook() {
    if (this.addBookPopup.classList.contains("hide")) {
      this.addBookPopup.classList.remove("hide");
      this.overlay.classList.add("active");
    } else {
      this.addBookPopup.classList.add("hide");
      this.overlay.classList.remove("active");
    }
  }

  isBookRead() {
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
}

const book = new Book({
  addBookBtn: document.querySelector(".add-book__button"),
  addBookPopup: document.querySelector(".add-book-popup"),
  overlay: document.querySelector(".overlay"),
  isReadBookBtns: document.querySelectorAll(".book-isread"),
  bookInformationForm: document.querySelector(".add-book-popup__form"),
  library: document.querySelector(".library"),
  bookTitle: document.getElementById("title"),
  bookAuthor: document.getElementById("author"),
  bookPages: document.getElementById("pages"),
  isreadBook: document.getElementById("read"),
});
