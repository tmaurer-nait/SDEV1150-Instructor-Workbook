const template = document.createElement("template");

template.innerHTML = `
      <style>

        :host {
          --card-bg: var(--global-card-bg, #ffffff);
          --card-color: var(--global-card-color, #222222);
          --card-accent: var(--global-card-accent, #0077ff);
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
          <button>Follow</button>
        </div>
      </div>
`;

class UserCard extends HTMLElement {
  #followed = false;
  #user = null;

  constructor() {
    super(); // Initialize the HTMLElement
    this.#followed = false; // Initialize followed status to false (assume we haven't followed anyone)
    this.#user = null; // initialize the user to not exist
    const shadow = this.attachShadow({ mode: "open" });

    // Find the template in my HTML
    // NOT NEEDED because we are now packaging the template with this component
    // const template = document.querySelector("#user-card-template");

    // Clone the template
    const content = template.content.cloneNode(true);

    this._img = content.querySelector("img");
    this._img.src = this.getAttribute("avatar");

    // save a reference to the button and bind it to the followed status
    this._btn = content.querySelector("button");

    // Add the element to the shadow DOM
    shadow.appendChild(content);
  }

  // using arrow syntax to automatically bind "this"
  _onButtonClick = () => {
    this._setFollow(!this.#followed);
    console.log(this.#followed);
  };

  set user(obj) {
    // TODO: Validate the obj to actually be a user

    this.#user = obj;

    // render the visuals
    this._renderFromUser();
  }

  get user() {
    return this.#user;
  }

  _renderFromUser() {
    // Check if a user exists
    if (this.#user) {
      // TODO: Update the image source
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      } else {
        this._img.src = "https://placehold.co/80x80/0077ff/ffffff";
      }

      // Update the id attribute
      this.setAttribute("user-id", this.#user.id || "-1");

      // Update the name slot
      const nameSlot = this.shadowRoot.querySelector("[name='name']");
      if (nameSlot) {
        nameSlot.textContent = this.#user.name || "NAME GOES HERE";
      }

      // Update the description slot
      const descriptionSlot = this.shadowRoot.querySelector(
        "[name='description']"
      );
      if (descriptionSlot) {
        descriptionSlot.textContent =
          this.#user.description || "DESCRIPTION GOES HERE";
      }
    }
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? "Following" : "Follow";

    // emit the event so any parent can react
    // let id = this.getAttribute("user-id");
    // if (id == null){
    //   id = -1
    // }
    this.dispatchEvent(
      new CustomEvent("follow-change", {
        // detail is just the info about the event
        detail: {
          id: this.getAttribute("user-id") || -1,
          followed: this.#followed,
        },
        bubbles: true, // The event propagates
        composed: true, // The event can propagate beyond the shadow DOM
      })
    );
  }

  get followed() {
    return this.#followed;
  }

  // Tells the browser which attributes to watch
  static get observedAttributes() {
    return ["avatar"];
  }

  // Handles any changes to watched attributes
  attributeChangedCallback(name, oldValue, newValue) {
    // this.shadowRoot - ensures the component exists before doing anything
    if (name == "avatar" && this.shadowRoot) {
      this._img.src = newValue;
    }
  }

  // Lifecycle: Called when the element is added to the DOM
  connectedCallback() {
    // TODO: bind the local listeners
    this._btn.addEventListener("click", this._onButtonClick);

    // check if a user exists
    if (this.#user) {
      // If it does render from user
      this._renderFromUser();
    } else {
      // Else render fallback
      const avatar = this.getAttribute("avatar");
      this._img.src = avatar || "https://placehold.co/80x80";
    }
  }

  // Lifecycl: Called when the element is removed from the DOM
  disconnectedCallback() {
    this._btn.removeEventListener("click", this._onButtonClick);
  }

  // <user-card avatar="a"> -> <user-card avatar="b">
  // name: avatar, oldValue: a, newValue: b
}

// TODO Practice:
// - Add a css var to control the description color
// - Add a theme attribute on user-card that toggles a small internal dark mode class

// Define the custom HTML element
customElements.define("user-card", UserCard);

export default UserCard;
