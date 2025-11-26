import { fetchData, postData } from "./utils";

const loadButton = document.getElementById("loadBooks");
const addForm = document.getElementById("addBook");
const list = document.getElementById("bookList");
const endpoint = "http://localhost:3000/books";

async function loadHandler() {
  list.innerHTML = "<li>Loading...</li>";
  loadButton.disabled = true;
  try {
    const books = await fetchData(endpoint);

    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    list.innerHTML = "";

    books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error Fetching API:", error);
  }
  loadButton.disabled = false;
}

async function submitHandler(e) {
  e.preventDefault(); // never reload the page
  const form = e.target;
  const formData = new FormData(form);

  // Option 1
  let title = (formData.get("title") || "").trim();

  // Option 2
  // let title;
  // if (formData.get("title") === null) {
  //   title = "";
  // } else {
  //   title = formData.get("title");
  // }
  let author = (formData.get("author") || "").trim();
  // TODO: put an error message here
  console.error("Title and Author cannot be empty");
  if (!title || !author) return;

  const data = Object.fromEntries(formData.entries());
  data["year"] = Number(data.year); // convert year to number

  try {
    await postData(endpoint, data);

    // Call loadHandler to refresh the list
    await loadHandler();
    // Reset the form
    form.reset();
  } catch (error) {
    // TODO: Display a better error for the user
    console.error("Error submitting form:", error);
  }
}

loadButton.addEventListener("click", loadHandler);
addForm.addEventListener("submit", submitHandler);
