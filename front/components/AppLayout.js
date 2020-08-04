import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col, Avatar } from "antd";
import { useState } from "react";
import { css, Global } from "@emotion/core";
import { useSelector } from "react-redux";
import { UserOutlined, UserAddOutlined, HomeFilled } from "@ant-design/icons";
import media from "css-in-js-media";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

/* 
  xs: 모바일(<576px), sm: 태블릿(>=576px), md: 작은 데스크탑(>=768px), 
  lg: >=992px, xl: >=1200px, xxl: >=1600px
*/

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <Global
        styles={css`
          .ant-menu-item {
            border-bottom-width: 2px;
            padding-bottom: 0.4rem;
            padding-top: 0.4rem;
          }
          .ant-menu {
            height: 60px;
          }
        `}
      />
      <Menu
        mode="horizontal"
        css={css`
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        `}
      >
        <Menu.Item
          css={css`
            position: relative;
            right: 32%;
            ${media("<=largeDesktop", ">desktop")} {
              right: 17%;
            }
            ${media("<=desktop", ">tablet")} {
              right: 12%;
            }
            ${media("<=tablet", ">phone")} {
              right: 10%;
            }
            ${media("<=phone")} {
              right: 9%;
            }
          `}
        >
          <img
            alt="홈페이지 로고"
            src="/static/logo.png"
            css={css`
              width: 70px;
              height: 60px;
            `}
          />
          {/*  <Avatar
            src="/static/logo.png"
            size="large"
            css={css`
              width: 70px;
              height: 60px;
            `}
          /> */}
          <Input.Search
            css={css`
              vertical-align: middle;
              width: 240px;
            `}
            placeholder="검색어 입력.."
            enterButton
            size="middle"
          />
        </Menu.Item>
        <Menu.Item
          css={css`
            position: relative;
            right: 8.5% !important;
          `}
          icon={<HomeFilled />}
        >
          <Link href="/">
            <a>피드</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          css={css`
            position: relative;
            right: 8.5% !important;
          `}
        >
          <Link href="/profile">
            <a>내 프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item
          icon={<UserAddOutlined />}
          css={css`
            position: relative;
            right: 8.5% !important;
          `}
        >
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row
        gutter={8}
        css={css`
          margin-top: 30px;
        `}
      >
        <Col
          xs={24}
          md={6}
          css={css`
            margin-left: 0.5%;
          `}
        >
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col
          xs={24}
          md={12}
          css={css`
            padding-left: 7% !important;
            padding-right: 7% !important;
            width: 80%;
          `}
        >
          {children}
        </Col>
        <Col xs={24} md={5}>
          <a
            href="https://github.com/jaem1n207/SocialMedia"
            target="_blank"
            rel="noreferrer noopener"
          >
            Jaemin's github
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
