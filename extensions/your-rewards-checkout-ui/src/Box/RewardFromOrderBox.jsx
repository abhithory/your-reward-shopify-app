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
  

export default function RewardFromOrder() {
    const [tokenUserWillGet, setTokenUserWillGet] = useState(55);
    const userTotalAmount = useTotalAmount();
    const storeDetails = useShop(); // store details - domain, name
    const appliedDiscountCopons = useDiscountCodes(); // all discount copons applied
    const applyCoponCode = useApplyDiscountCodeChange(); // apply discount copons
    // await applyCoponCode("copon");

    const sessionToken = useSessionToken();
    // const access_token = await sessionToken.get();  

    return (
        <View border="base" padding="base">
            <Heading>Use our Loyalty program for getting Discount</Heading>
            <Heading>Total Points you will get from this order: {userTotalAmount?.amount}</Heading>
            <Heading>Value of your tokens: {userTotalAmount?.currencyCode}{tokenUserWillGet / 4}</Heading>
            <Text size="small">You get 1 token for order of {userTotalAmount?.currencyCode}1</Text>
        </View>
    )
}
