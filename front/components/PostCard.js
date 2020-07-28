import React, { useState, useCallback } from "react";
import { Card, Button, Avatar, Popover } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostImages from "../components/PostImages";

const PostCard = ({ post }) => {
  const [liked, setliked] = useState(false);
  const [commentFormOpend, setcommentFormOpend] = useState(false);
  const onToggleLike = useCallback(() => {
    setliked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setcommentFormOpend((prev) => !prev);
  }, []);

  const { me } = useSelector((state) => state.user);
  const id = me?.id; // optional chaining

  return (
    <div
      css={css`
        margin-bottom: 20px;
      `}
    >
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartTwoTone
              twoToneColor="#ed4956"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <RetweetOutlined key="retweet" />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button type="primary">수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpend && <div>댓글</div>}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
