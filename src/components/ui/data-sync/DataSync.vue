<template>
  <div class="container mx-auto p-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- 标题 -->
      <h1 class="text-2xl font-bold mb-6">数据同步配置</h1>

      <!-- 配置选项卡 -->
      <div class="mb-6">
        <div class="flex space-x-4">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab.name"
            :class="[
              'px-4 py-2 rounded-md',
              activeTab === tab.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 配置表单 -->
      <div class="mb-8">
        <template v-if="activeTab === 'webdav'">
          <WebDAVConfig @update="updateConfig" />
        </template>
        <template v-if="activeTab === 'gitlab'">
          <GitLabConfig @update="updateConfig" />
        </template>
        <template v-if="activeTab === 'github'">
          <GitHubConfig @update="updateConfig" />
        </template>
      </div>

      <!-- 同步状态 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">同步状态</h2>
        <div class="space-y-2">
          <div class="bg-gray-100 rounded-md p-3">
            <p class="text-sm text-gray-600">{{ status }}</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                :class="[
                  'bg-blue-600 h-2.5 rounded-full',
                  progress === 100 ? 'bg-green-500' : ''
                ]"
                :style="{ width: `$$${progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-4">
        <button
          @click="handleSync"
          :disabled="!isConfigured"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          开始同步
        </button>
        <button
          @click="clearConfig"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          清除配置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import WebDAVConfig from './components/WebDAVConfig.vue';
import GitLabConfig from './components/GitLabConfig.vue';
import GitHubConfig from './components/GitHubConfig.vue';
import WebDAV from 'webdav';
import axios from 'axios';

const tabs = [
  { name: 'webdav', label: 'WebDAV' },
  { name: 'gitlab', label: 'GitLab' },
  { name: 'github', label: 'GitHub' }
];
const activeTab = ref('webdav');

// 配置状态
const config = reactive({
  webdav: {},
  gitlab: {},
  github: {}
});
const isConfigured = ref(false);
const status = ref('待配置');
const progress = ref(0);

// 更新配置
const updateConfig = (source, newConfig) => {
  config[source] = newConfig;
  isConfigured.value = Object.values(config).some(
    item => Object.keys(item).length > 0
  );
};

// 开始同步
const handleSync = async () => {
  if (!isConfigured.value) {
    status.value = '请先配置至少一个数据源';
    return;
  }

  status.value = '正在同步中...';
  progress.value = 0;

  try {
    // 同步 WebDAV 数据
    if (Object.keys(config.webdav).length > 0) {
      await syncWebDav();
    }

    // 同步 GitLab 数据
    if (Object.keys(config.gitlab).length > 0) {
      await syncGitLab();
    }

    // 同步 GitHub 数据
    if (Object.keys(config.github).length > 0) {
      await syncGitHub();
    }

    status.value = '同步完成！';
    progress.value = 100;
  } catch (error) {
    status.value = `同步失败: $${error.message}`;
    progress.value = 0;
  }
};

// 同步 WebDAV 数据
const syncWebDav = async () => {
  const { url, username, password } = config.webdav;

  const client = new WebDAV.Client(url, {
    credentials: {
      username,
      password
    }
  });

  // 示例：列出根目录下的文件
  const items = await client.readdir('/');
  console.log('WebDAV 同步完成:', items);
};

// 同步 GitLab 数据
const syncGitLab = async () => {
  const { apiUrl, token } = config.gitlab;

  axios.defaults.headers.common['Authorization'] = `Bearer $$${token}`;

  // 示例：获取项目列表
  const response = await axios.get(`$${apiUrl}/projects`);
  const projects = response.data;
  console.log('GitLab 同步完成:', projects);
};

// 同步 GitHub 数据
const syncGitHub = async () => {
  const { token } = config.github;

  axios.defaults.headers.common['Authorization'] = `token ${token}`;

  // 示例：获取用户信息
  const response = await axios.get('https://api.github.com/user');
  const user = response.data;
  console.log('GitHub 同步完成:', user);
};

// 清除配置
const clearConfig = () => {
  config.webdav = {};
  config.gitlab = {};
  config.github = {};
  isConfigured.value = false;
  status.value = '待配置';
  progress.value = 0;
};
</script>