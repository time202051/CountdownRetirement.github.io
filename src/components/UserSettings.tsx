import React, { useState } from 'react';
import { UserInfo } from '../types';
import { saveUserInfo } from '../utils/storage';
import { User, Calendar, Settings, Save } from 'lucide-react';

interface UserSettingsProps {
  userInfo: UserInfo | null;
  onUserInfoChange: (userInfo: UserInfo) => void;
  onClose: () => void;
  onReset?: () => void;
}

export default function UserSettings({ userInfo, onUserInfoChange, onClose, onReset }: UserSettingsProps) {
  const [formData, setFormData] = useState<UserInfo>({
    currentAge: userInfo?.currentAge || 25,
    retirementAge: userInfo?.retirementAge || 65,
    birthDate: userInfo?.birthDate || '',
    name: userInfo?.name || '',
    occupation: userInfo?.occupation || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserInfo(formData);
    onUserInfoChange(formData);
    onClose();
  };

  const handleChange = (field: keyof UserInfo, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="glass-effect rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            个人设置
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              姓名（可选）
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入您的姓名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              当前年龄
            </label>
            <input
              type="number"
              min="18"
              max="80"
              value={formData.currentAge}
              onChange={(e) => handleChange('currentAge', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              计划退休年龄
            </label>
            <input
              type="number"
              min="50"
              max="80"
              value={formData.retirementAge}
              onChange={(e) => handleChange('retirementAge', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              职业（可选）
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入您的职业"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出生日期（可选）
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存设置
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              取消
            </button>
          </div>

          {onReset && (
            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onReset}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                重置所有数据
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                这将清除所有保存的数据并返回欢迎页面
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
