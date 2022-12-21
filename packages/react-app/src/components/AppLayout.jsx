import {
  UserSwitchOutlined,
  HomeOutlined,
  TransactionOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Dropdown, message, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Address from "./Address";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
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

  // getItem("Manage", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
  // getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
];
const AppLayout = ({ header, currentWallet, children }) => {
  // const [collapsed, setCollapsed] = useState(false);

  // const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsed={false} theme="light" width={270}>
        {/* current wallet */}
        {currentWallet}

        {/* menu list */}
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" items={items} />
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
            className="site-layout-background"
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
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
