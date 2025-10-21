export interface UserInfo {
  currentAge: number;
  retirementAge: number;
  birthDate: string;
  name?: string;
  occupation?: string;
}

export interface RetirementPlan {
  monthlyIncome: number;
  targetSavings: number;
  currentSavings: number;
  hobbies: string[];
  travelPlans: string[];
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  progress: number;
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
}

export type ThemeType = 'default' | 'sunset' | 'ocean' | 'forest' | 'vintage';
