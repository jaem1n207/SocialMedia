import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import { css } from "@emotion/core";

const ImagesZoom = ({ images, onClose }) => {
  const [cureentSlide, setcureentSlide] = useState(0);

  return (
    <div
      css={css`
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
    >
      <header
        css={css`
          height: 44px;
          background: #ffffff;
          position: relative;
          padding: 0;
          text-align: center;
        `}
      >
        <h1
          css={css`
            margin: 0;
            font-size: 1.0625rem;
            color: #333;
            line-height: 44px;
          `}
        >
          상세 이미지
        </h1>
        <button
          onClick={onClose}
          css={css`
            position: absolute;
            right: 10%;
            top: 12.5%;
            padding: 15px;
            line-height: 14px;
            cursor: pointer;
            outline: none;
            background: #e4e6eb;
            border-radius: 50%;
            border: none;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            font-weight: 400;
          `}
        >
          X
        </button>
      </header>
      <div
        css={css`
          height: calc(100% -44px);
          background: #0b0d0b;
        `}
      >
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setcurrentSlide(slide)}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <div key={image.src}>
                <img src={image.src} alt={image.src} />
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
