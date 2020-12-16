import axios from "axios";
import toastr from "toastr";

class Register {
  constructor() {
    this.form = document.getElementById("register-form");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => this.submit(e));
  }

  async submit(e) {
    e.preventDefault();
    try {
      const username = this.form.elements["username"].value;
      const email = this.form.elements["email"].value;
      const password = this.form.elements["password"].value;

      const { data } = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      window.location.replace("dashboard.html");
    } catch (error) {
      error.response.data.forEach((msg) => {
        toastr.error(msg);
      });
    }
  }
}

export default Register;
