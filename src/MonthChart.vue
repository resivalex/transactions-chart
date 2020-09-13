<template>
  <vue-apex-charts
    width="1200"
    height="1000"
    type="bar"
    :options="chartData.options"
    :series="chartData.series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import _ from 'lodash'
import moment from 'moment'

export default {
  props: ['transactions'],
  data() {
    return {}
  },
  computed: {
    chartData() {
      const categoryFlags = {}
      const monthFlags = {}

      _.each(this.transactions, (transaction) => {
        categoryFlags[transaction.category] = transaction.category
        monthFlags[moment(transaction.date).format('YYYY.MM')] = moment(transaction.date).startOf(
          'month'
        )
      })
      const categories = _.sortBy(_.values(categoryFlags))
      const months = _.sortBy(_.values(monthFlags))
      const spent = {}
      _.each(categories, (category) => {
        spent[category] = {}
        _.each(months, (month) => {
          spent[category][moment(month).format('YYYY.MM')] = 0
        })
      })
      _.each(this.transactions, (transaction) => {
        spent[transaction.category][moment(transaction.date).format('YYYY.MM')] +=
          transaction.amount
      })

      return {
        options: {
          chart: {
            id: 'vuechart-example',
            stacked: true
          },
          xaxis: {
            categories: _.map(months, (date) => moment(date).format('MMM YYYY'))
          }
        },
        series: _.map(categories, (category) => ({
          name: category,
          data: _.map(months, (date) => spent[category][moment(date).format('YYYY.MM')])
        }))
      }
    }
  },
  components: {
    VueApexCharts
  }
}
</script>

<style></style>
