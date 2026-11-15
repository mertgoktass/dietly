import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DailyRecord,
  HealthLogStore,
  MealCategory,
  MealEntry,
  ThemeMode,
  UserProfile,
} from '../types';
import { calculateDailyTargets, getTodayDateKey } from '../utils/calculator';

const PROFILE_STORAGE_KEY = 'dietly_profile_v1';
const LOGS_STORAGE_KEY = 'dietly_logs_v1';
const THEME_STORAGE_KEY = 'dietly_theme_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Kullanıcı',
  gender: 'male',
  age: 26,
  heightCm: 178,
  weightKg: 75,
  activityLevel: 'moderate',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useHealthLog() {
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayDateKey());
  const [profile, setProfile] = useState<UserProfile>(() =>
    readStorage<UserProfile>(PROFILE_STORAGE_KEY, DEFAULT_PROFILE)
  );
  const [logs, setLogs] = useState<HealthLogStore>(() =>
    readStorage<HealthLogStore>(LOGS_STORAGE_KEY, {})
  );
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStorage<ThemeMode>(THEME_STORAGE_KEY, 'dark')
  );

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const targets = useMemo(() => calculateDailyTargets(profile), [profile]);

  const currentRecord: DailyRecord = useMemo(() => {
    return (
      logs[selectedDate] ?? {
        date: selectedDate,
        waterMl: 0,
        meals: [],
      }
    );
  }, [logs, selectedDate]);

  const totalCalories = useMemo(
    () => currentRecord.meals.reduce((acc, item) => acc + item.calories, 0),
    [currentRecord.meals]
  );

  const adjustWater = useCallback(
    (deltaMl: number) => {
      setLogs((prev) => {
        const existing = prev[selectedDate] ?? {
          date: selectedDate,
          waterMl: 0,
          meals: [],
        };
        const nextWater = Math.max(0, existing.waterMl + deltaMl);
        return {
          ...prev,
          [selectedDate]: {
            ...existing,
            waterMl: nextWater,
          },
        };
      });
    },
    [selectedDate]
  );

  const addMeal = useCallback(
    (name: string, calories: number, category: MealCategory) => {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      const entry: MealEntry = {
        id: crypto.randomUUID(),
        name: name.trim(),
        calories: Math.round(calories),
        category,
        timestamp,
      };

      setLogs((prev) => {
        const existing = prev[selectedDate] ?? {
          date: selectedDate,
          waterMl: 0,
          meals: [],
        };
        return {
          ...prev,
          [selectedDate]: {
            ...existing,
            meals: [entry, ...existing.meals],
          },
        };
      });
    },
    [selectedDate]
  );

  const removeMeal = useCallback(
    (mealId: string) => {
      setLogs((prev) => {
        const existing = prev[selectedDate];
        if (!existing) return prev;
        return {
          ...prev,
          [selectedDate]: {
            ...existing,
            meals: existing.meals.filter((meal) => meal.id !== mealId),
          },
        };
      });
    },
    [selectedDate]
  );

  const resetCurrentDay = useCallback(() => {
    setLogs((prev) => ({
      ...prev,
      [selectedDate]: {
        date: selectedDate,
        waterMl: 0,
        meals: [],
      },
    }));
  }, [selectedDate]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    profile,
    setProfile,
    targets,
    currentRecord,
    totalCalories,
    adjustWater,
    addMeal,
    removeMeal,
    resetCurrentDay,
    theme,
    toggleTheme,
  };
}
