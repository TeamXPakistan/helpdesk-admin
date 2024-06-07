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

export type UserBanPayload = {
  email?: Scalars['String']
  phone?: Scalars['String']
  isActive: Scalars['Boolean']
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
  lastPage?: number;
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
  id?: Scalars['String']
  name?: Scalars['String']
  email?: Scalars['String']
  firstName?: Scalars['String'],
  lastName?: Scalars['String']
  contact?: Scalars['String']
  roles?: Scalars['String']
  token?: Scalars['String']
  verified?: Scalars['String']
  profilePic: Scalars['String']
  phone?: Scalars['Int']
  genderPreference?: Scalars['String']
  isActive?: Scalars['Boolean']
  location?: Scalars['String']
}

export type Helpers = {
  id: Scalars['ID'],
  email: Scalars['String'],
  username: Scalars['String'],
  phone: Scalars['String'],
  roles: Scalars['String'],
  isActive: Scalars['Boolean'],
  profilePic: Scalars['String'],
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  preferredLanguage: Scalars['String'],
  languageSpoken: Scalars['String'],
  genderPreference: Scalars['String'],
  status: Scalars['String'],
  documents: Scalars['String'],
  location: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String']
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

export type UserAnalytics = {
  _id: Scalars['ID'];
  totalOrders: Scalars['Int'];
  totalParcels: Scalars['Int'];
  userId: Scalars['ID'];
  totalMoneySpendOnOrders: Scalars['Int'];
  totalMoneySpendOnParcels: Scalars['Int'];
};

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

export type ExcelExport = {
  role: Scalars['String']
  startDate: Scalars['Date'] | null
  endDate: Scalars['Date'] | null
}
