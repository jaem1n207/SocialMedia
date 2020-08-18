import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((content, i) => {
        if (content.match(/(#[^\s#]+)/)) {
          return (
            <Link key={i} href={`/hashtag/${content.slice(1)}`}>
              <a>{content}</a>
            </Link>
          );
        }
        return content;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
