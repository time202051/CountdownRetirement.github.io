import React from 'react';
import { UserInfo } from '../types';
import { Settings, User, Home } from 'lucide-react';

interface HeaderProps {
  userInfo: UserInfo | null;
  onSettingsClick: () => void;
  onLogout?: () => void;
}

export default function Header({ userInfo, onSettingsClick, onLogout }: HeaderProps) {
  return (
    <header className="w-full p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">退休倒计时</h1>
            {userInfo?.name && (
              <p className="text-sm text-gray-600">你好，{userInfo.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userInfo && (
            <div className="hidden md:flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {userInfo.currentAge}岁 → {userInfo.retirementAge}岁
              </span>
            </div>
          )}
          
          <button
            onClick={onSettingsClick}
            className="p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
            title="设置"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 bg-white/50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              title="退出"
            >
              <span className="text-sm font-medium">退出</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
