import { getDefaultProvider } from 'ethers'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Navbar from './components/Navbar'
import Home from './components/Homes'
import Profile from './components/Profile'
import Setting from './components/Setting'
import TokenSwap from './components/TokenSwap'
import Help from './components/Help'
import ProvideLiquidity from './components/ProvideLiquidity'
import Withdraw from './components/withdraw'

import Ap from './components/utils/Ap'

window.Buffer = window.Buffer || require("buffer").Buffer

// @uniswap/sdk @uniswap/sdk-core @uniswap/smart-order-router @uniswap/v3-sdk bootstrap jsbi react-bootstrap-icons react-spinners



// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
 [goerli],
 [alchemyProvider({ apiKey: 'K9IsbfM7Z0jHrR5VTyg0rOsu0ghafL9D' }), publicProvider()],
)

// Set up client
const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
            new CoinbaseWalletConnector({
            chains,
            options: {
            appName: 'wagmi',
            },
        }),
            new WalletConnectConnector({
            chains,
            options: {
            projectId: '...',
            },
        }),
            new InjectedConnector({
            chains,
            options: {
            name: 'Injected',
            shimDisconnect: true,
            },
            }),
        ],
        provider,
        webSocketProvider,
        })



// const client = createClient({
//  autoConnect: true,
//  provider: getDefaultProvider(),
// })

export default function App() {


      return (
      <WagmiConfig client={client}>
            <Navbar />
            <BrowserRouter>

                  <Routes> 
                    <Route path="/" element={<Home />}/>
                    <Route path="/setting"  element={<Setting/>}/>
                    <Route path="/provideliquidity"  element={<ProvideLiquidity/>}/>
                    <Route path="/tokenswap"  element={<TokenSwap/>}/>
                    <Route path="/customersupport"  element={<Help/>}/>
                    <Route path="/withdraw"  element={<Help/>}/>
                    <Route path="/ap"  element={<Ap/>}/>
                  </Routes>

                  </BrowserRouter>
      </WagmiConfig>
      )
}


          