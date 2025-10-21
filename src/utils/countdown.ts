import { CountdownData } from '../types';

export function calculateCountdown(retirementAge: number, currentAge: number): CountdownData {
  const currentDate = new Date();
  const birthYear = currentDate.getFullYear() - currentAge;
  const retirementDate = new Date(birthYear + retirementAge, 11, 31); // 假设退休日期为年底
  
  const timeDiff = retirementDate.getTime() - currentDate.getTime();
  
  if (timeDiff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      progress: 100
    };
  }
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  const totalWorkingDays = (retirementAge - 22) * 365; // 假设22岁开始工作
  const remainingWorkingDays = (retirementAge - currentAge) * 365;
  const progress = Math.max(0, Math.min(100, ((totalWorkingDays - remainingWorkingDays) / totalWorkingDays) * 100));
  
  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays: days,
    progress
  };
}

export function formatTime(value: number): string {
  return value.toString().padStart(2, '0');
}

export function getMotivationalMessage(progress: number): string {
  if (progress < 20) return "刚刚开始职业生涯，加油！";
  if (progress < 40) return "职业生涯正在稳步发展！";
  if (progress < 60) return "已经走过一半路程，继续努力！";
  if (progress < 80) return "职业生涯接近尾声，享受每一天！";
  if (progress < 95) return "即将迎来美好的退休生活！";
  return "恭喜！你已经可以享受退休生活了！";
}
