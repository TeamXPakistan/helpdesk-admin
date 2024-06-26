import { QueryKey } from "@tanstack/react-query";
import { AdminDashboardAnalyticsFilterBy } from "@utils/constants";

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
    roleId?: Scalars["Int"];
}

export type UsersQueryParam = {
    role: Scalars["String"];
}

export type ProductsQueryParam = {
    disabled?: Scalars["Boolean"];
}

export type AdminAnalyticsQueryParam = {
    filterBy?: AdminDashboardAnalyticsFilterBy;
}

export type VerifyEmailQueryOptions = {
    token: string
}

