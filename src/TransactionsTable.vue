<template>
  <table-component
    :data="transactions"
    :show-caption="false"
    sort-by="date"
    sort-order="desc"
    table-class="transactions-table"
    thead-class="transactions-table__header"
    filter-no-results="Нет транзакций"
    :show-filter="false"
    ref="table"
  >
    <template slot="tfoot" slot-scope="{ rows }">
      <tr>
        <th></th>
        <th></th>
        <th>Итого:</th>
        <th class="transactions-table__footer-cell">
          {{ totalSum(rows) }}
        </th>
      </tr>
    </template>
    <table-column
      show="date"
      label="Дата"
      data-type="date"
      :formatter="formatDate"
      header-class="transactions-table__date-header"
    >
    </table-column>
    <table-column
      show="category"
      label="Категория"
      :sortable="true"
      header-class="transactions-table__date-category"
    ></table-column>
    <table-column
      show="name"
      label="Подкатегория"
      header-class="transactions-table__date-subcategory"
    ></table-column>
    <table-column
      show="amount"
      label="Сумма"
      data-type="numeric"
      :sortable="true"
      header-class="transactions-table__date-amount"
    ></table-column>
  </table-component>
</template>

<script>
import Vue from 'vue'
import { TableComponent, TableColumn } from 'vue-table-component'
import moment from 'moment'

export default {
  props: ['transactions'],
  components: { TableComponent, TableColumn },
  data() {
    return { displayedRows: [] }
  },
  methods: {
    formatDate(time) {
      return moment(time).format('DD.MM.YYYY')
    },
    totalSum(rows) {
      return _.reduce(
        rows,
        (sum, value) => {
          return sum + value.data.amount
        },
        0
      )
    }
  }
}
</script>

<style lang="scss">
.transactions-table {
  width: 100%;
  border-collapse: collapse;
  border: solid 1px black;

  tr {
    border: solid 1px black;
    &:hover {
      background-color: #cee2e8;
    }
  }
}

.transactions-table__header {
  text-align: left;
  cursor: pointer;
}

.table-component__th--sort-asc {
  &:after {
    content: '↑';
  }
}

.table-component__th--sort-desc {
  &:after {
    content: '↓';
  }
}

.transactions-table__date-header {
  width: 20%;
}

.transactions-table__date-category {
  width: 30%;
}

.transactions-table__date-subcategory {
  width: 30%;
}

.transactions-table__date-amount {
  width: 20%;
}

.transactions-table__footer-cell {
  text-align: left;
}
</style>
