export const AUTH_CREDS = '_CCAA00'
export const SUPER_ADMIN = 'ADMIN'
export const ADMIN_STAFF = 'STAFF'
export const USER = 'user'
export const SUPER_ADMIN_DISPLAY = 'Admin'
export const USER_DISPLAY = 'User'

export enum AdminStaffPermissions {
    USERS = "user",
    HELPERS = "helpers",
    REVIEW = "review",
    FEEDBACK = "feedback",
    FAQ_ENTRIES = "Faq Entries"
}
export enum FaqEntry {
    FAQ = "FAQ",
}

export const adminStaffPermissionsList = [
    AdminStaffPermissions.USERS,
]

export const permissionModuleList = [
    AdminStaffPermissions.USERS,
    AdminStaffPermissions.HELPERS,
    AdminStaffPermissions.FEEDBACK,
    AdminStaffPermissions.REVIEW,
    AdminStaffPermissions.FAQ_ENTRIES,
]

export enum AdminDashboardAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export enum RouteActions {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
