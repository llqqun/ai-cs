<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ModelItem } from '@/server/api/models/index.get'

const { loadModels, models } = useModels({ forceReload: true })

const modelRows = computed(() => {
  return models.value.map((model) => {
    return {
      name: model.name,
      size: formatFileSize(model.size),
      family: model.details?.family,
      format: model.details?.format,
      parameter_size: model.details?.parameter_size,
      quantization_level: model.details?.quantization_level
    }
  })
})
const columns = computed(() => {
  return [
    { key: 'name', label: '名称' },
    { key: 'size', label: '大小' },
    { key: 'family', label: '家族' },
    { key: 'format', label: '格式' },
    { key: 'parameter_size', label: '参数量' },
    { key: 'quantization_level', label: '量化等级' }
  ]
})

const selectedRows = ref<ModelItem[]>([])
const select = (row: ModelItem) => {
  const index = selectedRows.value.findIndex((item) => item.name === row.name)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

const actions = [
  [{
    key: 'delete',
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      isOpen.value = true
    }
  }]
]

// Modal
const isOpen = ref(false)
const onDeleteModel = async () => {
  resetModal()
  selectedRows.value.forEach(async ({ name }) => {
    const status = await $fetchWithAuth(`/api/models/`, {
      method: 'DELETE',
      body: {
        model: name
      },
      headers: getKeysHeader()
    })

    if (status?.status === 'success') {
      models.value = models.value.filter((m) => m.name !== name)
    }
  })
}

const onCancel = () => {
  resetModal()
}

const resetModal = () => {
  isOpen.value = false
}

function formatFileSize(bytes?: number) {
  if (bytes === undefined) return '-'
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<template>
  <Download @modelDownloaded="loadModels" />
  <div class="mt-3 h-7">
    <UDropdown v-if="selectedRows.length > 0" :items="actions" :ui="{ width: 'w-36' }">
      <UButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs">
        操作
      </UButton>
    </UDropdown>
  </div>

  <ClientOnly>
    <UTable :columns="columns" :rows="modelRows" @select="select" v-model="selectedRows" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: '没有数据' }"></UTable>
  </ClientOnly>

  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <span class="font-bold text-lg">警告</span>
      </template>

      <div>
        <p class="mb-4">{{ selectedRows.length > 1 ? '删除' : '删除配置' }}?</p>
        <ul>
          <li class="font-bold" v-for="row in selectedRows" :key="row.name">{{ row.name }}</li>
        </ul>
      </div>

      <template #footer>
        <div class="flex flex-row gap-4">
          <UButton class="w-[80px] justify-center" color="primary" variant="solid" @click="onDeleteModel">{{ '好的' }}</UButton>
          <UButton class="w-[80px] justify-center" color="white" variant="solid" @click="onCancel">{{ '取消' }}</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
