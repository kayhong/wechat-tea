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
      this.data.roomId = wx.cloud.database().collection("Rooms").count() + 1;  
    }
    console.log(this.data.roomId)
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
  addItem : function() {
    const db = wx.cloud.database().collection("Rooms")
    let x = {
      name: "jack",
      item:[0,1,2]
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
    return db.where({
      roomId :id
    }).get()
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
  }
})