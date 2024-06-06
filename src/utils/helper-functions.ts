import { DriverAnalyticsFilterBy, SHOP_TYPE_GROCERY_DISPLAY, SHOP_TYPE_HEALTH_DISPLAY, SHOP_TYPE_HOME_BUSINESS_DISPLAY, SHOP_TYPE_RESTURANT_DISPLAY, STORE_OWNER, STORE_OWNER_DISPLAY, SUPER_ADMIN, SUPER_ADMIN_DISPLAY, ShopTypes, USER, USER_DISPLAY, UserAnalyticsFilterBy, VendorDashboardAnalyticsFilterBy } from "./constants"

export const getRoleName = (role: string | undefined | null) => {
    if (role === SUPER_ADMIN) return SUPER_ADMIN_DISPLAY
    if (role === STORE_OWNER) return STORE_OWNER_DISPLAY
    if (role === USER) return USER_DISPLAY
}

export const getShopTypeName = (shopType: string | undefined | null) => {
    if (shopType === ShopTypes.grocery) return SHOP_TYPE_GROCERY_DISPLAY
    if (shopType === ShopTypes.homeBusiness) return SHOP_TYPE_HOME_BUSINESS_DISPLAY
    if (shopType === ShopTypes.pharmacy) return SHOP_TYPE_HEALTH_DISPLAY
    if (shopType === ShopTypes.resturant) return SHOP_TYPE_RESTURANT_DISPLAY
}


export const downloadPDF = (trade_license_image: string, shopName: string) => {
    fetch(trade_license_image, {
        method: 'GET',
        headers: {},
    })
        .then((response) => {
            response.arrayBuffer().then(function (buffer) {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${shopName}-trade-license.pdf`
                ); //or any other extension like pdf , png
                document.body.appendChild(link);
                link.click();
            });
        })
        .catch((err) => {
            console.log(err);
        });
}



export const getFilterDate = (date: DriverAnalyticsFilterBy): Date => {
    const currentDate = new Date()

    const filterBy = date || DriverAnalyticsFilterBy.TODAY

    switch (filterBy) {
        case DriverAnalyticsFilterBy.TODAY: {
            currentDate.setDate(currentDate.getDate() - 1)
            break
        }
        case DriverAnalyticsFilterBy.MONTHLY: {
            currentDate.setMonth(currentDate.getMonth() - 1)
            break
        }
        case DriverAnalyticsFilterBy.WEEKLY: {
            currentDate.setDate(currentDate.getDate() - 7)
            break
        }
        case DriverAnalyticsFilterBy.YEARLY: {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            break
        }
        default: {
            currentDate.setDate(currentDate.getDate() - 1)
        }
    }
    currentDate.setHours(1)
    currentDate.setMinutes(0)
    return currentDate;
}

export const getUserDashboardFilterDate = (date: UserAnalyticsFilterBy): Date => {
    const currentDate = new Date()

    const filterBy = date || DriverAnalyticsFilterBy.TODAY

    switch (filterBy) {
        case UserAnalyticsFilterBy.TODAY: {
            currentDate.setDate(currentDate.getDate() - 1)
            break
        }
        case UserAnalyticsFilterBy.MONTHLY: {
            currentDate.setMonth(currentDate.getMonth() - 1)
            break
        }
        case UserAnalyticsFilterBy.WEEKLY: {
            currentDate.setDate(currentDate.getDate() - 7)
            break
        }
        case UserAnalyticsFilterBy.YEARLY: {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            break
        }
        default: {
            currentDate.setDate(currentDate.getDate() - 1)
        }
    }
    currentDate.setHours(1)
    currentDate.setMinutes(0)
    return currentDate;
}

export const getVendorDashboardFilterDate = (date: VendorDashboardAnalyticsFilterBy): Date => {
    const currentDate = new Date()

    const filterBy = date || DriverAnalyticsFilterBy.TODAY

    switch (filterBy) {
        case VendorDashboardAnalyticsFilterBy.TODAY: {
            currentDate.setDate(currentDate.getDate() - 1)
            break
        }
        case VendorDashboardAnalyticsFilterBy.MONTHLY: {
            currentDate.setMonth(currentDate.getMonth() - 1)
            break
        }
        case VendorDashboardAnalyticsFilterBy.WEEKLY: {
            currentDate.setDate(currentDate.getDate() - 7)
            break
        }
        case VendorDashboardAnalyticsFilterBy.YEARLY: {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            break
        }
        default: {
            currentDate.setDate(currentDate.getDate() - 1)
        }
    }
    currentDate.setHours(1)
    currentDate.setMinutes(0)
    return currentDate;
}

export const fullName = (firstName: string | null | undefined, lastName: string | null | undefined) => {
    if (firstName || lastName) {
        return `${firstName || ''} ${lastName || ''}`;
    }
}