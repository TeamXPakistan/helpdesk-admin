import { Grid, Typography } from "@mui/material";
import { AdminDashboardAnalyticsFilterBy } from "@utils/constants";
import { useState } from "react";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useAdminAnalyticsQuery } from "@data/analytics/admin-analytics-query";
import EcommerceStatistics from "./analytics/ecommerce-statistics";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { MenuItem } from '@mui/material'
import { AdminAnalytics } from "@ts-types/generated";
import EarningsBarChart from "./analytics/orders-earnings-bar-chart";
import ParcelsEarningsBarChart from "./analytics/parcels-earnings-bar-chart";


const AdminDashboardHd = () => {

  const analytics: AdminAnalytics =
    [
      {
        "_id": "dfd",
        "totalEarning": 1500000,
        "totalParcelsEarning": 500000,
        "totalOrdersEarning": 1000000,
        "totalOrders": 2500,
        "totalParcels": 1500,
        "totalUsers": 2000,
        "totalHealths": 300,
        "totalHomeBase": 400,
        "totalGroceryStores": 500,
        "totalResturants": 600,
        "totalDrivers": 700,
        "totalMerchants": 800,
        "totalCancilOrders": 100,
        "earlyOrdersEarningBarChart": [
          { "_id": { "month": "Jan" }, "subTotal": 5340 },
          { "_id": { "month": "Feb" }, "subTotal": 6340 },
          { "_id": { "month": "Mar" }, "subTotal": 7033 },
          { "_id": { "month": "Apr" }, "subTotal": 2880 },
          { "_id": { "month": "May" }, "subTotal": 9340 },
          { "_id": { "month": "Jun" }, "subTotal": 1030 },
          { "_id": { "month": "Jul" }, "subTotal": 1940 },
          { "_id": { "month": "Aug" }, "subTotal": 12304 },
          { "_id": { "month": "Sep" }, "subTotal": 13430 },
          { "_id": { "month": "Oct" }, "subTotal": 14440 },
          { "_id": { "month": "Nov" }, "subTotal": 13540 },
          { "_id": { "month": "Dec" }, "subTotal": 1640 }
        ],
        "earlyParcelsEarningBarChart": [
          { "_id": { "year": "2001", "month": "Jan" }, "subTotal": 4443 },
          { "_id": { "year": "2003", "month": "Feb" }, "subTotal": 6334 },
          { "_id": { "year": "2005", "month": "Mar" }, "subTotal": 7043 },
          { "_id": { "year": "2006", "month": "Apr" }, "subTotal": 8460 },
          { "_id": { "year": "2007", "month": "May" }, "subTotal": 2280 },
          { "_id": { "year": "2009", "month": "Jun" }, "subTotal": 4990 },
          { "_id": { "year": "2011", "month": "Jul" }, "subTotal": 9390 },
          { "_id": { "year": "2013", "month": "Aug" }, "subTotal": 12890 },
          { "_id": { "year": "2015", "month": "Sep" }, "subTotal": 1330 },
          { "_id": { "year": "2017", "month": "Oct" }, "subTotal": 14630 },
          { "_id": { "year": "2019", "month": "Nov" }, "subTotal": 1530 },
          { "_id": { "year": "2021", "month": "Dec" }, "subTotal": 3990 }
        ]
      },
      {
        "_id": "dfd",
        "totalEarning": 434,
        "totalParcelsEarning": 5045540000,
        "totalOrdersEarning": 100340000,
        "totalOrders": 44,
        "totalParcels": 1500,
        "totalUsers": 200440,
        "totalHealths": 4,
        "totalHomeBase": 40440,
        "totalGroceryStores": 44,
        "totalResturants": 6040,
        "totalDrivers": 7004,
        "totalMerchants": 8400,
        "totalCancilOrders": 1400,
        "earlyOrdersEarningBarChart": [
          { "_id": { "month": "January" }, "subTotal": 50 },
          { "_id": { "month": "February" }, "subTotal": 60 },
          { "_id": { "month": "March" }, "subTotal": 70 },
          { "_id": { "month": "April" }, "subTotal": 80 },
          { "_id": { "month": "May" }, "subTotal": 90 },
          { "_id": { "month": "June" }, "subTotal": 100 },
          { "_id": { "month": "July" }, "subTotal": 110 },
          { "_id": { "month": "August" }, "subTotal": 120 },
          { "_id": { "month": "September" }, "subTotal": 130 },
          { "_id": { "month": "October" }, "subTotal": 140 },
          { "_id": { "month": "November" }, "subTotal": 150 },
          { "_id": { "month": "December" }, "subTotal": 160 }
        ],
        "earlyParcelsEarningBarChart": [
          { "_id": { "year": "January", "month": "January" }, "subTotal": 50 },
          { "_id": { "year": "January", "month": "February" }, "subTotal": 60 },
          { "_id": { "year": "January", "month": "March" }, "subTotal": 70 },
          { "_id": { "year": "January", "month": "April" }, "subTotal": 80 },
          { "_id": { "year": "January", "month": "May" }, "subTotal": 90 },
          { "_id": { "year": "January", "month": "June" }, "subTotal": 100 },
          { "_id": { "year": "January", "month": "July" }, "subTotal": 110 },
          { "_id": { "year": "January", "month": "August" }, "subTotal": 120 },
          { "_id": { "year": "January", "month": "September" }, "subTotal": 130 },
          { "_id": { "year": "January", "month": "October" }, "subTotal": 140 },
          { "_id": { "year": "January", "month": "November" }, "subTotal": 150 },
          { "_id": { "year": "January", "month": "December" }, "subTotal": 160 }
        ]
      },
    ]


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} className="overview-card-rim">
          <Typography sx={{ color: "text.primary" }} variant='h4' className='dashboard-heading-rim'>
            Overview
          </Typography>
          <Grid item xs={12}>
            <EcommerceStatistics
              analytics={analytics}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <EarningsBarChart analytics={analytics} />
        </Grid>
        <Grid item xs={6}>
          <ParcelsEarningsBarChart analytics={analytics} />
        </Grid>

        {/* <Grid item xs={12}>
          <EarningsBarChart analytics={analytics} />
        </Grid>

        <Grid item xs={12}>
          <ParcelsEarningsBarChart analytics={analytics} />
        </Grid> */}

      </Grid>
    </>
  )
}

export default AdminDashboardHd;