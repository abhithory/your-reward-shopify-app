import { Router } from "express";
import { CREATE_DISCOUNT_COUPON, GET_DISCOUNT_COPONS_QUERY } from "./queries.js";
import shopify from "../shopify.js";

const router = Router();


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}





router.get("/api/testing", async (req, res) => {
    console.log("/api/testing");
    return res.status(200).json({
        data: "Succefully called API"
    });
});


router.get("/api/getScriptTags", async (req, res) => {
    console.log("/api/getScriptTags");
    const tags = await shopify.rest.ScriptTag.all({
        session: res.locals.shopify.session,
    });
    return res.status(200).json({
        data: tags.body.data,
    });
});

router.post("/api/createScriptTags", async (req, res) => {
    console.log("/api/createScriptTags");

    const script_tag = new shopify.rest.ScriptTag({
        session: res.locals.shopify.session,
    });
    script_tag.event = "onload";
    script_tag.src = "https://cdn.nector.io/nector-static/no-cache/reward-widget/mainloader.min.js";
    const response = await script_tag.save({
        update: true,
    });

    return res.status(200).json({
        data: response,
    });
});




router.get("/api/getDiscountCopons", async (req, res) => {

    console.log("/api/getDiscountCopons");

    const client = new shopify.api.clients.Graphql({
        session: res.locals.shopify.session,
    });
    const discounts = await client.query({
        data: {
            query: GET_DISCOUNT_COPONS_QUERY,
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

    const { discountAmount, discountCode } = req.body;
    const client = new shopify.api.clients.Graphql({
        session: res.locals.shopify.session,
    });
    const date = new Date();
    const variable = {
        "basicCodeDiscount": {
            "usageLimit": 1,
            "appliesOncePerCustomer": true,
            "title": "your reward Discount testing",
            "code": discountCode,  // `YourReward${makeid(8)}`,
            "startsAt": date.toISOString(),
            // "endsAt": "2022-09-21T00:00:00Z",
            "customerSelection": {
                "all": true,
                // "customers": {
                //     "add": [
                //         ""
                //     ]
                // }
            },
            "customerGets": {
                "value": {
                    "discountAmount": {
                        "amount": Number(discountAmount),
                        "appliesOnEachItem": false
                    }
                },
                "items": {
                    "all": true
                }
            }
        }
    }
    try {

        const result = await client.query({
            data: {
                "query": CREATE_DISCOUNT_COUPON,
                "variables": variable,
            },
        });
        return res.status(200).json({
            data: result.body.data.discountCodeBasicCreate,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            data: error,
        });
    }
});

export default router;
