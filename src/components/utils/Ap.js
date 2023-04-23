import './Ap.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';
import ConfigModal from './ConfigModal';
import CurrencyField from './CurrencyField';
import BeatLoader from "react-spinners/BeatLoader";
import { getWethContract, getUniContract, getPrice, runSwap } from './AlphaRouterService'
 
 export default function Ap() {
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  const [slippageAmount, setSlippageAmount] = useState(2)
  const [deadlineMinutes, setDeadlineMinutes] = useState(10)
  const [showModal, setShowModal] = useState(undefined)

  const [inputAmount, setInputAmount] = useState(undefined)
  const [outputAmount, setOutputAmount] = useState(undefined)
  const [transaction, setTransaction] = useState(undefined)
  const [loading, setLoading] = useState(undefined)
  const [ratio, setRatio] = useState(undefined)
  const [wethContract, setWethContract] = useState(undefined)
  const [uniContract, setUniContract] = useState(undefined)
  const [wethAmount, setWethAmount] = useState(undefined)
  const [uniAmount, setUniAmount] = useState(undefined)

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const wethContract = getWethContract()
      setWethContract(wethContract)

      const uniContract = getUniContract()
      setUniContract(uniContract)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }
  const isConnected = () => signer !== undefined
  const getWalletAddress = () => {
    signer.getAddress()
      .then(address => {
        setSignerAddress(address)

        // todo: connect weth and uni contracts
        wethContract.balanceOf(address)
          .then(res => {
            setWethAmount( Number(ethers.utils.formatEther(res)) )
          })
        uniContract.balanceOf(address)
          .then(res => {
            setUniAmount( Number(ethers.utils.formatEther(res)) )
          })

      })
  }

  if (signer !== undefined) {
    getWalletAddress()
  }

  const getSwapPrice = (inputAmount) => {
    setLoading(true)
    setInputAmount(inputAmount)

    const swap = getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now()/1000 + (deadlineMinutes * 60)),
      signerAddress
    ).then(data => {
      setTransaction(data[0])
      setOutputAmount(data[1])
      setRatio(data[2])
      setLoading(false)
    })
  }


  return (
    <div className="App">
      
      <div className="appBody">
        <div className="swapContainer">
          <div className="swapHeader">
            <span className="swapText">Swap</span>
            <span className="gearContainer" onClick={() => setShowModal(true)}>
              <GearFill />
            </span>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount} />
            )}
          </div>

          <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="WETH"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={wethAmount} />
            <CurrencyField
              field="output"
              tokenName="SFT"
              value={outputAmount}
              signer={signer}
              balance={uniAmount}
              spinner={BeatLoader}
              loading={loading} />
          </div>

          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
          </div>
          <select class="form-select mt-1" aria-label="Default select example">
              <option selected>transfer from</option>
              <option value="1">Uniswap</option>
              <option value="2">OX_SWAP</option>
              <option value="3">SushiSwap</option>
            </select>

            <select class="form-select mt-1 mb-5" aria-label="Default select example">
              <option selected>transfer to</option>
              <option value="1">Uniswap</option>
              <option value="2">OX_SWAP</option>
              <option value="3">SushiSwap</option>
            </select>

          <div className="swapButtonContainer">
            {isConnected() ? (
              <div
                onClick={() => runSwap(transaction, signer)}
                className="swapButton"
              >
                Swap
              </div>
            ) : (
              <div
                onClick={() => getSigner(provider)}
                className="swapButton"
              >
                Connect Wallet
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}