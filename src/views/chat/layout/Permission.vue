<script setup lang='ts'>
import { NButton, NInput, NModal, useMessage, NTabPane, NTabs } from 'naive-ui'
import Icon403 from '@/icons/403.vue'
import login from './login.vue'
import register from './register.vue'
import register2 from './ResetPassword.vue'

interface Props {
  visible: boolean
}

defineProps<Props>()


</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            403
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <Icon403 class="w-[200px] m-auto" />
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
      </div>
    </div>
  </NModal>
</template>
