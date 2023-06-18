let timeout;
const password = document.getElementById("password");
const password_confirm = document.getElementById("password_confirm");
let strengthVisual = document.getElementById("pass_strength");
const default_value = strengthVisual.textContent;

let mediumPassword = /^(\w|\W){6,}$/;
let strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])((\w|\W){8,})$/;

function strengthCheck(passwordParameter) {
  if (strongPassword.test(passwordParameter)) {
    strengthVisual.style.color = "#596D48";
    strengthVisual.textContent = "Strong!";
  } else if (mediumPassword.test(passwordParameter)) {
    strengthVisual.style.color = "#EB8E69";
    strengthVisual.textContent = "Medium";
  } else if (passwordParameter.length !== 0) {
    strengthVisual.style.color = "#c13838";
    strengthVisual.textContent = "Weak!";
  } else {
    strengthVisual.style.color = "#c13838";
    strengthVisual.textContent = default_value;
  }
}

password.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => strengthCheck(password.value), 200);
});

const valid = document.getElementById("pass_match");

function validatePassword() {
  if (password.value != password_confirm.value) {
    password_confirm.setCustomValidity(
      "Error: Passwords don't match. Please try again."
    );
    valid.textContent = "*Passwords don't match!";
  } else {
    password_confirm.setCustomValidity("");
    valid.textContent = "";
  }

  if (
    password.value !== password_confirm.value ||
    (password.value.length === 0 && password_confirm.value.length === 0)
  ) {
    password.style.borderColor = "#c13838";
    password_confirm.style.borderColor = "#c13838";
  } else {
    password.style.borderColor = "#3fff05";
    password_confirm.style.borderColor = "#3fff05";
  }
}

password.onchange = validatePassword;
password_confirm.onkeyup = validatePassword;
