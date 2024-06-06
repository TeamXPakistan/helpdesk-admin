import { AttandenceStatus, DriverCurrentRequest, FoodProductTypes, MerchantWithDrawalStatus, OrderStatus, ParcelStatus } from "@utils/constants"

export declare type Maybe<T> = T | null | undefined;

export declare type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any
  Upload: any
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: Date
  /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
  DateTimeTz: any
}
export type IPaginator<Data> = {
  data: Data[];
  paginatorInfo: IPaginatorInfo;
}

export type IPaginatorInfo = {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any;
  totalUnreadNotifications?: number
}

export type RegisterInput = {
  name: Scalars['String']
  email: Scalars['String']
  contact: Scalars['String']
  password: Scalars['String']
}

export type loginInput = {
  email: Scalars['String']
  password: Scalars['String']
  fcmToken?: Scalars['String']
}

export type ForgotPasswordEmailInput = {
  email: Scalars['String']
}
export type ResetPasswordInput = {
  oldPassword: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String'],
}

export type CreateUserInput = {
  username: Scalars['String']
  email: Scalars['String']
  phone: Scalars['String']
  password: Scalars['String']
}

export type UpdateUserInput = {
  name?: Scalars['String']
  email?: Scalars['String']
  phone?: Scalars['String']
  password?: Scalars['String']
  profileImage?: Scalars['String']
}

export type User = {
  _id?: Scalars['String']
  name?: Scalars['String']
  email?: Scalars['String']
  firstName?: Scalars['String'],
  lastName?: Scalars['String']
  contact?: Scalars['String']
  roles?: Scalars['String']
  token?: Scalars['String']
  verified?: Scalars['String']
  profileImage: Scalars['String']
  phone?: Scalars['Int']
  genderPreference?: Scalars['String']
}

export type Driver = {
  _id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['String']
  contact: Scalars['String']
  role: Scalars['String']
  wallet: Scalars['Int']
  verified: Scalars['Boolean']
  profileImage: Scalars['String']
  status?: AttandenceStatus
  reasion?: Scalars['String']
  currentRequest: Scalars['String']
}

export type LoginUserDynamicRole = {
  _id: Scalars["ID"]
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
}

export type UpdatePasswordInput = {
  username: Scalars['String']
  email: Scalars['String']
  phone: Scalars['String']
  password: Scalars['String']
}

export type ResponseSuccess = {
  success?: Scalars["Boolean"]
  message?: Scalars['String']
}

export type MerchantWithdraw = {
  _id: Scalars["ID"]
  userId: Scalars["ID"]
  status: MerchantWithDrawalStatus
  amount: Scalars["Int"]
  requestSpecialNote: Scalars["String"]
  specialNote: Scalars["String"]
  reason?: Scalars["String"]
  screenShort: Scalars["String"]
  createdAt: Scalars["Date"]
  bankDetails: {
    accountHolderName: Scalars["String"]
    accountHolderEmail: Scalars["String"]
    accountNumber: Scalars["String"]
    bankName: Scalars["String"]
  }
}
export type WithdrawRequest = {
  id?: Scalars['ID']
  amount: Scalars['String'] | Scalars['Int']
  requestSpecialNote?: Scalars['String']
  status?: Scalars['String'] | object
  specialNote?: Scalars['String']
  screenShort?: Scalars['String']
  reason?: Scalars['String']
}

export type BankDetails = {
  accountHolderName: Scalars["String"]
  accountHolderEmail: Scalars["String"]
  accountNumber: Scalars["String"]
  bankName: Scalars["String"]
}

export type Shop = {
  _id: Scalars['String']
  name: Scalars['String']
  preparationTime: Scalars['Int']
  description: Scalars['String'];
  owner: User;
  image: Scalars['String']
  totalReviews: Scalars['Int']
  ratting: Scalars['Float']
  type: Scalars['String']
  isOpen: Scalars['Boolean']
  address: ShopAddress;
  balance: ShopBalance
  bankAccountDetails: ShopBankDetails;
  resturantCategory: Array<ResturantCategory>
  setting: ShopSettings
  status: Scalars['String']
  tradeLicence: ShopTradeLicense
  reasonToRejectShop: Scalars['String']
}

export type ShopBalance = {
  current_balance: Scalars['Int'];
  total_earnings: Scalars['Int'];
  withdrawn_amount: Scalars['Int'];

}

export type CreateShop = {
  name: string;
  description: string;
  image: string;
  tradeLicence: ShopTradeLicense;
  setting: ShopSettings;
  address: ShopAddress;
  bankAccountDetails: ShopBankDetails
} & ({
  type: string | null | undefined
} | {
  type: string | null | undefined
  resturantCategory: string[]
})

export type ChangeShopStatus = {
  status?: Scalars['String'];
  shopId: Scalars['String'] | undefined;
  reasonToRejectShop?: Scalars['String'];
  toggle?: boolean;
}

export type UpdateShop = {
  _id?: Scalars['String']
  name?: Scalars['String']
  preparationTime?: Scalars['Int'];
  description?: Scalars['String'];
  image?: Scalars['String']
  address?: ShopAddress;
  bankAccountDetails?: ShopBankDetails;
  resturantCategory?: Array<Scalars['String']>
  setting?: ShopSettings
  tradeLicence?: ShopTradeLicense
}

export type ShopAddress = {
  country: Scalars['String'];
  city: Scalars['String'];
  streetAddress: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['Int'];
}

export type ShopTradeLicense = {
  tradeLicenseIssueAt: Scalars['Date'] | null
  tradeLicenseExpireAt: Scalars['Date'] | null
  tradeLicenseUrl: Scalars['String']
}

export type ShopBankDetails = {
  accountHolderName?: Scalars['String'];
  accountHolderEmail?: Scalars['String'];
  bankName?: Scalars['String'];
  accountNumber?: Scalars['String'];
}

export type ShopSettings = {
  contact: Scalars['String']
  opensAt: Scalars['Date'] | null
  closesAt: Scalars['Date'] | null
  location: LocationInput | null
}

export type ShopCategory = {
  _id: Scalars['String']
  name: Scalars['String']
  image: Scalars['String']
  shop: Scalars['String']
}

export type CreateShopCategory = {
  name: Scalars['String']
  image: Scalars['String']
}

export type UpdateShopCategory = {
  name: Scalars['String']
  image: Scalars['String']
  _id: Scalars['String']
}

export type SubCategory = {
  _id: Scalars['String']
  title: Scalars['String']
  categoryId: ShopCategory
  shop: Shop | Scalars['String'] | null
}

export type CreateSubCategory = {
  title: Scalars['String']
  categoryId: Scalars["String"] | undefined | null
  shopId: Shop | Scalars['String'] | null | undefined
}

export type EditSubCategory = {
  title: Scalars['String']
  categoryId: Scalars["String"] | undefined | null
  _id: Scalars['String']
}

export type MenuCategory = {
  _id: Scalars['String']
  title: Scalars['String']
  shop: Scalars['String'] | Shop
}

export type CreateMenuCategory = {
  title: Scalars['String']
}

export type UpdateMenuCategory = {
  title: Scalars['String']
  _id: Scalars['String']
}

export type Product = {
  _id: Scalars['ID'];
  name: Scalars['String']
  shopId: Scalars['ID'];
  productType: Scalars['String'];
  images: Array<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  price: Maybe<Scalars['Int']>;
  salePrice: Maybe<Scalars['Int']>;
  maxPrice: Maybe<Scalars['Int']>;
  minPrice: Maybe<Scalars['Int']>;
  category: Scalars['String'];
  subCategory: Maybe<Scalars['String']>;
  menuCategory: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  veriations: Array<FoodVariation> | [];
  isEnabled: Scalars['Boolean'];
  sold: Scalars['Boolean'];
}

export type CreateProduct = {
  name: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>
  category: Maybe<Scalars['String']>;
  price: Maybe<Scalars['Float']>;
  salePrice: Maybe<Scalars['Float']>;
  subCategory: Maybe<Scalars['String']>;
}

export type UpdateProduct = {
  _id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>
  category: Maybe<Scalars['String']>;
  price: Maybe<Scalars['Float']>;
  salePrice: Maybe<Scalars['Float']>;
  subCategory: Maybe<Scalars['String']>;
  isEnabled: Scalars['Boolean'];
}

export type CreateFood = {
  name: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  productType: FoodProductTypes.simple | FoodProductTypes.variation;
  salePrice?: Maybe<Scalars['Int']>
  quantity: 3
  maxPrice?: Maybe<Scalars['Int']>
  minPrice?: Maybe<Scalars['Int']>
  menuCategory: Maybe<Scalars['String']>;
  veriations?: Array<FoodVariation>
}

export type UpdateFood = {
  _id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  productType: FoodProductTypes.simple | FoodProductTypes.variation;
  salePrice?: Maybe<Scalars['Int']>
  quantity: 3
  maxPrice?: Maybe<Scalars['Int']>
  minPrice?: Maybe<Scalars['Int']>
  menuCategory: Maybe<Scalars['String']>;
  veriations?: Array<FoodVariation>;
  isEnabled: Scalars['Boolean'];
}

export type FoodVariation = {
  title: Scalars['String'];
  isRequired: Scalars['Boolean'];
  isMultiple: Scalars['Boolean'];
  options: Array<{
    name: Scalars['String'];
    price: Scalars['Int'];
    salePrice: Maybe<Scalars['Int']>;
  }>
}

export type ShopReview = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['ID'];
  shopId: Scalars['ID'];
  images: Array<Scalars['String']>
  ratting: Scalars['Int'];
  description: Scalars['String'];
  createdAt: Scalars['Date'];
  profileImage: Scalars['String'];
}


export type Notification = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  userId: Scalars['ID'];
  isRead: Scalars['Boolean'];
  description: Scalars['String'];
  displayImage: Scalars['String'];
  notificationType: Scalars['String']
  redirectionURL: Scalars['String']
  notifiableId: Scalars['ID'];
  createdAt: Scalars['Date'];
} & {
  userId: User;
}

export type ResturantCategory = {
  _id: Scalars['String'];
  title: Scalars['String'];
  image: Scalars['String'];
};

export type CreateResturantCategory = {
  title: Scalars['String'];
  image: Scalars['String'];
};

export type UpdateResturantCategory = {
  title: Scalars['String'];
  image: Scalars['String'];
  _id: Scalars['String'];
};

export type Order = {
  _id: Scalars['String']
  orderId: Scalars['String'];
  status: OrderStatus
  products: Array<OrderProduct>
  total: Scalars['Int']
  subTotal: Scalars['Int']
  orderType: Maybe<Scalars['String']>;
  customer: User;
  merchant: User;
  driver: User;
  shop: Scalars['String'];
  tax: Scalars['Int']
  useWallet: Scalars['Boolean']
  isPayed: Scalars['Boolean']
  usedWalletAmount: Scalars['Int']
  deliveryCharges: Scalars['Int']
  specialNote: Maybe<Scalars['String']>;
  dropOff: DropOff;
  createdAt: Maybe<Scalars['Date']>;
} & {
  shop: Shop
}

export type Parcel = {
  _id: Scalars['ID'];
  trackingNumber: Scalars['String'];
  details: ParcelDetails;
  senderId: User;
  senderLocation: ParcelLocation;
  receiverLocation: ParcelLocation;
  status: ParcelStatus;
  fare: Scalars['Int'];
  driver: Driver;
}

export type ParcelDetails = {
  item: Scalars['String'];
  qty: Scalars['Int'];
  weight: Scalars['Int'];
  weightUnit: Scalars['String'];
  height: Scalars['Int'];
  heightUnit: Scalars['String'];
  length: Scalars['Int'];
  lengthUnit: Scalars['String'];
  width: Scalars['Int'];
  widthUnit: Scalars['String'];
  description: Scalars['String'];
}

export type ParcelLocation = {
  type: Scalars['String'];
  phoneNumber: Scalars['String'];
  location: SenderReceiverLocation
}

export type SenderReceiverLocation = {
  _id: Scalars['ID'];
  type: Scalars['String'];
  lat: Scalars['Int'];
  lng: Scalars['Int'];
  label: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  apartmentNumber: Scalars['String'];
  additionalDirection: Scalars['String'];
  coordinates: {
    lat: Scalars['Int'];
    lng: Scalars['Int'];
  }
  userId: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  deletedAt: Scalars['Date'];
}

export type DriverCurrentOrder = {
  _id: Scalars['ID'];
  requestId: Scalars['ID'];
  requestFor: Scalars['String'];
  riderId: Scalars['ID'];
  status: Scalars['String'];
  charges: Scalars['Float'];
  orders: Order;
  shop: Shop;
  pickup: PickUp;
  dropOff: DropOff
}

export type DriverCurrentParcel = {
  _id: Scalars['ID'];
  requestId: Scalars['ID'];
  requestFor: Scalars['String'];
  riderId: Scalars['ID'];
  status: Scalars['String'];
  charges: Scalars['Float'];
  parcel: Parcel
}

export type PickUp = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  coordinates: {
    lat: Scalars['Float'];
    lng: Scalars['Float'];
  },
  formattedAddress: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
}

export type DropOff = {
  type: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  label: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  additionalDirection: Scalars['String'];
  coordinates: {
    lat: Scalars['Float'];
    lng: Scalars['Float'];
  },
  userId: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
}



export type OrderProduct = {
  _id: Scalars['ID'],
  productId: Scalars['ID'],
  shopId: Scalars['ID'],
  quantity: Scalars['Int'],
  image: Scalars['String'],
  prize: Scalars['Int'],
  productName: Scalars['String'],
  specialInstruction: Scalars['String'],
  veriations: null | Array<OrderFoodVariation>
}

export type OrderFoodVariation = {
  _id: Scalars['ID'],
  title: Scalars['String'];
  isRequired: Scalars['Boolean'];
  isMultiple: Scalars['Boolean'];
  limit: Scalars['Int'];
  options: Array<{
    _id: Scalars['ID'],
    name: Scalars['String'];
    price: Scalars['Int'];
    salePrice: Maybe<Scalars['Int']>;
  }>
}

export type ChangeOrderStatus = {
  orderId: Scalars["ID"]
  status: OrderStatus
}

export type Permission = {
  name: Scalars["String"]
  _id: Scalars["ID"]
}

export type Role = {
  _id: Scalars["ID"]
  name: Scalars['String'];
  permissions: Array<Permission>;
};

export type CreateRoleInput = {
  name: Scalars['String'];
  permissions: Maybe<Scalars['String'][]>;
};

export type UpdateRoleInput = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Maybe<Scalars['String'][]>;
};

export type CreateAdminStaffInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  contact: Scalars['String'];
  dynamicRole: Maybe<Scalars['ID']>;
};

export type UpdateAdminStaffInput = {
  id: Scalars['ID'] | undefined;
  name: Scalars['String'] | undefined;
  dynamicRole: Scalars['ID'];
};

export type DriverAnalytics = {
  _id: Scalars['ID'];
  totalEarning: Scalars['Int'];
  totalOrders: Scalars['Int'];
  totalParcels: Scalars['Int'];
  totalSpendTime: {
    hours: Scalars['Int'];
    minuts: Scalars['Int'];
  },
  userId: Driver;
  currentRequest: DriverCurrentRequest;
  totalOrdersEarning: Scalars['Int'];
  totalParcelsEarning: Scalars['Int'];
};

export type UserAnalytics = {
  _id: Scalars['ID'];
  totalOrders: Scalars['Int'];
  totalParcels: Scalars['Int'];
  userId: Scalars['ID'];
  totalMoneySpendOnOrders: Scalars['Int'];
  totalMoneySpendOnParcels: Scalars['Int'];
};

export type VendorAnalytics = {
  _id: Scalars['ID'];
  totalEarning: Scalars['Int'];
  totalOrders: Scalars['Int'];
  userId: User
  totalReviews: Scalars['Int'];
  totalOrdersEarning: Scalars['Int'];
  totalProducts: Scalars['Int'];
  totalRating: Scalars['Float'];
  totalCancilOrders: Scalars['Int'];
  earlyEarningBarChart: Array<{
    _id: {
      year: Scalars['Int'];
      month: Scalars['String'];
    },
    subTotal: Scalars['Float'];
  }>
}

export type AdminAnalytics = {
  _id: Scalars['ID'];
  totalEarning: Scalars['Int'];
  totalOrders: Scalars['Int'];
  totalParcels: Scalars['Int'];
  totalSpendTime: Scalars['Int'];
  userId: User
  totalUsers: Scalars['Int'];
  totalHealths: Scalars['Int'];
  totalHomeBase: Scalars['Int'];
  totalDrivers: Scalars['Int'];
  totalGroceryStores: Scalars['Int'];
  totalResturants: Scalars['Int'];
  totalMerchants: Scalars['Int'];
  totalParcelsEarning: Scalars['Int'];
  totalOrdersEarning: Scalars['Int'];
  totalCancilOrders: Scalars['Int'];
  earlyOrdersEarningBarChart: Array<{
    _id: {
      year: Scalars['Int'];
      month: Scalars['String'];
    },
    subTotal: Scalars['Float'];
  }>
  earlyParcelsEarningBarChart: Array<{
    _id: {
      year: Scalars['Int'];
      month: Scalars['String'];
    },
    subTotal: Scalars['Float'];
  }>
}

export type AuthProps = {
  allowedRoles?: Scalars['String'][]
  adminStaffPermissions?: Scalars['String'][]
  allowedShops?: Scalars['String'][]
}

export type AuthCredentialTypes = {
  user: User | null | undefined
  token: string | null | undefined
  role: string | null | undefined
}

export type LocationInput = {
  lat?: Scalars['Float'];
  lng?: Scalars['Float'];
  city?: Scalars['String'];
  state?: Scalars['String'];
  country?: Scalars['String'];
  zip?: Scalars['String'];
  coordinates?: Array<Scalars['String']>;
  formattedAddress?: Scalars['String'];
};

export type Settings = {
  VAT: Scalars['Int'];
  minPayout: Scalars['Int'];
  maxPayout: Scalars['Int'];
  minWallet: Scalars['Int'];
  deliveryCharges: Scalars['Int'];
  parcelMaxQty: Scalars['Int'];
  parcelMaxWeight: Scalars['Int'];
  parcelMaxHeight: Scalars['Int'];
  parcelMaxWidth: Scalars['Int'];
  parcelMaxLength: Scalars['Int'];
}

export type MerchantsEarnings = {
  _id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['String']
  role: Scalars['String']
  totalOrdersEarning: Scalars['Float']
  totalOrders: Scalars['Int']
}

export type DriversEarnings = {
  _id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['String']
  role: Scalars['String']
  totalOrdersEarning: Scalars['Float']
  totalOrders: Scalars['Int']
  totalParcels: Scalars['Int']
  totalParcelEarning: Scalars['Float']
  total: Scalars['Float']
}

export type ExcelExport = {
  role: Scalars['String']
  startDate: Scalars['Date'] | null
  endDate: Scalars['Date'] | null
}
