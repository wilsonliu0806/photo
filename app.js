//app.js
var config = require("./pages/config.js")
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getResList:function(count, callback){
    var _this = this
    wx.request({
      url: config.getPhotoVideoUrl,
      method: 'GET',
      data:{
        count: count && count,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("获取照片和视频成功", res)
        _this.photoList = res.data
        callback && callback()
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  photoList: [],
  globalData:{
    userInfo:null
  }

})