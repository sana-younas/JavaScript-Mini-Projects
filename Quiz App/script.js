const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      {text: "Shark", correct: false},
      {text: "Blue Whale", correct: true},
      {text: "Elephant", correct: false},
      {text: "Giraffe", correct: false},
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      {text: "Vatican City", correct: true},
      {text: "Bhutan", correct: false},
      {text: "Nepal", correct: false},
      {text: "Sri Lanka", correct: false},
    ]
  },  
  {
    question: "Which is the largest desert in the world?",
    answers: [
      {text: "Kalahari", correct: false},
      {text: "Gobi", correct: false},
      {text: "Sahara", correct: false},
      {text: "Antarctica", correct: true},
    ]
  },  
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      {text: "Asia", correct: false},
      {text: "Australia", correct: true},
      {text: "Arctic", correct: false},
      {text: "Africa", correct: false},
    ]
  }
]

const questionElm = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function startQuiz(){
  currentIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentIndex];
  let questionNum = currentIndex + 1;
  questionElm.innerHTML = questionNum + ". " + currentQuestion.question; 

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElm.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentIndex++;
  if(currentIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})
startQuiz();