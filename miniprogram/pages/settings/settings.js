const app = getApp()

Page({
  data: {
    userInfo: null,
    formData: {
      name: '',
      currentAge: 25,
      retirementAge: 65,
      occupation: '',
      birthDate: ''
    }
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
  },

  loadUserInfo() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ 
        userInfo,
        formData: {
          name: userInfo.name || '',
          currentAge: userInfo.currentAge || 25,
          retirementAge: userInfo.retirementAge || 65,
          occupation: userInfo.occupation || '',
          birthDate: userInfo.birthDate || ''
        }
      })
    }
  },

  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  onCurrentAgeInput(e) {
    this.setData({
      'formData.currentAge': parseInt(e.detail.value) || 0
    })
  },

  onRetirementAgeInput(e) {
    this.setData({
      'formData.retirementAge': parseInt(e.detail.value) || 0
    })
  },

  onOccupationInput(e) {
    this.setData({
      'formData.occupation': e.detail.value
    })
  },

  onBirthDateInput(e) {
    this.setData({
      'formData.birthDate': e.detail.value
    })
  },

  saveSettings() {
    const { formData } = this.data
    
    // 验证必填字段
    if (!formData.currentAge || !formData.retirementAge) {
      wx.showToast({
        title: '请填写年龄信息',
        icon: 'error'
      })
      return
    }

    if (formData.currentAge >= formData.retirementAge) {
      wx.showToast({
        title: '退休年龄必须大于当前年龄',
        icon: 'error'
      })
      return
    }

    // 保存用户信息
    app.saveUserInfo(formData)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })

    // 更新页面数据
    this.loadUserInfo()
  },

  resetSettings() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有设置吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            formData: {
              name: '',
              currentAge: 25,
              retirementAge: 65,
              occupation: '',
              birthDate: ''
            }
          })
        }
      }
    })
  }
})
