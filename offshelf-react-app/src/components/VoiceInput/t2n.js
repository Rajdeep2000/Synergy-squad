var units = {
    'en': {
      'zero': 0,
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
      'thirteen': 13,
      'fourteen': 14,
      'fifteen': 15,
      'sixteen': 16,
      'seventeen': 17,
      'eighteen': 18,
      'nineteen': 19
    }
  }
  
  var tens = {
    'en': {
      'twenty': 20,
      'thirty': 30,
      'forty': 40,
      'fifty': 50,
      'sixty': 60,
      'seventy': 70,
      'eighty': 80,
      'ninety': 90
    }
  }
  
  var magnitude = {
    'en': {
      'hundred': 100,
      'thousand': 1000,
      'million': 1000000,
      'billion': 1000000000,
      'trillion': 1000000000000,
      'quadrillion': 1000000000000000,
      'quintillion': 1000000000000000000,
      'sextillion': 1000000000000000000000,
      'septillion': 1000000000000000000000000,
      'octillion': 1000000000000000000000000000,
      'nonillion': 1000000000000000000000000000000,
      'decillion': 1000000000000000000000000000000000
    }
  }
  
  export function text2num (text, language) {
    let textArray = text.toLowerCase().replace(/ and /g, ' ').split(' ')
    let temp = null
    let result = 0
    for (let word of textArray) {
      if (units[language].hasOwnProperty(word)) {
        if (textArray.indexOf(word) === textArray.length - 1) {
          result += (temp === null) ? units[language][word] : temp + units[language][word]
        } else {
          temp = (temp === null) ? units[language][word] : temp + units[language][word]
        }
      } else if (tens[language].hasOwnProperty(word)) {
        if (textArray.indexOf(word) === textArray.length - 1) {
          result += units[language][word]
        } else {
          temp = tens[language][word]
        }
      } else if (magnitude[language].hasOwnProperty(word)) {
        result += magnitude[language][word] * temp
        temp = null
      } else {
        return null
      }
    }
    return result
  }
  