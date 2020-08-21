import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';

import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | Social Media</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={me.Followings} />
      <FollowList header="팔로워 목록" data={me.Followers} />
    </AppLayout>
  );
};

export default Profile;
