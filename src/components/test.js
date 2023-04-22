import React, {useState, useEffect} from "react"
import {useAccount,useConnect,useDisconnect,useEnsAvatar,useEnsName,} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import "../../src/components/css/Home.css"

// import { } from "react-icons/fa"


   
   export default function Profile() {

    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({connector: new InjectedConnector()})
    const { disconnect } = useDisconnect()
    
    const [activeTab, setActiveTab] = useState("London");

    const openTab = (event, tabName) => {
      const tabcontent = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
  
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
  
      document.getElementById(tabName).style.display = "block";
      event.currentTarget.className += " active";
  
      setActiveTab(tabName);
     

   }   
    return (
    // <div>
    //     {isConnected ?( `Connected to ${address}`): 
    //     <button onClick={()=>{connect()}}>
    //         Connectwallet
    //     </button>
    //     }
    // </div>
     
    <> 
    <div>
        {isConnected ? (
               <>
               <div className="tab">
                 <button
                   className={`tablinks ${activeTab === "London" ? "active" : ""}`}
                   onClick={(e) => openTab(e, "London")}
                 >
                   Token Swap
                 </button>
                 <button
                   className={`tablinks ${activeTab === "Paris" ? "active" : ""}`}
                   onClick={(e) => openTab(e, "Paris")}
                 >
                   Provide Liquidity
                 </button>
                 <button
                   className={`tablinks ${activeTab === "Tokyo" ? "active" : ""}`}
                   onClick={(e) => openTab(e, "Tokyo")}
                 >
                   Help and Support
                 </button>
                 <button>Setting</button>
                <button onClick={disconnect}>logout</button>
               </div>
         
               <div id="London" className="tabcontent">
                 <h3>London</h3>
                 <p>London is the capital city of England.</p>
               </div>
         
               <div id="Paris" className="tabcontent">
                 <h3>Paris</h3>
                 <p>Paris is the capital of France.</p>
               </div>
         
               <div id="Tokyo" className="tabcontent">
                 <h3>Tokyo</h3>
                 <p>Tokyo is the capital of Japan.</p>
               </div>
             </>

            // <div>
            // <div className='tab'>
            //     <button class="tablinks" onclick= {(e)=>openCity(e, 'London')} id="defaultOpen">Token Swap</button>
            //     <button class="tablinks" onclick={(e)=>openCity(e, 'Paris')}>Provide liquidity </button>
            //     <button class="tablinks" onclick={(e)=>openCity(e, 'Tokyo')}>Help and Support</button>
            //     <button>Setting</button>
            //     <button onClick={disconnect}>logout</button>
            // </div>

            // <div id="London" class="tabcontent">
            //     <h3>London</h3>
            //     <p>London is the capital city of England.</p>
            // </div>
            
            // <div id="Paris" class="tabcontent">
            //     <h3>Paris</h3>
            //     <p>Paris is the capital of France.</p> 
            // </div>
            
            // <div id="Tokyo" class="tabcontent">
            //     <h3>Tokyo</h3>
            //     <p>Tokyo is the capital of Japan.</p>
            // </div>

            // </div>
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
   