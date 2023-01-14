import React from "react";
import axios from "axios";
import { Card, Collapse, Button, Descriptions, Divider } from "antd";

import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import { Address } from "..";

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
    type: "transfer",
    status: "success",
    createdAt: "10-10-2023 10:10",
    executedAt: "10-10-2023 10:10",
    executedBy: "0x0fAb64624733a7020D332203568754EB1a37DB89",
  },
];
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TranscationPool = () => {
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
    signaturesRequired,
  } = state;

  const loadTxPoolList = async () => {
    console.log(`n-🔴 => loadTxPoolList => loadTxPoolList`);
    try {
      const result = await axios.get(
        `${BACKEND_URL}/getPool/${targetNetwork.chainId}/${selectedWalletAddress}/${nonce?.toString()}`,
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
      <>
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          {poolData.map((data, index) => {
            return (
              <Panel
                key={index}
                header={
                  <div className="flex justify-around">
                    <div># {data["nonce"]}</div>
                    <div>{data["type"]}</div>
                    <div>{data["amount"].toFixed(4)}</div>
                    <div>{data["createdAt"]}</div>
                    <div>
                      <Button>
                        {data["signatures"].length}/{signaturesRequired ? signaturesRequired.toString() : 0} Sign
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="primary"
                        onClick={e => {
                          e.preventDefault();
                        }}
                      >
                        Execute
                      </Button>
                    </div>
                  </div>
                }
              >
                <div className="flex flex-col">
                  <div className="flex justify-start">
                    <div className="m-2">{data["type"]}</div>
                    <div className="m-2 font-bold">{data["amount"].toFixed(4)}</div>
                    <div className="m-2">to</div>
                    <div className="m-2">
                      <Address address={data["to"]} fontSize={15} />
                    </div>
                  </div>
                  <Divider />
                  <div className="flex flex-col">
                    <Descriptions title="Transcaction details" column={1} bordered>
                      <Descriptions.Item label="nonce">{data["nonce"]}</Descriptions.Item>
                      <Descriptions.Item label="hash">
                        <Address address={data["hash"]} fontSize={15} />
                      </Descriptions.Item>
                      <Descriptions.Item label="data">
                        <Address address={data["data"]} fontSize={15} />
                      </Descriptions.Item>

                      <Descriptions.Item label="signers">
                        {data["signers"].map((signerAddress, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Address address={signerAddress} fontSize={15} />
                            </React.Fragment>
                          );
                        })}
                      </Descriptions.Item>
                      <Descriptions.Item label="status">{data["status"]}</Descriptions.Item>
                      <Descriptions.Item label="created at">{data["createdAt"]}</Descriptions.Item>
                      <Descriptions.Item label="executed at">{data["executedAt"]}</Descriptions.Item>
                      <Descriptions.Item label="Executed by">
                        <Address address={data["executedBy"]} fontSize={15} />
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </>
    </div>
  );
};

export default TranscationPool;
