import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ActivityLevel, Gender, UserProfile } from '../types';
import { calculateDailyTargets } from '../utils/calculator';

interface ProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
}

const ACTIVITY_OPTIONS: Array<{ value: ActivityLevel; label: string; desc: string }> = [
  { value: 'sedentary', label: 'Hareketsiz', desc: 'Masa başı iş, minimum egzersiz' },
  { value: 'light', label: 'Hafif Aktif', desc: 'Haftada 1-3 gün hafif antrenman' },
  { value: 'moderate', label: 'Orta Aktif', desc: 'Haftada 3-5 gün düzenli spor' },
  { value: 'active', label: 'Yüksek Aktif', desc: 'Haftada 6-7 gün yoğun antrenman' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<UserProfile>(profile);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(profile);
      setValidationError(null);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const previewTargets = calculateDailyTargets(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setValidationError('İsim alanı boş bırakılamaz.');
      return;
    }
    if (form.age < 12 || form.age > 110) {
      setValidationError('Yaş 12 ile 110 arasında olmalıdır.');
      return;
    }
    if (form.heightCm < 100 || form.heightCm > 240) {
      setValidationError('Boy 100 cm ile 240 cm arasında olmalıdır.');
      return;
    }
    if (form.weightKg < 30 || form.weightKg > 300) {
      setValidationError('Kilo 30 kg ile 300 kg arasında olmalıdır.');
      return;
    }

    onSave({ ...form, name: form.name.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Vücut Ölçüleri & Günlük Hedefler
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Mifflin-St Jeor formülü ile günlük limitlerin otomatik güncellenir
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Ad / Hitap
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Cinsiyet
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['male', 'female'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, gender: g })}
                    className={`rounded-lg border py-2 text-xs font-medium transition ${
                      form.gender === g
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400'
                    }`}
                  >
                    {g === 'male' ? 'Erkek' : 'Kadın'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Yaş
              </label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm tabular-nums outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Boy (cm)
              </label>
              <input
                type="number"
                value={form.heightCm}
                onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm tabular-nums outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Kilo (kg)
              </label>
              <input
                type="number"
                value={form.weightKg}
                onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm tabular-nums outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Aktivite Seviyesi
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ACTIVITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, activityLevel: opt.value })}
                  className={`rounded-lg border p-2.5 text-left transition ${
                    form.activityLevel === opt.value
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-200 bg-zinc-50/70 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {opt.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs dark:border-zinc-800 dark:bg-zinc-950">
            <div>
              <span className="text-zinc-500">Hesaplanan Kalori Hedefi: </span>
              <strong className="font-semibold text-amber-500">
                {previewTargets.calorieTarget.toLocaleString('tr-TR')} kcal
              </strong>
            </div>
            <div>
              <span className="text-zinc-500">Su Hedefi: </span>
              <strong className="font-semibold text-sky-500">
                {previewTargets.waterTargetMl.toLocaleString('tr-TR')} ml
              </strong>
            </div>
          </div>

          {validationError && (
            <p className="text-xs font-medium text-rose-500">{validationError}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              Hedefleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
