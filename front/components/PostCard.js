import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);

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

  /* 천단위마다 콤마를 찍어준다. */
  const numberComma = useCallback((number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), []);
  const commentsLength = numberComma(post.Comments.length);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div
      css={css`
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow: 4px 4px 8px #e2e4e7;
      `}
    >
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartTwoTone twoToneColor="#ed4956" key="heart" onClick={onToggleLike} />
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
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
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
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={
            <Avatar
              css={css`
                background-color: #ffbf00;
              `}
              gap={1}
            >
              {post.User.nickname.substr(0, 1)}
            </Avatar>
          }
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpend && (
        <div>
          {me && <CommentForm post={post} />}
          <List
            css={css`
              background: #ffffff;
              padding: 0.4rem 1.5rem 1.5rem 1.5rem;
            `}
            header={`댓글 ${commentsLength}개`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
