import React, {useState, useEffect} from "react"
import {useAccount,useConnect,useDisconnect,useEnsAvatar,useEnsName,} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import "../../src/components/css/Profile.css"

// import { } from "react-icons/fa"


   
export default function TokenSwap() {

    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({connector: new InjectedConnector()})
    const { disconnect } = useDisconnect()

    const [priceChecked, setPriceChecked] = useState(false)


    async function hasCheckedPrice () {
        setPriceChecked(true)
        //  checkPriceOnDEX();

        setPriceChecked(false)
    }

      
    return (
    
    <> 
    <div>
        {isConnected ? (
                <>
                   <div class="grid-container">
                        <div class="item1">
                           <h1>Dashboard</h1>
                          <a href="/tokenswap"><button>Token Swap</button></a>
                          <a href="/provideliquidity"><button>Provide Liquidity</button></a>
                          <a href="/withdraw"><button>Withdraw Funds</button></a>
                          <a href="/customersupport"><button>Help and Support</button></a>
                          <a href="/setting"><button>Setting</button></a>
                          <button onClick={disconnect}>logout</button>
                        </div>

                        <div class="item2">

                            <form onSubmit={(e)=> e.preventDefault()}>
                               
                                <div>
                                       select a pair

                                       <select name='selectbar' id='selectbar' value={this.state.baction} onChange={this.handleChange}>
                                            <option value="ETH">ETH</option>
                                            <option value="MATIC">MATIC</option>
                                            <option value="DAI">DAI</option>
                                            <option value="WBTC">WBTC</option>
                                        </select>

                                        <select name='selectbar' id='selectbar' value={this.state.baction} onChange={this.handleChange}>
                                            <option value="ETH">ETH</option>
                                            <option value="MATIC">MATIC</option>
                                            <option value="DAI">DAI</option>
                                            <option value="WBTC">WBTC</option>
                                        </select>
                                        
                                    <button onClick={hasCheckedPrice}>Check price on exchanges</button>
                                </div>
                            </form>

                            
                               
                        </div>

                    </div>
                </>
    ) :(
    <div>
        Please connect your wallet to get started
            {connectors.map((connector) => (
            <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
            </button>
            ))}
        
            {error && <div>{error.message}</div>}
            </div>)
            }
    </div>
    
    
    </>
   
    )
   }
   