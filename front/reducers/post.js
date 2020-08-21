import shortId from 'shortid';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'Jaemin',
      },
      content: '첫 번째 게시글 #처음 #처럼',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_960_720.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2015/12/08/00/32/london-1081820_960_720.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2016/05/20/20/40/london-1405911_960_720.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: '고양이',
          },
          content: '냥냥',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: '강아지',
          },
          content: '멍멍',
        },
      ],
    },
  ],
  imagePaths: [], // 이미지 업로드 할 때, 이미지 경로들을 저장
  addPostLoading: false,
  addPostDone: false, // 게시글 추가 완료 여부
  addPostError: null,
  removePostLoading: false,
  removePostDone: false, // 게시글 삭제 완료 여부
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false, // 댓글 작성 완료 여부
  addCommentError: null,
};

/* Create Action Function */
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'Jaemin',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'Jaemin',
  },
});

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
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentDone: false,
        removeCommentError: null,
      };
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: state.mainPosts.filter((post) => post.id !== action.data),
        removeCommentLoading: false,
        removeCommentDone: true,
      };
    }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
