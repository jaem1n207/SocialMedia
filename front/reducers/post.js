export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Jaemin",
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
  addPostLoading: false,
  addPostDone: false, // 게시글 추가가 완료 여부
  addPostError: null,
};

/* Create Action Function */
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "test1",
  User: {
    id: 1,
    nickname: "Jaemin",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
