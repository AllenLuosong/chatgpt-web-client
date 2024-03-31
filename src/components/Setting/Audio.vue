<!--
 * @Author: Allenluo
 * @LastEditTime: 2024-03-31 12:12:48
 * @FilePath: \chagpt-shuowen\src\components\Setting\Audio.vue
 * @Description:
-->

<script setup lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import { NModal } from "naive-ui"
// import { AudioRecorder } from 'vue-audio-recorder'

interface Props {
  visible: boolean
}

interface Emit {
  (e: "update:visible", visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const AudioShow = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit("update:visible", visible);
  },
})

// window.lamejs = require('lamejs')
const audiorecorder = AudioRecorder()

</script>

<template>
  <NModal
    v-model:show="AudioShow"
    preset="card"
    title="语音"
    style="width: 80%; max-width: 720px"
    />
    <audio-recorder
      upload-url="YOUR_API_URL"
      :attempts="3"
      :time="2"
      :headers="headers"
      :before-recording="callback"
      :pause-recording="callback"
      :after-recording="callback"
      :select-record="callback"
      :before-upload="callback"
      :successful-upload="callback"
      :failed-upload="callback"/>
</template>
