import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import { useState } from "react";
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";

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
      <Menu mode="horizontal">
        <Menu.Item>
          <Input.Search
            css={css`
              vertical-align: middle;
              width: 200px;
            `}
            placeholder="검색어 입력.."
            enterButton
            size="middle"
          />
        </Menu.Item>
        <Menu.Item>
          <Link href="/">
            <a>피드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>내 프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
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
