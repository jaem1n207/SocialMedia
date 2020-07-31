import React, { useCallback } from "react";
import { Form, Input, Button, Avatar } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { css } from "@emotion/core";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onCommentTextHandler] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form
      onFinish={onSubmitComment}
      css={css`
        padding: 0.4rem 1.5rem 1.5rem 1.5rem;
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
          `}
        >
          <Avatar>JM</Avatar>
          <Input.TextArea
            css={css`
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
        </div>

        <Button
          css={css`
            /* All Device */
            position: relative;
            bottom: -0.3rem;
            /* Mobile Device */
            left: 87%;
            /* Tablet Device */
            @media all and (min-width: 768px) and (max-width: 1024px) {
              left: 78%;
            }
            /* Desktop Device */
            @media all and (min-width: 1025px) {
              left: 90%;
            }
          `}
          type="primary"
          htmlType="submit"
        >
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
