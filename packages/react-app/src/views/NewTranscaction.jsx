import React from "react";
import { Card, Tabs } from "antd";
import ProposeActions from "../components/MultiSig/ProposeActions";

const NewTranscaction = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Card title="propose new transcaction" className="w-1/2">
          <Tabs
            defaultActiveKey="1"
            centered
            size="middle"
            items={[
              {
                label: "Send Eth",
                key: "sendEth",
                children: <ProposeActions type={"sendEth"} />,
              },

              {
                label: "Custom call",
                key: "customCall",
                children: <ProposeActions type={"customCall"} />,
              },

              //       {
              //         label: "Wallet connect",
              //         key: "walletConnect",
              //         children: <ProposeActions type={"walletConnect"} />,
              //       },
            ]}
          />
        </Card>
      </div>
    </>
  );
};

export default NewTranscaction;
