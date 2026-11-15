import React, { useState } from 'react';
import { Plus, Trash2, Utensils } from 'lucide-react';
import { MealCategory, MealEntry } from '../types';

interface CalorieTrackerProps {
  meals: MealEntry[];
  onAddMeal: (name: string, calories: number, category: MealCategory) => void;
  onRemoveMeal: (id: string) => void;
}

const CATEGORY_LABELS: Record<MealCategory, string> = {
  breakfast: 'Kahvaltı',
  lunch: 'Öğle',
  dinner: 'Akşam',
  snack: 'Ara Öğün',
};

const QUICK_PRESETS: Array<{ name: string; calories: number; category: MealCategory }> = [
  { name: 'Haşlanmış Yumurta (2 Adet)', calories: 155, category: 'breakfast' },
  { name: 'Izgara Tavuk & Pilav', calories: 520, category: 'lunch' },
  { name: 'Sade Filtre Kahve', calories: 5, category: 'snack' },
  { name: 'Mevsim Salata & Zeytinyağı', calories: 210, category: 'dinner' },
];

export const CalorieTracker: React.FC<CalorieTrackerProps> = ({
  meals,
  onAddMeal,
  onRemoveMeal,
}) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState<MealCategory>('lunch');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCalories = Number(calories);

    if (!name.trim()) {
      setError('Lütfen öğün veya besin adını girin.');
      return;
    }

    if (!Number.isFinite(parsedCalories) || parsedCalories <= 0 || parsedCalories > 5000) {
      setError('Kalori değeri 1 ile 5000 kcal arasında olmalıdır.');
      return;
    }

    onAddMeal(name, parsedCalories, category);
    setName('');
    setCalories('');
    setError(null);
  };

  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800/90 dark:bg-zinc-900/60">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Öğün & Kalori Kaydı
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            Tükettiğin besinleri ekleyerek günlük enerji dengesini izle
          </p>
        </div>
        <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          {meals.length} kayıt
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Besin adı (örn. Yulaf ezmesi)"
            className="rounded-lg border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-emerald-500 sm:col-span-5"
          />

          <input
            type="number"
            inputMode="numeric"
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
              if (error) setError(null);
            }}
            placeholder="kcal"
            className="rounded-lg border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-sm tabular-nums text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-emerald-500 sm:col-span-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MealCategory)}
            className="rounded-lg border border-zinc-200 bg-zinc-50/70 px-2.5 py-2 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-emerald-500 sm:col-span-4"
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-xs font-medium text-rose-500">{error}</p>}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => onAddMeal(preset.name, preset.calories, preset.category)}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
              >
                + {preset.name.split(' (')[0]} ({preset.calories})
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Öğün Ekle</span>
          </button>
        </div>
      </form>

      <div className="mt-5 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
        {meals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-10 text-center dark:border-zinc-800">
            <div className="rounded-full bg-zinc-100 p-2.5 text-zinc-400 dark:bg-zinc-800/80">
              <Utensils className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Henüz öğün kaydı bulunmuyor
            </p>
            <p className="mt-1 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
              Yukarıdaki formu kullanarak veya hazır kısayollara tıklayarak ilk öğününü ekleyebilirsin.
            </p>
          </div>
        ) : (
          <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {meals.map((meal) => (
              <li
                key={meal.id}
                className="group flex items-center justify-between rounded-lg border border-zinc-200/70 bg-zinc-50/50 px-3.5 py-2.5 transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:hover:border-zinc-700"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {meal.name}
                    </span>
                    <span className="shrink-0 rounded bg-zinc-200/70 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {CATEGORY_LABELS[meal.category]}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">{meal.timestamp}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    {meal.calories} <span className="text-xs font-normal text-zinc-500">kcal</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveMeal(meal.id)}
                    aria-label="Öğünü sil"
                    className="rounded-md p-1 text-zinc-400 opacity-70 transition hover:bg-rose-500/10 hover:text-rose-500 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
