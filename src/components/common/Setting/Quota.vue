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
        <NCol :span="16">
          <NStatistic
            label="剩余tokens数"
            :value="props.userUsage?.left_tokens ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="8">
          <NStatistic
            label="剩余绘画数"
            :value="props.userUsage?.left_dalle ?? '-'"
          >
          </NStatistic>
        </NCol>
      </NRow>
    </NCard>
    <NCard title="对话与绘画">
      <NRow>
        <NCol :span="16">
          <NStatistic
            label="今日消耗token数"
            :value="props.userUsage?.today_user_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="8">
          <NStatistic
            label="当月消耗token数"
            :value="props.userUsage?.mothly_user_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="16">
          <NStatistic
            label="今日生成绘画"
            :value="props.userUsage?.today_user_image_usage ?? '-'"
          >
          </NStatistic>
        </NCol>
        <NCol :span="8">
          <NStatistic
            label="当月生成绘画"
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
