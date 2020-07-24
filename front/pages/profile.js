import Head from "next/head";
import AppLayout from "../components/AppLayout";

import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const followerList = [
    { nickname: "이재민" },
    { nickname: "삼재민" },
    { nickname: "사재민" },
    { nickname: "오재민" },
  ];
  const followingList = [
    { nickname: "육재민" },
    { nickname: "칠재민" },
    { nickname: "팔재민" },
    { nickname: "구재민" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | Social Media</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
