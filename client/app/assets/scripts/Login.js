import axios from "axios";
import toastr from "toastr";

class Login {
  constructor() {
    this.form = document.getElementById("signin-form");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => this.submit(e));
  }

  async submit(e) {
    e.preventDefault();
    try {
      const username = this.form.elements["username"].value;
      const password = this.form.elements["password"].value;

      const { data } = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.replace("dashboard.html");
      } else {
        toastr.error(
          "Invalid username or password. Please check your credentials!"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Login;
