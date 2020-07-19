<template>
  <div>
    <input type="file" ref="myFile" @change="selectedFile" />
  </div>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'

const config = {
  delimiter: '', // auto-detect
  newline: '', // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  transformHeader: undefined,
  dynamicTyping: false,
  preview: 0,
  encoding: '',
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  downloadRequestHeaders: undefined,
  downloadRequestBody: undefined,
  skipEmptyLines: false,
  chunk: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: undefined,
  delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
}

export default {
  data: {
    text: ''
  },
  methods: {
    selectedFile: function () {
      const data = Papa.parse(this.$refs.myFile.files[0], {
        ...config,
        delimiter: ';',
        encoding: 'windows-1251',
        skipEmptyLines: true,
        complete: (result) => {
          this.$emit('loaded', extractSpends(result.data))
        }
      })
    }
  }
}

function extractSpends(lines) {
  const result = []
  _.each(lines, (line) => {
    const amount = parseFloat(line['Сумма операции'])

    if (amount <= 0 && line['Статус'] === 'OK') {
      const name = line['Описание']
      if (name !== 'Перевод между счетами') {
        result.push({
          date: line['Дата операции'],
          category: line['Категория'],
          name: name,
          amount: -amount
        })
      }
    }
  })
  return result
}

/*
MCC: "5411"
Бонусы (включая кэшбэк): "0,00"
Валюта операции: "RUB"
Валюта платежа: "RUB"
Дата операции: "11.07.2020 17:43:08"
Дата платежа: ""
Категория: "Супермаркеты"
Кэшбэк: ""
Номер карты: "*2510"
Описание: "Магнит"
Статус: "OK"
Сумма операции: "-447,64"
Сумма платежа: "-447,64"
 */
</script>
