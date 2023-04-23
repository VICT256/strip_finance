import React,{useRef, useState} from 'react';
import {useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import {FaBars, FaTimes, FaWallet } from "react-icons/fa"
import logo from "../strip_finance logo.png"
import "../App.css"

function Navbar() {
               
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()
    const { connect, connectors, error, isLoading, pendingConnector } =useConnect({connector: new InjectedConnector()})

   
    // if (isConnected) {
    //   return (
    //     <div>
    //       <img src={ensAvatar} alt="ENS Avatar" />
    //       <div>{ensName ? `${ensName} (${address})` : address}</div>
    //       <div>Connected to {connector.name}</div>
    //       {/* <button onClick={disconnect}>Disconnect</button> */}
    //     </div>
    //   )
    // }

    const Ref = useRef();
    // const [walletAddress, setWalletAddress] = useState("")



    const toggleNavigation = ()=>{
        Ref.current.classList.toggle("responsive_nav")
    }

    return (

            <nav class="navbar navbar-light bg-warning p-3">
                    <div class="container-fluid">
                    <a href='/' class="navbar-brand">Strip finance</a>
                    <form class="d-flex">
                        <input class="form-control " type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-dark" type="submit">Search</button>
                    </form>
                     
                    <div>
               {isConnected ? (
                        <div className='wallet_btn'>
                            <button class="btn btn-dark" >
                                <img src={ensAvatar} alt="ENS Avatar" />
                               {ensName ? `${ensName} (${String(address).substring(0, 6)})` : String(address).substring(0, 6)}
                            </button>
                        </div>
                        ) :( 
                        <button class="btn btn-dark" onClick={connect}>  
                           <FaWallet/> 
                         </button> 
                        )
                        }  
                </div>

                    </div>
                </nav>
      );
}

export default Navbar;