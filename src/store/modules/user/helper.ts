import { ss } from '@/utils/storage'


const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  id: string
  email: string
  chatModel: string
  chatModelList: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: '/src/assets/avatar.jpg',
      name: 'ChatAI',
      description: '',
      id: '',
      email: '',
      chatModel: 'gpt-3.5-turbo',
      chatModelList: '',
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
