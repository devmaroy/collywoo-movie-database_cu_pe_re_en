export default (
  amount = 0,
  locale = 'en-US',
  style = 'currency',
  currency = 'USD',
) => {
  const formatter = new Intl.NumberFormat(locale, { style, currency });
  return formatter.format(amount);
};
