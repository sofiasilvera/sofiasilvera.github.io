// Number of questions. Max=52.
const NUMQUESTIONS = 5;

// List of questions.
let questionsMap = new Map();

// The sequence of the quiz.
let quizSequence = [];

// Store the quiz stats.
let quizStats = {
  counter: 0,
  correct: 0,
  wrong: 0,
  currentQuestion: 0 };


// The questions.
function quizQuestions() {
  questionsMap.set(1, {
    question: "¿Dejarías a un niño juegar con nosotras?",
    a: "No.",
    b: "Quizás.",
    c: "Si.",
    d: "Lo wa pensar.",
    answer: "a" });

  questionsMap.set(2, {
    question: "¿Dónde nos puedes encontrar?",
    a: "Corteza de árboles.",
    b: "Arena.",
    c: "Agua.",
    d: "Todas las anteriores.",
    answer: "d" });

  questionsMap.set(3, {
    question: "¿Sabes cúal es nuestro alimentos?",
    a: "Coca Cola.",
    b: "Fosfato.",
    c: "Mojito.",
    d: "Cloro.",
    answer: "b" });

  questionsMap.set(4, {
    question: "¿Quién corre riesgo en nuestras manos?",
    a: "Todos.",
    b: "Los animales.",
    c: "Los ancianos.",
    d: "Los niños.",
    answer: "a" });

  questionsMap.set(5, {
    question: "¿Por qué nos llaman floraciones?",
    a: "Porque estamos en el agua.",
    b: "Porque somos visibles.",
    c: "No hay porque.",
    d: "Porque somos malas>:).",
    answer: "b" });

}

// Get the containers.
let questionContainer = document.getElementById("the-question"),
answerA = document.getElementById("first-answer"),
answerB = document.getElementById("second-answer"),
answerC = document.getElementById("third-answer"),
answerD = document.getElementById("fourth-answer"),
scoreCounter = document.getElementById("score-counter");

// Add question keys to the quiz sequence array.
function determineSequence() {
  // Populate quizSequence.
  for (let [key, value] of questionsMap) {
    quizSequence.push(key);
  }

  // Shuffle an array.
  function shuffle(array) {
    let currentIndex = array.length,
    temporaryValue,
    randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
    // See: http://stackoverflow.com/a/2450976/4429450
  }

  // Randomize quizSequence.
  quizSequence = shuffle(quizSequence);
}

// Get the next question.
function getNextQuestion() {
  // Up the counter.
  quizStats.counter++;

  // Get the question number.
  let qn = quizSequence.shift();

  // Set up the question and answers.
  let a = questionsMap.get(qn).a,
  b = questionsMap.get(qn).b,
  c = questionsMap.get(qn).c,
  d = questionsMap.get(qn).d,
  question = questionsMap.get(qn).question;

  // Print the questions.
  questionContainer.textContent = question;
  answerA.textContent = a;
  answerB.textContent = b;
  answerC.textContent = c;
  answerD.textContent = d;

  // Track the current question.
  quizStats.currentQuestion = qn;
}

// Add event listeners.
function addEventListeners() {
  answerA.addEventListener("click", checkTheAnswer);
  answerB.addEventListener("click", checkTheAnswer);
  answerC.addEventListener("click", checkTheAnswer);
  answerD.addEventListener("click", checkTheAnswer);
}

// Add data attributes.
function addDataAttributes() {
  answerA.setAttribute("data-answer", "a");
  answerB.setAttribute("data-answer", "b");
  answerC.setAttribute("data-answer", "c");
  answerD.setAttribute("data-answer", "d");
}

// Check the answer.
function checkTheAnswer() {
  // Get the answers.
  let givenAnswer = this.dataset.answer,
  correctAnswer = questionsMap.get(quizStats.currentQuestion).answer;

  // Check given and correct answers.
  if (givenAnswer === correctAnswer) {
    quizStats.correct++;
    this.classList.add("correct");
  } else
  {
    quizStats.wrong++;
    this.classList.add("wrong");
  }

  // Update the counter.
  scoreCounter.textContent = quizStats.correct;

  // Check if max num of questions has been reached.
  if (quizStats.counter < NUMQUESTIONS) {
    setTimeout(clearClasses, 2000);
    setTimeout(getNextQuestion, 2000);
  }
  // If so, stop the quiz.
  else {
      showTheResults();
    }
}

// Clear classes.
function clearClasses() {
  answerA.classList.remove("correct", "wrong");
  answerB.classList.remove("correct", "wrong");
  answerC.classList.remove("correct", "wrong");
  answerD.classList.remove("correct", "wrong");
}

// The results.
function showTheResults() {
  // Get the containers.
  let numCorrect = document.getElementById("num-correct"),
  numWrong = document.getElementById("num-wrong"),
  numTotal = document.getElementById("num-total");

  // Get the results.
  let correct = quizStats.correct,
  wrong = quizStats.wrong,
  total = NUMQUESTIONS;

  // Print the results.
  numCorrect.textContent = correct;
  numWrong.textContent = wrong;
  numTotal.textContent = total;

  // Display the results.
  document.getElementsByClassName("results-container")[0].classList.add("display");
}

//Let's start!
(function startQuiz() {
  // Init.
  quizQuestions();
  determineSequence();
  getNextQuestion();
  addEventListeners();
  addDataAttributes();
})();

