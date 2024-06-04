import { Grid } from "@mui/material";
import VendorAnalytics from "./analytics/ecommerce-statistics";
import { useVendorAnalyticsQuery } from "@data/analytics/vendor-analytics-query";
import { OrderStatus, VendorDashboardAnalyticsFilterBy } from "@utils/constants";
import { useState } from "react";
import { getVendorDashboardFilterDate } from "@utils/helper-functions";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import Orders from "./orders/orders";
import PopularProducts from "./popular-products/popular-products";
import Reviews from "./reviews/reviews";
import EarningsBarChart from "./analytics/earnings-bar-chart";

const StoreOwnerDashboard = () => {

  const [filter, setFilter] = useState<VendorDashboardAnalyticsFilterBy>(VendorDashboardAnalyticsFilterBy.TODAY);
  const [ordersStatus, setOrdersStatus] = useState<OrderStatus>(OrderStatus.PLACED);
  const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
    startDate: getVendorDashboardFilterDate(VendorDashboardAnalyticsFilterBy.TODAY),
    endDate: new Date()
  });


  const { data: vendorAnalytics, isLoading: loadingAnalytic, error } = useVendorAnalyticsQuery({
    filterBy: filter as VendorDashboardAnalyticsFilterBy
  })

  const onFilterChange = (value: VendorDashboardAnalyticsFilterBy) => {
    setFilter(value);
    setDates({ startDate: getVendorDashboardFilterDate(value), endDate: new Date() });
    if (value === VendorDashboardAnalyticsFilterBy.TODAY) {
      setOrdersStatus(OrderStatus.PLACED)
    } else {
      setOrdersStatus(OrderStatus.DELIVERED)
    }
  }

  // react component 
  if (loadingAnalytic) return <Spinner />
  if (error) return <CustomError errorMsg={error?.message} />
  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12}>
          <VendorAnalytics
            analytics={vendorAnalytics}
            onFilterChange={onFilterChange}
            filter={filter}
          />
        </Grid>

        <Grid item xs={12}>
          <EarningsBarChart analytics={vendorAnalytics} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Orders dates={dates} filter={filter} ordersStatus={ordersStatus} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Reviews />
        </Grid>

        <Grid item xs={12}>
          <PopularProducts />
        </Grid>

      </Grid>
    </>
  )
}

export default StoreOwnerDashboard;
