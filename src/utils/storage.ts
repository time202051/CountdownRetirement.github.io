import { UserInfo, RetirementPlan, ThemeType } from '../types';

const STORAGE_KEYS = {
  USER_INFO: 'retirement_user_info',
  RETIREMENT_PLAN: 'retirement_plan',
  THEME: 'retirement_theme'
};

export function saveUserInfo(userInfo: UserInfo): void {
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  return data ? JSON.parse(data) : null;
}

export function saveRetirementPlan(plan: RetirementPlan): void {
  localStorage.setItem(STORAGE_KEYS.RETIREMENT_PLAN, JSON.stringify(plan));
}

export function getRetirementPlan(): RetirementPlan | null {
  const data = localStorage.getItem(STORAGE_KEYS.RETIREMENT_PLAN);
  return data ? JSON.parse(data) : null;
}

export function saveTheme(theme: ThemeType): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function getTheme(): ThemeType {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme as ThemeType) || 'default';
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.RETIREMENT_PLAN);
  localStorage.removeItem(STORAGE_KEYS.THEME);
}
