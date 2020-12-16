import "../styles/styles.css";
import "../styles/util.css";
import "../styles/modal.css";
import "../../../node_modules/toastr/build/toastr.css";
import axios from "axios";
import toastr from "toastr";
import Modal from "./Modal";

toastr.options.closeButton = true;
toastr.options.progressBar = true;
toastr.options.closeDuration = 10;

class Dashboard {
  constructor() {
    this.isLoggedIn();
    if (window.location.href != "http://localhost:3000/dashboard.html") {
      this.modal = null;
    } else {
      this.modal = new Modal();
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.fetchNotes();
    if (this.modal) {
      this.modal.form.addEventListener("noteAdded", () => location.reload());
    }
    this.signoutDashboard = document.getElementById("sign-out-dashboard");
    this.signoutDashboard.addEventListener("click", () => this.signOutEvent());
    this.logo = document.querySelector(".logo");
    this.logo.addEventListener("click", () =>
      window.location.replace("index.html")
    );
  }

  isLoggedIn() {
    if (!localStorage.getItem("user")) {
      window.location.replace("index.html");
    }
  }

  async fetchNotes() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/${this.user.username}/notes/`
      );
      if (data) {
        if (data.length == 0) {
          const message = document.createElement("h1");
          message.textContent = "Create your first note to show here.";
          let container = document.querySelector(".notes-container");
          container.appendChild(message);
        } else {
          this.createList(data);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  createList(arr) {
    let row = document.querySelector(".notes-row");
    arr.forEach((note) => {
      this.createCard(note, row);
    });
  }

  createCard(note, row) {
    let card = document.createElement("div");
    card.className = "note-card ";
    card.setAttribute("key", note._id);
    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    let title = document.createElement("h2");
    title.textContent = note.title;
    cardHeader.appendChild(title);
    card.appendChild(cardHeader);
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let createdAt = document.createElement("h5");
    createdAt.textContent = new Date(note.createdDate)
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    cardBody.appendChild(createdAt);

    let body = document.createElement("p");
    body.textContent = note.body;
    cardBody.appendChild(body);
    let delIcon = document.createElement("i");
    delIcon.className = "fas fa-trash-alt fa-2x";
    delIcon.addEventListener("click", () => this.deleteNote(note._id));
    let editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit fa-2x";
    editIcon.addEventListener("click", () => this.editNote(note));
    let icons = document.createElement("div");
    icons.className = "icons-div";
    icons.appendChild(delIcon);
    icons.appendChild(editIcon);
    cardBody.appendChild(icons);
    card.appendChild(cardBody);
    row.appendChild(card);
  }

  async deleteNote(noteId) {
    try {
      const res = await axios.delete(
        `http://localhost:5000/${this.user.username}/notes/${noteId}`,
        { token: JSON.stringify(this.user.token) }
      );

      if (res.data == "Success") {
        let card = document.querySelector(`[key="${noteId}"]`);
        card.parentNode.removeChild(card);
        toastr.success("Note deleted successfully!");
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  editNote(note) {
    if (this.modal) {
      this.modal.form.elements["title"].value = note.title;
      this.modal.form.elements["content"].value = note.body;
      this.modal.editId = note._id;
      this.modal.openModal();
    }
  }

  signOutEvent() {
    localStorage.clear();
    window.location.replace("index.html");
  }
}

export default Dashboard;
