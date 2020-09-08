export default function createAction(actionType, payload) {
  return {
    actionType,
    payload,
  };
}
