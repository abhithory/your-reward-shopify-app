import React from 'react';
import { useState } from 'react';

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
    const [storeCompleteDetail, setStoreCompleteDetail] = useState(null); // store app backend url, loyalty program details (value, total points, )
    const [userDetails, setUserDetails] = useState(null); // user loyalty points, (any unused copons that is generated)

    const userTotalAmount = useTotalAmount();
    const shopeinfo = useShop(); // store details - domain, name

    // const sessionToken = useSessionToken();
    // const access_token = await sessionToken.get();  



    const loadUserDetails = async function () {
        // CallApiYourTokenServer
    }

    // const loadStoreDetails = async function () {

    // }
    // const loadDetails = async function () {

    // }

    useEffect(() => {
        loadUserDetails();
    }, [shopeinfo]);

    return (
        <View border="base" padding="base">
            {userDetails?
            <>
            <Heading>You are already logined. Apply discount on this order from you loyalty points. </Heading>
            <Heading>Cruntly you Have 222 YT tokens. of value {userTotalAmount?.currencyCode} 22.2</Heading>
            </>
            :
            <Heading>Use our Loyalty program for getting Discount</Heading>
            }
            <Heading>Total Points you will get from this order: {userTotalAmount?.amount}</Heading>
            <Heading>Value of your tokens: {userTotalAmount?.currencyCode}{tokenUserWillGet / 4}</Heading>
            <Text size="small">You get 1 token for order of {userTotalAmount?.currencyCode}1</Text>
        </View>
    )
}
