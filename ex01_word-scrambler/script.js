// select textarea
const userInput = document.querySelector('#user-input');
// select btn
const submitBtn = document.querySelector('#submit-btn');
// select result container
const resultContainer = document.querySelector('#result-container');
// # select wordCount
const wordCountContainer = document.querySelector('#word-count');
// # select letterCount
const letterCountContainer = document.querySelector('#letter-count');

const apiDomain = 'http://connect4.pienter.space';

function getUserInput() {
  // return value of userInput
  const formData = {
    text: userInput.value
  };
  return formData;
}

function sendTextRequest(event) {
  const request = event.target;
    if (request.readyState === 4) {
      const response = JSON.parse(request.responseText);
      console.log('yay');
      if (request.status >= 200 && request.status < 300) {
        resultContainer.textContent = response.scrambled_text;
      } else {
        alert(response.error);
      }
    }
  }

function sendText(event) {
  event.preventDefault();
  const formData = getUserInput();
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', sendTextRequest);
  request.open('POST', apiDomain + '/api/scramble');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));
}

// add click event listener to submitBtn
submitBtn.addEventListener('click', sendText);
