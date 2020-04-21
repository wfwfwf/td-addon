<!-- 日期选择器 -->
<template>
  <div class="td-date-picker">
    <el-date-picker
      class="date-picker-input"
      @change="startTimeChange"
      v-model="startDate"
      v-bind="$attrs"
      placeholder="选择日期">
    </el-date-picker>
    <span class="data-picker-text">至</span>
    <el-date-picker
      class="date-picker-input"
      v-model="endDate"
      v-bind="$attrs"
      :picker-options="pickerOptions"
      :disabled="endTimedisabled"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'tdDatePicker',
  props: {
    checkDateList: {
      type: Array,
      default: function () {
        return ['', '']
      }
    }
  },
  data () {
    return {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      pickerOptions: {},
      endTimedisabled: true
    }
  },
  methods: {
    startTimeChange () {
      this.endDate = ''
    },
    // 重置
    reset () {
      this.startDate = ''
      this.endDate = ''
    }
  },
  watch: {
    startDate (val) {
      if (!val) {
        this.endTimedisabled = true
      } else {
        this.endTimedisabled = false
        const data = new Date(val).getTime()
        this.pickerOptions = {
          disabledDate: time => {
            return time.getTime() < data
          }
        }
      }
      this.startTime = val
      this.$emit('getTime', this.startTime, this.endTime)
    },
    endDate (val) {
      this.endTime = val
      this.$emit('getTime', this.startTime, this.endTime)
    },
    checkDateList: {
      handler: function (val) {
        this.startDate = val[0]
        this.endDate = val[1]
      },
      deep: true
    }
  },
  created () {
    if (this.checkDateList.length) {
      this.startDate = this.checkDateList[0]
      this.endDate = this.checkDateList[1]
    }
  }
}
</script>

<style lang="scss">
  .td-date-picker {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .date-picker-input {
      flex: 1;
    }
    .data-picker-text {
      display: inline-block;
      padding: 0 5px;
    }
  }
</style>
