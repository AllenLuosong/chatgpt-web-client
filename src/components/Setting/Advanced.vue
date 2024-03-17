<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";
import {
  NButton,
  NSpace,
  NInput,
  useMessage,
  NSelect,
  NTooltip,
  SelectOption,
  SelectGroupOption,
} from "naive-ui";
import { useSettingStore } from "@/store";
import { SvgIcon } from "@/components/index";
import { t } from "@/locales";
import api from "@/api";
import { useAppStore, useAuthStore, useUserStore } from "@/store";
import { getUserInfo } from "@/api/login";
import { Options } from "@vicons/ionicons5";

const ChatDefaultVaule = ref("gpt-3.5-turbo")
const loading = ref(false);

const appStore = useAppStore();

interface Props {
  userConfig: User.Config;
}

interface Emit {
  (e: "reloadConfig"): void;
}
const props = defineProps<Props>();

const emit = defineEmits<Emit>();
const settingStore = useSettingStore();
const ms = useMessage();
const secretKey = ref(props.userConfig.secretKey ?? "");
const proxyAdress = ref(props.userConfig.proxyAdress ?? "");
const chatModelList = ref(props.userConfig.chatModelList ?? "");
const chatModel = ref(props.userConfig.chatModel ?? "");


function reloadConfig() {
  emit("reloadConfig");
}

async function handleSave() {
  const data = await getUserInfo();
  try {
    loading.value = true;
    const result = await api.configEdit({
      secretKey: secretKey.value,
      proxyAdress: proxyAdress.value,
      chatModel: chatModel.value,
      drawvalue: appStore.drawvalue,
      baseUserId: data.data.baseUserId,
    });
    ms.success("更新成功");
    reloadConfig();
    window.location.reload()
  } catch (error: any) {
    ms.error(error.message ?? "error");
  } finally {
    loading.value = false;
  }
}

function handleReset() {
  settingStore.resetSetting();
  ms.success(t("common.success"));
  window.location.reload();
}

</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">我的secret key</span>
        <div class="flex-1">
          <NInput
            v-model:value="secretKey"
            placeholder="如不指定则使用默认配置"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
          />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">我的自定义地址</span>
        <div class="flex-1">
          <NInput
            v-model:value="proxyAdress"
            placeholder="如不指定,默认调用官方地址https://api.openai.com/v1"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
          />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">聊天模型</span>
        <div class="flex-1">
        <NSelect v-model:value="chatModel" :placeholder="'默认选择3.5模型'" :options="chatModelList" />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">&nbsp;</span>
        <NButton size="small" @click="handleReset">
          {{ $t("common.reset") }}
        </NButton>
        <NButton size="small" type="primary" @click="handleSave()">
          {{ $t("common.save") }}
        </NButton>
      </div>
    </div>
  </div>
</template>