<script setup lang="ts">
definePageMeta({
  title: 'home',
  navHeader: true,
  icon: 'i-heroicons-home'
})
const model = ref(null);
const onModelChanged = (newModel) => {
  model.value = newModel;
  console.log("Model: ", model.value);
}
</script>

<template>
  <div>
    <ClientOnly>
    <Models @model-changed="onModelChanged"  /></ClientOnly>
  </div>
</template>

<style scoped>

</style>
