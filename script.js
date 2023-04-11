'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
const account1 = {
  owner: 'Juan Sánchez',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'María Portazgo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Estefanía Pueyo',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Javier Rodríguez',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Metodo para formatear la fecha en el formato inicial que propone el ejercicio
const formatDate = (fecha) => {
  const year = fecha.getFullYear()
  const month =
    fecha.getMonth().toString.length < 2
      ? `0${fecha.getMonth()}`
      : fecha.getMonth()
  const day =
    fecha.getDay().toString.length < 2 ? `0${fecha.getDay()}` : fecha.getDay()
  return `${year}-${month}-${day}`
}

// Metodo para crear fechas aleatorias

const fakeDate = () => {
  const yearRand = Math.floor(Math.random() * 3) + 2020
  const year = yearRand.toString()
  const monthRand = Math.floor(Math.random() * 12).toString()
  const month = monthRand.length < 2 ? `0${monthRand}` : monthRand
  const dayRand = Math.floor(Math.random() * 28).toString()
  const day = dayRand.length < 2 ? `0${dayRand}` : dayRand
  return `${year}-${month}-${day}`
}

// Metodo para generar cantidades aleatorias

const fakeAmount = () => Math.floor(Math.random() * 200000 - 50000) / 100

accounts.forEach((account) => {
  account.movements = account.movements
    .map((a) => (a = { date: fakeDate(), value: fakeAmount() }))
    .sort((a, b) => a.date - b.date)
})

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnLogout = document.querySelector('.logout__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

let logedAccount = null

//Init data

const createUsernames = () => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('')
  })
}
createUsernames()
btnLogin.addEventListener('click', (e) => {
  e.preventDefault()
  const username = inputLoginUsername.value
  const pin = Number(inputLoginPin.value)
  const currentAccount = accounts.find(
    (account) => account.username === username
  )
  logedAccount = currentAccount

  //Si la cuenta no existe porque no hay un usuario con ese nombre,
  // la variable currentAccount es nula y al acceder al pin de un objeto nulo da error
  //se soluciona con el operador '?'
  if (currentAccount?.pin === pin) {
    console.log('Credenciales correctas')
    labelWelcome.textContent = `Bienvenido ${
      currentAccount.owner.split(' ')[0]
    }`
    containerApp.style.opacity = 100
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'initial'
    updateUI(currentAccount)
  }
})

// Implementamos un boton de logout

btnLogout.addEventListener('click', (e) => {
  e.preventDefault()
  btnLogin.style.display = 'initial'
  btnLogout.style.display = 'none'
  labelWelcome.textContent = 'Log in to get started'
  containerApp.style.opacity = 0
  logedAccount = null
})

const updateUI = (currentAccount) => {
  const { movements } = currentAccount
  const values = movements.map(({ value }) => value)
  calcAndDisplayBalance(values)
  calcAndDisplaySummary(currentAccount.interestRate, values)
  showMovements(currentAccount)
}
const calcAndDisplayBalance = (movements) => {
  const { value } = movements
  const balance = movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = balance.toFixed(2)
}
const calcAndDisplaySummary = (interestRate, movements) => {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = incomes.toFixed(2)
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = out.toFixed(2)
  // calculo de intereses:
  // Teniendo en cuenra solo los ingresos superioores a 100€
  // y que el interes es de cada usuario
  // y que los intereses sean superiores a 2€
  const interest = movements
    .filter((mov) => mov > 100)
    .map((mov) => (mov * interestRate) / 100)
    .filter((int) => int > 2)
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = interest.toFixed(2)
}
const showMovements = (currentAccount) => {
  const { movements } = currentAccount
  containerMovements.innerHTML = ''
  movements.forEach((mov, i) => {
    const { value, date } = mov
    const type = value > 0 ? 'deposit' : 'withdrawal'
    const movHTML = `<div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type} </div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${value}€</div>
        </div>`

    containerMovements.insertAdjacentHTML('afterbegin', movHTML)
  })
}

// Implementación de la stranferencias

// Obtención de la fecha con formato adecuado al modelo

const transferDate = () => {
  const fecha = new Date()
  return formatDate(fecha)
}

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()
  const sendingAccount = accounts.find(
    (account) => account.owner === inputTransferTo.value
  )
  const amount = Number(inputTransferAmount.value)
  if (
    sendingAccount &&
    amount <= Number(labelBalance.textContent) &&
    amount > 0
  ) {
    const currentDate = transferDate()
    logedAccount.movements.push({
      date: currentDate,
      value: -amount,
    })
    sendingAccount.movements.push({
      date: currentDate,
      value: amount,
    })
    updateUI(logedAccount)
  }
  inputTransferTo.value = ''
  inputTransferAmount.value = ''
})

//Implementación de solicitud de préstamos

btnLoan.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('estoy aqui')
  const amount = Number(inputLoanAmount.value)
  const currentDate = transferDate()
  if (amount > 0)
    logedAccount.movements.push({
      date: currentDate,
      value: amount,
    })
  updateUI(logedAccount)
  inputLoanAmount.value = ''
})

//Implementacion de cerrar cuenta

btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  if (
    inputCloseUsername.value === logedAccount.username &&
    Number(inputClosePin.value) === logedAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === logedAccount.username
    )
    console.log(index)
    // .indexOf(23)
    // Delete account
    accounts.splice(index, 1)
    // Hide UI
    containerApp.style.opacity = 0
  }
  inputCloseUsername.value = inputClosePin.value = ''
})

// Implementación de la función sort

btnSort.addEventListener('click', (e) => {
  e.preventDefault()
  logedAccount.movements = logedAccount.movements.sort(
    (a, b) => a.value - b.value
  )
  updateUI(logedAccount)
})
