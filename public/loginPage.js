"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
  if (response.success) {
    location.reload();
  } else {
    userForm.setLoginErrorMessage("Такого пользователя не существует или введен некорректный пароль");
  }
})

userForm.registerFormCallback  = data => ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage("Пользователь с таким логином уже существует");
    }
})