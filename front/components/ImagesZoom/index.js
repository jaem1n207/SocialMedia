import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";

const ImagesZoom = ({ images, onClose }) => {
  const [cureentSlide, setcureentSlide] = useState(0);

  return (
    <div>
      <header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
      </header>
      <div>
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
