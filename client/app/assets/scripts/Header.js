class Header {
  constructor() {
    this.removeForm();
    this.signout = document.getElementById("sign-out-btn");
    this.signout.addEventListener("click", () => this.signOutEvent());
    this.logo = document.querySelector(".logo");
    this.logo.addEventListener("click", () =>
      window.location.replace("index.html")
    );
  }

  removeForm() {
    if (localStorage.getItem("user")) {
      document.querySelector("#nav-form").style.display = "none";
      const userName = document.getElementById("user-name");
      userName.textContent = JSON.parse(localStorage.getItem("user")).username;
      userName.addEventListener("click", () =>
        window.location.replace("dashboard.html")
      );
    }
    if (!localStorage.getItem("user")) {
      document.getElementById("sign-out").style.display = "none";
    }
  }

  signOutEvent() {
    localStorage.clear();
    window.location.replace("index.html");
  }
}

export default Header;
