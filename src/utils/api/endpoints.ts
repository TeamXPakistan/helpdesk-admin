export const API_ENDPOINTS = {
  REGISTER: '/auth/merchant/signup',
  LOGIN: '/auth/login/admin',
  LOGOUT: '/auth/merchant/logout',
  VERIFY_EMAIL: '/auth/merchant/verify',
  FORGOT_PASSWORD_EMAIL: '/auth/merchant/forgot/password',
  FORGOT_PASSWORD_VERIFY_USER: '/auth/merchant/verify/forgot',
  RESET_PASSWORD: '/auth/merchant/reset',
  ME: '/admin/find',
  CHECK_NETWORK: '/auth/merchant/ok',
  RESTURANT_CATEGORIES: '/resturant/category/list',
  SINGLE_RESTURANT_CATEGORY: '/resturant/category/single',
  CREATE_RESTURANT_CATEGORY: '/resturant/category/create',
  DELETE_RESTURANT_CATEGORY: '/resturant/category/remove',
  UPDATE_RESTURANT_CATEGORY: '/resturant/category/update',
  SHOPS: '/shop/merchants',
  SINGLE_SHOP: '/shop/getsingleShop',
  CREATE_SHOP: '/shop/create',
  UPDATE_SHOP: '/shop/update',
  SHOP_CATEGORIES: '/shop/category/all',
  SINGLE_SHOP_CATEGORY: '/shop/category',
  DELETE_SHOP_CATEGORY: '/shop/category/remove',
  CREATE_SHOP_CATEGORY: '/shop/category/create',
  UPDATE_SHOP_CATEGORY: '/shop/category/update',
  MENU_CATEGORIES: '/menu/category/list',
  MENU_CATEGORY: '/menu/category',
  CREATE_MENU_CATEGORY: '/menu/category/create',
  DELETE_MENU_CATEGORY: '/menu/category/remove',
  UPDATE_MENU_CATEGORY: '/menu/category/update',
  SUB_CATEGORIES_BY_SHOP: '/subCategory/getAllByShopId',
  DELETE_SUB_CATEGORY: '/subCategory/remove',
  CREATE_SUB_CATEGORY: '/subCategory/create',
  SINGLE_SUB_CATEGORY: '/subCategory',
  UPDATE_SUB_CATEGORY: '/subCategory/update',
  UPDATE_SHOP_STATUS: '/shop/updateshopstatus',
  PRODUCTS: '/product/productsForMerchants',
  POPULAR_PRODUCTS: '/product/tranding',
  SINGLE_PRODUCT: '/product',
  CREATE_PRODUCT: '/product/create',
  UPDATE_PRODUCT: '/product/update',
  CREATE_FOOD: '/food/create',
  UPDATE_FOOD: '/food/update',
  SHOP_REVIEWS: '/review/list',
  USERS: '/users/findAll',
  SINGLE_USER: '/users/find',
  MERCHANT_WITHDRAWS: '/withdrawal/list',
  DRIVERS: '/user/list/driver',
  DRIVER_CURRENT_ORDER: '/incoming/requests/current/order',
  DRIVER_CURRENT_PARCEL: '/incoming/requests/current/parcel',
  ORDERS: '/order/all',
  USER_ORDERS_FOR_ADMIN: '/order/userOrderHistoryById',
  PARCELS: '/parcel/getAllParcelsForAdmin',
  SINGLE_PARCEL: '/parcel/getParcelByIdForAdmin',
  SINGLE_ORDER: '/order/single',
  UPDATE_ORDER_STATUS: '/order/merchant/update/status',
  CANCEL_ORDER: '/order/cancel',
  ROLES: '/role/all',
  SINGLE_ROLE: '/role',
  CREATE_ROLE: '/role/create',
  UPDATE_ROLE: '/role/update/role',
  DELETE_ROLE: '/role/remove',
  ADMIN_STAFFS: '/role/all/staff',
  ADMIN_STAFF: '/role/single/staff',
  CREATE_ADMIN_STAFF: '/role/create/staff',
  UPDATE_ADMIN_STAFF: '/role/update/staff',
  DELETE_ADMIN_STAFF: '/role',
  PERMISSIONS: '/role/list/permissions',
  NOTIFICATIONS: '/notification/merchant',
  READ_NOTIFICATION: '/notification',
  READ_ALL_NOTIFICATIONS: '/notification/read/all',
  GENERAL_UPLOAD: '/upload/general',
  UPDATE_PROFILE: '/user/update',
  UPDATE_PASSWORD: 'auth/update-profile',
  DRIVER_ANALYTICS: 'dashboard/driver',
  USER_ANALYTICS: 'dashboard/user',
  VENDOR_ANALYTICS: 'dashboard/merchant',
  ADMIN_ANALYTICS: 'dashboard/super',
  BANK_DETAILS: 'withdrawal/bankdetails/get',
  CREATE_WITHDRAW_REQUEST: 'withdrawal/create',
  PROCESS_WITHDRAW_REQUEST: 'withdrawal/update',
  SHOP_STATUS: '/shop/toggle/shop',
  SETTINGS: '/setting/get',
  UPDATE_SETTINGS: 'setting/update',
  EARNINGS: 'user/earning',
  EXCEL_EXPORT: 'user/export',
  USER_STATUS: 'users/ban',
  HELPERS_LIST: 'helpers/findAll',
  SINGLE_HELPER: 'helpers/find',
  HELPER_STATUS: 'helper/ban',
  FEEDBACK: 'feedback/getFeedback',
  REVIEWS: 'feedback/getReviews'

}
