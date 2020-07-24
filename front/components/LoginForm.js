import { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { css, jsx } from "@emotion/core";

const UserProfile = ({ setisLoggedIn }) => {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");

  const onIdHandler = useCallback((e) => {
    setid(e.target.value);
  }, []);
  const onpasswordHandler = useCallback((e) => {
    setpassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
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

export default UserProfile;
