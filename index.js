// Import countries data

import { countries } from "./countries.js"
const allCountryNames = countries

// Get DOM elements

const getElement = (selector) => document.querySelector(selector)

const totalCountriesElement = getElement('.total-countries-number')
const lettersAndCountParent = getElement('.letter-countries-number')
const startingLetterBtn = getElement('.starting-letter-btn')
const anyLetterBtn = getElement('.any-letter-btn')
const letterOrderBtn = getElement('.order-btn')
const searchInputElement = getElement('.search-input')
const bottomContainer = getElement('.bottom-container')

// Event listeners

window.addEventListener('load', function () {
    totalCountriesElement.textContent = `Total number of countries are: ${allCountryNames.length}`
    renderCountryElements(allCountryNames)
})

startingLetterBtn.addEventListener('click', function () {
    checkClass(this, anyLetterBtn, 'btn-active')
    clearAndRender(allCountryNames)
})

anyLetterBtn.addEventListener('click', function () {
    checkClass(this, startingLetterBtn, 'btn-active')
    clearAndRender(allCountryNames)
})

letterOrderBtn.addEventListener('click', function () {
    letterOrderBtn.classList.toggle('btn-active')
    clearAndRender(allCountryNames)
})

searchInputElement.addEventListener('input', function (event) {
    const searchInputValue = event.target.value
    if (!searchInputValue.trim()) {
        console.log('Enter a non empty value!')
    } else {
        const searchedCountries = filterCountries(searchInputValue.toLowerCase())
        getOrderedCountries(searchedCountries)

        if (searchInputValue.length > 0) {
            lettersAndCountParent.classList.remove('hidden')
            displayLetterAndCount(searchInputValue, searchedCountries.length)
        }
    }
})

// Functions

function checkClass(callingBtn, otherBtn, className) {
    if (otherBtn.classList.contains(className)) {
        otherBtn.classList.remove(className)
    }
    callingBtn.classList.add(className)
}

function clearAndRender(countries) {
    clearValues()
    renderCountryElements(countries)
}

function filterCountries(searchInputValue) {
    if (startingLetterBtn.classList.contains('btn-active')) {
        return allCountryNames.filter(country => country.toLowerCase().startsWith(searchInputValue))
    } else {
        return allCountryNames.filter(country => country.toLowerCase().includes(searchInputValue))
    }
}

function renderCountryElements(givenCountries) {
    bottomContainer.innerHTML = ''
    givenCountries.forEach(country => {
        const countryDiv = document.createElement('div')
        countryDiv.classList.add('item')

        const countryP = document.createElement('p')
        countryP.textContent = country
        countryP.classList.add('item-data')

        countryDiv.appendChild(countryP)
        bottomContainer.appendChild(countryDiv)
    })
}

function clearValues() {
    searchInputElement.value = ''
    bottomContainer.innerHTML = ''
    lettersAndCountParent.classList.add('hidden')
}

function displayLetterAndCount(searchInputCharacters, countriesMatchedCount) {
    const inputLettersSpan = document.querySelector('.current-letters')
    inputLettersSpan.textContent = searchInputCharacters

    const inputLettersCountSpan = document.querySelector('.current-letters-count')
    inputLettersCountSpan.textContent = countriesMatchedCount
}

function getOrderedCountries(searchedCountries) {
    if (!letterOrderBtn.classList.contains('btn-active')) {
        renderCountryElements(searchedCountries)
    } else {
        const reverseOrderCountries = searchedCountries.slice().sort((a, b) => b.localeCompare(a))
        renderCountryElements(reverseOrderCountries)
    }
}