<template>
  <div class="habit-list card">
    <div class="list-header">
      <h2>Today's Habits</h2>
      <div class="category-filters">
        <button
          v-for="cat in store.categories"
          :key="cat"
          class="btn btn-filter"
          :class="{ active: store.selectedCategory === cat }"
          @click="store.setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <p v-if="store.filteredHabits.length === 0" class="empty-state">
      No habits yet. Add one above!
    </p>

    <ul v-else class="habits">
      <li
        v-for="habit in store.filteredHabits"
        :key="habit.id"
        class="habit-item"
        :class="{ done: isDoneToday(habit) }"
      >
        <button
          class="check-btn"
          :aria-label="isDoneToday(habit) ? 'Mark incomplete' : 'Mark complete'"
          @click="store.toggleToday(habit.id)"
        >
          <span class="checkmark">{{ isDoneToday(habit) ? '✓' : '' }}</span>
        </button>

        <div class="habit-info">
          <span class="habit-name">{{ habit.name }}</span>
          <span class="habit-category">{{ habit.category }}</span>
        </div>

        <div class="habit-streak" :title="`${habit.streak}-day streak`">
          <span class="streak-icon">🔥</span>
          <span class="streak-count">{{ habit.streak }}</span>
        </div>

        <button class="delete-btn" aria-label="Delete habit" @click="store.removeHabit(habit.id)">
          ✕
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()

function isDoneToday(habit) {
  const today = new Date().toISOString().split('T')[0]
  return habit.completedDates.includes(today)
}
</script>
