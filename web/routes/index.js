import { Router } from "express";
import { CREATE_DISCOUNT_COUPON } from "./queries";
const router = Router();


router.get("/api/getDiscountCopons", async (req, res) => {

    const client = new shopify.api.clients.Graphql({
        session: res.locals.shopify.session,
    });
    const discounts = await client.query({
        data: {
            query: DISCOUNTS_QUERY,
            variables: {
                first: 25,
            },
        },
    });

    return res.status(200).json({
        data: discounts.body.data,
    });
});

router.post("/api/createDiscountCopon", async (req, res) => {

    console.log("/api/createDiscountCopon");

    const { customer, discountAmount } = req.body;
    const client = new shopify.api.clients.Graphql({
        session: res.locals.shopify.session,
    });

    console.log(customer, discountAmount);


    return res.status(200).json({
        data: "result",
    });

    

    const variable = {
        "basicCodeDiscount": {
            "usageLimit": 1,
            "appliesOncePerCustomer": true,
            "title": "20% off all items during the summer of 2022",
            // "code": "",
            // "startsAt": "2022-06-21T00:00:00Z",
            // "endsAt": "2022-09-21T00:00:00Z",
            "combinesWith": {
                "orderDiscounts": true,
            },
            "customerSelection": {
                "all": true,
                // "customers": {
                //     "add": [
                //         ""
                //     ]
                // }
            },
            "customerGets": {
                // "appliesOnOneTimePurchase": true,
                "value": {
                    "discountAmount": {
                        "amount": Number(discountAmount),
                        "appliesOnEachItem": false
                    }
                },
                "items": {
                    "all": true
                }
            },
            "minimumRequirement": {
                "quantity": {
                  "greaterThanOrEqualToQuantity": 1
                },
                "subtotal": {
                  "greaterThanOrEqualToSubtotal": 1
                }
              },
        }
    }

    const result = await client.query({
        data: {
            "query": CREATE_DISCOUNT_COUPON,
            "variables": variable,
        },
    });

    return res.status(200).json({
        data: result,
    });

})


export default router;
