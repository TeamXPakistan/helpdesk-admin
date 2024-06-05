// ** Type import
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'common:nav-admin-text-dashboard',
      icon: 'tabler:layout-dashboard',
      path: '/',
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
  ]
}

export default adminNavigation
