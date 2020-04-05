export default function dateFilter(value, format = 'date') {
  const options = {}

  if (format.includes('date')) {
      options.year  = 'numeric';
      options.month = 'long';
      options.day   = 'numeric';
  }
  if (format.includes('time')) {
      options.hour   = 'numeric';
      options.minute = 'numeric';
      options.second = 'numeric';
  }

  // 'uk-UK' show as Ukrainian language
  return new Intl.DateTimeFormat('ru-RU', options).format( new Date(value))
}
