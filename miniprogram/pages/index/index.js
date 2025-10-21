const app = getApp()

Page({
  data: {
    userInfo: null,
    countdown: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    progress: 0,
    motivationalMessage: '',
    remainingYears: 0,
    totalWorkingDays: 0
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
    if (this.data.userInfo) {
      this.startCountdown()
    }
  },

  onHide() {
    this.stopCountdown()
  },

  onUnload() {
    this.stopCountdown()
  },

  loadUserInfo() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo })
      this.updateCountdown()
    }
  },

  updateCountdown() {
    const { userInfo } = this.data
    if (!userInfo) return

    const countdown = app.calculateCountdown(userInfo.currentAge, userInfo.retirementAge)
    const motivationalMessage = app.getMotivationalMessage(countdown.progress)
    
    const remainingYears = userInfo.retirementAge - userInfo.currentAge
    const totalWorkingDays = (userInfo.retirementAge - 22) * 365

    this.setData({
      countdown,
      progress: countdown.progress.toFixed(1),
      motivationalMessage,
      remainingYears,
      totalWorkingDays
    })
  },

  startCountdown() {
    this.updateCountdown()
    this.timer = setInterval(() => {
      this.updateCountdown()
    }, 1000)
  },

  stopCountdown() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  goToSettings() {
    wx.switchTab({
      url: '/pages/settings/settings'
    })
  }
})
