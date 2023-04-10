const { faker } = require('@faker-js/faker')
const { fs } = require('fs')

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

const firstName = faker.name.fullName()
const date = faker.date.between(
  '2020-01-01T00:00:00.000Z',
  '2023-30-01T00:00:00.000Z'
)
const amount = faker.finance.amount(-500, 1000)
const interestRate = faker.finance.amount(0.5, 2.0)
