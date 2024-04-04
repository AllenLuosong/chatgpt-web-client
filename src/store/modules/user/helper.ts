/*
 * @Author: mjjh
 * @LastEditTime: 2023-04-16 19:18:06
 * @FilePath: \chagpt-shuowen\src\store\modules\user\helper.ts
 * @Description:
 */
import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  id: string
  email: string
  chatModel: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: '/src/assets/avatar.jpg',
      name: 'ChatAI',
      description: 'Star on <a href="https://github.com/mjjh1717/chatgpt-shuowen" class="text-blue-500" target="_blank" >Github</a>',
      id: '',
      email: '',
      chatModel: 'gpt-3.5-turbo',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
