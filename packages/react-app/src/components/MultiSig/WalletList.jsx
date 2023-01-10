import React from "react";
import { message, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { useEventListener } from "eth-hooks/events";

import { Address } from "../";
import { useStore } from "../../store/useStore";
import { useEffect } from "react";
import useEvent from "../../hooks/useEvent";

const WALLET_CONTRACT_ADDRESS = "0x924E029aa245AbADC5Ebd379457eAa48Cf0E4422";

export default function WalletList() {
  const [store, dispatch] = useStore();
  const {
    readContracts,
    localProvider,
    factoryContractName,
    selectedWalletAddress,
    onChangeWallet,
    refreshToggle,
    setRefreshToggle,
  } = store;
  console.log(`n-🔴 => WalletList => selectedWalletAddress`, selectedWalletAddress);

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
    // console.log("n-click left button", e.target.value);
  };

  const handleMenuClick = ({ key }) => {
    console.log(`n-🔴 => handleMenuClick => key`, key);
    onChangeWallet(key);
  };

  const filterWallets = () => {
    if (wallets.length === 0) {
      return [];
    }
    return wallets.map(data => {
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
    onClick: handleMenuClick,
  };

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      let lastWallet = wallets[wallets.length - 1].args;
      onChangeWallet(lastWallet.contractAddress);
    }
  }, [wallets]);

  return (
    <div>
      <div className="logo- mt-3 p-2  rounded-md flex flex-col items-center shadow-sm">
        <Dropdown.Button size="middle" className="flex justify-center" menu={menuProps} onClick={handleButtonClick}>
          <div>
            <Address address={selectedWalletAddress} blockieSize={10} fontSize={13} />
          </div>
        </Dropdown.Button>
        <div className="text-gray-400 text-xs mt-2">Scholarship buidlguidl</div>
        <Button type="link" shape="" size={"small"}>
          <Link to={"/createWallet"}>Create wallet</Link>
        </Button>
      </div>
    </div>
  );
}
