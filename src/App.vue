<template>
  <div class="app">
    <header class="app-header">
      <h1>Habit Tracker</h1>
      <p class="subtitle">Build better habits, one day at a time.</p>
    </header>

    <main class="app-main">
      <HabitStats />
      <HabitForm />
      <HabitList />
    </main>
  </div>
</template>

<script setup>
import HabitStats from './components/HabitStats.vue'
import HabitForm from './components/HabitForm.vue'
import HabitList from './components/HabitList.vue'
</script>
