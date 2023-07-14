import { atom } from "recoil";
import {v4 as uuidv4} from 'uuid'
import {coinTable, global} from '../interface/TableInterface'

export const Data = atom<global[]>({
    key: `sqlData${uuidv4()}`,
    default: [],
})

export const coinTableData = atom({
    key:`coinTableData${uuidv4()}`,
    default: {}
})