import { atom } from "recoil";
import {v4 as uuidv4} from 'uuid'
import { global} from '../interface/TableInterface'

export const Data = atom<global[]>({
    key: `sqlData${uuidv4()}`,
    default: [],
})