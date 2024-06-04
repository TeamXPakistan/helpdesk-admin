import { Maybe, OrderFoodVariation } from "@ts-types/generated";

export function formatPrice(price: Maybe<number>): string {
    const currencyCode = process.env.NEXT_PUBLIC_CURRENCY;
    const roundedPrice = typeof price !== "number" ? Number(price).toFixed(2) : price?.toFixed(2)
    const formattedPrice = `${roundedPrice} ${currencyCode}`;
    return formattedPrice;
}

export const variations_options_total_for_order = (variations: OrderFoodVariation[] | null) => {
    let sum: number = 0
    variations?.forEach((variation) => {
        variation.options.forEach((option) => {
            sum += option.price;
        })
    });
    return sum
}