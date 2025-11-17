const BACKEND_URL = "http://localhost:3000";

// Fetch utility function
export const fetchBooks = async () => {
  // fetch the books data from the endpoint
  const response = await fetch(`${BACKEND_URL}/books`);

  // check that response is ok
  if (!response.ok) {
    throw new Error("Network request failed");
  }

  //  parse the data from the response
  const data = await response.json();

  // return the data
  return data;
};

// POST utility function
export const postBook = async (payload) => {
  const response = await fetch(`${BACKEND_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Network Request Failed");
  }

  const data = await response.json();
  return data;
};

// TODO: Add DELETE function here
