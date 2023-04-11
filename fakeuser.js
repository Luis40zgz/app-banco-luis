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
