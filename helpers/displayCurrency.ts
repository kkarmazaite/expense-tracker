export const displayCurrency = (value:number) => {
  return new Intl.NumberFormat('de-DE', { 
    style: 'currency', 
    currency: 'EUR',
    currencyDisplay:'code',
  }).format(value)
}