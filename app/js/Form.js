class Form  {
  constructor (src, container) {
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
  _render(){
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

    let $paragraphLength = $('<p/>',{
      text: 'Максимальное кол-во символов: 600',
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

    $label.appendTo(this.container);
    $textarea.appendTo(this.container);
    $paragraphLength.appendTo(this.container);
    $btnSubmitFeedback.appendTo(this.container);
    $feedbacksWrapper.appendTo(this.container);
  }
  _getFeedbackFromServer(){
    fetch(this.src)
      .then (result => result.json())
      .then (data => {
        console.log(data);
        for(const feedback of data)
        this._renderFeedbacks(feedback.text, feedback.author, feedback.id)
        this._idCount()
      })
  }

  _renderFeedbacks(text, author, id){
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
      text: 'утвердить'
    });

    let $BtnDeleteFeedback = $('<button/>', {
      class: 'BtnDelete',
      id: id,
      text: 'удалить'
    });

    $author.appendTo($feedbackDiv);
    $text.appendTo($feedbackDiv);
    $BtnApproveFeedback.appendTo($buttonsWrapper);
    $BtnDeleteFeedback.appendTo($buttonsWrapper);
    $buttonsWrapper.appendTo($feedbackDiv);
    $feedbackDiv.prependTo(this.feedback)
  }

  _eventHandlerSubmit(){
    $(this.container).on('click', '#submitFeedbackBtn', event => {
      event.preventDefault();
      let textarea = document.getElementById('feedbackTextArea');
      if (textarea.value.length !== 0) {
        this._idCount();
        this._renderFeedbacks(textarea.value, textarea.value.length, this.idCount);
        console.log(this.idCount);
      }
    })
  }

  _eventHandlerFeedbacks(){
    $(this.feedback).on('click', '.BtnDelete', event => {
      event.preventDefault();
      $(event.target).parent().remove()
    });
    $(this.feedback).on('click', '.BtnApprove', event => {
      event.preventDefault();
      $(event.target).closest('.feedbackDiv').addClass('approved');
    })
  }

  _idCount(){
    this.idCount++
  }

}
