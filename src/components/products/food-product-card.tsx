import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'
import { Product } from '@ts-types/generated'
import { useRouter } from 'next/router'
import { FoodProductTypes } from '@utils/constants'
import { formatPrice } from '@utils/products'


type PropTypes = {
    product: Product;
    clickable?: boolean
}

const FoodProductCard = ({ product, clickable = true }: PropTypes) => {
    const { name, price, salePrice, description, isEnabled, images, _id, sold, productType, minPrice, maxPrice } = product;
    const router = useRouter()

    return (
        <Card sx={{ cursor: "pointer" }} onClick={() => clickable ? router.push(`${router.asPath}/edit/${_id}`) : null}>
            <CardMedia sx={{ height: '14.5625rem' }} image={images[0]} />
            <CardContent>
                <Typography variant='h5' sx={{ mb: 2, display: "Flex", justifyContent: "space-between", alignItems: "start" }} >
                    {name}
                    {isEnabled ? <Chip label='Enabled' color='success' size='small' /> : <Chip label='Disabled' color='error' size='small' />}
                </Typography>

                <Typography noWrap sx={{ mb: 3.5, color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography sx={{ fontWeight: 500, mb: 3 }}>
                    Sold: {' '}
                    <Box component='span' sx={{ fontWeight: 'bold', }}>
                        {sold}
                    </Box>
                </Typography>

                {productType === FoodProductTypes.variation ?
                    <Typography sx={{ fontWeight: 500, mb: 3, display: "flex" }}>
                        Price: {' '}
                        <Box component='span' sx={{ fontWeight: 'bold', ml: 1, display: "flex" }}>
                            {/* &nbsp;{minPrice}&nbsp; - &nbsp;{formatPrice(maxPrice)} */}
                            <Typography sx={{ fontWeight: 'bold', }}>{maxPrice ? minPrice : formatPrice(minPrice)}</Typography>
                            {maxPrice && <Typography sx={{ ml: 1, fontWeight: 'bold' }}> - {formatPrice(maxPrice)}</Typography>}
                        </Box>
                    </Typography>
                    :
                    <Typography sx={{ fontWeight: 500, mb: 3 }}>
                        Price: {' '}
                        {salePrice ?
                            <>
                                <Box component='span' sx={{ fontWeight: 'semi-bold', color: "red", textDecoration: "line-through" }}>
                                    &nbsp;{price}&nbsp;
                                </Box>
                                <Box component='span' sx={{ fontWeight: 'bold' }}>
                                    &nbsp;&nbsp;{formatPrice(salePrice)}
                                </Box>
                            </>
                            :
                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                {formatPrice(price)}
                            </Box>
                        }
                    </Typography>
                }

            </CardContent>
        </Card>
    )
}

export default FoodProductCard
