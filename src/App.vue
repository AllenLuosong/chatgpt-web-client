<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import 'intro.js/introjs.css' // 引入 Intro.js 的 CSS 文件
import IntroJs from 'intro.js'
import { useAuthStore } from '@/store'
import { useAppStore } from '@/store'

const authStore = useAuthStore()
const appStore = useAppStore()

const needPermission = computed(() => !authStore.token)
const isneedintro = computed(() => appStore.isneedintro)

const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()

// onMounted(() => {
//   const intro = IntroJs()
//   intro.setOptions({
//       prevLabel: '上一步',
//       nextLabel: '下一步',
//       skipLabel: '跳过',
//       doneLabel: '完成',
//       tooltipClass: 'intro-tooltip', 
//       steps: [
//         { 
//           element: document.querySelector('#app > div > div.dark\:bg-\[\#24272e\].transition-all.p-0.h-full > div > div > div > div.n-layout-content.n-layout.n-layout--static-positioned.h-full > div > div > header > div.absolute.left-1\/2.top-full.-translate-x-1\/2.cursor-pointer.select-none.rounded-b-md.border.bg-white.px-2.dark\:border-neutral-800.dark\:bg-\[\#111114\]'),
//           intro: '点击选择对话模型'
//         },
//         { 
//           element: document.querySelector('#app > div > div.dark\:bg-\[\#24272e\].transition-all.p-0.h-full > div > div > div > div.flex-shrink-0.w-\[60px\].z-\[1000\].h-full > div > div.flex.flex-col.space-y-2 > div:nth-child(3)'),
//           intro: '点击签到领取福利'
//         }
//       ]
//     })
//   if (!needPermission.value){
//     if (isneedintro.value){
//         intro.start()
//         appStore.setIsNeedIntro(false)
//       }
//   }
// })
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>
