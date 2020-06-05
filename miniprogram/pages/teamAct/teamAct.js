// miniprogram/pages/teamAct/teamAct.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    location: 'actList',
    activities: [{id: 0, host:"gll", name: "a new game", address: "nowhere", description: "who cares",members:"gll"}]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({selectedActId: null})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  createAct: function () {
    if (this.data.location == 'actList' && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({openid: res.result.openid})
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
      this.setData({
        location: 'createAct'
      })
    }
  },

  createSubmit(e) {
    e.detail.value.id = this.data.activities.length
    e.detail.value.host = this.data.openid
    this.data.activities.push(e.detail.value)
    this.setData({location: 'myAct'})
    console.log(this.data.activities.length)
  },

  viewAct: function (key) {
    var act = this.data.activities.find(function(item) {return item.id == key.target.id})
    console.log(act)
    this.setData({location: 'viewAct', selectedAct: act})
  },

  joinAct: function () {
    this.data.activities.find(function(item) {return item.id == this.data.selectedAct.id}).members.push(this.data.openid)
    console.log(this.data.activities)
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})