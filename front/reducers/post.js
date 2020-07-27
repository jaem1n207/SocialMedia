export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "이재민",
      },
      content: "첫 번째 게시글 #처음 #처럼",
      Images: [
        {
          src:
            "https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_960_720.jpg",
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2015/12/08/00/32/london-1081820_960_720.jpg",
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2016/05/20/20/40/london-1405911_960_720.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "고양이",
          },
          content: "냥냥",
        },
        {
          User: {
            nickname: "강아지",
          },
          content: "멍멍",
        },
      ],
    },
  ],
  imagePaths: [], // 이미지 업로드 할 때, 이미지 경로들을 저장
  postAdded: false, // 게시글 추가가 완료 여부
};

/* Create Action Function */
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "test1",
  User: {
    id: 1,
    nickname: "이재민",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
