const { faker } = require('@faker-js/faker')
const { fs } = require('fs')
const { writeFile } = require('fs/promises')

async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data)
    console.log(`Wrote data to ${fileName}`)
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`)
  }
}

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

const users = [
  { name: 'Juan Sánchez', pin: 1111 },
  { name: 'María Portazgo', pin: 2222 },
  { name: 'Estefanía Pueyo', pin: 3333 },
  { name: 'Javier Rodríguez', pin: 4444 },
]

const value = faker.finance.amount(-500, 1500)
const date = formatDate(
  faker.date.between('2020-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
)

const generarDatos = () => {
  const array = []
  users.forEach((element) => {})
}
data = generarDatos()
