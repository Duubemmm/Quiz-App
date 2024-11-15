const quizQuestions = [
    {
        question: "What is the primary purpose of blockchain technology in cryptocurrency?",
        answers: [
        {option: "To verify and record transactions securely", correct:true},
        {option: "To store personal information", correct:false},
        {option: "To enable faster internet speed", correct:false},
        {option: "To create video games", correct:false},
     ]
    },

    {
         question: "What is the name of the first cryptocurrency ever created?",
        answers: [
        {option: " Ethereum", correct:false},
        {option: "Litecoin", correct:false},
        {option: "Bitcoin", correct:true},
        {option: "Dogecoin", correct:false},
     ]
    },

    {
        question: "Who is credited with the invention of Bitcoin?",
        answers: [
        {option: "CZ Binance", correct:false},
        {option: "Satoshi Nakamoto", correct:true},
        {option: "Elon Musk", correct:false},
        {option: "Vitalik Buterin", correct:false},
     ]
    },

    {
        question: 'What is a "wallet" in the context of cryptocurrency?',
        answers: [
        {option: "A software or hardware tool to store private keys", correct:true},
        {option: "A place to trade cryptocurrency", correct:false},
        {option: "A physical purse for holding coins", correct:false},
        {option: "A platform to mine cryptocurrency", correct:false},
     ]
    },

    {
        question: 'Which cryptocurrency is commonly known as "digital gold"?',
        answers: [
        {option: "Ethereum", correct:false},
        {option: "Solana", correct:false},
        {option: "Litecoin", correct:false},
        {option: "Bitcoin", correct:true},
     ]
    }
]

const question = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-question")

let currentQuestionIndex = 0;
let quizScore = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    quizScore = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion (){
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    question.innerHTML = questionNumber + " / " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.option;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        quizScore++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
resetState();
question.innerHTML = `You scored ${quizScore} out of ${quizQuestions.length}!`;
nextButton.innerHTML = "Play Again";
nextButton.style.display = "block";
}

function nextQuiz(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", nextQuizQuestion);

function nextQuizQuestion(){
    if (currentQuestionIndex < quizQuestions.length){
       nextQuiz(); 
    }
    else{startQuiz();

    }
}
startQuiz();