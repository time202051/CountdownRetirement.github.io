App({
  globalData: {
    userInfo: null
  },

  onLaunch() {
    // 获取用户信息
    this.loadUserInfo()
  },

  // 加载用户信息
  loadUserInfo() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
    } catch (e) {
      console.error('加载用户信息失败:', e)
    }
  },

  // 保存用户信息
  saveUserInfo(userInfo) {
    try {
      wx.setStorageSync('userInfo', userInfo)
      this.globalData.userInfo = userInfo
    } catch (e) {
      console.error('保存用户信息失败:', e)
    }
  },

  // 计算倒计时
  calculateCountdown(currentAge, retirementAge) {
    const currentDate = new Date()
    const birthYear = currentDate.getFullYear() - currentAge
    const retirementDate = new Date(birthYear + retirementAge, 11, 31)
    
    const timeDiff = retirementDate.getTime() - currentDate.getTime()
    
    if (timeDiff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalDays: 0,
        progress: 100
      }
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    
    const totalWorkingDays = (retirementAge - 22) * 365
    const remainingWorkingDays = (retirementAge - currentAge) * 365
    const progress = Math.max(0, Math.min(100, ((totalWorkingDays - remainingWorkingDays) / totalWorkingDays) * 100))
    
    return {
      days,
      hours,
      minutes,
      seconds,
      totalDays: days,
      progress
    }
  },

  // 获取激励信息
  getMotivationalMessage(progress) {
    if (progress < 20) return "刚刚开始职业生涯，加油！"
    if (progress < 40) return "职业生涯正在稳步发展！"
    if (progress < 60) return "已经走过一半路程，继续努力！"
    if (progress < 80) return "职业生涯接近尾声，享受每一天！"
    if (progress < 95) return "即将迎来美好的退休生活！"
    return "恭喜！你已经可以享受退休生活了！"
  }
})
