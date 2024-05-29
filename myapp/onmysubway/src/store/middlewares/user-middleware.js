const userMiddleware = (store) => (next) => (action) => {
  // store: redux store 자체
  console.log("dispatching...");
  console.log(store.getState());

  // next: 다음 미들웨어 = 함수
  // action: action 객체
  let result = next(action); // next 다 호출하면, reducer 호출, reducer 호출 완료하면, 그 이후 로직 실행
  console.log("next state");
  console.log(store.getState());
  return result;
};