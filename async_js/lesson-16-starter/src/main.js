// Import the functions necessary to make the API calls
import { fetchBooks, postBook } from "./utils";

// Select the necessary DOM elements
const addForm = document.querySelector("#addBook");
const loadButton = document.querySelector("#loadBooks");
const bookList = document.querySelector("#bookList");

// Define a function to handle loading and displaying the list of books

const loadHandler = async () => {
  // TODO: display loading text
  list.innerHTML = "<li>Loading...</li>";

  // Error handling

  try {
    // get books
    const data = await fetchBooks();
    list.innerHTML = "";

    // Loop through the books
    data.forEach((book) => {
      // for each book add it to the list
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author}`;
      bookList.appendChild(li);
    });
  } catch (error) {
    bookList.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`;
  }
};

// Define a function to handle form submission for adding a new book

const submitHandler = async (event) => {
  event.preventDefault();

  const form = event.target;

  // Option 1
  const genre = form.elements["genre"].value;
  const author = form.elements["author"].value;
  const title = form.elements["title"].value;
  const year = parseInt(form.elements["year"].value);

  const data = { genre: genre, author: author, title: title, year: year };

  // Option 2
  //   const data = Object.fromEntries(new FormData(form).entries());
  //   data['year'] = parseInt(data['year'])

  try {
    await postBook(data);

    // Once I've added a book, I need to reload the book list
    loadHandler();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

// Attach event listeners to the button and form
loadButton.addEventListener("click", loadHandler);
addForm.addEventListener("submit", submitHandler);
// TODO: Add delete functionality
