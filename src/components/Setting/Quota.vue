<script setup lang="ts">
import { NCard, NCol, NRow, NSpace, NStatistic, NTooltip } from 'naive-ui'

interface Props {
  userUsage: User.Usage
}
const props = defineProps<Props>()

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
    <NCard title="聊天与图片">
      <NRow>
        <NCol :span="5">
          <NStatistic
            label="今日消耗token数"
            :value="props.userUsage?.today_user_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月消耗token数"
            :value="props.userUsage?.mothly_user_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="今日生成图片"
            :value="props.userUsage?.today_user_image_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月生成图片"
            :value="props.userUsage?.mothly_user_image_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
      </NRow>
    </NCard>

    <!-- <NCard title="图片生成">
      <NRow>
        <NCol :span="5">
          <NStatistic
            label="今日生成图片"
            :value="props.userConfig?.todayGeneratedImageNumber ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="5">
          <NStatistic
            label="当月生成图片"
            :value="props.userConfig?.currMonthGeneratedImageNumber ?? '-'"
          >
          </NStatistic>
        </NCol>
      </NRow>
    </NCard> -->
  </NSpace>
</template>
