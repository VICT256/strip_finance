import { abi } from './Constant'

const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')


const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
const REACT_APP_INFURA_URL_TESTNET = "https://goerli.infura.io/v3/"

const chainId = 5

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_INFURA_URL_TESTNET)
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider })

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = '0xc778417e063141139fce010982780140aa0cd5ab'

const name1 = 'Srtip_finance Token'
const symbol1 = 'UNI'
const decimals1 = 18
const address1 = '0x07634958E9227C41F3ecD3ef983b8e3717F3bE1E'

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const UNI = new Token(chainId, address1, decimals1, symbol1, name1)

export const getWethContract = () => new ethers.Contract(address0, abi, web3Provider)
export const getUniContract = () => new ethers.Contract(address1, abi, web3Provider)

export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
  const percentSlippage = new Percent(slippageAmount, 100)
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

  const route = await router.route(
    currencyAmount,
    UNI,
    TradeType.EXACT_INPUT,
    {
      recipient: walletAddress,
      slippageTolerance: percentSlippage,
      deadline: deadline,
    }
  )

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000)
  }

  const quoteAmountOut = route.quote.toFixed(6)
  const ratio = (inputAmount / quoteAmountOut).toFixed(3)

  return [
    transaction,
    quoteAmountOut,
    ratio
  ]
}

export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.utils.parseUnits('10', 18).toString()
  const contract0 = getWethContract()
  await contract0.connect(signer).approve(
    V3_SWAP_ROUTER_ADDRESS,
    approvalAmount
  )

  signer.sendTransaction(transaction)
}