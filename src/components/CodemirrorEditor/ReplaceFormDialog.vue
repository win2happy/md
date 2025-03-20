<script setup lang="ts">
import { useDisplayStore, useStore } from '@/stores'
import { createTable, formatDoc } from '@/utils'

const store = useStore()
const displayStore = useDisplayStore()

const { editor } = storeToRefs(store)

const { toggleShowReplaceFormDialog } = displayStore

const textVal = ref('')
const newTextVal = ref('')
const textPrefixVal = ref('')
const textSuffixVal = ref('')
// const tableData = ref<Record<string, string>>({})

function resetVal() {
  textVal.value = ''
  newTextVal.value = ''
  textPrefixVal.value = ''
  textSuffixVal.value = ''
}

// 替换文本
function replaceText() {
  if (textVal.value == '') {
    return 
  }
  if (newTextVal.value == '') {
    newTextVal.value = textVal.value
  }
  
  let replaceStr = textPrefixVal.value + newTextVal.value + textSuffixVal.value
  store.replaceContent(textVal.value, replaceStr)
  resetVal()
  toggleShowReplaceFormDialog()
}

function onUpdate(val: boolean) {
  if (!val) {
    toggleShowReplaceFormDialog(false)
  }
}
</script>

<template>
  <Dialog :open="displayStore.isShowReplaceFormDialog" @update:open="onUpdate">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>替换文本</DialogTitle>
      </DialogHeader>
      <div>
        <div>原文本：<Input v-model="textVal" /></div>
        <div>新文本：<Input v-model="newTextVal" /></div>
        <div>文本前缀：<Input v-model="textPrefixVal" /></div>
        <div>文本后缀：<Input v-model="textSuffixVal" /></div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="toggleShowReplaceFormDialog(false)">
          取 消
        </Button>
        <Button @click="replaceText">
          确 定
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="less" scoped>
</style>
