import reducer, { State, Action } from "./useAuthReducer";

const testState: State = {
  user: "chidera",
  isLoading: true,
};

const testDeleteAction: Action = {
  type: "DELETE_USER",
};

const testSetUserAction: Action = {
  type: "SET_USER",
  payload: "chideraiguwe",
};

const testSetLoadingAction: Action = {
  type: "SET_LOADING",
  payload: "chideraiguwe",
};
describe("reducer logic", () => {
  test("can delete user", () => {
    expect(reducer(testState, testDeleteAction)).not.toBe(undefined);

    expect(reducer(testState, testDeleteAction)).toEqual({
      isLoading: true,
      user: undefined,
    });
  });

  test("can set user", () => {
    expect(reducer(testState, testSetUserAction)).not.toBe(undefined);

    expect(reducer(testState, testSetUserAction)).toEqual({
      isLoading: false,
      user: "chideraiguwe",
    });
  });

  test("can set loading", () => {
    expect(reducer(testState, testSetLoadingAction)).not.toBe(undefined);

    expect(reducer(testState, testSetLoadingAction)).toEqual({
      isLoading: false,
      user: "chideraiguwe",
    });
  });
});
