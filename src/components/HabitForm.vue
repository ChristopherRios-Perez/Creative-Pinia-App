<template>
  <div class="habit-form card">
    <h2>Add New Habit</h2>
    <form @submit.prevent="submit">
      <div class="field">
        <label for="habit-name">Habit Name</label>
        <input
          id="habit-name"
          v-model="name"
          type="text"
          placeholder="e.g. Drink 8 glasses of water"
          maxlength="60"
          required
        />
      </div>
      <div class="field">
        <label for="habit-category">Category</label>
        <input
          id="habit-category"
          v-model="category"
          type="text"
          placeholder="e.g. Health, Learning, Fitness"
          maxlength="30"
        />
      </div>
      <button type="submit" class="btn btn-primary">+ Add Habit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()

const name = ref('')
const category = ref('')

function submit() {
  store.addHabit(name.value, category.value)
  name.value = ''
  category.value = ''
}
</script>
