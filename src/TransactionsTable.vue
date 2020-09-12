<template>
  <table-component
    :data="transactions"
    sort-by="date"
    sort-order="desc"
    tableClass="transactions-table"
    filterPlaceholder="Поиск…"
    filterNoResults="Нет подходящих транзакций"
  >
    <table-column
      show="date"
      label="Дата"
      data-type="date:DD/MM/YYYY"
      :sortable="true"
    ></table-column>
    <table-column show="category" label="Категория" :sortable="true"></table-column>
    <table-column show="name" label="Подкатегория"></table-column>
    <table-column show="amount" label="Сумма" data-type="numeric" :sortable="true"></table-column>
  </table-component>
</template>

<script>
import Vue from 'vue'
import { TableComponent, TableColumn } from 'vue-table-component'

export default {
  props: ['transactions'],
  components: { TableComponent, TableColumn },
  data: {}
}
</script>

<style lang="scss">
.transactions-table {
  width: 100%;
}
</style>
