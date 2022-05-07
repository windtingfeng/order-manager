import axios from 'axios'

const IP = 'http://127.0.0.1:5000'

axios.defaults.baseURL = IP

//---------------------------------获取图片显示地址--------------------------------//
//商品图片显示地址
export const GET_GOODS_IMG = IP + '/upload/imgs/goods_img/'

//店铺图片显示地址
export const GET_SHOP_IMG = IP + '/upload/shop/'

//店铺头像显示地址
export const GET_SHOP_AVATAR = IP + '/upload/imgs/acc_img/'

//----------------------------------图片上传接口----------------------------------//

//商品图片上传接口
export const GOODS_IMG_UPLOAD = IP + '/goods/goods_img_upload'

//店铺图片上传接口
export const SHOP_IMG_UPLOAD = IP + '/shop/upload'

//头像上传接口
export const USER_AVATAR_UPLOAD = IP + '/users/avatar_upload'

//

// ---------------------------------登录模块-------------------------------------//
//登录接口
export const login = (data) => axios.post('/users/checkLogin',data)

//添加账号接口
export const useradd = (data) => axios.post('/users/add',data)

//获取账号列表接口
export const getuserslist = (params) => axios.get('/users/list',{params})

//删除账号接口
export const deluser = (id) => axios.get('/users/del',{params:{ id }})

//批量删除账号接口
export const batchdelusers = (ids) => axios.get('/users/batchdel',{params:{ ids }})

//修改账号接口
export const editusers = (data) => axios.post('/users/edit',data)

//检查密码接口
export const checkoldpwd = (params) => axios.get('/users/checkoldpwd',{params})

//修改密码接口
export const editpwd = (data) => axios.post('/users/editpwd',data)

//获取账号信息接口
export const accountinfo = (id) => axios.get('/users/accountinfo',{params:{ id }})

//验证token接口
export const checktoken = (token) => axios.get('/users/checktoken',{params:{ token }})

/* ----------------------------商品管理模块----------------------------------------*/

//添加分类接口
export const addcate = (data) => axios.post('/goods/addcate',data)

//获取分类接口
export const catelist = (params) => axios.get('/goods/catelist',{params})

//删除分类接口
export const delcate = (id) => axios.get('/goods/delcate',{params:{ id }})

//修改分类接口
export const editcate = (params) => axios.post('/goods/editcate',params)

//查询所有分类名称接口
export const categories = () => axios.get('/goods/categories')

//添加商品接口
export const addgoods = (data) => axios.post('/goods/add',data)

//获取商品列表
export const getgoodslist = (params) => axios.get('/goods/list',{params})

//删除商品
export const delgoods = (id) => axios.get('/goods/del',{params:{ id }})

//修改商品
export const editgoods = (data) => axios.post('/goods/edit',data)

//-----------------------------订单管理模块---------------------------------------//

//获取订单列表接口
export const getorderlist = (params) => axios.get('/order/list',{ params })

//获取订单详情接口
export const getorderdetail = (id) => axios.get('/order/detail',{params:{ id }})

//修改订单接口
export const editorder = (data) => axios.post('/order/edit',data)

//------------------------------店铺管理模块-----------------------------------//

//获取店铺详情接口
export const getshopinfo = () => axios.get('/shop/info')

//店铺内容修改接口
export const editshop = (data) => axios.post('/shop/edit',data)

//-----------------------------报表统计模块------------------------------------//

//首页报表接口
export const ordertotaldata = () => axios.get('/order/totaldata')

//订单报表接口
export const ordertotal = (date) => axios.get('/order/ordertotal',{params:{ date }})
