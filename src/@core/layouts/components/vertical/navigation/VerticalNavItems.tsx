// ** Type Imports
import { NavLink, NavGroup, LayoutProps, NavSectionTitle } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useAuthCredentials } from '@store/apps/auth'
import { hasAccess, staffHasPermission } from '@utils/auth-utils'
import { ADMIN_STAFF } from '@utils/constants'

interface Props {
  parent?: NavGroup
  navHover?: boolean
  navVisible?: boolean
  groupActive: string[]
  isSubToSub?: NavGroup
  currentActiveGroup: string[]
  navigationBorderWidth: number
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
  verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
}

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
  if ((item as NavGroup).children) return VerticalNavGroup

  return VerticalNavLink
}

const VerticalNavItems = (props: Props) => {
  const { verticalNavItems } = props
  const { authValues } = useAuthCredentials()

  const RenderMenuItems = verticalNavItems?.map((item: NavGroup | NavLink | NavSectionTitle, index: number) => {
    // check role and permission here
    if (
      hasAccess(item?.allowedRoles, authValues?.role) &&
      (item?.adminStaffPermissions?.length && authValues?.role === ADMIN_STAFF ? staffHasPermission(item?.adminStaffPermissions, authValues?.user?.role?.roles) : true)
    ) {
      const TagName: any = resolveNavItemComponent(item)
      return <TagName {...props} key={index} item={item} />
    }
    return null;
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
