const template = document.createElement("template");

template.innerHTML = `
      <style>

        :host {
          --card-bg: #ffffff;
          --card-color: #222222;
          --card-accent: #0077ff;
          display: block;
        }

        .card {
          background: var(--card-bg);
          color: var(--card-color);
          border: 1px solid #e6e6e6;
          padding: 12px;
          border-radius: 8px;
          display: flex;
          gap: 12px;
          align-items: center;
          width: 320px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .name {
          color: var(--card-accent);
          display: block;
          font-size: 1.2em;
          font-weight: bold;
          margin: 0;
        }

        .description {
          font-size: 0.9rem;
          color: #666;
          display: block;
          margin-top: 4px;
        }

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          flex: 0 0 80px;
        }
      </style>
      <div class="card">
        <img src="" alt="avatar">
        <div class="info">
          <slot name="name" class="name"></slot>
          <slot name="description" class="description"></slot>
        </div>
      </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super(); // Initialize the HTMLElement
    const shadow = this.attachShadow({ mode: "open" });

    // Find the template in my HTML
    // NOT NEEDED because we are now packaging the template with this component
    // const template = document.querySelector("#user-card-template");

    // Clone the template
    const content = template.content.cloneNode(true);

    const img = content.querySelector("img");
    img.src = this.getAttribute("avatar");

    // Add the element to the shadow DOM
    shadow.appendChild(content);
  }
}

// Define the custom HTML element
customElements.define("user-card", UserCard);

export default UserCard;
