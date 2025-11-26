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
const anotherCard = document.createElement("user-card");
anotherCard.setAttribute("avatar", "https://placehold.co/80x80");
const nameSpan = document.createElement("span");
nameSpan.setAttribute("slot", "name");
nameSpan.textContent = "Caillou";
const descriptionSpan = document.createElement("span");
descriptionSpan.setAttribute("slot", "description");
descriptionSpan.textContent = "Poor bald child";

anotherCard.appendChild(nameSpan);
anotherCard.appendChild(descriptionSpan);
document.querySelector("main").appendChild(anotherCard);
