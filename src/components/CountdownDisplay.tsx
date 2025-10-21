import React from 'react';
import { CountdownData } from '../types';
import { formatTime, getMotivationalMessage } from '../utils/countdown';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react';

interface CountdownDisplayProps {
  countdown: CountdownData;
  userInfo: {
    currentAge: number;
    retirementAge: number;
  };
}

export default function CountdownDisplay({ countdown, userInfo }: CountdownDisplayProps) {
  const { days, hours, minutes, seconds, progress } = countdown;
  const motivationalMessage = getMotivationalMessage(progress);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* 主倒计时显示 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4 animate-fade-in">
          退休倒计时
        </h1>
        <p className="text-lg text-gray-600 mb-8">{motivationalMessage}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {days.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" />
              天
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              {formatTime(hours)}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              小时
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              {formatTime(minutes)}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              分钟
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
              {formatTime(seconds)}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              秒
            </div>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            职业生涯进度
          </h3>
          <span className="text-2xl font-bold text-blue-600">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>当前年龄: {userInfo.currentAge}岁</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>退休年龄: {userInfo.retirementAge}岁</span>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-semibold">剩余工作年限</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {userInfo.retirementAge - userInfo.currentAge}年
          </div>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-semibold">总工作天数</h4>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(userInfo.retirementAge - 22) * 365}天
          </div>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-semibold">已完成比例</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {progress.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
