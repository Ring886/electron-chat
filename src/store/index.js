// stores/memoStore.js
import { defineStore } from 'pinia'

export const useMemoStore = defineStore('memo', {
  state: () => ({
    memos: [
      
    ]
  }),
  actions: {
    addMemo(title, text) {
      const id = Date.now();  // 生成唯一 id
      this.memos.unshift({ id, title, text })
    },
    updateMemo(id, title, text) {
      const index = this.memos.findIndex(memo => memo.id === id);
      // console.log('进入方法')
      // console.log('index:', index)
      if (index !== -1) {
        this.memos[index] = { id, title, text };
        // console.log(this.memos[index])
      }
    }
  },
  persist: true
})