import { Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { OrderProduct } from "@ts-types/generated"
import { formatPrice, variations_options_total_for_order } from "@utils/products"


type PropType = {
    product: OrderProduct
}

const OrderDetailsVariableProduct = ({ product }: PropType) => {
    const { image, productName, quantity, specialInstruction, veriations } = product;

    const variationsTotal: number = variations_options_total_for_order(veriations);

    return (
        <Box sx={{ border: `1px solid rgba(21, 1, 1, 0.16)`, borderRadius: "6px", pb: 3, mb: 3 }}>
            <ListItem sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                <ListItemAvatar sx={{ display: 'flex', '& img': { my: 1.25, mx: 3.25 }, mb: { xs: 5, sm: 0 } }}>
                    <img height={70} src={image} alt='Google Home' />
                </ListItemAvatar>

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={8}>
                        <ListItemText primaryTypographyProps={{ fontWeight: "bold", fontSize: 16 }} primary={`${productName}`} />
                        <Typography sx={{ mr: 1, textDecoration: "underline", mb: 1, fontWeight: "bold" }}>Variations</Typography>

                        {/* VARIATION OPTIONS  */}
                        {
                            veriations?.map((variation, index) => {
                                return variation.options?.map((option) => {
                                    return (<>
                                        <Box sx={{ display: "flex", mb: 2, justifyContent: "start" }} key={index}>
                                            <Typography sx={{ mr: 1, display: "flex", alignItems: "center", gap: 1 }}>
                                                <Box style={{ display: "inline-block", width: "5px", height: "5px", backgroundColor: "black", borderRadius: "100%" }}></Box>
                                                {option.name ?? "-"}:
                                            </Typography>
                                            <Typography sx={{ mr: 4, color: 'primary.main', textDecoration: 'none' }}>
                                                {option.price ?? "-"}
                                            </Typography>
                                        </Box >
                                    </>)
                                })
                            })
                        }

                        <br />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 1, fontWeight: "bold" }}>Qty: </Typography>
                            <Typography sx={{ mr: 4, color: 'primary.main', textDecoration: 'none' }}>
                                {quantity} x {formatPrice(variationsTotal)}
                            </Typography>
                        </Box>

                    </Grid>

                    {/* PRODUCT TOTAL  */}
                    <Grid
                        item
                        sm={4}
                        xs={12}
                        sx={{ display: 'flex', alignItems: { xs: 'start', sm: "center" }, flexDirection: "column", justifyContent: 'center' }}
                    >
                        <Typography sx={{ color: 'text.main', fontWeight: "bold" }}>Product Total</Typography>
                        <Typography sx={{ color: 'primary.main' }}>{formatPrice(quantity * variationsTotal)}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            {/* SPECIAL INSTRUCTIONS  */}
            {
                specialInstruction &&
                <Box sx={{ display: "flex", flexDirection: "column", px: 4 }}>
                    <Typography sx={{ color: 'text.main', fontWeight: "bold", mr: 2 }}>Special Instruction: </Typography>
                    <Typography sx={{ color: 'text.main' }}>{specialInstruction}</Typography>
                </Box>
            }
        </Box >
    )
}


export default OrderDetailsVariableProduct;


