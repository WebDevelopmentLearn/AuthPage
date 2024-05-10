/*

●Реализовать формы регистрации и логина.
●Данные зарегистрированных пользователей хранить в массиве объектов в localStorage.
●Для обеих форм сделать проверку на пустые поля при отправке.
●При вводе неверного логина или пароля выводить сообщение об ошибке.
●При успешном логине и регистрации выводит сообщение и очищать поля.
const users = [{ username: "", password: "" }];
*/

// ================ START OF SIGN IN ====================
const signUpContainer = document.querySelector(".signUpContainer");
const usernameInput = document.querySelector(".username");
const phoneNumberInput = document.querySelector(".phoneNumber");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const signUpInput = document.querySelector(".signUpForm");
const hasAccountBtn = document.querySelector(".hasAccount");
const statusMsg = document.querySelector(".statusMessage");
// ================ END OF SIGN IN ====================

// ================ START OF LOG IN ====================
const loginContainer = document.querySelector(".loginContainer");
const logInInput = document.querySelector(".loginForm");
const loginUsernameInput = document.querySelector(".loginUsernameInput");
const loginPasswordInput = document.querySelector(".loginPasswordInput");
const statusLoginMsg = document.querySelector(".statusLoginMessage");
// ================ END OF LOG IN ====================

const par = document.createElement("p");
par.id = "responsePar";

const hasDigits = /\d/; //регулярное выражение, которое проверяет наличие цифр в строке.
const hasLetters = /[a-zA-Z]/; //регулярное выражение, которое проверяет наличие букв в строке.

const allUsers = JSON.parse(localStorage.getItem("users")) || [];

hasAccountBtn.addEventListener("click", () => {
  loginContainer.classList.toggle("hidden");
  signUpInput.classList.toggle("hidden");
  signUpContainer.classList.toggle("hidden");
});

logInInput.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(loginUsernameInput.value);
  console.log(loginPasswordInput.value);
  const currentUserData = {
    username: loginUsernameInput.value,
    password: loginPasswordInput.value,
  };
  if (
    hasUsername(currentUserData.username) &&
    hasPassword(currentUserData.password)
  ) {
    alert("Вы успешно авторизировались");
  } else {
    responseStatus("fail", statusLoginMsg, "Неверный логин или пароль!");
  }
});

function hasUsername(username) {
  let foundUsername = false;
  for (let i = 0; i < allUsers.length; i++) {
    const el = allUsers[i];
    // console.log(`Username: ${el.username} | Target username: ${username}`);
    if (el.username === username) {
      foundUsername = true;
      break;
    }
  }
  return foundUsername;
}

function hasPassword(password) {
  // console.log(password);
  let foundPassword = false;
  for (let i = 0; i < allUsers.length; i++) {
    const el = allUsers[i];
    // console.log(`Password: ${el.password} | Target password: ${password}`);
    if (el.password === password) {
      foundPassword = true;
      break;
    }
  }
  return foundPassword;
}

signUpInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentUserData = {
    username: usernameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (isEmailAlready(allUsers, currentUserData.email)) {
    responseStatus(
      "fail",
      statusMsg,
      "На данный email уже была зарегестирована учатная запись"
    );
  } else if (isUsernameAlready(allUsers, currentUserData.username)) {
    responseStatus("fail", statusMsg, "Данное имя пользователя уже занято!");
  } else if (isPhoneNumberAlready(allUsers, currentUserData.phoneNumber)) {
    responseStatus(
      "fail",
      statusMsg,
      "Пользователь c этим номером уже существует"
    );
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

/**
 * Данная функция проводит валидацию пароля.
 * На данный момент функция проверяет, что длина пароля минимум 5 символа и максимум 26 символов.
 * @param {String} password - пароль, который необходимо валидировать
 * @returns true - если пароль валидный
 */
function validatePassword(password) {
  return password.length >= 5 && password.length <= 26;
}

/**
 * Данная функция проводит валидацию email.
 * На данный момент функция проверяет, что передаваемая строка является адресом электронной почты(содержит @).
 * @param {String} email - строка, которую необходимо валидировать
 * @returns true - если передаваемая строка является адресом электронной почты и имеет длину минимум 7 символов.
 */
function validateEmail(email) {
  let flag = false;
  for (let i = 0; i < email.length; i++) {
    const element = email[i];
    if (element === "@") {
      flag = true;
    }
  }
  return flag && email.length >= 7;
}

/**
 * Данная функция проводит валидацию номера телефона.
 * @param {String} number - строка, которую необходимо валидировать
 * @returns true - если передаваемая строка начинается с символа "+" и содержит только цифры и имеет длину минимум 8 символа и максимум 12 символа.
 */
function validateTelefonNumber(number) {
  let flag = false;
  let hasPlus = false;
  for (let i = 0; i < number.length; i++) {
    const element = number[i];
    if (i === 0 && element === "+") {
      hasPlus = true;
      continue;
    }
    if (hasLetters.test(element)) {
      flag = true;
      break;
    }
  }
  return !flag && hasPlus && number.length >= 8 && number.length <= 12;
}

/**
 * Данная функция проводит валидацию имени пользователя.
 * @param {String} username - строка, которую необходимо валидировать
 * @returns true - если передаваемая строка содержит только буквы и имеет длину минимум 2 символа и максимум 24 символа.
 */
function validateUsername(username) {
  let flag = false;
  for (let i = 0; i < username.length; i++) {
    const element = username[i];
    if (hasDigits.test(element)) {
      flag = true;
      break;
    }
  }
  return !flag && username.length >= 2 && username.length <= 24;
}

usernameInput.addEventListener("keyup", (e) => {
  const isValid = validateUsername(e.target.value);
  if (isValid) {
    responseStatus("success", statusMsg, "Имя пользователя валидно");
  } else {
    responseStatus("fail", statusMsg, "Имя пользователя не валидно");
  }
});

phoneNumberInput.addEventListener("keyup", (e) => {
  const isValid = validateTelefonNumber(e.target.value);
  if (isValid) {
    responseStatus("success", statusMsg, "Номер телефона валидный");
  } else {
    responseStatus("fail", statusMsg, "Номер телефона не валидный");
  }
});

emailInput.addEventListener("keyup", (e) => {
  const isValid = validateEmail(e.target.value);
  if (isValid) {
    responseStatus("success", statusMsg, "Электронная почта валидна");
  } else {
    responseStatus("fail", statusMsg, "Электронная почта не валидна");
  }
});

passwordInput.addEventListener("keyup", (e) => {
  const isValid = validatePassword(e.target.value);
  if (isValid) {
    responseStatus("success", statusMsg, "Пароль валидный");
  } else {
    responseStatus("fail", statusMsg, "Пароль не валидный");
  }
});

usernameInput.addEventListener("blur", () => {
  statusMsg.textContent = "";
});

phoneNumberInput.addEventListener("blur", () => {
  statusMsg.textContent = "";
});

emailInput.addEventListener("blur", () => {
  statusMsg.textContent = "";
});

passwordInput.addEventListener("blur", () => {
  statusMsg.textContent = "";
});

function responseStatus(type, obj, msg) {
  obj.textContent = msg;
  switch (type) {
    case "success":
      obj.style.color = "green";
      break;
    case "fail":
      obj.style.color = "red";
      break;
    case "unknown":
      obj.style.color = "orange";
      break;
  }
}
