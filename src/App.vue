<template>
  <div class="layout">
    <div class="instruments-wrapper">
      <TinkoffFileLoader @loaded="fileLoaded"></TinkoffFileLoader>
      <OneMoneyFileLoader @loaded="fileLoaded"></OneMoneyFileLoader>
      <DateRange :from="dateFrom" :to="dateTo" @change="dateRangeChanged"></DateRange>
    </div>
    <div class="chart-wrapper">
      <Chart :tree="tree"></Chart>
    </div>
    <div class="table-wrapper">
      <TransactionsTable :transactions="filteredTransactions"></TransactionsTable>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from '@/Chart'
import TinkoffFileLoader from '@/TinkoffFileLoader'
import OneMoneyFileLoader from '@/OneMoneyFileLoader'
import DateRange from '@/DateRange'
import TransactionsTable from '@/TransactionsTable'
import _ from 'lodash'
import moment from 'moment'

const exampleTransactions = [
  {
    date: moment().subtract(3, 'days').toDate(),
    category: 'Сладости',
    name: 'Мороженое',
    amount: 80
  },
  {
    date: moment().subtract(2, 'days').toDate(),
    category: 'Сладости',
    name: 'Пирожное',
    amount: 121
  },
  { date: moment().subtract(2, 'days').toDate(), category: 'Сладости', name: 'Кофе', amount: 200 },
  { date: moment().subtract(1, 'day').toDate(), category: 'Радости', name: 'Кино', amount: 320 },
  { date: moment().toDate(), category: 'Радости', name: 'Музей', amount: 150 }
]

export default {
  data() {
    return {
      transactions: exampleTransactions,
      dateFrom: null,
      dateTo: null
    }
  },
  components: { Chart, TinkoffFileLoader, OneMoneyFileLoader, DateRange, TransactionsTable },
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
}

.layout {
}

.instruments-wrapper {
  height: 50px;
  width: 100%;
}

.chart-wrapper {
  height: 80vh;
  width: 100%;
}

.table-wrapper {
  position: relative;
}
</style>
