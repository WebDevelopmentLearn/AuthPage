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
const usernameInput = document.querySelector(".signUpUsernameInput");
const phoneNumberInput = document.querySelector(".signUpPhoneNumberInput");
const emailInput = document.querySelector(".signUpEmailInput");
const passwordInput = document.querySelector(".signUpPasswordInput");
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

const hasDigits = /\d/; //регулярное выражение, которое проверяет наличие цифр в строке.
const hasLetters = /[a-zA-Z]/; //регулярное выражение, которое проверяет наличие букв в строке.

const allUsers = JSON.parse(localStorage.getItem("users")) || [];

// ================ START OF SIGN UP ====================

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
    clearInputs([usernameInput, phoneNumberInput, emailInput, passwordInput]);
  }
});

usernameInput.addEventListener("keyup", (e) => {
  const isValid = validateUsername(e.target.value);
  const message = isValid
    ? "Имя пользователя валидно"
    : "Имя пользователя не валидно";
  responseStatus(isValid ? "success" : "fail", statusMsg, message);
});

phoneNumberInput.addEventListener("keyup", (e) => {
  const isValid = validateTelefonNumber(e.target.value);
  const message = isValid
    ? "Номер телефона валидный"
    : "Номер телефона не валидный";
  responseStatus(isValid ? "success" : "fail", statusMsg, message);
});

emailInput.addEventListener("keyup", (e) => {
  const isValid = validateEmail(e.target.value);
  const message = isValid
    ? "Электронная почта валидна"
    : "Электронная почта не валидна";
  responseStatus(isValid ? "success" : "fail", statusMsg, message);
});

passwordInput.addEventListener("keyup", (e) => {
  const isValid = validatePassword(e.target.value);
  const message = isValid ? "Пароль валидный" : "Пароль не валидный";
  responseStatus(isValid ? "success" : "fail", statusMsg, message);
});

hasAccountBtn.addEventListener("click", () => {
  loginContainer.classList.toggle("hidden");
  signUpInput.classList.toggle("hidden");
  signUpContainer.classList.toggle("hidden");
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

// ================ END OF SIGN UP ====================

// ================ START OF LOG IN ====================

logInInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentUserData = {
    username: loginUsernameInput.value,
    password: loginPasswordInput.value,
  };
  if (
    hasUsername(currentUserData.username) &&
    hasPassword(currentUserData.password)
  ) {
    alert("Вы успешно авторизировались");
    clearInputs([loginUsernameInput, loginPasswordInput]);
  } else {
    responseStatus("fail", statusLoginMsg, "Неверный логин или пароль!");
  }
});

// ================ END OF LOG IN ====================

// ================ START OF VALIDATIONS FUNCTIONS ====================

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
    if (hasDigits.test(element) || !hasLetters.test(element)) {
      flag = true;
      break;
    }
  }
  return !flag && username.length >= 2 && username.length <= 24;
}

/**
 * Данная функция проверяет, соответствует ли введенное имя пользователя одному из списка
 * @param {String} username - имя пользователя, которое ввел пользователь
 * @returns true - если указанное имя пользователя есть в базе
 */
function hasUsername(username) {
  let foundUsername = false;
  for (let i = 0; i < allUsers.length; i++) {
    const el = allUsers[i];
    if (el.username === username) {
      foundUsername = true;
      break;
    }
  }
  return foundUsername;
}

/**
 * Данная функция проверяет, соответствует ли введенный пароль одному из списка
 * @param {String} password - пароль, которое ввел пользователь
 * @returns true - если указанный пароль есть в базе
 */
function hasPassword(password) {
  let foundPassword = false;
  for (let i = 0; i < allUsers.length; i++) {
    const el = allUsers[i];
    if (el.password === password) {
      foundPassword = true;
      break;
    }
  }
  return foundPassword;
}

// ================ END OF VALIDATIONS FUNCTIONS ====================

// ================ START OF UTILS FUNCTIONS ====================

/**
 * Данная функция применяет к целевому html-элементу текст и цвет.
 * @param {String} type - тип сообщения(success - успех, fail - неудача, unknown - неизвестная ошибка)
 * @param {Element} obj  - элемент, к которому будут применены текст и цвет
 * @param {String} msg - сообщение, которое будет выводиться пользователю
 */
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

/**
 * Данная функция очищает input поля
 * @param {Array} inputs - массив input'ов, которые необходимо очистить.
 */
function clearInputs(inputs) {
  inputs.forEach((el) => {
    el.value = "";
  });
}

// ================ START OF UTILS FUNCTIONS ====================
