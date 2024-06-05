// ** Type import
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const storeOwnerNavigation = (shop: string): VerticalNavItemsType => {
  return ([
    {
      title: 'common:nav-store-owner-text-dashboard',
      icon: 'tabler:layout-dashboard',
      path: `/${shop}`,
      allowedRoles: superAdmin_and_AdminStaff,
    },

  ])
}

export default storeOwnerNavigation
