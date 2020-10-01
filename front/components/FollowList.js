import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { css } from '@emotion/core';
import { UserDeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

// eslint-disable-next-line react/prop-types
const FollowList = ({ header, data }) => {
  console.log('Follow data: ', data);
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <List
      css={css`
        margin-bottom: 20px;
      `}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      header={<div>{header}</div>}
      loadMore={
        <div
          css={css`
            text-align: center;
            margin: 10px 0;
          `}
        >
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          css={css`
            margin-top: 20px;
          `}
        >
          <Card actions={[<UserDeleteOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.id} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propType = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
