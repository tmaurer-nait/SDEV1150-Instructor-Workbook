// Import the user-card component to register the custom element
import "./user-card.js";

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
 <user-card avatar="https://placehold.co/80x80">
   <span slot="name">Superman</span>
   <span slot="description">Super strong Super hero</span>
 </user-card>
`;
document.querySelector("main").innerHTML += dynamicUserCard;

// Create another user card using JavaScript DOM API only and append it to the main element
const anotherCard = document.createElement("user-card"); // <user-card>
anotherCard.setAttribute("avatar", "https://placehold.co/80x80"); // <user-card avatar="https://placehold.co/80x80">
const nameSpan = document.createElement("span");
nameSpan.setAttribute("slot", "name");
nameSpan.textContent = "Caillou";
const descriptionSpan = document.createElement("span");
descriptionSpan.setAttribute("slot", "description");
descriptionSpan.textContent = "Poor bald child";

anotherCard.appendChild(nameSpan);
anotherCard.appendChild(descriptionSpan);
document.querySelector("main").appendChild(anotherCard);

const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Theme";
document.body.appendChild(toggleButton);

let dark = false;
toggleButton.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.style.setProperty(
    "--global-card-bg",
    dark ? "#1f2937" : "#ffffff"
  );
  document.documentElement.style.setProperty(
    "--global-card-color",
    dark ? "#e5e7eb" : "#222222"
  );
  document.documentElement.style.setProperty(
    "--global-card-accent",
    dark ? "gold" : "#0077ff"
  );
});
