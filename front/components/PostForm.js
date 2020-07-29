import React, { useState, useCallback, useRef } from "react";
import { Form, Input, Button } from "antd";
import { css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();

  const { imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();

  const [text, setText] = useState("");
  const onTextHandler = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <Form
      css={css`
        margin: 10px 0 20px;
      `}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onTextHandler}
        maxLength={300}
        placeholder="무슨 생각을 하고 계신가요?"
        autoSize={true}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button
          css={css`
            bottom: -5px;
          `}
          onClick={onClickImageUpload}
        >
          이미지 업로드
        </Button>
        <Button
          type="primary"
          css={css`
            float: right;
            bottom: -5px;
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
