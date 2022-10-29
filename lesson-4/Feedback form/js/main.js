"use strict"

class InputFieldValidation {
  constructor() {

  }

  validationRules() {

    //Валидация поля с именем
    //Задаем шаблон для проверки
    const validationName = /^[a-zA-Z]{6,20}$/;

    let nameBlock = document.querySelector('.name');
    let nameInput = nameBlock.querySelector('.name-input');
    let nameError = nameBlock.querySelector('.error');

    if (validationName.test(nameInput.value)) {
      nameInput.classList.remove('input-error');
      nameError.classList.remove('invisible-error');
    } else {
      nameInput.classList.add('input-error');
      nameError.classList.add('invisible-error');
    }

    console.log(`Name: ${validationName.test(nameInput.value)}`);

    //Валидация поля с email
    const validationEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    let emailBlock = document.querySelector('.email');
    let emailInput = emailBlock.querySelector('.email-input');
    let emailError = emailBlock.querySelector('.error');

    if (validationEmail.test(emailInput.value)) {
      emailInput.classList.remove('input-error');
      emailError.classList.remove('invisible-error');
    } else {
      emailInput.classList.add('input-error');
      emailError.classList.add('invisible-error');
    }

    console.log(`Email: ${validationEmail.test(emailInput.value)}`);

    //Валидация номера телефона
    const validationPhone = /\+7[\S(]*\d{3}[)\S]*\d{3}[\S-]?\d{2}\d{2}/;

    let phoneBlock = document.querySelector('.phone');
    let phoneInput = phoneBlock.querySelector('.phone-input');
    let phoneError = phoneBlock.querySelector('.error');

    if (validationPhone.test(phoneInput.value)) {
      phoneInput.classList.remove('input-error');
      phoneError.classList.remove('invisible-error');
    } else {
      phoneInput.classList.add('input-error');
      phoneError.classList.add('invisible-error');
    }

    console.log(`Phone: ${validationPhone.test(phoneInput.value)}`);

    //Валидация поля ввода текста
    const validationText = /.+?/gi;

    let textBlock = document.querySelector('.text');
    let textInput = textBlock.querySelector('.text-input');
    let textError = textBlock.querySelector('.error');

    if (validationText.test(textInput.value)) {
      textInput.classList.remove('input-error');
      textError.classList.remove('invisible-error');
    } else {
      textInput.classList.add('input-error');
      textError.classList.add('invisible-error');
    }

    console.log(`Message: ${validationText.test(textInput.value)}`);

  }

  render() {
    document.querySelector('.form').addEventListener('click', ev => {
      if (!ev.target.classList.contains('btn')) {
        return;
      }

      this.validationRules();


    });
  }
}

let validation = new InputFieldValidation();

validation.render();


















