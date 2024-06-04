import ShopStatusAlert from "@components/shop/shop-status-alert";
import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { AdminStaffPermissions } from "@utils/constants";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const OwnerDashboard = dynamic(() => import('@components/dashboard/store-owner/dashboard'))

const ShopIndex = () => {
    return (
        <>
            <ShopStatusAlert />
            <OwnerDashboard />
        </>
    )
}

ShopIndex.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
    adminStaffPermissions: [AdminStaffPermissions.HATLY_MART]
}
ShopIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>

export default ShopIndex;