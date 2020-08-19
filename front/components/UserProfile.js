import { useState, useCallback } from "react";
import { Avatar, Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const { Meta } = Card;

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="timeline">
          타임라인
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Meta avatar={<Avatar>JM</Avatar>} title="이재민" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
