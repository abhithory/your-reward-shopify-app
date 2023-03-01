import React from 'react';
import { useState, useEffect } from 'react';

import {
    render,
    TextField,
    InlineStack,
    Text,
    Button,
    Link,
    Modal,
    TextBlock,
    BlockLayout,
    View,
    Heading,
    BlockStack,
    useTotalAmount,
    useShop,
    useApplyDiscountCodeChange,
    useSessionToken,
    useExtensionApi
} from '@shopify/checkout-ui-extensions-react';
import { CallApiYourTokenServer } from '../helper/ApiCalls.js';


export default function RewardFromOrder() {
    const [tokenUserWillGet, setTokenUserWillGet] = useState(55);
    const [details, setDetails] = useState(null); // user loyalty points, (any unused copons that is generated),loyalty program details (value, total points, )

    const userTotalAmount = useTotalAmount();
    const shopeinfo = useShop(); // store details - domain, name

    // const sessionToken = useSessionToken();
    // const access_token = await sessionToken.get();  



    const loadDetails = async function () {
        // CallApiYourTokenServer - get user and brandDetails;

        const response = {
            isUserLogin: true,
            isStoreConnected: true,
            percentTokenUserGetFromOrderAmount: 15,
            maxTokensPerTransaction: 400,
            oneINRfromTokens: 50,
        };

        setTimeout(() => {
            setDetails(response);
        }, 1000);

    }

    const getTokenFromThisOrder = function(){

        const tokensGet = Math.floor((userTotalAmount?.amount) * details.percentTokenUserGetFromOrderAmount / 100)

        return tokensGet < details.maxTokensPerTransaction ? tokensGet : details.maxTokensPerTransaction;

    }

    useEffect(() => {
        loadDetails();
    }, [shopeinfo]);

    return (
        <View border="base" padding="base">
            {details === null ?
                <Heading>Loading...</Heading>
                :
                details?.isStoreConnected &&
                <>
                    {details?.isUserLogin === true ?
                        <>
                            <Heading>You are already logined. Apply discount on this order from you loyalty points. </Heading>
                        </>
                        :
                        <>
                            <Heading>You are NOT logined. Login in our Loyalty Program to get discount</Heading>

                        </>
                    }
                    <Heading>Total Points you will get from this order: {getTokenFromThisOrder()}</Heading>
                </>
            }
        </View>
    )
}
