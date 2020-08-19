/*
  fork: 비동기 함수 호출 
  call: 동기 함수 호출
  take: 일회용 (동기적으로 동작, while take로 사용)
  takeEvery: 여러개의 fetchData 인스턴스를 동시에 시작되게 할 때 사용 (비동기적으로 동작)
  takeLatest: 마지막으로 발생된 리퀘스트의 응답만 얻고 싶을 때 사용 
  (같은 요청이 여러 번 시도가 되면 서버에서 오는 응답을 취소하는것이지, 서버로 가는 요청을 취소하는 것이 아닌게 치명적인 단점..)
  throttle: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것.
  debounce: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록하는 것
*/

import postSaga from "./post";
import userSaga from "./user";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
