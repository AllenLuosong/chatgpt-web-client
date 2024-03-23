<!--
 * @Author: mjjh
 * @LastEditTime: 2023-04-17 21:32:06
 * @FilePath: \chagpt-shuowen\src\components\Setting\index.vue
 * @Description: 弹出设置窗口
-->
<script setup lang='ts'>
import { computed, onMounted, ref, watch } from 'vue'
import { NModal, NTabPane, NTabs } from 'naive-ui'
import General from './General.vue'
import Advanced from './Advanced.vue'
import Quota from './Quota.vue'
import Redeem from './Redeem.vue'
import { SvgIcon } from '@/components/index'
import api from "@/api"
import { useAuthStore } from '@/store'
const authStore = useAuthStore()

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const active = ref('Config')
const loading = ref(false)
const userConfig = ref<User.Config>({})
const userUsage = ref<User.Usage>({})

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

async function fetchUsage() {
  try {
    loading.value = true
    const { data } = await api.fetchUserUsage<User.Usage>()
    userUsage.value = data
  } finally {
    loading.value = false
  }
}

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await api.fetchUserConfig<User.Config>()
    userConfig.value = data
  } finally {
    loading.value = false
  }
}


watch(
  active,
  (val) => {
    if (val === 'Quota'){
      fetchUsage()
    }
  }
)

const needPermission = computed(() => !authStore.token)
if (!needPermission.value)
  fetchConfig()

</script>

<template>
  <NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
    <div>
      <NTabs v-model:value="active" type="line" animated>
        <NTabPane name="Config" tab="Config">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:list-settings-line" />
            <span class="ml-2">{{ $t('setting.config') }}</span>
          </template>
          <General />
        </NTabPane>
        <NTabPane name="Quota" tab="Quota">
          <template #tab>
            <SvgIcon class="text-lg" icon="eos-icons:quota-outlined" />
            <span class="ml-2">{{ $t('setting.quota') }}</span>
          </template>
          <Quota :user-usage="userUsage" @reloadConfig="fetchUsage" />
        </NTabPane>
        <NTabPane name="Advanced" tab="Advanced">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:equalizer-line" />
            <span class="ml-2">{{ $t('setting.advanced') }}</span>
          </template>
          <div class="min-h-[100px]">
            <Advanced :user-config="userConfig" @reloadConfig="fetchConfig" />
          </div>
        </NTabPane>
        <NTabPane name="Redeem" tab="Redeem">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:red-packet-line" />
            <span class="ml-2">额度兑换</span>
          </template>
          <Redeem />
        </NTabPane>
        <!-- <NTabPane name="ModifyPassword" tab="ModifyPassword">
          <template #tab>
            <SvgIcon class="text-lg" icon="carbon:password" />
            <span class="ml-2">{{ $t('common.restPassWord') }}</span>
          </template>
          <ModifyPassword />
        </NTabPane> -->
      </NTabs>
    </div>
  </NModal>
</template>
