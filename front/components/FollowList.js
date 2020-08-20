import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { css } from '@emotion/core';
import { UserDeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

// eslint-disable-next-line react/prop-types
const FollowList = ({ header, data }) => (
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
        <Card actions={[<UserDeleteOutlined style={{ color: '#e50c14' }} key="delete" />]}>
          <Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propType = {
  header: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default FollowList;
