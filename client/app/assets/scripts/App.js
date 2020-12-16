import "../styles/styles.css";
import "../styles/util.css";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

if (window.location.href != "http://localhost:3000/dashboard.html") {
  let register = new Register();
  let login = new Login();
  let header = new Header();
}

if (
  window.location.href != "http://localhost:3000/index.html" &&
  window.location.href != "http://localhost:3000/"
) {
  let dashboard = new Dashboard();
}

console.log("Serving...");
if (module.hot) {
  module.hot.accept();
}
