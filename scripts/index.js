/*

●Реализовать формы регистрации и логина.
●Данные зарегистрированных пользователей хранить в массиве объектов в localStorage.
●Для обеих форм сделать проверку на пустые поля при отправке.
●При вводе неверного логина или пароля выводить сообщение об ошибке.
●При успешном логине и регистрации выводит сообщение и очищать поля.
const users = [{ username: "", password: "" }];
*/

const usernameInput = document.querySelector(".username");

const phoneNumberInput = document.querySelector(".phoneNumber");

const emailInput = document.querySelector(".email");

const passwordInput = document.querySelector(".password");

const signUpInput = document.querySelector(".signUpForm");

const statusMsg = document.querySelector(".statusMessage");

const allUsers = JSON.parse(localStorage.getItem("users")) || [];
signUpInput.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentUserData = {
    username: usernameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    passwordInput: passwordInput.value,
  }; //123@g.com
  if (isEmailAlready(allUsers, currentUserData.email)) {
    // alert("Пользователь с этим email уже существует");
    statusMsg.textContent = "Пользователь с этим email уже существует";
    statusMsg.style.color = "red";
  } else if (isUsernameAlready(allUsers, currentUserData.username)) {
    // alert("Пользователь с этим именем пользователя уже существует");
    statusMsg.textContent =
      "Пользователь с этим именем пользователя уже существует";
    statusMsg.style.color = "red";
  } else if (isPhoneNumberAlready(allUsers, currentUserData.phoneNumber)) {
    // alert("Пользователь с этим номером уже существует");
    statusMsg.textContent = "Пользователь с этим номером уже существует";
    statusMsg.style.color = "red";
  } else {
    alert("Вы успешно зарегестрировались!");
    allUsers.push(currentUserData);
    localStorage.setItem("users", JSON.stringify(allUsers));
  }
});

function isEmailAlready(users, targetEmail) {
  let flag = false;
  users.forEach((element) => {
    if (element.email === targetEmail) {
      flag = true;
    }
  });
  return flag;
}

function isUsernameAlready(users, targetUsername) {
  let flag = false;
  users.forEach((element) => {
    if (element.username === targetUsername) {
      flag = true;
    }
  });
  return flag;
}

function isPhoneNumberAlready(users, targetPhoneNumber) {
  let flag = false;
  users.forEach((element) => {
    if (element.phoneNumber === targetPhoneNumber) {
      flag = true;
    }
  });
  return flag;
}

const combinations = [
  { regex: /.{8}/, key: 0 }, //Любые символы
  { regex: /[A-Z]/, key: 1 },
  { regex: /[a-z]/, key: 2 },
  { regex: /[0-9]/, key: 3 },
  { regex: /[^A-Za-z0-9]/, key: 4 },
];

const regex = /(?=.*[A-Z])(?=.*[\W_]).{9,}/;
function validatePassword(password) {
  return regex.test(password);
}

const regexArray = [/(?=.*[A-Z])/, /(?=.*[\W_])/, /.{9,}/];

const widthPower = ["1%", "25%", "50%", "75%", "100%"];
const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
let password = document.getElementById("password");
// let power = document.getElementById("power-point");

const power = document.createElement("div");
power.id = "power-point";
passwordInput.addEventListener("keyup", (e) => {
  const isValid = validatePassword(e.target.value);
  let point = 0;
  let password = e.target.value;

  regexArray.forEach((el) => {
    if (el.test(password)) {
      point++;
    }
  });
  console.log(point);
  power.style.width = widthPower[point];
  power.style.backgroundColor = colorPower[point];

  if (isValid) {
    statusMsg.textContent = "Пароль валидный";
    statusMsg.style.color = "green";
  } else {
    statusMsg.textContent = "Пароль не валидный";
    statusMsg.style.color = "red";
  }
});

const passwordContainer = document.querySelector(".password_container");
passwordInput.addEventListener("focus", () => {
  console.log("render");
  passwordContainer.append(power);
  console.log(power);
});

passwordInput.addEventListener("blur", () => {
  console.log("render");
  passwordContainer.removeChild(power);
});

const viewPass = document.querySelector(".password-control");

viewPass.addEventListener("click", () => {
  viewPass.classList.toggle("view");
  if (viewPass.classList.contains("view")) {
    passwordInput.setAttribute("type", "text");
  } else {
    passwordInput.setAttribute("type", "password");
  }
});
