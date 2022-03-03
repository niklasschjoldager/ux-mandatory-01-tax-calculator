const taxForm = document.querySelector(".js-tax-calculator-form")
const monetaryAmountInput = document.querySelector(".js-input-monetary-amount")
const taxPercentageInput = document.querySelector(".js-input-tax-percentage")
const taxAmountResult = document.querySelector(".js-tax-amount-result")
const finalAmountResult = document.querySelector(".js-final-amount-result")

const MONETARY_AMOUNT_MIN = 1
const TAX_PERCENTAGE_MIN = 1
const TAX_PERCENTAGE_MAX = 100

taxForm.addEventListener("submit", handleTaxCalculator)

function handleTaxCalculator(event) {
  event.preventDefault()
  hideErrors()
  const { monetaryAmount, taxPercentage } = getUserInputs()
  const { isFormValid, errors } = getFormState(monetaryAmount, taxPercentage)

  if (isFormValid) {
    const { taxAmount, finalAmount } = getTaxCalculations(monetaryAmount, taxPercentage)
    displayResult(taxAmount, finalAmount)
  } else {
    displayErrors(errors)
  }
}

function getFormState(monetaryAmount, taxPercentage) {
  const errors = []
  let isFormValid = true

  if (taxPercentage < TAX_PERCENTAGE_MIN) {
    errors.push({
      target: taxPercentageInput,
      message: "Tax percentage cannot be lower than 100%. Please enter a  valid tax percentage between 1% and 100%",
    })
    isFormValid = false
  }

  if (taxPercentage > TAX_PERCENTAGE_MAX) {
    errors.push({
      target: taxPercentageInput,
      message: "Tax percentage cannot be higher than 100%. Please enter a valid tax percentage.",
    })
    isFormValid = false
  }

  if (monetaryAmount < MONETARY_AMOUNT_MIN) {
    errors.push({
      target: monetaryAmountInput,
      message: "Monetary amount cannot be lower than 1. Please enter a valid amount.",
    })
    isFormValid = false
  }

  return { isFormValid: isFormValid, errors: errors }
}

function getTaxCalculations(monetaryAmount, taxPercentage) {
  const taxAmount = (taxPercentage / 100) * monetaryAmount
  const finalAmount = monetaryAmount - taxAmount

  return { taxAmount, finalAmount }
}

function displayResult(taxAmount, finalAmount) {
  taxAmountResult.textContent = taxAmount.toFixed(2)
  finalAmountResult.textContent = finalAmount.toFixed(2)
}

function displayErrors(errors) {
  errors.forEach((error) => {
    const errorBox = error.target.nextElementSibling
    errorBox.textContent = error.message
    errorBox.classList.remove("is-hidden")
  })
}

function hideErrors() {
  const errorBoxes = taxForm.querySelectorAll(".c-error")
  errorBoxes.forEach((box) => {
    box.textContent = ""
    box.classList.add("is-hidden")
  })
}

function getUserInputs() {
  const monetaryAmount = parseFloat(monetaryAmountInput.value)
  const taxPercentage = parseFloat(taxPercentageInput.value)

  return { monetaryAmount, taxPercentage }
}
