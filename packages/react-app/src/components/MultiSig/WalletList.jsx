import React from "react";
import { message, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { useEventListener } from "eth-hooks/events";

import { Address } from "../";
import { useStore } from "../../store/useStore";
import { useEffect } from "react";
import useEvent from "../../hooks/useEvent";
import { useState } from "react";

const WALLET_CONTRACT_ADDRESS = "0x924E029aa245AbADC5Ebd379457eAa48Cf0E4422";

export default function WalletList() {
  const [store, dispatch] = useStore();
  const [currentWalletName, setCurrentWalletName] = useState();
  const {
    address,
    readContracts,
    localProvider,
    factoryContractName,
    selectedWalletAddress,
    onChangeWallet,
    refreshToggle,
    setRefreshToggle,
    walletData,
    setWalletData,
    targetNetwork,
  } = store;

  // const wallets = useEventListener(
  //   factoryContractName in readContracts && readContracts,
  //   factoryContractName,
  //   "Create2Event",
  //   localProvider,
  //   0,
  // );

  const wallets = useEvent(
    factoryContractName in readContracts && readContracts,
    factoryContractName,
    "Create2Event",
    refreshToggle,
  );

  const handleButtonClick = e => {
    message.info("Click on left button.");
  };

  const handleWalletChange = ({ key }) => {
    let selectedWallet = wallets.find(data => data.args.contractAddress === key);
    onChangeWallet(key, selectedWallet.args.name);
    setCurrentWalletName(selectedWallet.args.name);
  };

  const filterWallets = () => {
    if (wallets.length === 0) {
      return [];
    }
    return wallets
      .filter(data => data.args.creator === address)
      .map(data => {
        let wallet = data.args;
        return {
          label: wallet.name,
          key: wallet.contractAddress,
        };
      });
  };

  const walletList = [...filterWallets()];

  const menuProps = {
    items: walletList,
    onClick: handleWalletChange,
  };

  useEffect(() => {
    let filteredWallets = wallets.filter(data => {
      return data.args.creator === address;
    });
    if (wallets && wallets.length > 0 && filteredWallets.length > 0 && address) {
      let lastWallet = filteredWallets[filteredWallets.length - 1].args;

      if (walletData && walletData[targetNetwork?.chainId]?.selectedWalletAddress === undefined) {
        onChangeWallet(lastWallet.contractAddress, lastWallet.name);
        setCurrentWalletName(lastWallet.name);
        return;
      }

      if (walletData && walletData[targetNetwork?.chainId]?.selectedWalletAddress !== undefined) {
        onChangeWallet(
          walletData[targetNetwork?.chainId]?.selectedWalletAddress,
          walletData[targetNetwork?.chainId]?.selectedWalletName,
        );
        setCurrentWalletName(walletData[targetNetwork?.chainId]?.selectedWalletName);
        return;
      }
    }
  }, [wallets, address]);

  return (
    <div>
      <div className="logo- mt-3 p-2  rounded-md flex flex-col items-center shadow-sm">
        <Dropdown.Button size="middle" className="flex justify-center" menu={menuProps} onClick={handleButtonClick}>
          <div>
            <Address address={selectedWalletAddress} blockieSize={10} fontSize={13} />
          </div>
        </Dropdown.Button>
        <div className="text-gray-400 text-sm mt-2">{currentWalletName}</div>
        <Button type="link" shape="" size={"small"}>
          <Link to={"/createWallet"}>Create wallet</Link>
        </Button>
      </div>
    </div>
  );
}
