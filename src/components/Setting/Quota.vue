<script setup lang="ts">
import { NCard, NCol, NRow, NSpace, NStatistic, NTooltip } from 'naive-ui'

interface Props {
  userUsage: User.Usage
}
const props = defineProps<Props>()
console.log(props)

</script>
<template>
  <NSpace vertical>
    <NCard title="余额">
      <NRow>
        <NCol :span="5">
          <NStatistic
            label="本月消费金额(元)"
            :value="props.userUsage?.total_used ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="剩余余额(元)"
            :value="props.userUsage?.total_available ?? '-'"
          >
          </NStatistic>
        </NCol>
      </NRow>
    </NCard>
    <NCard title="文本聊天">
      <NRow>
        <NCol :span="5">
          <NStatistic
            label="今日请求数"
            :value="props.userConfig?.todayRequestTimes ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByRequestDaily ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="今日消耗token数"
            :value="props.userConfig?.todayTokenCost ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByTokenDaily ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月请求数"
            :value="props.userConfig?.currMonthRequestTimes ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByRequestMonthly ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月消耗token数"
            :value="props.userConfig?.currMonthTokenCost ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByTokenMonthly ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
      </NRow>
    </NCard>

    <NCard title="图片生成">
      <NRow>
        <NCol :span="5">
          <NStatistic
            label="今日生成图片"
            :value="props.userConfig?.todayGeneratedImageNumber ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByImageDaily ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月生成图片"
            :value="props.userConfig?.currMonthGeneratedImageNumber ?? '-'"
          >
            <template #suffix>
              / {{ props.userConfig?.quotaByImageMonthly ?? "-" }}
            </template>
          </NStatistic>
        </NCol>
      </NRow>
    </NCard>
  </NSpace>
</template>
