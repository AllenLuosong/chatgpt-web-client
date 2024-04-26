<script setup lang="ts">
import { computed,defineAsyncComponent, onMounted, ref } from "vue";
import { SvgIcon ,HoverButton, CalendarSignIn } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { NAvatar,NTooltip } from 'naive-ui'
import { homeStore, useUserStore,useChatStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import 'intro.js/introjs.css' // 引入 Intro.js 的 CSS 文件
import IntroJs from 'intro.js'
import { useAuthStore } from '@/store'
import { useAppStore } from '@/store'

const authStore = useAuthStore()
const appStore = useAppStore()

const needPermission = computed(() => !authStore.token)
const isneedintro = computed(() => appStore.isneedintro)
//import gallery from '@/views/gallery/index.vue'
const chatStore = useChatStore()
const { isMobile } = useBasicLayout()

const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
const userStore = useUserStore()

const st= ref({'show':false,showImg:false, menu:[],active:'chat'})
const showCalendar = ref<boolean>(false)


const userInfo = computed(() => userStore.userInfo)
import { router } from '@/router'
import { mlog } from "@/api";

const goHome =computed(  () => {
  //router.push('/')
  return router.currentRoute.value.name
});
// const go=(n:string)=>{
//   if('chat'==n){
//         router.push('/chat/'+ chatStore.active??'1002')
//     }
//     if('draw'==n){
//         router.push('/draw/'+ chatStore.active??'1002')
//         st.value.show=true;
//     }
// }
//mlog('g', goHome() );
const chatId= computed(()=>chatStore.active??'1002' );

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
//           element: document.querySelector('#app > div > div.dark\:bg-\[\#24272e\].transition-all.p-0.h-full > div > div > div > div.flex-shrink-0.w-\[60px\].z-\[1000\].h-full > div > div.flex.flex-col.space-y-2 > div:nth-child(2)'),
//           intro: '点击选择对话模型'
//         },
//         { 
//           element: document.querySelector('#app > div > div.dark\:bg-\[\#24272e\].transition-all.p-0.h-full > div > div > div > div.flex-shrink-0.w-\[60px\].z-\[1000\].h-full > div > div.flex.flex-col.space-y-2 > div:nth-child(3) > button'),
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
<div class="flex-shrink-0 w-[60px] z-[1000]  h-full" v-if="!isMobile">
    <div class="flex h-full select-none flex-col items-center justify-between bg-[#e8eaf1] px-2 pt-4 pb-8 dark:bg-[#25272d]">
        <div class="flex flex-col space-y-4 flex-1">
            <a :href="`#/chat/${chatId}`"    @click="st.active='chat'" class="router-link-active router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]">
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger> 
                    <div  class="flex h-full justify-center items-center py-1 flex-col " :class="[ goHome =='Chat' ? 'active' : '']">
                    <SvgIcon icon="ri:wechat-line" class="text-3xl  flex-1"></SvgIcon>
                     <span class="text-[10px]">{{$t('mjtab.chat')}}</span>
                    </div>
                 </template>
                AI Chat
                </n-tooltip>
            </a> 
            <a   @click="homeStore.setMyData({act:'showgpts'}) " class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]">
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger> 
                    <div  class="flex h-full justify-center items-center   py-1 flex-col" >
                    <SvgIcon icon="ri:apps-fill" class="text-3xl flex-1"></SvgIcon>
                     <span class="text-[10px]">GPTs</span>
                    </div> 
                  </template>
                    ChatGPT Store 
                </n-tooltip>
            </a>


            <a :href="`#/draw/${chatId}`" @click="st.active='draw'" class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]">
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger> 
                    <div  class="flex h-full justify-center items-center   py-1 flex-col" :class="[goHome=='draw' ? 'active' : '']">
                    <SvgIcon icon="ic:outline-palette" class="text-3xl flex-1"></SvgIcon>
                     <span class="text-[10px]">{{$t('mjtab.draw')}}</span>
                    </div> 
                  </template>
                    {{$t('mjtab.drawinfo')}}
                </n-tooltip>
            </a>



             <!-- <a   @click="homeStore.setMyData({act:'gallery'}) " class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]">
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger> 
                    <div  class="flex h-full justify-center items-center   py-1 flex-col" >
                    <SvgIcon icon="material-symbols:imagesmode-outline" class="text-3xl flex-1"></SvgIcon>
                     <span class="text-[10px]">{{$t('mjtab.gallery')}}</span>
                    </div> 
                  </template>
                    {{ $t('mjtab.galleryInfo') }}
                </n-tooltip>
            </a> -->


            <!-- <section  class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]"
             >
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger> 
                    <div  class="flex  h-full justify-center items-center py-1 flex-col ">
                      <SvgIcon icon="mingcute:grid-2-line" class="text-3xl flex-1"></SvgIcon>
                      <span class="text-[10px]">画廊</span>
                    </div>  
                  </template>
                    画廊:看看别人是如何画的
                </n-tooltip>                
            </section> -->

             

        </div>
        <div class="flex flex-col  space-y-2 "> 

            
            <NAvatar  size="large"  round  :src="userInfo.avatar"   v-if="userInfo.avatar"  :fallback-src="defaultAvatar"
             class=" cursor-pointer"  />
            <HoverButton>
                <div class="flex h-full justify-center items-center   py-1 flex-col"  @click="showCalendar = true">
                    <SvgIcon icon="ri:calendar-2-line" class="text-3xl flex-1"/>
                    <span class="text-[10px]">签到</span>
                </div>
            </HoverButton>

            <HoverButton>
                <div class="flex h-full justify-center items-center   py-1 flex-col"  @click="st.show = true">
                    <SvgIcon icon="ri:settings-4-line"  class="text-3xl flex-1"/>
                    <span class="text-[10px]">设置</span>
                </div>
            </HoverButton>
        </div>
    </div>
</div>
 <CalendarSignIn v-if="showCalendar" v-model:visible="showCalendar" />
 <Setting v-if="st.show" v-model:visible="st.show" />

</template>

 