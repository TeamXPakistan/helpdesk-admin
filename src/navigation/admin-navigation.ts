// ** Type import
import { superAdminOnly, superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import { ROUTES } from '@utils/routes'
import { VerticalNavItemsType } from 'src/@core/layouts/types'


const adminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'common:nav-admin-text-dashboard',
      icon: 'tabler:layout-dashboard',
      path: '/',
      // allowedRoles: superAdmin_and_AdminStaff
    },
    {
      title: 'common:nav-admin-text-hatly-mart',
      icon: 'streamline:shopping-store-1-store-shop-shops-stores',
      path: ROUTES.HATLY_MART,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.HATLY_MART]
    },
    {
      title: 'common:nav-admin-text-users',
      icon: 'heroicons-outline:user-group',
      path: ROUTES.USERS,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.USERS]
    },
    {
      title: 'common:nav-admin-text-vendors',
      icon: 'streamline:shopping-store-1-store-shop-shops-stores',
      path: ROUTES.VENDORS,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.VENDORS]
    },
    {
      title: 'common:nav-admin-text-drivers',
      icon: 'ic:twotone-directions-bike',
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.DRIVERS, AdminStaffPermissions.PARCELS],
      children: [
        {
          title: 'common:nav-admin-text-drivers-all-drivers',
          path: ROUTES.DRIVERS,
          allowedRoles: superAdmin_and_AdminStaff,
          adminStaffPermissions: [AdminStaffPermissions.DRIVERS]
        },
        {
          title: 'common:nav-admin-text-drivers-parcels',
          path: ROUTES.PARCELS,
          allowedRoles: superAdmin_and_AdminStaff,
          adminStaffPermissions: [AdminStaffPermissions.PARCELS]
        }
      ]
    },
    {
      title: 'common:nav-admin-text-earnings',
      icon: 'grommet-icons:money',
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.EARNINGS],
      children: [
        {
          title: 'common:nav-admin-text-withdraws',
          path: ROUTES.WITHDRAWS,
          allowedRoles: superAdmin_and_AdminStaff,
          adminStaffPermissions: [AdminStaffPermissions.EARNINGS]
        },
        {
          title: 'common:nav-admin-text-driver-earnings',
          path: ROUTES.DRIVERS_EARNINGS,
          allowedRoles: superAdmin_and_AdminStaff,
          adminStaffPermissions: [AdminStaffPermissions.EARNINGS]
        },
        {
          title: 'common:nav-admin-text-merchants-earnings',
          path: ROUTES.MERCHANTS_EARNINGS,
          allowedRoles: superAdmin_and_AdminStaff,
          adminStaffPermissions: [AdminStaffPermissions.EARNINGS]
        }
      ]
    },
    {
      title: 'common:nav-admin-text-resturant-categories',
      icon: 'grommet-icons:money',
      path: ROUTES.RESTURANT_CATEGORIES,
      allowedRoles: superAdmin_and_AdminStaff,
      adminStaffPermissions: [AdminStaffPermissions.RESTURANT_CATEGORIES]
    },
    {
      title: 'common:nav-admin-text-management',
      icon: 'ic:outline-manage-accounts',
      allowedRoles: superAdminOnly,
      children: [
        {
          title: 'nav-admin-text-staff-management',
          path: ROUTES.STAFF,
          allowedRoles: superAdminOnly
        },
        {
          title: 'common:nav-admin-text-roles-management',
          path: ROUTES.ROLES,
          allowedRoles: superAdminOnly
        }
      ]
    },
    {
      title: 'common:nav-admin-text-settings',
      icon: 'ant-design:setting-outlined',
      path: ROUTES.SETTINGS,
      allowedRoles: superAdminOnly
    }
  ]
}

export default adminNavigation
