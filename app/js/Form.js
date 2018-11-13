class Form {
  constructor(src, container) {
    this.src = src;
    this.container = container;
    this.feedback = null;
    this.idCount = 1;
    this._render();
    this._getFeedbackFromServer();
    this._eventHandlerSubmit();
    this._eventHandlerFeedbacks();
    this._idCount();
  }

  _render() {

    let $wrapper = $('<div/>', {
      class: 'wrapperFeedbackPost',
    });

    let $wrapperForNameField = $('<div/>', {
      class: 'wrapperFeedbackPost',
      id: 'wrapperFeedbackPost'
    });
    let $nameLabel = $('<label for="nameInput" class="feedbackLabel">Please, input your name</label>');
    let $nameInput = $('<input type="text" id="nameInput" placeholder="Name">');
    let $nameError = $('<div id="errorName" class="opacity">place for error notice</div>');

    $nameLabel.appendTo($wrapperForNameField);
    $nameInput.appendTo($wrapperForNameField);
    $nameError.appendTo($wrapperForNameField);


    let $label = $('<label/>', {
      for: 'feedbackTextArea',
      class: 'feedbackLabel',
      text: 'Left your feedback below'
    });
    let $textarea = $('<textarea/>', {
      id: 'feedbackTextArea',
      class: 'feedbackTextAreaTag',
      maxlength: 600,
    });

    let $paragraphLength = $('<p/>', {
      text: 'max qty of letters: 600',
      class: 'symbols'
    });

    //обёртка для добавленных отзывов
    let $feedbacksWrapper = $('<div/>', {
      class: 'feedbacksWrapper',
      id: 'feedbacksWrapperId'
    });

    this.feedback = $feedbacksWrapper;

    // кнопка - добавляет отзыв из текстового поля ввода
    let $btnSubmitFeedback = $('<button/>', {
      class: 'submitBtn',
      id: 'submitFeedbackBtn',
      type: 'submit',
      text: 'Submit Feedback'
    });


    $wrapperForNameField.appendTo($wrapper);
    $label.appendTo($wrapper);
    $textarea.appendTo($wrapper);
    $paragraphLength.appendTo($wrapper);
    $wrapper.appendTo(this.container);
    $btnSubmitFeedback.appendTo($wrapper);
    $feedbacksWrapper.appendTo(this.container);
  }

  _getFeedbackFromServer() {
    fetch(this.src)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        for (const feedback of data)
          this._renderFeedbacks(feedback.text, feedback.author, feedback.id)
        this._idCount()
      })
  }

  _renderFeedbacks(text, author, id) {
    let $feedbackDiv = $('<div/>', {
      class: 'feedbackDiv',
      id: id,
    });

    let $text = $('<textarea/>', {
      text: text,
      class: 'feedbackText',
      readonly: "readonly"
    });
    let $author = $('<p/>', {
      text: `${author}:`,
      class: 'feedbackAuthor'
    });

    let $buttonsWrapper = $('<div/>');

    let $BtnApproveFeedback = $('<button/>', {
      class: 'BtnApprove',
      id: id,
      text: 'approve'
    });

    let $BtnDeleteFeedback = $('<button/>', {
      class: 'BtnDelete',
      id: id,
      text: 'delete'
    });

    $author.appendTo($feedbackDiv);
    $text.appendTo($feedbackDiv);
    $BtnApproveFeedback.appendTo($buttonsWrapper);
    $BtnDeleteFeedback.appendTo($buttonsWrapper);
    $buttonsWrapper.appendTo($feedbackDiv);
    $feedbackDiv.prependTo(this.feedback)
  }

  _eventHandlerSubmit() {
    $(this.container).on('click', '#submitFeedbackBtn', event => {
      event.preventDefault();
      this.validate();

      let textarea = document.getElementById('feedbackTextArea');
      let nameInput = document.getElementById('nameInput');
      let errorField = document.getElementById('errorName');
      if (textarea.value.length !== 0 && errorField.getAttribute('data-valid') === 'ок') {
        this._idCount();
        this._renderFeedbacks(textarea.value, nameInput.value, this.idCount);
      }
    })
  }

  _eventHandlerFeedbacks() {
    $(this.feedback).on('click', '.BtnDelete', event => {
      event.preventDefault();
      $(event.target).closest('.feedbackDiv').remove()
    });
    $(this.feedback).on('click', '.BtnApprove', event => {
      event.preventDefault();
      $(event.target).closest('.feedbackDiv').addClass('approved');
      $(event.target).remove()
    })
  }

  _idCount() {
    this.idCount++
  }

  validate() {
    // полe name
    if (document.getElementById('wrapperFeedbackPost')) {
      const name = document.getElementById('nameInput').value;
      this.checkName(name);
    }
  }

  checkName(name){
    if (/^[a-zа-яё]{1,30}$/i.test(name)){
      console.log('Имя введено верно');
      document.getElementById('errorName').innerHTML ='ok';
      document.getElementById('errorName').setAttribute('data-valid', 'ок')
    } else if (name === '') {
      const errorNameEl = document.getElementById('errorName');
      document.getElementById('errorName').setAttribute('data-valid', 'bad');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "please, input you name";
    } else {
      const errorNameEl = document.getElementById('errorName');
      document.getElementById('errorName').setAttribute('data-valid', 'bad');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "only letters allowed";
      console.log('Имя введено неверно');
    }
  }
}
