import React, { useState, useEffect } from 'react';
import { UserInfo } from './types';
import { getUserInfo, clearAllData } from './utils/storage';
import { useCountdown } from './hooks/useCountdown';
import Header from './components/Header';
import CountdownDisplay from './components/CountdownDisplay';
import UserSettings from './components/UserSettings';
import RetirementCalculator from './components/RetirementCalculator';

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const countdown = useCountdown(userInfo);

  useEffect(() => {
    const savedUserInfo = getUserInfo();
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    } else {
      // 如果没有用户信息，显示设置页面
      setShowSettings(true);
    }
  }, []);

  const handleUserInfoChange = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有数据吗？这将清除所有保存的信息并返回欢迎页面。')) {
      clearAllData();
      setUserInfo(null);
      setShowSettings(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('确定要退出吗？这将清除所有数据并返回欢迎页面。')) {
      clearAllData();
      setUserInfo(null);
      setShowSettings(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="glass-effect rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">欢迎使用退休倒计时</h2>
          <p className="text-gray-600 mb-6">请先设置您的基本信息来开始使用</p>
          <button
            onClick={() => setShowSettings(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
          开始设置
          </button>
        </div>
        
        {showSettings && (
          <UserSettings
            userInfo={null}
            onUserInfoChange={handleUserInfoChange}
            onClose={() => setShowSettings(false)}
            onReset={handleReset}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        userInfo={userInfo} 
        onSettingsClick={() => setShowSettings(true)} 
        onLogout={handleLogout}
      />
      
      <main className="pb-8">
        <CountdownDisplay countdown={countdown} userInfo={userInfo} />
        
        <div className="w-full max-w-4xl mx-auto px-6 mt-8">
          <RetirementCalculator />
        </div>
      </main>
      {showSettings && (
        <UserSettings
          userInfo={userInfo}
          onUserInfoChange={handleUserInfoChange}
          onClose={() => setShowSettings(false)}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
