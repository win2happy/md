<template>
  <div class="space-y-4">
    <input v-model="formData.url" type="text" placeholder="请输入 WebDAV 地址" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <input v-model="formData.username" type="text" placeholder="请输入用户名" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <input v-model="formData.password" type="password" placeholder="请输入密码" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button @click="saveConfig" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      保存配置
    </button>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';
  
  const formData = ref({
    url: '',
    username: '',
    password: ''
  });
  
  const emits = defineEmits(['update']);
  
  const saveConfig = () => {
    emits('update', 'webdav', formData.value);
  };
</script>