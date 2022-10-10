const questions = [
	{
		question: "В каком году была революция 1917?",
		answers: ["1917", "1914", "1947", "1927"],
		correct: 1,
	},
	{
		question: "Первый человек полетевший в космос?",
		answers: [
			"Ленин",
			"Галкин",
			"Гагарин",
			"Королев",
		],
		correct: 3,
	},
	{
		question: "Тестовый вопрос 3",
		answers: [
			"Вопрос 1",
			"Вопрос 2",
			"Вопрос 3",
			"Вопрос 4",
		],
		correct: 1,
	},
	{
		question: "Тестовый вопрос 4",
		answers: [
			"Вопрос 1",
			"Вопрос 2",
			"Вопрос 3",
			"Вопрос 4",
		],
		correct: 2,
	},
];


const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0
let questionIndex = 0

clearPage()
showQuestion()
checkAnswer()

submitBtn.onclick = checkAnswer


function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {

	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
	headerContainer.innerHTML = title

	let answerNumber = 1
	for (answerText of questions[questionIndex]['answers']) {

		const questionTemplate =
			`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`


		let answerHtml = questionTemplate.replace('%answer%', answerText)
		answerHtml = answerHtml.replace('%number%', answerNumber)

		listContainer.innerHTML += answerHtml
		answerNumber++
	}
}

function checkAnswer() {
	checkedRadio = listContainer.querySelector('input:checked')

	if (!checkedRadio) {
		submitBtn.blur()
		return
	}

	const userAnswer = parseInt(checkedRadio.value)



	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQuestion()

	} else {
		clearPage()
		showResults()
	}

}

function showResults() {


	const resultsTemplate = `
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`

	let title, message

	if (score === questions.length) {
		title = "Поздравляем!"
		message = "Вы ответили на все вопросы!"
	} else if ((score * 100) / questions.length >= 50) {
		title = "Неплохой результат!"
		message = "Вы дали более половины правильных ответов!"
	} else {
		title = "Иди учись!"
		message = "У вас меньше половины правильных ответов"
	}

	let result = `${score} из ${questions.length}`

	finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)

	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerText = 'Начать заново'
	submitBtn.onclick = () => { history.go() }

}
