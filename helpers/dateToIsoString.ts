export const dateToIsoString = (date:Date) => {

  const pad = (number: number) => number < 10 ? '0' + number : number

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}