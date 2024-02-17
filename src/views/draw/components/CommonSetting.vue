<script setup lang='ts'>
import { onMounted, ref } from "vue";
import { AnimalCat24Regular } from "@vicons/fluent";
import {
  NCol,
  NIcon,
  NIconWrapper,
  NRadio,
  NCheckbox,
  NRadioGroup,
  NRow,
  NSlider,
  NSpace,
} from "naive-ui";
const emit = defineEmits<Emit>();
const imageModels = ["dall-e-2", "dall-e-3"];
const imageSizes = [
  "256x256",
  "512x512",
  "1024x1024",
  "1792x1024",
  "1024x1792",
];
const selectedImageModel = ref<string>("dall-e-2");
const selectedImageSize = ref<string>("");
const generateImageNumber = ref<number>(1);

interface Emit {
  (
    e: "valChange",
    imageModel: string,
    imageSize: string,
    imageNumber: number
  ): void;
}
function modelChange(value: string) {
  selectedImageModel.value = value;
  // if (selectedImageModel.value === "dall-e-3"){
  //   selectedImageSize
  // }
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value
  );
}
function sizeChange(value: string) {
  selectedImageSize.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value
  );
}
function imageNumberChange(value: number) {
  generateImageNumber.value = value;
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value
  );
}
onMounted(() => {
  emit(
    "valChange",
    selectedImageModel.value,
    selectedImageSize.value,
    generateImageNumber.value
  );
});
</script>

<template>
  <NRow class="pt-4">
    <NCol :span="2" class="min-w-fit"> 图片模型： </NCol>
    <NCol :span="12">
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
              (imageSize === '1792x1024' && selectedImageModel === 'dall-e-2') ||
              (imageSize === '512x512' && selectedImageModel === 'dall-e-3') ||
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
</template>
