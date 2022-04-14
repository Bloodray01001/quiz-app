const DATA = [
    {
        question: 'Вопрос 1',
        answers: [
            {
                id: '1',
                value: 'ответ 1',
                correct: true
            },
            {
                id: '2',
                value: 'ответ 2',
                correct: false
            },
            {
                id: '3',
                value: 'ответ 3',
                correct: false
            },
            {
                id: '4',
                value: 'ответ 4',
                correct: false
            }
        ]
    },
    {
        question: 'Вопрос 2',
        answers: [
            {
                id: '5',
                value: 'ответ 1',
                correct: true
            },
            {
                id: '6',
                value: 'ответ 2',
                correct: false
            },
            {
                id: '7',
                value: 'ответ 3',
                correct: false
            },
            {
                id: '8',
                value: 'ответ 4',
                correct: false
            }
        ]
    }
]
let localresults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btn_next = document.getElementById('btn-next')
const btn_restart = document.getElementById('btn-restart');
// Рендер Вопросов
const renderQuestion = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map((answer) => `
            <li>
                <label>
                    <input class='answer-input' type="radio" name=${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
    `) 
    
    .join('');
    questions.innerHTML = `
        <div class="quiz_questions-item">
            <div class="quiz_questions-item__question">${DATA[index].question}</div>
            <ul class="quiz_questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';

    const getClassname = (answer, questionIndex) => {
        let classname = '';

        if (!answer.correct && answer.id === localresults[questionIndex]) {
            classname = 'answer--invalid';
        } else if (answer.correct) {
            classname = 'answer--valid';
        }

        return classname;
    }
    const getAnswer = (questionIndex) => DATA[questionIndex].answers
    .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`).join('');

    
    DATA.forEach((questions, index) => {
        content += `
        <div class="quiz_results-item">
            <div class="quiz_results-item__question">${questions.question}</div>
            <ul class="quiz_results-item__answers">${getAnswer(index)}</ul>
        </div>
        `;
    });
    results.innerHTML = content;
};

    // let content = '';

    

    // const getAnswers = (questionIndex) => DATA[questionIndex.answers
    //         .map((answer) => `<li>${answer.value}</li>`).join('')


    //     DATA.forEach((questions, index) => {
    //         content += `
    //         <div class="quiz_results-item">
    //             <div class="quiz_results-item__question">${questions.question}</div>
    //             <ul class="quiz_results-item__question">${getAnswers(index)}</ul>
    //         </div>
    //         `
    // });

    // results.innerHTML = content;


const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if(event.target.classList.contains('answer-input')) {
        localresults[event.target.name] = event.target.value;
        btn_next.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-next')) {

        const nextQuestionIndex = (Number(questions.dataset.currentStep) + 1);

        if(DATA.length === nextQuestionIndex) {
            questions.classList.add('questions_hidden');
            indicator.classList.add('indicator_hidden');
            results.classList.add('results_visible');
            btn_next.classList.add('btn_next_hidden');
            btn_restart.classList.add('btn_restart_visible');

            renderResults();
        } else {
            renderQuestion (nextQuestionIndex);
        }

        btn_next.disabled = true;
    }
    if(event.target.classList.contains('btn-restart')) {
        localresults = {};
        results.innerHTML = '';

        questions.classList.remove('questions_hidden');
        indicator.classList.remove('indicator_hidden');
        results.classList.remove('results_visible');
        btn_next.classList.remove('btn_next_hidden');
        btn_restart.classList.remove('btn_restart_visible');
        
        renderQuestion(0);

    }
});

renderQuestion(0);
