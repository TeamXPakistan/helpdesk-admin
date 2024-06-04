import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import OrderDetails from "@components/orders/order-details";
import OrderStatus2 from "@components/orders/order-status-2";
import { useOrderQuery } from "@data/orders/order-query";

const EditProduct = () => {
    const router = useRouter()

    // fetching order
    const { data, isLoading: fetchingProduct, error } = useOrderQuery(router?.query?.id as string)

    if (fetchingProduct) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card sx={{ borderRadius: 2, p: 4 }}>
            <OrderStatus2 order={data} />
            <OrderDetails order={data} />
        </Card >
    </>
}

EditProduct.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
EditProduct.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default EditProduct;