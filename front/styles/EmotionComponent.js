import { css } from "@emotion/core";
import media from "css-in-js-media";

const HeaderMenu = css`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
const HeaderCenterMenu = css`
  position: relative;
  right: 9%;
`;
const SearchMenu = css`
  position: relative;
  right: 35%;
`;
const SearchInput = css`
  vertical-align: middle;
  width: 200px;
`;

const ProfilePos = css`
  margin-top: 30px;
`;
const PostPos = css`
  margin-left: 0.5%;
`;
const EtcPos = css`
  padding-left: 7% !important;
  padding-right: 7% !important;
  width: 80%;
`;

export {
  HeaderMenu,
  HeaderCenterMenu,
  SearchMenu,
  SearchInput,
  ProfilePos,
  PostPos,
  EtcPos,
};
