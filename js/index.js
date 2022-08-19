'use strict'

const inputEl = document.querySelector('.num-form__input')
const formEl = document.querySelector('.num-form')
const numFormAnswerLessEl = document.querySelector('.num-form__answer--less')
const numFormAnswerBigEl = document.querySelector('.num-form__answer--big')
const numFormBtn = document.querySelector('.num-form__btn')
const answerEl = document.querySelector('#answer')
const trysEl = document.querySelector('.trys')
const infoAnswerEl = document.querySelector('.info__answer')
const infoTrys = document.querySelector('.info__trys')
const modal = document.querySelector('.modal')
const modalInfoTrys = document.querySelector('.modal__info-trys')
const modalInfoAnswer = document.querySelector('.modal__info-answer')
const app = document.querySelector('.app')
const infoGroupNumber = document.querySelector('.info__group-number')
const restartBtn = document.querySelector('.restart-btn')
const recordEl = document.querySelector('#record')
const resetRecordBtn = document.querySelector('.info__btn')

let answer = 0
let minNum = 0
let maxNum = 10
let tryCounter = 0

const getRandomNumber = () => {
	const number = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
	answer = number
	console.log(answer)
	return number
}

const getNumber = () => {
	const number = +inputEl.value
	return number
}

const clearInput = () => {
	inputEl.value = ''
}

const compareNumbers = (inputValue) => {
	numFormAnswerBigEl.classList.remove('num-form__answer--big-active')	
	numFormAnswerLessEl.classList.remove('num-form__answer--less-active')

	if (inputValue === answer) {
		answerEl.textContent = answer
		modal.classList.add('modal--active')
		app.style.overflow = 'hidden'
		numFormBtn.disabled = true
		numFormBtn.style.opacity = 0.5
		inputEl.disabled = true
		renderFinalText()
		setRecord(tryCounter)
	}

	if (inputValue > answer) {
		numFormAnswerBigEl.classList.add('num-form__answer--big-active')	
	}

	if (inputValue < answer) {
		numFormAnswerLessEl.classList.add('num-form__answer--less-active')
	}
}

const validationInput = (inputValue) => {
	if (inputValue >= minNum && inputValue <= maxNum) {
		return true
	} else {
		return false
	}
}

const renderErrorValue = (inputValue) => {
	alert(inputValue + ' Error value!')
}

const renderTryes = (inputValue) => {
	if (trysEl.textContent === '_') {
		trysEl.textContent = inputValue + ' '
	} else {
		trysEl.textContent += inputValue + ' '
	}
}

const renderTryesCount = () => {
		infoGroupNumber.textContent = tryCounter
		tryCounter++
}

const renderFinalText = () => {
	modalInfoTrys.textContent = tryCounter
	modalInfoAnswer.textContent = answer
}

const formHandler = (evt) => {
	evt.preventDefault()
	const inputValue = getNumber()
	clearInput()
	if (validationInput(inputValue)) {
		compareNumbers(inputValue)
	} else {
		renderErrorValue(inputValue)
	}
	renderTryes(inputValue)
	renderTryesCount()
	inputEl.focus()
}

const renderRecord = () => {
	const record = localStorage.getItem('moreOrLessRecord')

	if (record === null || record === 0) {
		recordEl.textContent = '?'
	}else {
		recordEl.textContent = record
	}
}

const setRecord = (value) => {
	const oldRecord = +localStorage.getItem('moreOrLessRecord')

	if (oldRecord > value || oldRecord === 0 || oldRecord === null) {
		localStorage.setItem('moreOrLessRecord', value)
	}
	renderRecord()
}


const init = () => {
	modal.classList.remove('modal--active')
	app.style.overflow = ''
	formEl.addEventListener('submit', formHandler)
	numFormBtn.disabled = false
	numFormBtn.style.opacity = ''
	inputEl.disabled = false
	answer = 0
	minNum = 0
	maxNum = 10
	tryCounter = 0
	trysEl.textContent = '_'
	answerEl.textContent = '?'
	renderRecord()
	getRandomNumber()
	renderTryesCount()
	inputEl.focus()
}


modal.addEventListener('click', (evt) => {
	const target = evt.target

	if (target.classList.contains('modal') || target.classList.contains('modal-close')) {
		modal.classList.remove('modal--active')
		app.style.overflow = ''
		formEl.removeEventListener('submit', formHandler)
	}
})

resetRecordBtn.addEventListener('click', () => {
	localStorage.removeItem('moreOrLessRecord')
	renderRecord()
})

restartBtn.addEventListener('click', init)

init()