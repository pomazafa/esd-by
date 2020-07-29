const translate = require('@vitalets/google-translate-api');
const i18n = require('i18n');

exports.translate = async (object, fields) => {
  if (i18n.getLocale() === 'en') {
    for (let index = 0; index < fields.length; index++) {
      const initialValue = object[fields[index]];
      if (initialValue) {
        const translatedField = await translate(initialValue, { to: 'en' });
        object[fields[index]] = translatedField.text;
      }
    }
  }
};
