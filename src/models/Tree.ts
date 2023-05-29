import { INode } from "./INode";

export interface ITree {
  root: INode
}

export const defaultTree: ITree = {
  root: {
    id: '0',
    value: 'Categories',
    children: []
  }
}

export const getTree = (): ITree => {
  return JSON.parse(window.localStorage.getItem('tree') as string) || defaultTree
}