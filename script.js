var sentences = [
  { text: 'I play soccer.', type: 'action' },
  { text: 'You run every morning.', type: 'action' },
  { text: 'He reads a book.', type: 'action' },
  { text: 'They cook dinner every night.', type: 'action' },
  { text: 'She plays the piano beautifully.', type: 'action' },
  { text: 'The dog runs fast.', type: 'action' },
  { text: 'The children read their books.', type: 'action' },
  { text: 'The students write their assignments.', type: 'action' },
  { text: 'The chefs cook delicious food.', type: 'action' },
  { text: 'We play board games on weekends.', type: 'action' },
  { text: 'I am happy.', type: 'be' },
  { text: 'You are kind.', type: 'be' },
  { text: 'He is tall.', type: 'be' },
  { text: 'We are excited.', type: 'be' },
  { text: 'They are careful.', type: 'be' },
  { text: 'I was at home.', type: 'be' },
  { text: 'You were in school.', type: 'be' },
  { text: 'He was successful.', type: 'be' },
  { text: 'We were busy.', type: 'be' },
  { text: 'They were young..', type: 'be' }
];

var correctAnswers = localStorage.getItem('correctAnswers') ? parseInt(localStorage.getItem('correctAnswers')) : 0;
var totalAnswers = localStorage.getItem('totalAnswers') ? parseInt(localStorage.getItem('totalAnswers')) : 0;
var currentIndex = null;
var previousIndex = null;
var timeLeft = 5 * 60; // 5 minutes in seconds

// Display the first sentence
nextSentence();

// Start the timer
var timerInterval = setInterval(updateTimer, 1000);

function checkAnswer(answer) {
  var emojiElement = document.getElementById('emoji');
  totalAnswers++;
  if (answer === sentences[currentIndex].type) {
    correctAnswers++;
    document.getElementById('result').innerText = '正解!';
    emojiElement.innerText = '🙆';
    emojiElement.style.fontSize = '50px';
  } else {
    document.getElementById('result').innerText = '不正解。正解は ' + (sentences[currentIndex].type === 'be' ? 'Be動詞' : '一般動詞') + ' です。';
    emojiElement.innerText = '🙅';
    emojiElement.style.fontSize = '50px';
  }
  updateScore();
  setTimeout(nextSentence, 2000);  // Wait for 2 seconds before showing the next sentence
}

function updateScore() {
  var accuracy = (correctAnswers / totalAnswers * 100).toFixed(2);
  document.getElementById('score').innerText = '正解: ' + correctAnswers + ', 不正解: ' + (totalAnswers - correctAnswers) + ', 正解率: ' + accuracy + '%, 総数: ' + totalAnswers;
  localStorage.setItem('correctAnswers', correctAnswers);
  localStorage.setItem('totalAnswers', totalAnswers);
}

function nextSentence() {
  // Store the previous index
  previousIndex = currentIndex;
  // Keep selecting a new index until it is different from the previous one
  do {
    currentIndex = Math.floor(Math.random() * sentences.length);
  } while (currentIndex === previousIndex && sentences.length > 1);

  document.getElementById('sentence').innerText = sentences[currentIndex].text;
  document.getElementById('result').innerText = '';
  document.getElementById('emoji').innerText = '';
}

function updateTimer() {
  timeLeft--;
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  document.getElementById('timer').innerText = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.getElementById('sentence').innerText = '時間切れ!';
    document.getElementById('result').innerText = '';
    document.getElementById('emoji').innerText = '';
  }
}
