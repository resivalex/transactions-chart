<template>
  <div>
    <FileLoader @loaded="fileLoaded"></FileLoader>
    <Chart :tree="tree"></Chart>
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from '@/Chart'
import FileLoader from '@/FileLoader'
import _ from 'lodash'

export default {
  data() {
    return {
      transactions: [
        { date: new Date(), category: 'Сладости', name: 'Мороженое', amount: 80 },
        { date: new Date(), category: 'Сладости', name: 'Пирожное', amount: 121 },
        { date: new Date(), category: 'Сладости', name: 'Кофе', amount: 200 },
        { date: new Date(), category: 'Радости', name: 'Кино', amount: 320 },
        { date: new Date(), category: 'Радости', name: 'Музей', amount: 550 },
      ]
    }
  },
  components: { Chart, FileLoader },
  methods: {
    fileLoaded(transactions) {
      this.transactions = transactions
    }
  },
  computed: {
    tree() {
      const accumulator = {}
      _.each(this.transactions, (transaction) => {
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
    }
  }
}
</script>

<style></style>
