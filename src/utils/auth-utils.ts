import localforage from 'localforage'
import { ADMIN_STAFF, AUTH_CREDS, STORE_OWNER, SUPER_ADMIN, ShopTypes } from './constants'

export const superAdmin_and_storeOWner = [SUPER_ADMIN, STORE_OWNER];
export const storeOwnerOnly = [STORE_OWNER];
export const superAdminOnly = [SUPER_ADMIN];
export const superAdmin_and_AdminStaff = [SUPER_ADMIN, ADMIN_STAFF];
export const superAdmin_AdminStaff_and_StoreOwner = [SUPER_ADMIN, ADMIN_STAFF, STORE_OWNER];
export const allRoles = [SUPER_ADMIN, STORE_OWNER, ADMIN_STAFF];

export const health_grocery_and_homeBusinessOnly = [ShopTypes.pharmacy, ShopTypes.grocery, ShopTypes.homeBusiness];
export const resturantOnly = [ShopTypes.resturant];

export const setLocalForageToken = (token: string | null | undefined) => {
  localforage.setItem(AUTH_CREDS, token)
}

export const getLocalForageAuthToken = async (): Promise<string | null> => {
  return await localforage.getItem(AUTH_CREDS)
}

export const removeLocalForageAuthToken = async () => {
  await localforage.removeItem(AUTH_CREDS)
}

export const hasAccess = (allowedRoles: string[] | undefined | null, userRole: string | undefined | null) => {
  if (userRole) {
    return Boolean(allowedRoles?.includes(userRole))
  }
  return false
}

export const staffHasPermission = (allowedPermissions: string[] | undefined, staffPermissions: string[] | undefined) => {
  if (staffPermissions?.length) {
    return Boolean(
      allowedPermissions?.find((permission) => staffPermissions?.includes(permission))
    );
  }
  return false;
}

export function isAuthenticated(token: string | null) {
  return !!token && (typeof token === 'string')
}
