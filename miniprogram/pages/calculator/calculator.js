Page({
  data: {
    plan: {
      monthlyIncome: 5000,
      targetSavings: 1000000,
      currentSavings: 100000,
      hobbies: ['读书', '旅行'],
      travelPlans: ['日本', '欧洲']
    },
    newHobby: '',
    newTravel: '',
    monthlySaving: 0,
    savingRate: 0
  },

  onLoad() {
    this.loadPlan()
    this.calculateSaving()
  },

  onShow() {
    this.loadPlan()
    this.calculateSaving()
  },

  loadPlan() {
    try {
      const plan = wx.getStorageSync('retirementPlan')
      if (plan) {
        this.setData({ plan })
      }
    } catch (e) {
      console.error('加载退休规划失败:', e)
    }
  },

  savePlan() {
    try {
      wx.setStorageSync('retirementPlan', this.data.plan)
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
    } catch (e) {
      console.error('保存退休规划失败:', e)
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  },

  calculateSaving() {
    const { plan } = this.data
    const remaining = plan.targetSavings - plan.currentSavings
    const yearsToRetire = 40 // 假设还有40年退休
    const monthlySaving = Math.max(0, remaining / (yearsToRetire * 12))
    const savingRate = plan.monthlyIncome > 0 ? ((monthlySaving / plan.monthlyIncome) * 100).toFixed(1) : 0

    this.setData({
      monthlySaving: monthlySaving.toLocaleString(),
      savingRate
    })
  },

  onMonthlyIncomeInput(e) {
    this.setData({
      'plan.monthlyIncome': parseInt(e.detail.value) || 0
    })
    this.calculateSaving()
  },

  onTargetSavingsInput(e) {
    this.setData({
      'plan.targetSavings': parseInt(e.detail.value) || 0
    })
    this.calculateSaving()
  },

  onCurrentSavingsInput(e) {
    this.setData({
      'plan.currentSavings': parseInt(e.detail.value) || 0
    })
    this.calculateSaving()
  },

  onNewHobbyInput(e) {
    this.setData({
      newHobby: e.detail.value
    })
  },

  addHobby() {
    const { newHobby, plan } = this.data
    if (newHobby.trim() && !plan.hobbies.includes(newHobby.trim())) {
      this.setData({
        'plan.hobbies': [...plan.hobbies, newHobby.trim()],
        newHobby: ''
      })
    }
  },

  removeHobby(e) {
    const hobby = e.currentTarget.dataset.hobby
    const { plan } = this.data
    this.setData({
      'plan.hobbies': plan.hobbies.filter(h => h !== hobby)
    })
  },

  onNewTravelInput(e) {
    this.setData({
      newTravel: e.detail.value
    })
  },

  addTravelPlan() {
    const { newTravel, plan } = this.data
    if (newTravel.trim() && !plan.travelPlans.includes(newTravel.trim())) {
      this.setData({
        'plan.travelPlans': [...plan.travelPlans, newTravel.trim()],
        newTravel: ''
      })
    }
  },

  removeTravelPlan(e) {
    const travel = e.currentTarget.dataset.travel
    const { plan } = this.data
    this.setData({
      'plan.travelPlans': plan.travelPlans.filter(t => t !== travel)
    })
  }
})
