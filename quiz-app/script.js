const quizData = [
    {
        question : 'How old is Florin?',
        a : '10',
        b : '17',
        c : '26',
        d : '110',
        correct : 'c'
    },
    
    {
        question : 'What is the most used programming language in ?',
        a : 'Java',
        b : 'C',
        c : 'Python',
        d : 'JavaScript',
        correct : 'a'
    },
    
    {
        question : 'Who is he President of Us?',
        a : 'Florin Pop',
        b : 'Donald Trump',
        c : 'Ivan Saldano',
        d : 'Mihai Andrei',
        correct : 'b'
    },
    
    {
        question : 'What does HTML stand for?',
        a : 'Hypertext Markup Language',
        b : 'Cascading Style Sheet',
        c : 'Jason Object Notation',
        d : 'Helicopters Terminals Motorboats Lamborginis',
        correct : 'a'
    },
    
    {
        question : 'What year was JavaScript Launched?',
        a : '1996',
        b : '1995',
        c : '1994',
        d : 'none of the above',
        correct : 'd'
    }
]

const quizContainer = document.getElementById('quiz-container');
const quizTitle = document.querySelector('h2');
const a_text = document.getElementById('a').nextElementSibling;
const b_text = document.getElementById('b').nextElementSibling;
const c_text = document.getElementById('c').nextElementSibling;
const d_text = document.getElementById('d').nextElementSibling;

let currentQuiz = 0;
let score = 0; 

function loadQuiz(){
    const { question, a, b, c, d } = quizData[currentQuiz];

    quizTitle.innerText = question;
    a_text.innerText = a;
    b_text.innerText = b;
    c_text.innerText = c;
    d_text.innerText = d;
};

function getSelected(){
    const answerEl = document.querySelector('input[type="radio"]:checked');

    if(answerEl){
        answerEl.checked = false;
    }

    return answerEl ? answerEl.id : undefined;
}

loadQuiz();

document.getElementById("submitBtn").addEventListener('click', e => {
    const answer = getSelected();
    
    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        if(currentQuiz < quizData.length-1 ){
            currentQuiz++;
            loadQuiz();
        }else{
            quizContainer.innerHTML = `Your Score : ${score} / ${quizData.length}`;
            quizContainer.style.padding = '20px';
        }
    }else{
        alert('choose the correct answer!');
    }
})