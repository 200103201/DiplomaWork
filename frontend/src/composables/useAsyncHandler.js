import { ref } from 'vue';

export default function useAsyncHandler() {
  const loading = ref(false);

  async function executeAsyncOperation(
    asyncFunction,
    args = [],
    { onSuccess, onCatch, onFinally } = { onSuccess: null, onCatch: null, onFinally: null }
  ) {
    loading.value = true;

    try {
      const res = await asyncFunction(...args);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(res);
      }
      return res;
    } catch (error) {
      if (onCatch && typeof onCatch === 'function') {
        onCatch(error);
      } else {
        console.error('An error occurred:', error);
      }
    } finally {
      loading.value = false;
      if (onFinally && typeof onFinally === 'function') {
        onFinally();
      }
    }
  }

  return {
    loading,
    executeAsyncOperation
  };
}
