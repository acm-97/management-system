import {columnTypes} from '@/constants'

export const getNumbers = (info: any[], columnType: string) => {
  const numbers: any[] = []
  info.forEach(item => {
    Object.keys(item).forEach(key => {
      const parsedKey = key.split('_')[0]
      if (parsedKey === columnType) {
        numbers.push(!isNaN(Number(item[key])) ? Number(item[key]) : 0)
      }
    })
  })
  return numbers.reduce((curr, acc, i) => (acc += curr), 0)
}

export const getCurrency = (info: any[], columnType: string) => {
  const numbers: number[] = []
  const currencies: number[] = []

  info.forEach(item => {
    Object.keys(item).forEach(key => {
      const parsedKey = key.split('_')[0]
      if (parsedKey === columnTypes.NUMBER) {
        numbers.push(Number(item[key]))
      }
      if (parsedKey === columnTypes.CURRENCY) {
        currencies.push(Number(item[key]))
      }
    })
  })
  const init = numbers[0] * currencies[0]

  return numbers.slice(1).reduce((acc, curr, i) => {
    return (acc += curr * currencies.slice(1)[i])
  }, init)
}
