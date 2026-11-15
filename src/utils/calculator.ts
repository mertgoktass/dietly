import { ActivityLevel, DailyTargets, UserProfile } from '../types';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const WATER_BONUS_BY_ACTIVITY: Record<ActivityLevel, number> = {
  sedentary: 0,
  light: 250,
  moderate: 500,
  active: 750,
};

export function calculateDailyTargets(profile: UserProfile): DailyTargets {
  const baseBmr =
    10 * profile.weightKg +
    6.25 * profile.heightCm -
    5 * profile.age +
    (profile.gender === 'male' ? 5 : -161);

  const bmr = Math.max(1000, Math.round(baseBmr));
  const multiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel];
  const calorieTarget = Math.round(bmr * multiplier);

  const baseWater = profile.weightKg * 33;
  const activityBonus = WATER_BONUS_BY_ACTIVITY[profile.activityLevel];
  const waterTargetMl = Math.round((baseWater + activityBonus) / 50) * 50;

  return {
    bmr,
    calorieTarget,
    waterTargetMl,
  };
}

export function calculatePercentage(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}

export function calculateRawPercentage(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.max(0, Math.round((current / target) * 100));
}

export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function shiftDateKey(dateKey: string, deltaDays: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + deltaDays);

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
  const nextDay = String(date.getDate()).padStart(2, '0');
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function formatDisplayDate(dateKey: string): string {
  const today = getTodayDateKey();
  if (dateKey === today) return 'Bugün';
  if (dateKey === shiftDateKey(today, -1)) return 'Dün';

  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  }).format(date);
}
