import { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";

const UserProfile = () => {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");

  const onIdHandler = useCallback((e) => {
    setid(e.target.value);
  }, []);
  const onpasswordHandler = useCallback((e) => {
    setpassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onIdHandler} required />
      </div>
      <div>
        <label htmlFor="user-id">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onpasswordHandler}
          required
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default UserProfile;
