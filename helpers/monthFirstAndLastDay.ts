export const monthFirstAndLastDay = (date:Date) => {
  const offset = new Date().getTimezoneOffset() / 60
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 0-offset);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0-offset);

  return {
    firstDay,
    lastDay,
  }
}