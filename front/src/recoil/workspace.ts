import { atom } from "recoil";

const workspaceState = atom({
    key: 'workspaceState',
    default: '',
});

export default workspaceState;