import React,{useRef, useState} from 'react';
import {useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import {FaBars, FaTimes, FaWallet } from "react-icons/fa"
import logo from "../strip_finance logo.png"
import "../App.css"

function Navbar(props) {
               
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
        <header className='container'>

            <a href="/" style={{marginTop:20, marginLeft:20,textDecoration:"none", display:"flex"}}>
                <img src={logo} alt="logo" height={50} width={50} />
               <h3>Strip.Finance</h3>
            </a>

         
            <nav className='nav' ref={Ref}>
        
                <div>
                    {isConnected ? (
                        <div className='wallet_btn'>
                            <button>
                                <img src={ensAvatar} alt="ENS Avatar" />
                               {ensName ? `${ensName} (${String(address).substring(0, 6)})` : String(address).substring(0, 6)}
                            </button>
                        </div>
                        ) :( 
                        <button onClick={connect}>  
                           <FaWallet/> 
                        {/* {walletAddress.length > 0 ? ("Connected: " + String(walletAddress).substring(0, 6) +"..." +String(walletAddress).substring(38)) : ( <span>ConnectWallet</span>)} */}
                         </button> 
                        )
                        }  
                </div>
               <button className="nav-btn nav-close-btn" onClick={toggleNavigation}>
                   <FaTimes />
                </button>

            </nav>
           
            <button className="nav-btn" onClick={toggleNavigation}>
                    <FaBars />
            </button>
      
       </header>
      );
}

export default Navbar;