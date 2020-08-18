import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { PlusOutlined } from "@ant-design/icons";

import ImageZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setshowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setshowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setshowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <img
          css={css`
            width: 49%;
            display: inline-block;
          `}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          css={css`
            width: 49%;
            display: inline-block;
          `}
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  return (
    <div>
      <img
        css={css`
          width: 50%;
        `}
        role="presentation"
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
      />
      <div
        css={css`
          display: inline-block;
          width: 50%;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
        `}
        role="presentation"
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
