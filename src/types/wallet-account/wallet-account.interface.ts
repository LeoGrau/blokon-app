export interface WalletAccount {
  walletAddress: string
  privateKey: string
  publicKey: string
  mnemonicPhrase?: string
  balance: {
    eth: string,
    wei: string,
    hex: string
  }
}
