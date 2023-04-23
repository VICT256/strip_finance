import 'bootstrap/dist/css/bootstrap.css'
import React, {useState, useEffect} from "react"
import {useAccount,useConnect,useDisconnect,useEnsAvatar,useEnsName,} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import "../../src/components/css/Profile.css"
import { MdGridView } from "react-icons/md"

// import { } from "react-icons/fa"


   
   export default function ProvideLiquidity() {

    const [status, setStatus] = useState("")
    const [laoding, setLoading] = useState(false)
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
                                   <div> <button type="button" class="btn btn-success">{status}</button></div>
                                <select class="form-select mt-3" aria-label="Default select example">
                                    <option selected>Choose Exchange</option>
                                    <option value="1">Uniswap</option>
                                    <option value="2">OX_SWAP</option>
                                    <option value="3">SushiSwap</option>
                                    </select>
                                <select class="form-select mt-3" aria-label="Default select example">
                                    <option selected>Transfrom from</option>
                                    <option value="1">WETH</option>
                                    <option value="2">SFT</option>
                                    <option value="3">UNI</option>
                                    </select>

                                    <select class="form-select mt-3" aria-label="Default select example">
                                    <option selected>Transfer to</option>
                                    <option value="1">WETH</option>
                                    <option value="2">UIN</option>
                                    <option value="3">SFT</option>
                                    </select>
                                    <h3 class="mt-3">Choose Price Range</h3>
                                    <div class="row mt-3">
                                        
                                        <div class="col-6">
                                        <input type="number" class="form-control" id="exampleFormControlInput1"  />
                                        </div>
                                        <div class="col-6">
                                        <input type="number" class="form-control" id="exampleFormControlInput1"  />

                                        </div>
                                        
                                    </div>
                                     <h3 class="mt-3">Deposit Amounts</h3>
                                    <div class="row mt-3">
                                        
                                        <div class="col-6">
                                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder='Amount of ETH/WETH'  />
                                        </div>
                                        <div class="col-6">
                                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder='Amount of ETH/WETH '/>
                                        </div>  
                                    </div>      
                                    <select class="form-select mt-3" aria-label="Default select example">
                                    <option selected>Select Fee tier</option>
                                    <option value="1">0.05%</option>
                                    <option value="2">0.3%</option>
                                    <option value="3">0.1%</option>
                                    </select>
                                      
                                 
                                    <div class="col-auto mt-3">
                                                <button type="submit" class="btn btn-danger mb-3" onClick={()=>{
                                                    setLoading(false)
                                                     setStatus("Liquity will be added in your preferred exchange in 24hrs")
                                                     setLoading(true)}
                                                     
                                                     }>Process</button>
                                        </div>

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
   