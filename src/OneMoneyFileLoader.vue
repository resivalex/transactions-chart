<template>
  <label>
    <div class="select-file-button">Загрузить отчёт по тратам из 1Money</div>
    <input class="file-input" type="file" accept="text/csv" ref="myFile" @change="selectedFile" />
  </label>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'
import moment from 'moment'

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
  delimitersToGuess: []
}

export default {
  data: {
    text: ''
  },
  methods: {
    selectedFile: function () {
      const data = Papa.parse(this.$refs.myFile.files[0], {
        ...config,
        delimiter: ',',
        encoding: 'utf-8',
        skipEmptyLines: true,
        complete: (result) => {
          this.$emit('loaded', extractSpends(result.data))
        }
      })
    }
  }
}

function extractSpends(lines) {
  console.log({ lines })
  const result = []
  _.each(lines, (line) => {
    const amount = parseFloat(line['СУММА'])

    if (line['ТИП'] === 'Расход' && line['ДАТА'].match(/\d{2}\.\d{2}\.\d{4}/)) {
      let category = ''
      let subCategory = ''
      const matches = line['НА СЧЁТ / НА КАТЕГОРИЮ'].match(/(.+) \((.+)\)/)
      if (matches) {
        category = matches[1]
        subCategory = matches[2]
      } else {
        category = line['НА СЧЁТ / НА КАТЕГОРИЮ']
      }
      result.push({
        date: moment(line['ДАТА'], 'DD.MM.YYYY').toDate(),
        category: category,
        name: subCategory,
        amount: parseFloat(line['СУММА'])
      })
    }
  })
  return result
}

/*
ВАЛЮТА: "RUB"
ВАЛЮТА 2: "RUB"
ДАТА: "04.09.2020"
ЗАМЕТКИ: ""
МЕТКИ: ""
НА СЧЁТ / НА КАТЕГОРИЮ: "Кафе (Вкусняшки)"
СО СЧЁТА: "Ваня Карта"
СУММА: "200"
СУММА 2: "200"
ТИП: "Расход"
 */
</script>

<style lang="scss" scoped>
  .file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .select-file-button {
    padding: 8px 12px;
    display: inline-block;
    background: #fd7eb8;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #e03ea4;
    }
  }
</style>
