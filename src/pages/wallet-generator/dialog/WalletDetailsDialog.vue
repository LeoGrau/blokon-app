<template>
  <div class="bg-zinc-950 rounded-md p-4 relative flex text-blue-100">
    <pre class="" ref="codeElement">{{ JSON.stringify(data.wallet, null, 2).trimStart() }}</pre>
    <button
      @click="handleCopy()"
      class="flex p-3 min-w-[41px] bg-zinc-800 cursor-pointer hover:bg-zinc-900 absolute top-[5px] right-[5px] rounded"
    >
      <i :class="isCopied ? 'pi pi-check' : 'pi pi-clipboard'"></i>
    </button>
  </div>
</template>
<script setup lang="ts">
import { type DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { inject, onMounted, ref, type Ref } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const data = { ...dialogRef?.value.data }

const codeElement = ref<HTMLElement>()

const isCopied = ref(false)

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(JSON.stringify(data.wallet, null, 4))
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  console.log(JSON.stringify(data.wallet, null, 2))
})
</script>
<style lang=""></style>
