<template>
  <div class="habit-stats card">
    <h2>Today's Progress</h2>

    <div class="stats-grid">
      <div class="stat-box">
        <span class="stat-value">{{ store.totalHabits }}</span>
        <span class="stat-label">Total Habits</span>
      </div>

      <div class="stat-box">
        <span class="stat-value">{{ store.completedToday.length }}</span>
        <span class="stat-label">Done Today</span>
      </div>

      <div class="stat-box">
        <span class="stat-value">{{ store.completionRate }}%</span>
        <span class="stat-label">Completion Rate</span>
      </div>
    </div>

    <div class="progress-bar-wrap">
      <div class="progress-bar" :style="{ width: store.completionRate + '%' }"></div>
    </div>

    <div v-if="store.topStreakHabit && store.topStreakHabit.streak > 0" class="top-streak">
      <span class="streak-icon">🏆</span>
      <span>
        Best streak: <strong>{{ store.topStreakHabit.name }}</strong>
        — {{ store.topStreakHabit.streak }} day{{ store.topStreakHabit.streak !== 1 ? 's' : '' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()
</script>
