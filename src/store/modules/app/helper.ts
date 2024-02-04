import { ss } from '@/utils/storage'

const LOCAL_NAME = 'appSetting'

export type Theme = 'light' | 'dark' | 'auto'

export type Language = 'zh-CN' | 'zh-TW' | 'en-US'

export type ChatModel = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo-preview'

export type DrawValue = 'dall-e-2' | 'dall-e-3'

export interface AppState {
  siderCollapsed: boolean
  theme: Theme
  language: Language
  chatModel: ChatModel
  drawvalue: DrawValue
  
}

export function defaultSetting(): AppState {
  return { siderCollapsed: false, theme: 'light', language: 'zh-CN' , chatModel: 'gpt-3.5-turbo', drawvalue: 'dall-e-2'}
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalSetting(setting: AppState): void {
  ss.set(LOCAL_NAME, setting)
}
