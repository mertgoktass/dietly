import { useState } from 'react';
import { CalorieTracker } from './components/CalorieTracker';
import { Header } from './components/Header';
import { ProfileModal } from './components/ProfileModal';
import { SummaryCards } from './components/SummaryCards';
import { WaterTracker } from './components/WaterTracker';
import { useHealthLog } from './hooks/useHealthLog';

export function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {
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
  } = useHealthLog();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        profile={profile}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onOpenProfile={() => setIsProfileOpen(true)}
        onResetDay={resetCurrentDay}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <SummaryCards
          totalCalories={totalCalories}
          waterMl={currentRecord.waterMl}
          targets={targets}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <WaterTracker
              waterMl={currentRecord.waterMl}
              targetMl={targets.waterTargetMl}
              onAdjustWater={adjustWater}
            />
          </div>

          <div className="lg:col-span-7">
            <CalorieTracker
              meals={currentRecord.meals}
              onAddMeal={addMeal}
              onRemoveMeal={removeMeal}
            />
          </div>
        </div>
      </main>

      <ProfileModal
        isOpen={isProfileOpen}
        profile={profile}
        onClose={() => setIsProfileOpen(false)}
        onSave={setProfile}
      />
    </div>
  );
}

export default App;
