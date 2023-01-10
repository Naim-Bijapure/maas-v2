import {
  AppstoreAddOutlined,
  EditOutlined,
  HomeOutlined,
  SettingOutlined,
  TransactionOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import WalletList from "./MultiSig/WalletList";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const MenuItems = [
  getItem(
    "Home",
    "1",
    <>
      <HomeOutlined />
      <Link className="m-1" to="/"></Link>
    </>,
  ),

  getItem(
    "New transcaction",
    "2",
    <>
      <EditOutlined />
      <Link className="m-1" to="/propoose"></Link>
    </>,
  ),

  getItem(
    "Transcactions",
    "3",
    <>
      <TransactionOutlined />
      <Link className="m-1" to="/transcactions"></Link>
    </>,
  ),

  getItem(
    "Apps",
    "4",
    <>
      <AppstoreAddOutlined />
      <Link className="m-1" to="/apps"></Link>
    </>,
  ),

  getItem(
    "Manage",
    "5",
    <>
      <UserSwitchOutlined />
      <Link className="m-1" to="/manage"></Link>
    </>,
  ),

  getItem(
    "Settings",
    "6",
    <>
      <SettingOutlined />
      <Link className="m-1" to="/settings"></Link>
    </>,
  ),
];
const AppLayout = ({ header, children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsed={false} theme="light" width={270}>
        {/* current wallet list */}
        <WalletList />

        {/* menu list */}
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" items={MenuItems} />
      </Sider>
      <Layout className="site-layout">
        {/* header */}
        <div>{header}</div>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className=""
            style={{
              padding: 24,
              minHeight: 360,
              margin: "16px 0",
            }}
          >
            {children}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          built with ❤️ by naimbijapure.eth
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
