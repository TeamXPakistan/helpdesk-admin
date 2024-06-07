export const AUTH_CREDS = '_CCAA00'
export const STORE_OWNER = 'shop_owner'
export const SUPER_ADMIN = 'ADMIN'
export const ADMIN_STAFF = 'staff'
export const USER = 'user'
export const SUPER_ADMIN_DISPLAY = 'Admin'
export const STORE_OWNER_DISPLAY = 'Shop Owner'
export const USER_DISPLAY = 'User'
export const SHOP_TYPE_RESTURANT_DISPLAY = 'RESTURANT'
export const SHOP_TYPE_HEALTH_DISPLAY = 'HEALTH'
export const SHOP_TYPE_GROCERY_DISPLAY = 'GROCERY'
export const SHOP_TYPE_HOME_BUSINESS_DISPLAY = 'HOME BUSINESS'
export const DRIVER = 'driver'

export enum ShopTypes {
    resturant = "resturant",
    pharmacy = "health",
    grocery = "grocery",
    homeBusiness = "home based"
}

export const shopTypesList = [
    ShopTypes.grocery,
    ShopTypes.homeBusiness,
    ShopTypes.pharmacy,
    ShopTypes.resturant
]

export enum ShopApprovalStatus {
    pending = "PENDING",
    accept = "ACCEPTED",
    reject = "REJECTED"
}

export enum DeliveryTimeTypes {
    MIN = "min",
    DAY = "day",
    HOUR = "hour",
}

export const DeliveryTimeList = [
    DeliveryTimeTypes.MIN,
    DeliveryTimeTypes.HOUR,
    DeliveryTimeTypes.DAY,
]

export enum FoodProductTypes {
    simple = "simple",
    variation = "variation"
}

export const FoodProductTypesList = [
    FoodProductTypes.simple,
    FoodProductTypes.variation
]

export enum CurrentOrPastOrders {
    CURRENT = "CURRENT",
    PAST = "PAST"
}

export enum OrderStatus {
    READY = "ready",
    PLACED = "placed",
    PICKED = "picked",
    CONFIRMED = "confirmed",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

export enum PaymentType {
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    ONLINE_PAYMENTS = "ONLINE_PAYMENTS"
}


export enum NotificationTypesEnum {
    ORDER = "order",
}

export enum AdminStaffPermissions {
    USERS = "users",
    DRIVERS = "drivers",
    PARCELS = "parcels",
    VENDORS = "vendors",
    EARNINGS = "earnings",
    RESTURANT_CATEGORIES = "resturant-categories",
}

export const adminStaffPermissionsList = [
    AdminStaffPermissions.DRIVERS,
    AdminStaffPermissions.EARNINGS,
    AdminStaffPermissions.RESTURANT_CATEGORIES,
    AdminStaffPermissions.USERS,
    AdminStaffPermissions.VENDORS,
    AdminStaffPermissions.PARCELS
]

export enum AttandenceStatus {
    CHECK_IN = "check_in",
    CHECK_OUT = "check_out"
}

export enum DriverAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export enum UserAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export enum VendorDashboardAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export enum AdminDashboardAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export enum ParcelStatus {
    PENDING = "pending",
    CANCELLED = "canceled",
    DELIVERED = "delivered",
    IN_TRANSIT = "in_transit",
}

export enum DriverCurrentRequest {
    IDLE = "idle",
    ORDER = "order",
    PARCEL = "parcel",
}

export enum MerchantWithDrawalStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    UNSUCCESSFULL = "unSuccessfull",
}