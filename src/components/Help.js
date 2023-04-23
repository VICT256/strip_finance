// import 'bootstrap/dist/css/bootstrap.css'
import React, {useState, useEffect} from "react"
import {useAccount,useConnect,useDisconnect,useEnsAvatar,useEnsName,} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import "../../src/components/css/Profile.css"
import { MdGridView } from "react-icons/md"

// import { } from "react-icons/fa"


   
   export default function Help() {

    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({connector: new InjectedConnector()})
    const { disconnect } = useDisconnect()



      
    return (
    
        <> 
        <div>
            {isConnected ? (
                    <>
                       <div class="grid-container">
                            <div class="item1">
                            <div><a href='/'><h1> <MdGridView/> Dashboard</h1> </a></div>
                              <a href="/tokenswap"><button>Token Swap</button></a>
                              <a href="/provideliquidity"><button>Provide Liquidity</button></a>
                              <a href="/withdraw"><button>Withdraw Funds</button></a>
                              <a href="/customersupport"><button>Help and Support</button></a>
                              <a href="/setting"><button>Setting</button></a>
                              <button onClick={disconnect}>logout</button>
                            </div>
    
                            <div class="item2">
    
                            </div>
    
                        </div>
                    </>
        ) :(
            <>
                <div class="">
                <div class="row">
                    <div class="col-4">
                  
                    </div>
                    <div class="col-4 disconnect">
                          
                               <h5>strip finance enables traders to seemlessly swap favourite pairs between different 
                                decentralized exchanges like uniswap, sushiswap and 0x-Swap on the Ethereum 
                                Network with faster transaction paying lesser transection fees.Please connect your wallet to get started</h5>  
                                    {connectors.map((connector) => (
                                    <button class=""
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

                                        
                            </div>

                        <div class="col-4">
                    
                    </div>
                </div>
            </div>
            </>
       
        )
        
       }
    
       </div>
       </>
   
    )
   }
   