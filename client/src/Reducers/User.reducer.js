import { userActions } from "./Actions";

export const userInitialState = {
  user: {
    _id: undefined,
    addressId: undefined,
    branchId: undefined,
    employeeRoleId: undefined,
    idNumber: undefined,
    name: undefined,
  },
  branch: {
    _id: undefined,
    name: undefined,
    address: undefined,
    ownerId: undefined,
    telephone: undefined,
    employees: [],
  },
};

export default function UserReducer(state, { action, payload }) {
  switch (action) {
    case userActions.SET_BRANCH:
      return { ...state, branch: payload };
    case userActions.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
}
