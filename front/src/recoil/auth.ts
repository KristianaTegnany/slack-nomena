import {atom} from 'recoil'

const authState = atom<any>({
  key: "authState",
  default: undefined
})

export default authState