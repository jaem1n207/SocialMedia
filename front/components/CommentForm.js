import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
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
    <Form onFinish={onSubmitComment}>
      <Form.Item
        css={css`
          position: relative;
          margin: 0;
        `}
      >
        <Input.TextArea
          value={commentText}
          onChange={onCommentTextHandler}
          rows={4}
        />
        <Button
          css={css`
            position: absolute;
            right: 0;
            bottom: -40px;
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
