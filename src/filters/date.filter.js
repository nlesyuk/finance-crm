import store from '@/store/store'

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
  const locale = store.getters.info.locale || 'en-US'
  return new Intl.DateTimeFormat(locale, options).format( new Date(value))
}
