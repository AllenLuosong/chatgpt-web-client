<!--
 * @Author: Allen
 * @LastEditTime: 2024-03-12 21:32:06
 * @FilePath: \chagpt-shuowen\src\components\CalendarSignIn\index.vue
 * @Description: 签到日历功能
-->
<script setup lang='ts'>
import { defineComponent, ref, computed } from "vue";
import {
  useMessage,
  NCalendar,
  NModal,
  NH1,
  NButton,
  NConfigProvider,
  zhCN,
  dateZhCN,
  NImage,
  NAlert 
} from "naive-ui";
import { isToday, addDays } from "date-fns";
import api from "@/api";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const locale = ref(zhCN);
const dateLocale = ref(dateZhCN);
const loading = ref(false);
const SigninData = ref<User.Signin>({});
const dateArray = ref([]);

interface Props {
  visible: boolean;
}

interface Emit {
  (e: "update:visible", visible: boolean): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const show = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit("update:visible", visible);
  },
});

const message = useMessage();
const value = ref(addDays(Date.now(), 0).valueOf());

async function fetchusersignindata() {
  try {
    loading.value = true;
    const { data } = await api.usersignindata<User.Signin>();
    dateArray.value = data.checked_in_date;
    return data;
  } finally {
    loading.value = false;
  }
}

const needPermission = computed(() => !authStore.token);
if (!needPermission.value) fetchusersignindata();

async function handleUpdateValue(
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) {
  try {
    await api.signin<User.Signin>({
      date: `${year}-${month}-${date}`,
    });
    message.success(`签到成功,福利已到账`);
    window.location.reload();
  } catch (error: any) {
    message.error(error.message ?? "error");
  }
}

function isDateDisabled(timestamp: number) {
  if (isToday(timestamp)) {
    return false;
  }
  return true;
}


</script>

<template>
  <NModal
    v-model:show="show"
    :auto-focus="false"
    preset="card"
    style="width: 80%; max-width: 720px"
  >
    <NH1>签到</NH1>
    <NAlert type="info" :show-icon="false">
    🎁 点击对应日期签到赠送 2000 对话额度、2绘画额度~
    <br />
    🤙体验额度不够用，扫描二维码联系管理员(点击可放大) 👉 
      <NImage
    width="15"
    src="https://img2.imgtp.com/2024/03/31/RaP7CxZO.jpg"
  />
    </NAlert>
    <NConfigProvider :locale="locale" :date-locale="dateLocale">
      <NCalendar
        v-model:value="value"
        style="height: 360px"
        :is-date-disabled="isDateDisabled"
        @update:value="handleUpdateValue"
      >
        <template #header="{ year, month }">
          <div>
            <span>{{ year }}年{{ month }}月</span>
          </div>
        </template>
        <template #default="{ date }">
          <span v-if="dateArray.includes(date)">🎁</span>
        </template>
      </NCalendar>
    </NConfigProvider>
  </NModal>
</template>