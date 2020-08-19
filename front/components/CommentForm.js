import React, { useCallback } from "react";
import { Form, Input, Button, Avatar } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { css } from "@emotion/core";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);

  const { me } = useSelector((state) => state.user);

  const [commentText, onCommentTextHandler] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form
      onFinish={onSubmitComment}
      css={css`
        padding: 1.2rem 1.5rem 1.5rem 1.5rem;
        background: #ffffff;
        border-bottom: 1px solid #f0f2f5;
      `}
    >
      <Form.Item
        css={css`
          position: relative;
          margin: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            position: relative;
            flex-shrink: 1;
          `}
        >
          <Avatar>{me === null ? "Ja" : me.nickname.substr(0, 2)}</Avatar>
          <Input.TextArea
            css={css`
              display: flex;
              flex-grow: 1;
              outline: 0;
              background: #f0f2f5;
              resize: none;
              border-radius: 20px;
              border: none;
              font-weight: 600;
              flex-grow: 1;
              margin-left: 0.625rem;
              width: 94%;
            `}
            placeholder="댓글을 입력하세요..."
            value={commentText}
            onChange={onCommentTextHandler}
            autoSize={true}
            rows={4}
          />
          <Button
            css={css`
              /* All Device */
              position: relative;
              cursor: pointer;
              /* Mobile Device */
              left: 2%;
              /* Tablet Device */
              @media all and (min-width: 768px) and (max-width: 1024px) {
                left: 2%;
              }
              /* Desktop Device */
              @media all and (min-width: 1025px) {
                left: 2%;
                text-align: center;
                text-overflow: ellipsis;
              }
            `}
            type="primary"
            htmlType="submit"
          >
            작성
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
