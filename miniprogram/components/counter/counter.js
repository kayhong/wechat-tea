// miniprogram/components/counter/counter.js
Component({
  properties: {
    num: {
      type: Number,
      value: 0
    }
  },
  data: {
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'
  },
  methods: {
    /* 点击减号 */
    sub: function () {
      let num = this.properties.num;
      // 如果大于1时，才可以减
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回

      this.setData({
        num: num,
        minusStatus: minusStatus
      });
      this.numChange();
    },
    /* 点击加号 */
    add: function () {
      let num = this.properties.num;
      // 不作过多考虑自增1
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
      this.numChange();
    },
    /* 输入框事件 */
    manual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回
      this.setData({
        num: num
      });
      this.numChange();
    },
    numChange() {
      this.triggerEvent('numChange', {
        num: this.properties.num
      })
    }
  }

})