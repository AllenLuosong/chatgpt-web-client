<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NLayout, NLayoutContent,useMessage, NModal, NTabPane, NTabs, NImage, NText } from 'naive-ui'
import { useRouter ,useRoute } from 'vue-router'
import Sider from './sider/index.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { gptConfigStore, homeStore, useAppStore, useAuthStore, useChatStore } from '@/store'
import { aiSider,aiFooter} from '@/views/mj' 
import aiMobileMenu from '@/views/mj/aiMobileMenu.vue'; 
import { t } from '@/locales'
import { mlog, openaiSetting } from '@/api'
import { isObject } from '@/utils/is'
import login from './login.vue'
import register from './register.vue'
import register2 from './ResetPassword.vue'
import Icon403 from '@/icons/403.vue'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()
const authStore = useAuthStore()

const rt = useRoute();
const ms = useMessage();
openaiSetting( rt.query)
if(rt.name =='GPTs'){ 
  let model= `gpt-4-gizmo-${rt.params.gid.toString()}`  ;
  gptConfigStore.setMyData({model:model});
  ms.success(`GPTs ${t('mj.modleSuccess')}`);
}else if(rt.name=='Setting'){ 
  openaiSetting( rt.query);
  if(isObject( rt.query ))  ms.success( t('mj.setingSuccess') ); 
}else if(rt.name=='Model'){ 
  let model= `${rt.params.gid.toString()}`  ;
  gptConfigStore.setMyData({model:model});
  ms.success( t('mj.modleSuccess') );
}

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })
homeStore.setMyData({local:'Chat'});
const { isMobile } = useBasicLayout()


const collapsed = computed(() => appStore.siderCollapsed)

const needPermission = computed(() => {
 
 return  !!authStore.session?.auth && !authStore.token
})

const showModal = ref(JSON.parse(homeStore.myData.session.isShowDemo)) 

const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return [ 'shadow-md', 'dark:border-neutral-800'] //'border', 'rounded-md',
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { 'abc': !isMobile.value && !collapsed.value },
  ]
}) 
</script>

<template>
  <div class="  dark:bg-[#24272e] transition-all p-0"  :class="[isMobile ? 'h55' : 'h-full' ]">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <aiSider v-if="!isMobile"/>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <NModal
      style="width: 90%; max-width: 640px"
      v-model:show="showModal"
      preset="dialog"
      title="警告"
      type="warning"
      positive-text="确认"
      >
      你正在使用演示账号登录,如想使用完整功能请扫描如下二维码联系管理员,或点击签到功能领取额度福利🤙
      <br />
      <NImage
        width="200"
        src="https://img2.imgtp.com/2024/03/31/RaP7CxZO.jpg"
      />
    </NModal>

    <NModal :show="needPermission" style="width: 90%; max-width: 640px">
      <div class="p-10 bg-white rounded dark:bg-slate-800">
        <div class="space-y-4">
          <header class="space-y-2">
            <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
              403
            </h2>
            <p class="text-base text-center text-slate-500 dark:text-slate-500">
              {{ $t('common.unauthorizedTips') }}
            </p>
            <Icon403 class="w-[150px] m-auto" />
          </header>
          <NTabs default-value="login" size="large" animated>
            <NTabPane name="login" tab="登录">
              <login />
            </NTabPane>
            <NTabPane name="register" tab="注册">
              <register />
            </NTabPane>
            <NTabPane name="resetPassword" tab="密码重置">
              <register2 />
            </NTabPane>
          </NTabs>
          <p  class="text-base dark:text-slate-500">
          使用本平台，视您接受并同意 <a class="text-blue-500" target="_blank" href="disclaimer.html">《免责声明》</a>,
          <a class="text-blue-500" target="_blank" href="https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm">《生成式人工智能服务管理暂行办法》</a>内的相关条款。
          </p>
        </div>
      </div>
    </NModal>
  </div>
   <aiMobileMenu v-if="isMobile"   /> 

  <aiFooter/>
</template>

<style  >
.h55{
  height: calc(100% - 55px);
}
</style>
