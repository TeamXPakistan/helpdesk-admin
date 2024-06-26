// ** Type import
import { superAdminOnly, superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import { ROUTES } from '@utils/routes'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'common:nav-admin-text-dashboard',
      icon: 'ic:round-home',
      path: ROUTES.DASHBOARD,
      allowedRoles: superAdmin_and_AdminStaff,
    },
    {
      title: 'common:nav-admin-text-user',
      icon: 'clarity:users-solid',
      path: ROUTES.USERS,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.USERS],
    },
    {
      title: 'common:nav-admin-text-helper',
      icon: 'fa-solid:hands-helping',
      path: ROUTES.HELPER,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.HELPERS],
    },
    {
      title: 'common:nav-admin-text-role-based',
      icon: 'flowbite:user-settings-solid',
      allowedRoles: superAdminOnly,
      children: [
        {
          title: 'common:nav-admin-text-permissions',
          path: ROUTES.PERMISSIONS,
          allowedRoles: superAdminOnly,
        },
        {
          title: 'common:nav-admin-text-roles',
          path: ROUTES.ROLES,
          allowedRoles: superAdminOnly,
        },
        {
          title: 'common:nav-admin-text-staff',
          path: ROUTES.STAFF,
          allowedRoles: superAdminOnly,
        }
      ]
    },
    {
      title: 'common:nav-admin-text-subscriptions',
      icon: 'wpf:renew-subscription',
      path: ROUTES.SUBSCRIPTIONS,
      allowedRoles: superAdmin_and_AdminStaff,
    },
    {
      title: 'common:nav-admin-text-feedback-and-review',
      icon: 'fa-solid:thumbs-up',
      allowedRoles: superAdmin_and_AdminStaff,
      children: [
        {
          title: 'common:nav-admin-text-users-feedback',
          path: ROUTES.USERS_FEEDBACK,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-text-helpers-feedback',
          path: ROUTES.HELPERS_FEEDBACK,
          allowedRoles: superAdmin_and_AdminStaff,
        }
      ]
    },
    {
      title: 'common:nav-admin-text-content-management',
      icon: 'fluent:content-view-gallery-16-regular',
      allowedRoles: superAdmin_and_AdminStaff,
      children: [
        {
          title: 'common:nav-admin-text-faq-entries',
          path: ROUTES.FAQ_ENTRIES,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-text-tutorials',
          path: ROUTES.TUTORIALS,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-text-Announcements',
          path: ROUTES.ANNOUCEMENTS,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-text-term-of-services-privacy-policy',
          path: ROUTES.TERM_OF_SERVICES_PRIVACY_POLICY,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-news-articles',
          path: ROUTES.NEWS_ARTICLES,
          allowedRoles: superAdmin_and_AdminStaff,
        },
        {
          title: 'common:nav-admin-content-policies',
          path: ROUTES.CONTENT_POLICIES,
          allowedRoles: superAdmin_and_AdminStaff,
        }
      ]
    },
  ]
}

export default adminNavigation
