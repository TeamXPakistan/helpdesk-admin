import { QueryKey } from "@tanstack/react-query";
import { AdminDashboardAnalyticsFilterBy, AttandenceStatus, CurrentOrPastOrders, DriverAnalyticsFilterBy, DriverCurrentRequest, MerchantWithDrawalStatus, OrderStatus, ParcelStatus, PaymentType, UserAnalyticsFilterBy, VendorDashboardAnalyticsFilterBy } from "@utils/constants";
import { Maybe } from "./generated";

export declare type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: any
    Mixed: any
    Upload: any
    Date: Date
    DateTimeTz: any
}

export type QueryParamsType = {
    queryKey: QueryKey;
    pageParam?: Scalars["String"];
};

export type GeneralQueryParam = {
    page?: Scalars["Int"];
    limit?: Scalars["Int"]
    text?: Scalars["String"];
    shopId?: Scalars["String"];
}

export type ShopsQueryParam = {
    shopType?: Scalars["String"];
    status?: Scalars["String"];
}

export type UsersQueryParam = {
    role: Scalars["String"];
}

export type MerchantWithdrawsQueryParam = {
    status?: MerchantWithDrawalStatus | Scalars["String"]
    role?: Scalars["String"]
}

export type EarningsQueryParam = {
    role?: Scalars['String']
    startDate?: Maybe<Scalars["Date"]>
    endDate?: Maybe<Scalars["Date"]>
}

export type OrdersQueryParam = {
    currentOrPastOrders?: CurrentOrPastOrders.CURRENT | CurrentOrPastOrders.PAST;
    status?: OrderStatus.CANCELLED | OrderStatus.CONFIRMED | OrderStatus.DELIVERED | OrderStatus.PICKED | OrderStatus.PLACED | OrderStatus.PLACED | OrderStatus.READY | "";
    orderType?: PaymentType.CASH_ON_DELIVERY | PaymentType.ONLINE_PAYMENTS | "";
    startDate?: Maybe<Scalars["Date"]>
    endDate?: Maybe<Scalars["Date"]>
    userId?: Maybe<Scalars["ID"]>
    driverId?: Maybe<Scalars["ID"]>
}

export type ParcelsQueryParam = {
    riderId?: Maybe<Scalars["ID"]>;
    startDate?: Maybe<Scalars["Date"]>;
    endDate?: Maybe<Scalars["Date"]>;
    status?: ParcelStatus;
}

export type ProductsQueryParam = {
    disabled?: Scalars["Boolean"];
}

export type DriversQueryParam = {
    status?: AttandenceStatus;
    current?: DriverCurrentRequest;
}

export type DriverAnalyticsQueryParam = {
    riderId: Scalars["ID"];
    filterBy?: DriverAnalyticsFilterBy;
}

export type UserAnalyticsQueryParam = {
    userId: Scalars["ID"];
    filterBy?: UserAnalyticsFilterBy;
}

export type VendorAnalyticsQueryParam = {
    filterBy?: VendorDashboardAnalyticsFilterBy;
    userId?: Scalars["ID"];
}

export type AdminAnalyticsQueryParam = {
    filterBy?: AdminDashboardAnalyticsFilterBy;
}

export type VerifyEmailQueryOptions = {
    token: string
}

