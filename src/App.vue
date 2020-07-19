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
      tree: {
        name: 'Пример трат',
        children: [
          {
            name: 'Сладости',
            children: [
              { name: 'Мороженое', size: 80 },
              { name: 'Пирожное', size: 121 },
              { name: 'Кофе', size: 200 }
            ]
          },
          {
            name: 'Радости',
            children: [
              { name: 'Кино', size: 320 },
              { name: 'Музей', size: 550 }
            ]
          }
        ]
      }
    }
  },
  components: { Chart, FileLoader },
  methods: {
    fileLoaded(transactions) {
      const accumulator = {}
      _.each(transactions, (transaction) => {
        const { date, category, name, amount } = transaction

        if (!accumulator[category]) accumulator[category] = {}
        if (!accumulator[category][name]) accumulator[category][name] = 0
        accumulator[category][name] += amount
      })
      const tree = { name: 'Траты', children: [] }
      _.each(accumulator, (categoryData, categoryName) => {
        const categoryTree = { name: categoryName, children: [] }

        _.each(categoryData, (spendAmount, spendName) => {
          categoryTree.children.push({ name: spendName, size: spendAmount })
        })

        tree.children.push(categoryTree)
      })

      this.tree = tree
    }
  }
}
</script>

<style></style>
