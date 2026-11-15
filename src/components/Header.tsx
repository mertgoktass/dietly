import React from 'react';
import {
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Moon,
  RotateCcw,
  SlidersHorizontal,
  Sun,
} from 'lucide-react';
import { ThemeMode, UserProfile } from '../types';
import { formatDisplayDate, getTodayDateKey, shiftDateKey } from '../utils/calculator';

interface HeaderProps {
  profile: UserProfile;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenProfile: () => void;
  onResetDay: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  selectedDate,
  onDateChange,
  onOpenProfile,
  onResetDay,
  theme,
  onToggleTheme,
}) => {
  const todayKey = getTodayDateKey();
  const isToday = selectedDate === todayKey;

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-emerald-400">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Dietly
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {profile.name} · {profile.weightKg} kg · {profile.heightCm} cm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100/70 p-1 dark:border-zinc-800 dark:bg-zinc-900/70">
          <button
            type="button"
            onClick={() => onDateChange(shiftDateKey(selectedDate, -1))}
            aria-label="Önceki gün"
            className="rounded-md p-1.5 text-zinc-500 transition hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDateChange(todayKey)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span>{formatDisplayDate(selectedDate)}</span>
          </button>

          <button
            type="button"
            disabled={isToday}
            onClick={() => onDateChange(shiftDateKey(selectedDate, 1))}
            aria-label="Sonraki gün"
            className="rounded-md p-1.5 text-zinc-500 transition hover:bg-white hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDay}
            title="Günü sıfırla"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-500" />
            <span>Hedefler</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Tema değiştir"
            className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
