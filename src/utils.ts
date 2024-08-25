export const formatDateWithOffset = (dateString: string, offsetHours: number = 7): string => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + offsetHours);

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (value: number, locale: string = 'id-ID', currency: string = 'IDR'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};