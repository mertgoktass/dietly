export type Gender = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type ThemeMode = 'dark' | 'light';

export interface UserProfile {
  name: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  category: MealCategory;
  timestamp: string;
}

export interface DailyTargets {
  bmr: number;
  calorieTarget: number;
  waterTargetMl: number;
}

export interface DailyRecord {
  date: string;
  waterMl: number;
  meals: MealEntry[];
}

export type HealthLogStore = Record<string, DailyRecord>;
