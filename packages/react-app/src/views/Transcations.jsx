import React from "react";
import axios from "axios";
import { Card, Collapse, Button, Tabs } from "antd";

import { useStore } from "../store/useStore";
import { useEffect } from "react";
import { TranscactionPool, TranscactionHistory } from "../components";

const poolData = [
  {
    chainId: 31337,
    walletAddress: "0xbA61FFB5378D34aCD509205Fd032dFEBEc598975",
    nonce: "0",
    to: "0x0fAb64624733a7020D332203568754EB1a37DB89",
    amount: 0.0007152513035455008,
    data: "0x",
    hash: "0x58670d26e3add93a7480ceb162ad4b236f6306e260e91d7976c339b9279fee53",
    signatures: [
      "0x1f19e9e2bd95ec771926c4eba4c91e0d0da01e91f1188858edee9dd10cc61d7c26dc656a3fc7375053f3f7544136b7db4ed5c391624bb263330e12b5c7f1ed151b",
    ],
    signers: ["0x0fAb64624733a7020D332203568754EB1a37DB89"],
  },
];
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Transcations = () => {
  const [state, dispatch] = useStore();

  const {
    nonce,
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

  const loadTxPoolList = async () => {
    console.log(`n-🔴 => loadTxPoolList => loadTxPoolList`);
    try {
      const result = await axios.get(
        `${ BACKEND_URL }/getPool/${ targetNetwork.chainId }/${ selectedWalletAddress }/${ nonce?.toString() }`,
      );
      console.log(`n-🔴 => loadTxPoolList => result`, result.data);
    } catch (error) {
      console.log(`n-🔴 => loadTxPoolList => error`, error);
    }
  };
  useEffect(() => {
    if (nonce) {
      loadTxPoolList();
    }
  }, [nonce]);

  const onChange = key => {
    console.log(key);
  };

  return (
    <div>
      <Card
        title={"Transcactions"}
        extra={
          <div className="font-bold">
            Current Nonce <span className="text-green-400"># {nonce ? nonce.toString() : 0}</span>
          </div>
        }
      >
        <Tabs
          defaultActiveKey="1"
          size="small"
          items={[
            {
              label: "Pool",
              key: "transcactionPool",
              children: <TranscactionPool />,
            },

            {
              label: "History",
              key: "transcactionHistory",
              children: <TranscactionHistory />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Transcations;
