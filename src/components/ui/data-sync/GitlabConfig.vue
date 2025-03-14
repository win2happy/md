<template>
  <div class="space-y-4">
    <input v-model="formData.apiUrl" type="text" placeholder="请输入 GitLab API 地址" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <input v-model="formData.token" type="password" placeholder="请输入访问令牌" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button @click="saveConfig" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      保存配置
    </button>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';
  
  const formData = ref({
    apiUrl: '',
    token: ''
  });
  
  const emits = defineEmits(['update']);
  
  const saveConfig = () => {
    emits('update', 'gitlab', formData.value);
  };
</script>