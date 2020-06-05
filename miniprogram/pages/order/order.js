// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    queryResult: '',
    temperature: ['常温', '加冰', '少冰', '加热'],
    sugar: ['无糖', '3分甜', '5分甜', '7分甜', '甜到忧伤'],
    extra: ['珍珠', '枸杞', '决明子'],
    items: [{
        name: "红茶拿铁",
        price: 15,
        count: 0,
        temperatureIndex: 0,
        sugarIndex:0,
        extraIndex:0
      },
      {
        name: "乌龙茶",
        price: 15,
        count: 0,
        temperatureIndex:0,
      },
      {
        name: "绿茶",
        price: 15,
        count: 0,
        temperatureIndex:0,

      },
      {
        name: "芝芝桃桃",
        price: 30,
        count: 0,
        temperatureIndex:0,
      },
      {
        name: "芝芝莓莓",
        price: 30,
        count: 0,
        temperatureIndex:0,        
      }
    ]
  },

  onLoad: function (options) {
    this.setData({
      count: app.globalData.count
    });
    app.globalData.count = this.data.count
  },

  /** create a payment function */
  onPayment: function () {

  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function () {} : function () {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  numChange(event) {
    const num = event.detail;
    app.globalData.count = num.num;
  },

  bindTemperatureChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      temperatureIndex: e.detail.value
    })
  },
})