import React from 'react';
import { CupSoda, Droplets, GlassWater, Minus, Plus } from 'lucide-react';
import { calculatePercentage } from '../utils/calculator';

interface WaterTrackerProps {
  waterMl: number;
  targetMl: number;
  onAdjustWater: (deltaMl: number) => void;
}

const QUICK_AMOUNTS = [
  { label: '1 Bardak', amount: 200, icon: GlassWater },
  { label: 'Küçük Şişe', amount: 330, icon: CupSoda },
  { label: 'Matara', amount: 500, icon: Droplets },
] as const;

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterMl,
  targetMl,
  onAdjustWater,
}) => {
  const percentage = calculatePercentage(waterMl, targetMl);
  const glassCount = Math.floor(waterMl / 200);

  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800/90 dark:bg-zinc-900/60">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Su Tüketimi
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Hızlı porsiyon butonlarıyla gün içi sıvı alımını güncelle
            </p>
          </div>
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            ~{glassCount} bardak
          </span>
        </div>

        <div className="relative my-6 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 bg-sky-500/10 transition-all duration-500 ease-out dark:bg-sky-500/15"
            style={{ width: `${percentage}%` }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100">
                {waterMl.toLocaleString('tr-TR')}{' '}
                <span className="text-sm font-normal text-zinc-500">ml</span>
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Hedef: {targetMl.toLocaleString('tr-TR')} ml
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={waterMl === 0}
                onClick={() => onAdjustWater(-200)}
                aria-label="200 ml azalt"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onAdjustWater(200)}
                aria-label="200 ml artır"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          Hızlı Ekle
        </span>
        <div className="grid grid-cols-3 gap-2.5">
          {QUICK_AMOUNTS.map(({ label, amount, icon: Icon }) => (
            <button
              key={amount}
              type="button"
              onClick={() => onAdjustWater(amount)}
              className="group flex flex-col items-start rounded-lg border border-zinc-200 bg-zinc-50/60 p-3 text-left transition hover:border-sky-500/40 hover:bg-sky-500/5 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10"
            >
              <Icon className="h-4 w-4 text-sky-500 transition-transform group-hover:scale-110" />
              <span className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                +{amount} ml
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
