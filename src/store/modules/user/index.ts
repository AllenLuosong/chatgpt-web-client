import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { getUserInfo } from '@/api/login'


export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    async getUserData() {
      const { data } = await getUserInfo()
      const newData = {
        avatar: data.avatarUrl,
        name: data.nickname,
        description: data.description,
        id: data.baseUserId,
        email: data.email,
        chatModel: data.chatModel,
        chatModelList: data.chatModelList
      }
      this.updateUserInfo(newData)
    },

    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.recordState()
    },

    recordState() {
      console.log(this.$state)
      setLocalState(this.$state)
    },
  },
})
