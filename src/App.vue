<!--
 * @Author: mjjh
 * @LastEditTime: 2023-04-09 15:26:40
 * @FilePath: \chagpt-shuowen\src\App.vue
 * @Description: 根vue
-->
<script setup lang="ts">
import { NButton, NConfigProvider, NIcon, NLayout, NLayoutSider, NMenu, NSpace, NTooltip } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { defineAsyncComponent, h, onMounted, computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChatboxEllipsesOutline, ImagesOutline, LibraryOutline, SettingsOutline, GiftSharp } from '@vicons/ionicons5'
import { NaiveProvider, PromptStore, CalendarSignIn } from '@/components/index'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/locales'
import 'intro.js/introjs.css' // 引入 Intro.js 的 CSS 文件
import IntroJs from 'intro.js'
import { useAppStore } from '@/store'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const appStore = useAppStore()
const Setting = defineAsyncComponent(() => import('@/components/Setting/index.vue'))
const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()
const activeKey = ref<string>('menu-chat')
const showPrompt = ref<boolean>(false)
const showSetting = ref<boolean>(false)
const showCalendar = ref<boolean>(false)
const needPermission = computed(() => !authStore.token)

const menuOptions: MenuOption[] = [
  {
    key: 'menu-chat',
    icon: renderIcon(ChatboxEllipsesOutline),
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Chat',
          },
        },
        { default: () => '聊天' },
      ),
  },
  {
    key: 'menu-draw',
    icon: renderIcon(ImagesOutline),
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Draw',
          },
        },
        { default: () => '画图' },
      ),
  },
]
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const isneedintro = computed(() => appStore.isneedintro)

onMounted(() => {
  const intro = IntroJs()
  intro.setOptions({
      prevLabel: '上一步',
      nextLabel: '下一步',
      skipLabel: '跳过',
      doneLabel: '完成',
      tooltipClass: 'intro-tooltip', 
      steps: [
        { 
          element: document.querySelector('#app > div > div.n-layout.n-layout--static-positioned.h-full > div > aside > div.n-layout-sider-scroll-container > div.n-space.absolute.bottom-0.ml-2 > div:nth-child(3) > button'),
          intro: '点击选择对话模型'
        },
        { 
          element: document.querySelector('#app > div > div.n-layout.n-layout--static-positioned.h-full > div > aside > div.n-layout-sider-scroll-container > div.n-space.absolute.bottom-0.ml-2 > div:nth-child(2)'),
          intro: '点击签到领取福利'
        }
      ]
    })
  if (!needPermission.value){
    if (isneedintro.value){
        intro.start()
        appStore.setIsNeedIntro(false)
      }
  }


})


</script>

<template>
  <NConfigProvider class="h-full" :theme="theme" :theme-overrides="themeOverrides" :locale="language">
    <NaiveProvider>
      <NLayout class="h-full" has-sider>
        <NLayoutSider bordered :collapsed-width="48" collapse-mode="width" :collapsed="true">
          <NMenu v-model:value="activeKey" :options="menuOptions" />
          <NSpace vertical class="absolute bottom-0 ml-2">
            <NTooltip trigger="hover" placement="right" style="margin-left: 1.5rem;">
              <template #trigger>
                <NButton text style="font-size: 26px;" class="cursor-pointer" @click="showPrompt = true">
                  <NIcon>
                    <LibraryOutline />
                  </NIcon>
                </NButton>
              </template>
              {{ t('store.siderButton') }}
            </NTooltip>
            <NTooltip trigger="hover" placement="right" style="margin-left: 1.5rem;">
              <template #trigger>
                <NButton text style="font-size: 26px;" class="cursor-pointer" @click="showCalendar = true">
                  <NIcon>
                    <GiftSharp />
                  </NIcon>
                </NButton>
              </template>
              {{ t('store.CalendarButton') }}
            </NTooltip>
            <NTooltip trigger="hover" placement="right" style="margin-left: 1.5rem;">
              <template #trigger>
                <NButton text style="font-size: 26px;" class="cursor-pointer" @click="showSetting = true">
                  <NIcon>
                    <SettingsOutline />
                  </NIcon>
                </NButton>
              </template>
              {{ t('setting.setting') }}
            </NTooltip>
          </NSpace>
        </NLayoutSider>
        <NLayout>
          <!-- <KeepAlive>
            <RouterView :key="routePath" />
          </KeepAlive> -->
          <RouterView v-slot="{ Component, route }">
            <KeepAlive><component :is="Component" :key="route.fullPath" /></KeepAlive>
          </RouterView>
        </NLayout>
      </NLayout>

      <CalendarSignIn v-model:visible="showCalendar" />
      <PromptStore v-model:visible="showPrompt" />
      <Setting v-model:visible="showSetting" />
    </NaiveProvider>
  </NConfigProvider>
</template>
