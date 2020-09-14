import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { Form, Input, Tooltip, Checkbox, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';

const { Password } = Input;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);
  /* 회원가입이 완료되면 메인페이지로 이동 */
  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  const [email, onEmailHandler] = useInput('');
  const [nickname, onNicknameHandler] = useInput('');
  const [password, onPasswordHandler] = useInput('');

  const [passwordCheck, setpasswordCheck] = useState('');
  const [passwordError, setpasswordError] = useState(false);
  const onPasswordCheckHandler = useCallback(
    (e) => {
      setpasswordCheck(e.target.value);
      setpasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setterm] = useState('');
  const [termError, settermError] = useState(false);
  const onTermHandler = useCallback((e) => {
    setterm(e.target.checked);
    settermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setpasswordError(true);
    }
    if (!term) {
      return settermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onEmailHandler} />
        </div>
        <div>
          <label htmlFor="user-nickname">
            닉네임
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onNicknameHandler} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Password name="user-password" value={password} required onChange={onPasswordHandler} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Password name="user-password-check" value={passwordCheck} required onChange={onPasswordCheckHandler} />
          {passwordError && (
            <div
              css={css`
                color: red;
              `}
            >
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onTermHandler}>
            Social Media 약관에 동의합니다.
          </Checkbox>
          {termError && (
            <div
              css={css`
                color: red;
              `}
            >
              약관에 동의하셔야 합니다.
            </div>
          )}
        </div>
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
