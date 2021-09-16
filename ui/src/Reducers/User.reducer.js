export const userInitialState = {
  user: {
    _id: undefined,
  },
  branch: {
    _id: undefined,
  },
};

export default function UserReducer(state, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
