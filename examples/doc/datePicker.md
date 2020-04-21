:::demo 示例

```html
<template>
  <td-date-picker :type="dataPickerSetting.type"
                  :format="dataPickerSetting.format ? dataPickerSetting.format : null"
                  :value-format="dataPickerSetting.valueFormat ? dataPickerSetting.valueFormat : null"
                  @getTime="getTime"
                  ref="dataPicker"
                  :checkDateList="queryCondition.checkDateList">
  </td-date-picker>
</template>
<script>
export default {
  name: 'td-date-picker-exp',
  data () {
    return {
      queryCondition: {
        checkDateList: []
      },
      dataPickerSetting: {
        type: 'month',
        format: 'yyyy-MM',
        valueFormat: 'yyyy-MM'
      }
    }
  },
  methods: {
    getTime (...data) {
      console.log(data)
      this.queryCondition.checkMonthStart = data[0]
      this.queryCondition.checkMonthEnd = data[1]
    }
  }
}
</script>

```
:::


