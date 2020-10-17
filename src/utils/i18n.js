import I18n from 'i18n-js'
import en from '../locales/en'
import es from '../locales/es'
import jp from '../locales/jp'
import de from '../locales/de'
import fr from '../locales/fr'
import LocalStorageUtils from '../localStorageUtils'
import moment from 'moment'

export const setLocale = (locale) => {
  I18n.locale = locale
  moment.locale(locale)
}

setLocale(LocalStorageUtils.getLocale())

I18n.fallbacks = true
I18n.translations = {
  en,
  es,
  jp,
  de,
  fr
}

// Translate multiple
I18n.tm = (scopes, separator = ' ') => {
  const translations = scopes.map((scope, index) => {
    let translation = I18n.t(scope)
    if (index !== 0) {
      translation = translation.toLowerCase()
    }
    return translation
  })
  return translations.join(separator)
}

export default I18n
