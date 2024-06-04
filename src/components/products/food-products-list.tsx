import Grid from '@mui/material/Grid'
import { IPaginatorInfo, Product } from '@ts-types/generated'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/system';
import FoodProductCard from './food-product-card';


type PropTypes = {
    products: Product[]
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const FoodProductsList = ({ products, onPaginationChange, paginatorInfo }: PropTypes) => {
    return (<>
        <Box sx={{ minHeight: "75vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Grid container spacing={6} sx={{ mb: 10 }}>
                {
                    products.map((product: Product) => {
                        return (
                            <Grid item key={product?._id} xs={12} sm={6} md={4} lg={3}>
                                <FoodProductCard product={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {paginatorInfo.totalPages > 1 &&
                <Stack
                    spacing={2}
                    sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', mb: 5 }}
                >
                    <Pagination
                        color="primary"
                        count={paginatorInfo.totalPages}
                        page={paginatorInfo.page}
                        onChange={onPaginationChange}
                    />
                </Stack>
            }
        </Box>
    </>
    )
}

export default FoodProductsList
