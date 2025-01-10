<script setup lang="ts">

// const router = useRouter()
// const routes = router.getRoutes()
// console.log(routes)
const links = useMenus()
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
  <slot />
</template>

<style scoped>

</style>
