import React, { useCallback, useEffect } from 'react';

import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onEmailHandler] = useInput('');
  const [password, onpasswordHandler] = useInput('');

  useEffect(() => {
    if (logInError) {
      // eslint-disable-next-line no-alert
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form
      css={css`
        margin-left: 10px;
        padding: 10px;
      `}
      onFinish={onSubmitForm}
    >
      <div>
        <label htmlFor="user-id">이메일</label>
        <br />
        <Input
          css={css`
            width: 200px;
          `}
          type="email"
          name="user-id"
          value={email}
          onChange={onEmailHandler}
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
          loading={logInLoading}
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

export default LoginForm;
