"use strict"

class TextToReplace {
  constructor(
    dropZone = document.querySelector('.drop-zone'),
    input = document.querySelector('input')) {
    this.dropZone = dropZone;
    this.input = input;
    this.file = [];
  }

  getfile() {
    // drag and drop
    this.dropZone.addEventListener('drop', ev => {
      //отключаем автообновление
      ev.preventDefault();

      // console.log(ev.dataTransfer);

      //Извлекаем объект File
      this.file = ev.dataTransfer.files[0];

      // console.log(file);

      this.render(this.file, this.editText);
    });

    //делегируем клик инпуту
    this.dropZone.addEventListener('click', () => {
      //кликаем по input
      this.input.click();

      this.input.addEventListener('change', () => {

        // console.log(this.input.files);

        //Извлекаем объект File
        this.file = this.input.files[0];

        this.render(this.file, this.editText);
      })
    });

  }

  //Валидация текста
  editText() {
    document.body
      .addEventListener('click', ev => {
        if (ev.target.classList.contains('btn-replace')) {
          // console.log('hello');

          let blockText = document.querySelector('.received-text');

          //Шаблон для валидаци
          let regexp = /('\b)((.+?\s?)+?)('\B)/gi;

          let newText = blockText.textContent.replace(regexp, '"$2"');

          console.log(newText);

          blockText.textContent = newText;
        }
      })
  }



  render(file) {
    //отключаем автообновление у браузера
    document.addEventListener('dragover', ev => ev.preventDefault());
    document.addEventListener('drop', ev => ev.preventDefault());

    //Удаляю файлоприемник и input
    this.dropZone.remove();
    this.input.remove();

    const createtext = text => {
      // создаем экземпляр объекта "FileReader"
      const reader = new FileReader();

      // читаем файл как текст
      reader.readAsText(text);

      //после завершения чтения файла помещаем его в разметку
      reader.onload = () => {
        document
          .body
          .innerHTML = `
            <pre class="received-text">${reader.result}</pre>
            <button class = "btn-replace">Text to replace</button>`;
      }

    }

    //Отменяем обработку html, css и js файлов
    if (file.type === 'text/html' ||
      file.type === 'text/css' ||
      file.type === 'text/javascript') {
      document.body.innerHTML = `<h3>Unknown File Format!</h3>`
      const timer = setTimeout(() => {
        location.reload()
        clearTimeout(timer)
      }, 2000)
      return;
    }

    const type = file.type.replace(/\/.+/, '');
    // console.log(type);

    //Отменяем обработку файлов с другим типом
    switch (type) {
      case 'text':
        createtext(file);
        break;

      default:
        document.body.innerHTML = `<h3>Unknown File Format!</h3>`
        const timer = setTimeout(() => {
          location.reload()
          clearTimeout(timer)
        }, 2000)
        break;
    }

    //Вызываем метод валидации
    this.editText();
  }
}

const txtFile = new TextToReplace();

txtFile.getfile();











