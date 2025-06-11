import { displayError } from "./helperFunctions/questionHelpers";
import { login } from "./services/authService";
import "./styles/login.scss";

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;

    try {
        await login(email, password);
    } catch (error :any) {
        displayError(error.message);
    }

});