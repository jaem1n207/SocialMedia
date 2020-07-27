import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { css } from "@emotion/core";
import { useSelector } from "react-redux";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const [text, onTextHandler] = useState("");
  const onSubmit = useCallback(() => {}, []);

  return (
    <Form
      css={css`
        margin: 10px 0 20px;
      `}
      encType="multipart/form-data"
      onFinish={onsubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onTextHandler}
        maxLength={140}
        placeholder="무슨 생각을 하고 계신가요?"
      />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button
          type="primary"
          css={css`
            float: right;
          `}
          htmlType="submit"
        >
          글 작성
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div
            key={v}
            css={css`
              display: inline-block;
            `}
          >
            <img
              src={v}
              css={css`
                width: 200px;
              `}
              alt={v}
            />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
