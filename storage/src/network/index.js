import {request} from "./request";

export const login = (data) => request({ url:'/doLogin',method:'post',data:data})
export const findPass = (email) => request({ url:`/findPass?email=${email}`})
export const setPass = (data) => request({ url:'/setPass',method:'post',data:data})

export const sign = (data) => request({ url:'/sign',method:'post',data:data})

export const getAccounts = (userId) => request({ url:`/accounts?userId=${userId}`})
export const getAccountOfName=(val,userId)=>request({url:`/accountOfName?name=${val}&&userId=${userId}`})
export const editAccount = (data) => request({ url:'/editAccount',method:'put',data:data})
export const addAccount = (data) => request({ url:'/addAccount',method:'post',data:data})

export const getBirthInfo = (userId) => request({ url:`/birthInfo?userId=${userId}`})
export const getBirthOfName=(val,userId)=>request({url:`/birthOfName?name=${val}&&userId=${userId}`})
export const editBirth = (data) => request({ url:'/editBirth',method:'put',data:data})
export const deleteBirth = (id) => request({ url:`/deleteBirth?id=${id}`,method:'delete'})
export const addBirth = (data) => request({ url:'/addBirth',method:'post',data:data})


export const getNumOfAcc = (userId) => request({ url:`/getNumOfAcc?userId=${userId}`})
export const getNumOfBir = (userId) => request({ url:`/getNumOfBir?userId=${userId}`})
export const getAdmin = (id) => request({ url:`/getAdmin?id=${id}`})
export const editAdmin = (data) => request({ url:'/editAdmin',method:'put',data:data})
export const alterPass = (data) => request({ url:'/alterPass',method:'put',data:data})


export const logout = (id) => request({ url:`/logout`,method:'post'})








