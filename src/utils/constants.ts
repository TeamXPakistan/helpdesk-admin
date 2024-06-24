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
    FEEDBACK = "feedback"
}

export const adminStaffPermissionsList = [
    AdminStaffPermissions.USERS,
]

export const permissionModuleList = [
    AdminStaffPermissions.USERS,
    AdminStaffPermissions.HELPERS,
    AdminStaffPermissions.FEEDBACK,
    AdminStaffPermissions.REVIEW
]

export enum AdminDashboardAnalyticsFilterBy {
    TODAY = "today",
    WEEKLY = "weekly",
    YEARLY = "yearly",
    MONTHLY = "monthly",
}
export enum UserHelpDeskId {
    USER = 1,
    HELP_DESK = 2
}

export enum RouteActions {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
export enum ReviewFeedbackTabs {
    FEEDBACK_TAB = '1',
    REVIEW_TAB = '2'
}
