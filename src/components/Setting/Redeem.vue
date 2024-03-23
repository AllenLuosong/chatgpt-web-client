<!--
 * @Author: Allenluo
 * @LastEditTime: 2024-03-23 20:12:48
 * @FilePath: \chagpt-shuowen\src\components\Setting\Redeem.vue
 * @Description:
-->
<script setup lang='ts'>
import { NInput, NButton, useMessage } from "naive-ui"
import { defineComponent, ref } from "vue"
import api from "@/api"

const redeemCode = ref('')
const loading = ref(false)
const ms = useMessage()

async function handleSave() {
  try {
    loading.value = true;
    const result = await api.redeem({
      redeemCode: redeemCode.value,
    });
    ms.success("兑换成功")
    window.location.reload()
  } catch (error: any) {
    ms.error(error.message ?? "error");
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">额度兑换码</span>
        <NInput
          v-model:value="redeemCode"
          placeholder="请输入额度兑换码"
        />
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]" />
        <NButton type="primary"
        :disabled="redeemCode === ''"
        :loading="loading"
         @click="handleSave()"
        >
          兑换
        </NButton>
      </div>
    </div>
  </div>
</template>
