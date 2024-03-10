<script setup lang='ts'>
import { computed, onMounted, ref } from "vue";
import { AnimalCat24Regular } from "@vicons/fluent";
import {
  NCol,
  NIcon,
  NIconWrapper,
  NRadio,
  NCheckbox,
  NSwitch,
  NCollapseTransition,
  NRadioGroup,
  NRow,
  NSlider,
  NSpace,
} from "naive-ui";
import { useAuthStore } from '@/store'
import api from "@/api"

const authStore = useAuthStore()
const loading = ref(false)

// interface Props {
//   userConfig: User.Config;
// }
// const props = defineProps<Props>()
// const drawvalue = ref(props.userConfig.drawvalue ?? "")
// console.log(chatModel)
// const userConfig = ref<User.Config>({})
const userConfig = ref<User.Config>({})

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await api.fetchUserConfig<User.Config>()
    userConfig.value = data
  } finally {
    loading.value = false
  }
}

// const needPermission = computed(() => !authStore.token)
// if (!needPermission.value)
//   fetchConfig()
//   console.log(userConfig)



const emit = defineEmits<Emit>();
const imageModels = ["dall-e-2", "dall-e-3"];
const imageSizes = [
  "256x256",
  "512x512",
  "1024x1024",
  "1792x1024",
  "1024x1792",
];
const imageQualitys = ["standard", "hd"];

const selectedImageModel = ref<string>("dall-e-2");
const selectedImageSize = ref<string>("1024x1024");
const generateImageNumber = ref<number>(1);
const generateImageQuality = ref<string>("standard");
const show = ref<boolean>(false);

interface Emit {
  (
    e: "valChange",
    imageModel: string,
    imageSize: string,
    imageNumber: number,
    imageQuality: string

  ): void;
}
function qualityChange(value: string) {
  generateImageQuality.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value,
    generateImageQuality.value
  );
}
function modelChange(value: string) {
  selectedImageModel.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value,
    generateImageQuality.value
  );
}
function sizeChange(value: string) {
  selectedImageSize.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value,
    generateImageQuality.value
  );
}
function imageNumberChange(value: number) {
  generateImageNumber.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value,
    generateImageQuality.value
  );
}
onMounted(() => {
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value,
    generateImageQuality.value
  );
});


</script>

<template>
  <NRow class="pt-4">
    <NCol :span="2" class="min-w-fit"> 图片模型： </NCol>
    <NCol :span="6">
      <NRadioGroup
        :value="selectedImageModel"
        name="radiogroup"
        :on-update:value="modelChange"
      >
        <NSpace>
          <NRadio
            v-for="imageModel in imageModels"
            :key="imageModel"
            :value="imageModel"
          >
            {{ imageModel }}
          </NRadio>
        </NSpace>
      </NRadioGroup>
    </NCol>
  </NRow>
  <NSwitch v-model:value="show">
    <template #checked> 点击折叠配置 </template>
    <template #unchecked> 点击展开配置 </template>
  </NSwitch>
  <NCollapseTransition :show="show">
    <NRow>
      <NCol :span="2" class="min-w-fit"> 图片质量： </NCol>
      <NCol :span="8">
        <NRadioGroup
          :value="generateImageQuality"
          name="radiogroup"
          :on-update:value="qualityChange"
        >
          <NSpace>
            <NRadio
              v-for="imageQuality in imageQualitys"
              :key="imageQuality"
              :value="imageQuality"
              :disabled="
                imageQuality === 'hd' && selectedImageModel === 'dall-e-2'
              "
            >
              {{ imageQuality }}
            </NRadio>
          </NSpace>
        </NRadioGroup>
      </NCol>
    </NRow>
    <NRow class="pt-4 pb-4">
      <NCol :span="2" class="min-w-fit"> 图片尺寸： </NCol>
      <NCol :span="12">
        <NRadioGroup
          :value="selectedImageSize"
          name="radiogroup"
          :on-update:value="sizeChange"
        >
          <NSpace>
            <NRadio
              v-for="imageSize in imageSizes"
              :key="imageSize"
              :value="imageSize"
              :disabled="
                (imageSize === '1024x1792' &&
                  selectedImageModel === 'dall-e-2') ||
                (imageSize === '1792x1024' &&
                  selectedImageModel === 'dall-e-2') ||
                (imageSize === '512x512' &&
                  selectedImageModel === 'dall-e-3') ||
                (imageSize === '256x256' && selectedImageModel === 'dall-e-3')
              "
            >
              {{ imageSize }}
            </NRadio>
          </NSpace>
        </NRadioGroup>
      </NCol>
    </NRow>
    <NRow class="pb-4">
      <NCol :span="2" class="min-w-fit"> 图片数量： </NCol>
      <NCol :span="12">
        <NSlider
          :value="generateImageNumber"
          :step="1"
          :min="1"
          :max="10"
          :on-update:value="imageNumberChange"
          :default-value="1"
          :disabled="selectedImageModel === 'dall-e-3'"
        >
          <template #thumb>
            <NIconWrapper :size="24" :border-radius="12">
              <NIcon :size="18" :component="AnimalCat24Regular" />
            </NIconWrapper>
          </template>
        </NSlider>
        <span>{{ generateImageNumber }}张</span>
      </NCol>
    </NRow>
  </NCollapseTransition>
</template>
