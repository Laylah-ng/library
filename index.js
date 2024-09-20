const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function displayBook() {
  let library = document.querySelector(".library")
  library.textContent = "" // Clear the library before adding new books

  // Create a container to hold all the books
  let bookContainer = document.createElement("div")
  bookContainer.classList.add("book-container")

  // Loop through the library and create a card for each book
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i]

    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card")

    const bookTitle = document.createElement("h3")
    bookTitle.textContent = `Title: ${book.title}`
    bookCard.appendChild(bookTitle)

    const bookAuthor = document.createElement("p")
    bookAuthor.textContent = `Author: ${book.author}`
    bookCard.appendChild(bookAuthor)

    const bookPages = document.createElement("p")
    bookPages.textContent = `Pages: ${book.pages}`
    bookCard.appendChild(bookPages)

    const status = document.createElement("p")
    status.textContent = "Status: "
    bookCard.appendChild(status)

    const remove = document.createElement("button")
    remove.textContent = "Remove"
    remove.classList.add('remove')
    bookCard.appendChild(remove)

    remove.addEventListener("click", () => {
      
      myLibrary.splice(i,1)
      bookContainer.removeChild(bookCard)
    })

    const readStatus = document.createElement("button")
    if (book.read === "true") {
      readStatus.textContent = "Read"
    } else {
      readStatus.textContent = "Not read"
    }

    // Toggle the status when the button is clicked
    readStatus.addEventListener("click", () => {
      if (book.read === "true") {
        book.read = "false"
        readStatus.textContent = "Not read"
      } else {
        book.read = "true"
        readStatus.textContent = "Read"
      }
    })

    status.appendChild(readStatus)

    // Add the bookCard to the bookContainer
    bookContainer.appendChild(bookCard)
  }

  // Append the container to the library
  library.appendChild(bookContainer)
}

// Dialog and button handling
const dialog = document.querySelector("dialog")
const showButton = document.querySelector("dialog + button")
const closeButton = document.querySelector("dialog button")
const submitBtn = document.querySelector("#submitBtn")

showButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})

// Form submission
submitBtn.addEventListener("click", (e) => {
  e.preventDefault()

  // Get form values
  let title = document.querySelector("#title").value
  let author = document.querySelector("#author").value
  let pages = document.querySelector("#page").value
  let read = document.querySelector('input[name="status"]:checked')

  if (read) {
    read = read.value // Get the value of the checked radio button
  } else {
    read = "false" // Default value if no radio button is selected
  }

  // Check if form values are valid before adding the book
  if (title && author && pages && read) {
    let newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    displayBook()

    // Reset the form and close the dialog
    document.querySelector(".form").reset()
    dialog.close()
  } else {
    alert("Please fill in all the fields")
  }
})
