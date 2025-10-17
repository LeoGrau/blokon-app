import { parseEther, toBeHex } from "ethers";

// Unidad	Equivalencia	Valor en Wei	Casos de Uso
// Wei	1 wei	1	Transacciones, gas fees
// Kwei (Babbage)	10³ wei	1,000
// Mwei (Lovelace)	10⁶ wei	1,000,000
// Gwei (Shannon)	10⁹ wei	1,000,000,000	Gas prices
// Microether (Szabo)	10¹² wei	1,000,000,000,000
// Milliether (Finney)	10¹⁵ wei	1,000,000,000,000,000
// Ether	10¹⁸ wei	1,000,000,000,000,000,000	Tokens, balances

export const etherToWei = (ether: string): bigint => parseEther(ether)
export const weiToHex = (wei: bigint): string => toBeHex(wei)
export const etherToHex = (ether: string): string => weiToHex(etherToWei(ether))
