/**
 * 操作 token 的工具函数
 */
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

export const GET_TOKEN = () => localStorage.getItem('token')

export const REMOVE_TOKEN = () => localStorage.removeItem('token')
