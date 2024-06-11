// ** Type import
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
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
    },
    {
      title: 'common:nav-admin-text-helper',
      icon: 'fa-solid:hands-helping',
      path: ROUTES.HELPER,
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
  ]
}

export default adminNavigation
