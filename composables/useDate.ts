export default () => {

  const selectDateRange = async(dateFrom: string, dateTo: string) => {
    await useFetchApi('/api/date', {
      method: 'POST',
      body:{
        dateFrom,
        dateTo,
      },
    })
  }
  return{
    selectDateRange,
  }
}