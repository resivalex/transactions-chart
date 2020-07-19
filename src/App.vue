<template>
  <div class="layout">
    <div class="instruments-wrapper">
      <FileLoader @loaded="fileLoaded"></FileLoader>
      <DateRange :from="dateFrom" :to="dateTo" @change="dateRangeChanged"></DateRange>
    </div>
    <div class="chart-wrapper">
      <Chart :tree="tree"></Chart>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from '@/Chart'
import FileLoader from '@/FileLoader'
import DateRange from '@/DateRange'
import _ from 'lodash'
import moment from 'moment'

const exampleTransactions = [
  { date: new Date(), category: 'Сладости', name: 'Мороженое', amount: 80 },
  { date: new Date(), category: 'Сладости', name: 'Пирожное', amount: 121 },
  { date: new Date(), category: 'Сладости', name: 'Кофе', amount: 200 },
  { date: new Date(), category: 'Радости', name: 'Кино', amount: 320 },
  { date: new Date(), category: 'Радости', name: 'Музей', amount: 550 }
]

export default {
  data() {
    return {
      transactions: exampleTransactions,
      dateFrom: null,
      dateTo: null
    }
  },
  components: { Chart, FileLoader, DateRange },
  methods: {
    fileLoaded(transactions) {
      this.transactions = transactions
      this.dateFrom = minDate(transactions)
      this.dateTo = moment(maxDate(transactions)).endOf('day').toDate()
    },
    dateRangeChanged(range) {
      this.dateFrom = range.from
      this.dateTo = range.to
    }
  },
  computed: {
    tree() {
      const accumulator = {}
      _.each(this.filteredTransactions, (transaction) => {
        const { date, category, name, amount } = transaction

        if (!accumulator[category]) accumulator[category] = {}
        if (!accumulator[category][name]) accumulator[category][name] = 0
        accumulator[category][name] += amount
      })
      const result = { name: 'Траты', children: [] }
      _.each(accumulator, (categoryData, categoryName) => {
        const categoryTree = { name: categoryName, children: [] }

        _.each(categoryData, (spendAmount, spendName) => {
          categoryTree.children.push({ name: spendName, size: spendAmount })
        })

        result.children.push(categoryTree)
      })

      return result
    },
    filteredTransactions() {
      if (!this.dateFrom || !this.dateTo) return this.transactions
      return _.filter(
        this.transactions,
        (item) => item.date >= this.dateFrom && item.date <= this.dateTo
      )
    }
  }
}

function minDate(items) {
  return _.min(_.map(items, (item) => item.date))
}

function maxDate(items) {
  return _.max(_.map(items, (item) => item.date))
}
</script>

<style>
#vue-app {
  overflow: hidden;
}

.layout {
  height: 100%;
  position: relative;
}

.instruments-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
}

.chart-wrapper {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
