import axios from "axios";
import toastr from "toastr";
toastr.options.closeButton = true;
toastr.options.progressBar = true;
toastr.options.closeDuration = 10;

class Modal {
  constructor() {
    this.editId = null;
    this.modal = document.querySelector("#my-modal");
    this.modalBtn = document.querySelector("#modal-btn");
    this.closeBtn = document.querySelector(".close");
    this.form = document.querySelector(".contact100-form");
    this.events();
  }

  events() {
    this.modalBtn.addEventListener("click", () => this.openModal());
    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.form.addEventListener("submit", (e) => this.submit(e));
    window.addEventListener("click", (e) => this.outsideClick(e));
  }

  openModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
    this.form.elements["title"].value = "";
    this.form.elements["content"].value = "";
    this.editId = null;
  }

  outsideClick(e) {
    if (e.target == this.modal) {
      this.modal.style.display = "none";
      this.form.elements["title"].value = "";
      this.form.elements["content"].value = "";
      this.editId = null;
    }
  }

  async submit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    let url = ``;

    if (this.editId != null) {
      url = `http://localhost:5000/${user.username}/notes/${this.editId}`;
    } else {
      url = `http://localhost:5000/${user.username}/notes/`;
    }

    try {
      const title = this.form.elements["title"].value;
      const content = this.form.elements["content"].value;
      const res = await axios.post(url, {
        token: user.token,
        title: title,
        body: content,
      });
      if (res.status == 200) {
        this.form.elements["title"].value = "";
        this.form.elements["content"].value = "";
        this.editId = null;
        this.closeModal();
        this.noteAddEvent("success", this.form);
      }
    } catch (error) {
      console.log(error.response);
      error.response.data.forEach((msg) => {
        toastr.error(msg);
      });
    }
  }

  noteAddEvent(msg, element) {
    const event = new CustomEvent("noteAdded", {
      detail: {
        message: msg,
      },
    });

    element.dispatchEvent(event);
  }
}

export default Modal;
