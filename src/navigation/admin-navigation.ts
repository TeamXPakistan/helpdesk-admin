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
    // {
    //   title: 'common:nav-admin-text-drivers',
    //   icon: 'ic:twotone-directions-bike',
    //   allowedRoles: superAdmin_and_AdminStaff,
    //   adminStaffPermissions: [AdminStaffPermissions.DRIVERS, AdminStaffPermissions.PARCELS],
    //   children: [
    //     {
    //       title: 'common:nav-admin-text-drivers-all-drivers',
    //       path: ROUTES.DRIVERS,
    //       allowedRoles: superAdmin_and_AdminStaff,
    //       adminStaffPermissions: [AdminStaffPermissions.DRIVERS]
    //     },
    //     {
    //       title: 'common:nav-admin-text-drivers-parcels',
    //       path: ROUTES.PARCELS,
    //       allowedRoles: superAdmin_and_AdminStaff,
    //       adminStaffPermissions: [AdminStaffPermissions.PARCELS]
    //     }
    //   ]
    // },
    {
      title: 'common:nav-admin-text-helper',
      icon: 'fa-solid:hands-helping',
      path: ROUTES.CONTENT_MANAGEMENT,
      allowedRoles: superAdmin_and_AdminStaff,
    },
  ]
}

export default adminNavigation
