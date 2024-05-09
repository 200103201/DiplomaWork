<template>
  <Dropdown
    v-model="model"
    :options="customOptions?.length > 0 ? customOptions : options"
    empty-message="Список пуст"
  />
</template>

<script setup>
import { onMounted, ref, defineModel } from 'vue';

const model = defineModel();

const props = defineProps({
  customOptions: {
    type: Array,
    default: null
  },
  fn: {
    type: Function,
    default: null
  }
});

const options = ref([]);

async function fetchOptions() {
  if (props.customOptions != null || props.customOptions?.length > 0) {
    return;
  }

  if (props.fn != null && typeof props.fn === 'function') {
    const res = await props.fn();
    options.value = res.data;
  }
}

onMounted(() => {
  fetchOptions();
});
</script>

<style lang="scss" scoped></style>
