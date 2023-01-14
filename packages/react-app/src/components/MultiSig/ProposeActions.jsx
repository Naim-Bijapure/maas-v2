import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Card, Tooltip, Input } from "antd";
import { SendOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";

import { AddressInput, EtherInput, WallectConnectInput, WalletConnectV2 } from "..";
import { useLocalStorage } from "../../hooks";
import { useStore } from "../../store/useStore";

const { Title } = Typography;

function ProposeActions({ type }) {
  const [state, dispatch] = useStore();
  const {
    address,
    BACKEND_URL,
    contractAddress,
    userSigner,
    localProvider,
    mainnetProvider,
    price,
    readContracts,
    walletContractName,
    targetNetwork,
    selectedWalletAddress,
  } = state;
  //   const [to, setTo] = useLocalStorage("to", undefined);
  const [toAddress, setToAddress] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [customCallData, setCustomCallData] = useState("");

  const onPropose = async () => {
    try {
      let callData = type === "sendEth" ? "0x" : customCallData;
      let executeToAddress = toAddress;
      const nonce = await readContracts[walletContractName].nonce();

      const newHash = await readContracts[walletContractName].getTransactionHash(
        nonce,
        executeToAddress,
        ethers.utils.parseEther("" + parseFloat(amount).toFixed(12)),
        callData,
      );

      const signature = await userSigner?.signMessage(ethers.utils.arrayify(newHash));

      const recover = await readContracts[walletContractName].recover(newHash, signature);

      const isOwner = await readContracts[walletContractName].isOwner(recover);
      console.log(`n-🔴 => onPropose => isOwner`, isOwner);

      if (isOwner) {
        const res = await axios.post(`${BACKEND_URL}/addPoolTx`, {
          chainId: targetNetwork.chainId,
          walletAddress: readContracts[walletContractName]?.address,
          nonce: nonce?.toString(),
          to: executeToAddress,
          amount,
          data: callData,
          hash: newHash,
          signatures: [signature],
          signers: [recover],
        });
        console.log(`n-🔴 => onPropose => res`, res.data);

        setAmount(0);
        setToAddress("");
      }
    } catch (error) {
      console.log("n-Error: ", error);
    }
  };

  const SendEth = (
    <>
      <div className="p-2">
        <AddressInput
          autoFocus
          ensProvider={mainnetProvider}
          placeholder={"Recepient address"}
          value={toAddress}
          onChange={setToAddress}
        />
      </div>
      <div className="p-2">
        <EtherInput price={price} mode="USD" value={amount} onChange={setAmount} provider={localProvider} />
      </div>

      <div className="p-2">
        <Tooltip title="Send eth">
          <Button
            type="primary"
            onClick={onPropose}
            disabled={Boolean(toAddress) === false || Boolean(amount) === false}
          >
            Propose
          </Button>
        </Tooltip>
      </div>
    </>
  );

  const CustomCall = (
    <>
      <div className="p-2">
        <AddressInput
          autoFocus
          ensProvider={mainnetProvider}
          placeholder={"Recepient address"}
          value={toAddress}
          onChange={setToAddress}
        />

        <div className="mt-2">
          <Input
            placeholder="Custom call data"
            value={customCallData}
            onChange={e => {
              setCustomCallData(e.target.value);
            }}
          />
        </div>

        <div className="mt-2">
          <EtherInput price={price} mode="USD" value={amount} onChange={setAmount} provider={localProvider} />
        </div>
      </div>

      <div className="p-2">
        <Tooltip title="Send eth">
          <Button
            type="primary"
            onClick={onPropose}
            disabled={Boolean(toAddress) === false || Boolean(customCallData) === false}
          >
            Propose
          </Button>
        </Tooltip>
      </div>
    </>
  );
  return (
    <div className="flex flex-col items-center">
      {type === "sendEth" && SendEth}
      {type === "customCall" && CustomCall}
      {/* {type === "walletConnect" && (
        <WallectConnectInput
          chainId={targetNetwork.chainId}
          walletAddress={selectedWalletAddress}
          mainnetProvider={mainnetProvider}
          price={price}
        />
      )} */}
    </div>
  );
}

export default ProposeActions;
