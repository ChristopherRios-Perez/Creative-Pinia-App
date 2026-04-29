import { defineStore } from 'pinia'

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: [
      { id: 1, name: 'Morning Meditation', category: 'Wellness', completedDates: [], streak: 0 },
      { id: 2, name: 'Read 20 Pages', category: 'Learning', completedDates: [], streak: 0 },
    ],
    selectedCategory: 'All',
    nextId: 3,
  }),

  getters: {
    // Total number of habits
    totalHabits: (state) => state.habits.length,

    // Habits completed today
    completedToday: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.habits.filter((h) => h.completedDates.includes(today))
    },

    // Completion rate for today (percentage)
    completionRate: (state) => {
      if (state.habits.length === 0) return 0
      const today = new Date().toISOString().split('T')[0]
      const done = state.habits.filter((h) => h.completedDates.includes(today)).length
      return Math.round((done / state.habits.length) * 100)
    },

    // Unique categories
    categories: (state) => {
      const cats = [...new Set(state.habits.map((h) => h.category))]
      return ['All', ...cats]
    },

    // Habits filtered by selected category
    filteredHabits: (state) => {
      if (state.selectedCategory === 'All') return state.habits
      return state.habits.filter((h) => h.category === state.selectedCategory)
    },

    // Habit with the longest current streak
    topStreakHabit: (state) => {
      if (state.habits.length === 0) return null
      return state.habits.reduce((best, h) => (h.streak > best.streak ? h : best), state.habits[0])
    },
  },

  actions: {
    addHabit(name, category) {
      if (!name.trim()) return
      this.habits.push({
        id: this.nextId++,
        name: name.trim(),
        category: category.trim() || 'General',
        completedDates: [],
        streak: 0,
      })
    },

    removeHabit(id) {
      this.habits = this.habits.filter((h) => h.id !== id)
    },

    toggleToday(id) {
      const habit = this.habits.find((h) => h.id === id)
      if (!habit) return

      const today = new Date().toISOString().split('T')[0]
      const idx = habit.completedDates.indexOf(today)

      if (idx === -1) {
        habit.completedDates.push(today)
        this._recalcStreak(habit)
      } else {
        habit.completedDates.splice(idx, 1)
        this._recalcStreak(habit)
      }
    },

    setCategory(category) {
      this.selectedCategory = category
    },

    _recalcStreak(habit) {
      let streak = 0
      const today = new Date()
      for (let i = 0; i < 365; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        if (habit.completedDates.includes(dateStr)) {
          streak++
        } else {
          break
        }
      }
      habit.streak = streak
    },
  },
})
