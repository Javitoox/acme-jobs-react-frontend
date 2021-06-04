export function i18nNumber(data, language) {
  var format = "";
  if (language === "en") {
    format = "en-US";
  }
  if (language === "es") {
    format = "de-DE";
  }
  for (var i = 0; i < data.length; i++) {
    data[i].budget = Intl.NumberFormat(format).format(data[i].budget);
  }
}
