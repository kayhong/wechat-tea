// miniprogram/pages/room/room.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.roomId < 0){
      wx.cloud.database().collection("Rooms").count().then(res=>{
        this.setData({
          roomId: (res.total +1)
        })
        console.log(this.data.roomId)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app = getApp()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
f
  },
  addRoom : function() {
    const db = wx.cloud.database().collection("Rooms")
    let x = {
      name: "jack",
      item:[0,1]
    }
    db.add({
      data :{
        roomId : this.data.roomId,
        userId : getApp().globalData.oppenid,
        items: ["红糖茶" ,"抹茶"],
        cart : [x,x]
      },
      success: res =>{
        console.log(success)
      }
    })
  },
  
  databaseCloudTest: function(){ 
    wx.cloud.callFunction({
      name : "databaseoperator",
      data :{},
      success : res =>{
        console.log(res.result)
      }
  })
  },
  getRoom : function(id){
    const db =wx.cloud.database().collection("Rooms")
    console.log(id.target.id)
    db.where({
      roomId: new Number(id.target.id)
    }).get().then(res=>{
      console.log(res)
      return res
    })
  },
  addItem:function(id,name){
    const db =wx.cloud.database().collection("Romms")
    db.doc(id).update({
      items :_push(name)
    })
  },
  addCartItem:function(docId, roomId,itemId,count){
    //To Be implement
    itemList = []
    count = []
    const db =wx.cloud.database().collection("Rooms")
    let item = {
      userId : app.globalData.oppenid,
      item : [itemId],
      count : [count]
    }
    db.doc(roomId).doc(docId).update({
      data:{
        item : item
      }
    })
  },

  getMyRooms: function(){
    if (!this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({openid: res.result.openid})
          const db=wx.cloud.database().collection("Rooms")
          db.where({
            _openid :this.data.openid
          }).get().then(res=>{
            console.log(res)
            return res
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
    }
  }
})