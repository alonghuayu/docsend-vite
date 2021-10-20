import { UserState } from './state'

export const mutations = {
    setToken: (state: UserState, token: string) => {
        state.token = token
    }
}
