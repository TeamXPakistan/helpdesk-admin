export const AUTH_CREDS = '_CCAA00'
export const SUPER_ADMIN = 'ADMIN'
export const ADMIN_STAFF = 'staff'
export const USER = 'user'
export const SUPER_ADMIN_DISPLAY = 'Admin'
export const USER_DISPLAY = 'User'

export enum AdminStaffPermissions {
    USERS = "users",
    HELPERS = "helpers"
}

export const adminStaffPermissionsList = [
    AdminStaffPermissions.USERS,
]

export enum AdminDashboardAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}
