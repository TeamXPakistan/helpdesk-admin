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
  ]
}

export default adminNavigation
