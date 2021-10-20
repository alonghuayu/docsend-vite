import { UserState } from './state'

export const getters = {
  token: (state: UserState) => state.token,
}
