import { Grid, Typography } from "@mui/material";
import { AdminDashboardAnalyticsFilterBy } from "@utils/constants";
import { useState } from "react";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useAdminAnalyticsQuery } from "@data/analytics/admin-analytics-query";
import EcommerceStatistics from "./analytics/ecommerce-statistics";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { MenuItem } from '@mui/material'
import EarningsBarChart from "./analytics/orders-earnings-bar-chart";
import ParcelsEarningsBarChart from "./analytics/parcels-earnings-bar-chart";


const StoreOwnerDashboard = () => {

  const [filter, setFilter] = useState<AdminDashboardAnalyticsFilterBy>(AdminDashboardAnalyticsFilterBy.YEARLY);



  const { data: analytics, isLoading: loadingAnalytic, error } = useAdminAnalyticsQuery({
    filterBy: filter as AdminDashboardAnalyticsFilterBy
  })

  const onFilterChange = (value: AdminDashboardAnalyticsFilterBy) => {
    setFilter(value);
  }

  // react component 
  if (loadingAnalytic) return <Spinner />
  if (error) return <CustomError errorMsg={error?.message} />
  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h4' sx={{ color: "text.primary" }}>
            System Overview
          </Typography>

          <CustomTextField1
            select
            sx={{ pr: 0, pt: 0, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
            SelectProps={{
              displayEmpty: true,
              value: filter,
              onChange: e => onFilterChange(e?.target?.value as AdminDashboardAnalyticsFilterBy)
            }}
          >
            <MenuItem disabled value=''>Filter By</MenuItem>
            <MenuItem value={AdminDashboardAnalyticsFilterBy.TODAY}>Today</MenuItem>
            <MenuItem value={AdminDashboardAnalyticsFilterBy.WEEKLY}>Weekly</MenuItem>
            <MenuItem value={AdminDashboardAnalyticsFilterBy.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={AdminDashboardAnalyticsFilterBy.YEARLY}>Yearly</MenuItem>
          </CustomTextField1>

        </Grid>

        <Grid item xs={12}>
          <EcommerceStatistics
            analytics={analytics}
          />
        </Grid>

        <Grid item xs={12}>
          <EarningsBarChart analytics={analytics} />
        </Grid>

        <Grid item xs={12}>
          <ParcelsEarningsBarChart analytics={analytics} />
        </Grid>

      </Grid>
    </>
  )
}

export default StoreOwnerDashboard;
