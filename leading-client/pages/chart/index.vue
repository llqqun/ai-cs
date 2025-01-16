<script setup lang="ts">
definePageMeta({
  title: 'chart',
  navHeader: true,
  icon: 'i-heroicons-chart-bar'
})
const model = ref(null);
const onModelChanged = (newModel) => {
  model.value = newModel;
  console.log("Model: ", model.value);
}
</script>

<template>
  <ClientOnly>
    <chat :model="model" />
  </ClientOnly>
</template>

<style scoped>

</style>
