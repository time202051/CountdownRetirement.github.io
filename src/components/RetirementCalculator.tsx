import React, { useState } from 'react';
import { RetirementPlan } from '../types';
import { saveRetirementPlan, getRetirementPlan } from '../utils/storage';
import { Calculator, DollarSign, Target, Heart, Plane } from 'lucide-react';

export default function RetirementCalculator() {
  const [plan, setPlan] = useState<RetirementPlan>(getRetirementPlan() || {
    monthlyIncome: 5000,
    targetSavings: 1000000,
    currentSavings: 100000,
    hobbies: ['读书', '旅行'],
    travelPlans: ['日本', '欧洲']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newHobby, setNewHobby] = useState('');
  const [newTravel, setNewTravel] = useState('');

  const calculateMonthlySaving = () => {
    const remaining = plan.targetSavings - plan.currentSavings;
    const yearsToRetire = 40; // 假设还有40年退休
    return Math.max(0, remaining / (yearsToRetire * 12));
  };

  const handleSave = () => {
    saveRetirementPlan(plan);
    setIsEditing(false);
  };

  const addHobby = () => {
    if (newHobby.trim() && !plan.hobbies.includes(newHobby.trim())) {
      setPlan(prev => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }));
      setNewHobby('');
    }
  };

  const removeHobby = (hobby: string) => {
    setPlan(prev => ({ ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) }));
  };

  const addTravelPlan = () => {
    if (newTravel.trim() && !plan.travelPlans.includes(newTravel.trim())) {
      setPlan(prev => ({ ...prev, travelPlans: [...prev.travelPlans, newTravel.trim()] }));
      setNewTravel('');
    }
  };

  const removeTravelPlan = (travel: string) => {
    setPlan(prev => ({ ...prev, travelPlans: prev.travelPlans.filter(t => t !== travel) }));
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          退休规划计算器
        </h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {isEditing ? '完成编辑' : '编辑'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 财务规划 */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            财务规划
          </h4>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">月收入</label>
            {isEditing ? (
              <input
                type="number"
                value={plan.monthlyIncome}
                onChange={(e) => setPlan(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="text-lg font-semibold text-green-600">¥{plan.monthlyIncome.toLocaleString()}</div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">目标储蓄</label>
            {isEditing ? (
              <input
                type="number"
                value={plan.targetSavings}
                onChange={(e) => setPlan(prev => ({ ...prev, targetSavings: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="text-lg font-semibold text-blue-600">¥{plan.targetSavings.toLocaleString()}</div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">当前储蓄</label>
            {isEditing ? (
              <input
                type="number"
                value={plan.currentSavings}
                onChange={(e) => setPlan(prev => ({ ...prev, currentSavings: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="text-lg font-semibold text-purple-600">¥{plan.currentSavings.toLocaleString()}</div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">建议月储蓄</div>
            <div className="text-xl font-bold text-blue-600">
              ¥{calculateMonthlySaving().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              储蓄率: {((calculateMonthlySaving() / plan.monthlyIncome) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* 退休生活规划 */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600" />
            退休生活规划
          </h4>

          <div>
            <label className="block text-sm text-gray-600 mb-2">兴趣爱好</label>
            <div className="space-y-2">
              {plan.hobbies.map((hobby, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span>{hobby}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeHobby(hobby)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      删除
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    placeholder="添加兴趣爱好"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={addHobby}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    添加
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">旅行计划</label>
            <div className="space-y-2">
              {plan.travelPlans.map((travel, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3 h-3" />
                    {travel}
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => removeTravelPlan(travel)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      删除
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTravel}
                    onChange={(e) => setNewTravel(e.target.value)}
                    placeholder="添加旅行目的地"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={addTravelPlan}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    添加
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            保存规划
          </button>
        </div>
      )}
    </div>
  );
}
