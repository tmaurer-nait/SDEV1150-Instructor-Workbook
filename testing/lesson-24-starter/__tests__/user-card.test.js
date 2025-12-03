import { expect, test, describe } from "vitest"; // Import your testing library

import "../src/user-card.js"; // Import the thing you want to test

describe("User Card Tests", () => {
  // Everything in here is the group of user card tests

  // Two args: 1 - the test name, 2 - callback function that is the test
  test("renders with default properties", () => {
    // Here is the body of the test
    // Arrange - Create an instance of the component
    const element = document.createElement("user-card");

    // Act - attach the component to the page
    // (other acts might be click on a button, or pass in some values, mouseover something, etc.)
    document.body.appendChild(element);

    // Assert - Check that our default properties are as expected
    expect(element.followed).toBe(false);
    expect(element.shadowRoot.querySelector("img").getAttribute("src")).toBe(
      "https://placehold.co/80x80/0077ff/ffffff"
    );

    // Clean up
    document.body.removeChild(element);
  });
});
