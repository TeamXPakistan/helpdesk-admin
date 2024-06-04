import { Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { OrderProduct } from "@ts-types/generated"
import { formatPrice } from "@utils/products"


type PropType = {
    product: OrderProduct
}

const OrderDetailsSimpleProduct = ({ product }: PropType) => {
    const { image, productName, prize, quantity, specialInstruction } = product;

    return (
        <Box sx={{ border: `1px solid rgba(21, 1, 1, 0.16)`, borderRadius: "6px", pb: 3, mb: 3 }}>
            <ListItem>

                <ListItemAvatar sx={{ display: 'flex', '& img': { my: 1.25, mx: 3.25 } }}>
                    <img height={70} src={image} alt='Google Home' />
                </ListItemAvatar>

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={8}>
                        <ListItemText primaryTypographyProps={{ fontWeight: "bold", fontSize: 16 }} primary={productName} />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 1 }}>Qty:</Typography>
                            <Typography
                                sx={{ mr: 4, color: 'primary.main', textDecoration: 'none' }}
                            >
                                {quantity} x {formatPrice(prize / quantity)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={4}
                        xs={12}
                        sx={{ display: 'flex', alignItems: { xs: 'start', sm: "center" }, flexDirection: "column", justifyContent: 'center' }}
                    >
                        <Typography sx={{ color: 'text.main', fontWeight: "bold" }}>Product Total</Typography>
                        <Typography sx={{ color: 'primary.main' }}>{formatPrice(prize)}</Typography>
                    </Grid>
                </Grid>
            </ListItem>
            {specialInstruction &&
                <Box sx={{ display: "flex", flexDirection: "column", px: 4 }}>
                    <Typography sx={{ color: 'text.main', fontWeight: "bold", mr: 2 }}>Special Instruction: </Typography>
                    <Typography sx={{ color: 'text.main' }}>{specialInstruction}</Typography>
                </Box>
            }
        </Box>
    )
}


export default OrderDetailsSimpleProduct;


