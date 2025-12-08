import { expect, test, describe, beforeEach, afterEach } from "vitest"; // Import your testing library

import "../src/user-card.js"; // Import the thing you want to test

let element;

beforeEach(() => {
  // Set up a new instance of the component before each test
  element = document.createElement("user-card");
});

afterEach(() => {
  element.remove();
  element = null;
});

describe("User Card Tests", () => {
  // Everything in here is the group of user card tests

  // Two args: 1 - the test name, 2 - callback function that is the test
  test("renders with default properties", () => {
    // Here is the body of the test
    // Arrange - Create an instance of the component

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

  test("Renders with name and description", () => {
    // Arrange - Create the elements for the slots
    const nameSpan = document.createElement("span");
    nameSpan.setAttribute("slot", "name");
    nameSpan.textContent = "Vitest User";

    const descriptionSpan = document.createElement("span");
    descriptionSpan.setAttribute("slot", "description");
    descriptionSpan.textContent = "A user for testing with Vitest";

    // Attach the slots to the user card
    element.appendChild(nameSpan);
    element.appendChild(descriptionSpan);

    // Act - render the element to the DOM
    document.body.appendChild(element);

    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descriptionSlot = element.shadowRoot.querySelector(
      'slot[name="description"]'
    );
    expect(nameSlot.assignedNodes()[0].textContent).toBe("Vitest User");
    expect(descriptionSlot.assignedNodes()[0].textContent).toBe(
      "A user for testing with Vitest"
    );
  });
});
