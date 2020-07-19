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

export default {
  props: ['from', 'to'],
  components: { DatePicker },
  data() {
    return {
      datePickerShortcuts: [
        {
          text: moment().year().toString(),
          onClick: () => [moment().startOf('year').toDate(), moment().toDate()]
        },
        {
          text: (moment().year() - 1).toString(),
          onClick: () => [
            moment().subtract(1, 'years').startOf('year').toDate(),
            moment().subtract(1, 'years').endOf('year').toDate()
          ]
        },
        {
          text: (moment().year() - 2).toString(),
          onClick: () => [
            moment().subtract(2, 'years').startOf('year').toDate(),
            moment().subtract(2, 'years').endOf('year').toDate()
          ]
        }
      ]
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
</script>
