import React, { useState, useCallback, useRef } from "react";
import { Form, Input, Button, Avatar } from "antd";
import { css } from "@emotion/core";
import media from "css-in-js-media";
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
        background: #ffffff;
        margin: 0 0 20px;
        padding: 0.75rem 1rem 0.625rem 1rem;
        ${media("<=tablet")} {
          margin: 0.75rem 0 20px;
        }
      `}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <Avatar>JM</Avatar>
        <Input.TextArea
          css={css`
            resize: none;
            background: #f0f2f5;
            width: 94%;
            border-radius: 20px;
            border: none;
            font-weight: 600;
            flex-grow: 1;
            margin-left: 0.625rem;
          `}
          value={text}
          onChange={onTextHandler}
          maxLength={500}
          placeholder="무슨 생각을 하고 계신가요?"
          autoSize={true}
        />
      </div>

      <div
        css={css`
          padding-top: 0.5rem;
          margin-top: 0.75rem;
          border-top: 1px solid #e4e6eb;
        `}
      >
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
