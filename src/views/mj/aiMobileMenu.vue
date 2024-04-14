<script setup lang="ts">
import { homeStore } from "@/store";
import { computed, watch, ref } from "vue";
import { router } from "@/router";
import { SvgIcon, HoverButton, CalendarSignIn } from "@/components/common";

import aiDrawInput from "./aiDrawInput.vue";
import { NDrawerContent, NDrawer } from "naive-ui";

const st = ref({ show: true });
const showCalendar = ref<boolean>(false)
const goHome = computed(() => {
  //router.push('/')
  return router.currentRoute.value.name;
});
function drawSent(e: any) {
  st.value.show = false;
  //$emit('drawSent', e)
  homeStore.setMyData({ act: "draw", actData: e });
}

watch(
  () => homeStore.myData.act,
  (n: string) => {
    if ("showChat" == n) {
      router.push("/chat");
    }
    if ("showDraw" == n) {
      router.push("/draw");
      st.value.show = true;
    }
    if (n == "draw") {
      st.value.show = false;
    }
  }
);
</script>
<template>
  <div
    class="bg-gray-100 dark:bg-[#282832] h-[55px] flex justify-around items-center dark:text-white/70"
  >
    <div
      class="flex items-center justify-center flex-col"
      @click="homeStore.setMyData({ act: 'showChat' })"
      :class="[goHome == 'Chat' ? 'active' : '']"
    >
      <SvgIcon icon="ri:wechat-line" class="text-3xl"></SvgIcon>
      <div class="text-[13px]">{{ $t("mjtab.chat") }}</div>
    </div>
    <div
      class="flex items-center justify-center flex-col"
      @click="homeStore.setMyData({ act: 'showgpts' })"
    >
      <SvgIcon icon="ri:apps-fill" class="text-3xl"></SvgIcon>
      <div class="text-[13px]">GPTs</div>
    </div>

    <div
      class="flex items-center justify-center flex-col"
      @click="homeStore.setMyData({ act: 'showDraw' })"
      :class="[goHome == 'draw' ? 'active' : '']"
    >
      <SvgIcon icon="ic:outline-palette" class="text-3xl"></SvgIcon>
      <div class="text-[13px]">{{ $t("mjtab.draw") }}</div>
    </div>
    <HoverButton>
      <div
        class="flex items-center justify-center flex-col"
        @click="showCalendar = true"
      >
        <SvgIcon icon="ri:calendar-2-line" class="text-3xl" />
        <div class="text-[13px]">{{ $t("mjtab.signIn") }}</div>

      </div>
    </HoverButton>
  </div>

  <n-drawer
    v-model:show="st.show"
    class="!h-[90vh] !max-h-[660px]"
    placement="bottom"
    v-if="goHome == 'draw'"
  >
    <n-drawer-content style="--n-body-padding: 0" class="h-full">
      <aiDrawInput @draw-sent="drawSent" />
    </n-drawer-content>
  </n-drawer>
  <CalendarSignIn v-if="showCalendar" v-model:visible="showCalendar" />
</template>