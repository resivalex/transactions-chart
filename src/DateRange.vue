<template>
  <date-picker
    :value="range"
    range
    @change="rangeChanged"
    :shortcuts="datePickerShortcuts"
    placeholder="Выбрать диапазон дат"
  ></date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'
import _ from 'lodash'

export default {
  props: ['from', 'to'],
  components: { DatePicker },
  data() {
    return {
      datePickerShortcuts: _.map([...lastMonths(), ...lastYears()], (info) => ({
        text: info.title,
        onClick: () => [info.dateFrom, info.dateTo]
      }))
    }
  },
  methods: {
    rangeChanged(dates) {
      this.$emit('change', { from: dates[0], to: dates[1] })
    }
  },
  computed: {
    range() {
      return [this.from, this.to]
    }
  }
}

function lastMonths() {
  return _.times(6, (shift) => {
    const mnt = moment().subtract(shift, 'months')
    return {
      title: mnt.format('MMMM'),
      dateFrom: mnt.startOf('month').toDate(),
      dateTo: mnt.endOf('month').toDate()
    }
  })
}

function lastYears() {
  return _.times(3, (shift) => {
    const mnt = moment().subtract(shift, 'year')
    return {
      title: mnt.format('Y'),
      dateFrom: mnt.startOf('year').toDate(),
      dateTo: mnt.endOf('year').toDate()
    }
  })
}
</script>
