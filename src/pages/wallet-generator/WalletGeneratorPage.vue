<template>
  <PrimeDataTable
    :rowsPerPageOptions="[5, 10, 25, 30]"
    paginator
    :rows="10"
    :value="wallets"
    class="rounded overflow-hidden"
  >
    <template #empty>
      <div class="flex justify-center items-center">
        <span></span>
      </div>
    </template>
    <template #header>
      <div class="flex justify-between">
        <PrimeButton @click="appendWallet()" label="Generate" icon="pi pi-plus"></PrimeButton>
      </div>
    </template>
    <PrimeColumn header="ID">
      <template #body="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
    </PrimeColumn>
    <PrimeColumn
      v-for="(column, index) in columns"
      :key="index"
      :field="column.field"
      :header="column.header"
    >
      <template #body="{ data }" v-if="column.body">
        <component :is="column.body(data)"></component>
      </template>
    </PrimeColumn>
    <PrimeColumn header="Actions">
      <template #body="{ data }">
        <div class="flex gap-3">
          <PrimeButton
            @click="openWalletDetailsDialog(data)"
            severity="info"
            rounded
            icon="pi pi-eye"
          ></PrimeButton>
          <PrimeButton severity="help" rounded icon="pi pi-clipboard"></PrimeButton>
        </div>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>
<script setup lang="tsx">
import { MAXIMUM_ETHER, MINIMUM_ETHER } from '@/constants/ether.constant'
import type { WalletAccount } from '@/types/wallet-account/wallet-account.interface'
import { randomFloat } from '@/utils/number-generator.util'
import { etherToHex } from '@/utils/transformation.util'
import { Wallet } from 'ethers'
import { useDialog } from 'primevue'
import { onMounted, ref } from 'vue'
import WalletDetailsDialog from './dialog/WalletDetailsDialog.vue'

const wallets = ref([] as WalletAccount[])

const dialog = useDialog()

const columns = [
  {
    field: 'publicKey',
    header: 'Public Key',
    body: (data: WalletAccount) => <div>{data.publicKey.substring(0, 25)}...</div>,
  },
  {
    field: 'walletAddress',
    header: 'Wallet Address',
    body: (data: WalletAccount) => <div>{data.publicKey.substring(0, 20)}...</div>,
  },
  {
    field: 'balance.eth',
    header: 'ETH',
    body: (data: WalletAccount) => <div>{`${data.balance.eth} `} ETH</div>,
  },
]

function createWallet() {
  return Wallet.createRandom()
}

function appendWallet() {
  const newEtherWallet = createWallet()

  const randomEtherBalance = randomFloat(MINIMUM_ETHER, MAXIMUM_ETHER)

  const newCustomWallet: WalletAccount = {
    privateKey: newEtherWallet.privateKey,
    publicKey: newEtherWallet.publicKey,
    walletAddress: newEtherWallet.address,
    mnemonicPhrase: newEtherWallet.mnemonic?.phrase,
    balance: {
      eth: parseFloat(randomEtherBalance).toString(),
      hex: etherToHex(randomEtherBalance).toString(),
      wei: randomEtherBalance.toString(),
    },
  }

  console.log(newCustomWallet)
  wallets.value.push(newCustomWallet)
}

function openWalletDetailsDialog(walletData: WalletAccount) {
  dialog.open(WalletDetailsDialog, {
    data: {
      wallet: walletData,
    },
    props: {
      modal: true,
    },
    templates: {
      header: <div>Wallet Details</div>,
    },
  })
}

onMounted(() => {
  appendWallet()
  console.log(wallets.value)
})
</script>
<style scoped></style>
