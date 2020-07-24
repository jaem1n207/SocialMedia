import { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const LoginForm = ({ setisLoggedIn }) => {
  const [id, onIdHandler] = useInput("");
  const [password, onpasswordHandler] = useInput("");

  const onSubmitForm = useCallback(() => {
    setisLoggedIn(true);
  }, [id, password]);

  return (
    <Form
      css={css`
        margin-left: 10px;
        padding: 10px;
      `}
      onFinish={onSubmitForm}
    >
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          css={css`
            width: 200px;
          `}
          name="user-id"
          value={id}
          onChange={onIdHandler}
          required
        />
      </div>
      <div>
        <label htmlFor="user-id">비밀번호</label>
        <br />
        <Input
          css={css`
            width: 200px;
          `}
          name="user-password"
          type="password"
          value={password}
          onChange={onpasswordHandler}
          required
        />
      </div>
      <div
        css={css`
          margin-top: 10px;
        `}
      >
        <Button
          css={css`
            width: 22.5%;
            font-size: 0.875rem;
          `}
          type="primary"
          htmlType="submit"
          loading={false}
        >
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button
              css={css`
                width: 22.5%;
                font-size: 0.875rem;
              `}
            >
              회원가입
            </Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  setisLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
