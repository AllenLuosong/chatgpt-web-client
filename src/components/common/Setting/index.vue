<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import { NModal, NTabPane, NTabs } from 'naive-ui'
import General from './General.vue'
import Advanced from './Advanced.vue'
import Quota from './Quota.vue'
import Redeem from './Redeem.vue'
import aiModel from '@/views/mj/aiModel.vue'
import aiSetServer from '@/views/mj/aiSetServer.vue'
import About from './About.vue'
import { homeStore, useAuthStore } from '@/store'
import { SvgIcon } from '@/components/common'
import api from "@/api"

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const loading = ref(false)

const userUsage = ref<User.Usage>({})

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const authStore = useAuthStore()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

const active = ref('General')

async function fetchUsage() {
  try {
    loading.value = true
    const { data } = await api.fetchUserUsage<User.Usage>()
    userUsage.value = data
  } finally {
    loading.value = false
  }
}

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

watch(
  active,
  (val) => {
    if (val === 'Quota'){
      fetchUsage()
    }
  }
)

</script>

<template>
  <NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
    <div>
      <NTabs v-model:value="active" type="line" animated>
        <NTabPane name="General" tab="General">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:file-user-line" />
            <span class="ml-2">{{ $t('setting.general') }}</span>
          </template>
          <div class="min-h-[100px]">
            <General />
          </div>
        </NTabPane>
        <NTabPane v-if="isChatGPTAPI" name="Advanced" tab="Advanced">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:equalizer-line" />
            <span class="ml-2">{{ $t('mjset.model') }}</span>
          </template>
          <div class="min-h-[100px]">
            <aiModel/>
          </div>
        </NTabPane>
        <NTabPane name="Quota" tab="Quota">
          <template #tab>
            <SvgIcon class="text-lg" icon="eos-icons:quota-outlined" />
            <span class="ml-2">{{ $t('setting.quota') }}</span>
          </template>
          <Quota :user-usage="userUsage" @reloadConfig="fetchUsage" />
        </NTabPane>

        <NTabPane name="server" tab="server" v-if=" ! homeStore.myData.session.isHideServer">
          <template #tab>
            <SvgIcon class="text-lg" icon="mingcute:server-line" />
            <span class="ml-2">{{ $t('mjset.server') }}</span>
          </template>
          <aiSetServer />
        </NTabPane>

        <NTabPane name="Redeem" tab="Redeem">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:red-packet-line" />
            <span class="ml-2">{{ $t('setting.redeem') }}</span>
          </template>
          <Redeem />
        </NTabPane>
        <!-- <NTabPane name="Config" tab="Config">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:list-settings-line" />
            <span class="ml-2">{{ $t('mjset.about') }}</span>
          </template>
          <About />
        </NTabPane> -->

      </NTabs>
    </div>
  </NModal>
</template>
