import React from 'react';
import { Droplets, Flame, Target } from 'lucide-react';
import { DailyTargets } from '../types';
import { calculatePercentage, calculateRawPercentage } from '../utils/calculator';

interface SummaryCardsProps {
  totalCalories: number;
  waterMl: number;
  targets: DailyTargets;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalCalories,
  waterMl,
  targets,
}) => {
  const calorieBarPct = calculatePercentage(totalCalories, targets.calorieTarget);
  const calorieRawPct = calculateRawPercentage(totalCalories, targets.calorieTarget);
  const isOverCalorie = totalCalories > targets.calorieTarget;

  const waterBarPct = calculatePercentage(waterMl, targets.waterTargetMl);
  const waterRawPct = calculateRawPercentage(waterMl, targets.waterTargetMl);

  const overallScore = Math.round((calorieBarPct + waterBarPct) / 2);

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 bg-white p-5 transition dark:border-zinc-800/90 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Kalori Bütçesi
          </span>
          <div className="rounded-md bg-amber-500/10 p-1.5 text-amber-500">
            <Flame className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold tracking-tight tabular-nums">
              {totalCalories.toLocaleString('tr-TR')}
            </span>
            <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              / {targets.calorieTarget.toLocaleString('tr-TR')} kcal
            </span>
          </div>
          <span
            className={`text-xs font-semibold tabular-nums ${
              isOverCalorie
                ? 'text-rose-500'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            %{calorieRawPct}
          </span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isOverCalorie ? 'bg-rose-500' : 'bg-amber-500'
            }`}
            style={{ width: `${calorieBarPct}%` }}
          />
        </div>

        <p className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          {isOverCalorie
            ? `Günlük limit ${(totalCalories - targets.calorieTarget).toLocaleString('tr-TR')} kcal aşıldı`
            : `Kalan: ${(targets.calorieTarget - totalCalories).toLocaleString('tr-TR')} kcal · BMR: ${targets.bmr}`}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 transition dark:border-zinc-800/90 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Hidrasyon
          </span>
          <div className="rounded-md bg-sky-500/10 p-1.5 text-sky-500">
            <Droplets className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold tracking-tight tabular-nums">
              {(waterMl / 1000).toFixed(2)}
            </span>
            <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              / {(targets.waterTargetMl / 1000).toFixed(2)} L
            </span>
          </div>
          <span className="text-xs font-semibold tabular-nums text-sky-600 dark:text-sky-400">
            %{waterRawPct}
          </span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${waterBarPct}%` }}
          />
        </div>

        <p className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          {waterMl >= targets.waterTargetMl
            ? 'Günlük su hedefine ulaşıldı'
            : `Hedefe kalan: ${(targets.waterTargetMl - waterMl).toLocaleString('tr-TR')} ml`}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 transition dark:border-zinc-800/90 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Günlük Denge Skoru
          </span>
          <div className="rounded-md bg-emerald-500/10 p-1.5 text-emerald-500">
            <Target className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold tracking-tight tabular-nums">
              %{overallScore}
            </span>
            <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              tamamlanma
            </span>
          </div>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {overallScore >= 90
              ? 'Mükemmel'
              : overallScore >= 50
                ? 'Yolunda'
                : 'Başlangıç'}
          </span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${overallScore}%` }}
          />
        </div>

        <p className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          Kalori ve su hedeflerinin ağırlıklı ortalaması
        </p>
      </div>
    </section>
  );
};
