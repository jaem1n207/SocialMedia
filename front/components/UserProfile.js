import React, { useCallback } from 'react';

import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/core';
import { logoutRequestAction } from '../reducers/user';

const { Meta } = Card;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="timeline">
          타임라인
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            css={css`
              background-color: #7265e6;
            `}
            gap={1}
          >
            {me.nickname.substr(0, 1)}
          </Avatar>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
