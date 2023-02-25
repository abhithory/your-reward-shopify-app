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
import { CallApiFromShopifyApp, CallApiYourTokenServer } from '../helper/ApiCalls.js';

export default function ApplyDiscountBox() {
  const [loadingData, setLoadingData] = useState(true);
  const [storeCompleteDetail, setStoreCompleteDetail] = useState(null); // store app backend url, loyalty program details (value, total points, )
  const [userDetails, setUserDetails] = useState(null); // user loyalty points, (any unused copons that is generated);
  const [isLogin, setIsLogin] = useState(true);
  const shopeinfo = useShop(); // store details - domain, name


  const userTotalAmount = useTotalAmount();
  const applyCoponCode = useApplyDiscountCodeChange(); // apply discount copons
  const sessionToken = useSessionToken();


  const applyDiscountCode = async function () {
    /// here call yourtoken backend and send access token their and then their call shopify app backend for changing.
    // for getting backend url -> first setup frontend and their set a system for 
    const access_token = await sessionToken.get()

    // const discountCoponsData  = await CallApiFromShopifyApp("/api/getDiscountCopons", "GET",access_token);
    const body = {
      customer: "useremail",
      discountAmount: 55
    }
    const copounGeneratedData = await CallApiFromShopifyApp("/api/createDiscountCopon", "POST", access_token, body);
    const generatedCoponCode = copounGeneratedData.data.codeDiscountNode.codeDiscount.codes.nodes[0].code;
    await applyCoponCode({ type: "addDiscountCode", code: generatedCoponCode });
  }


  const loadUserDetails = async function () {

  }

  const loadStoreDetails = async function () {
    // await CallApiYourTokenServer

  }
  const loadDetails = async function () {
    await loadStoreDetails();
    await loadUserDetails();
  }

  useEffect(() => {
    loadDetails();
  }, [shopeinfo]);


  return (
    <BlockStack>

      {userDetails ?
        // user is login
        <>
          <Text size="medium">You have 55 YT points</Text>
          <Button onPress={applyDiscountCode}>
            Apply Max Discount with Yt Points
          </Button>
          <Text size="medium">Cutomize Discount</Text>
        </>
        :
        // user not login
        <Link
          overlay={
            <Modal padding title="You are not logined in Your token">
              <BlockLayout>
                <Text size="medium">{isLogin ?"Login":"Signup"} in your YourToken account</Text>
                {!isLogin &&
                    <TextField type='text' label="Enter your Full Name" />
                }
                    <TextField type='email' label="Enter your email" />
                    <TextField email='password' label="Enter Password" />
                <Button>
                {isLogin ?"Login":"Signup"}
                </Button>

                <Link onPress={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Don't Have Your token account" : "Already have your token account"}
                </Link>


              </BlockLayout>
            </Modal>
          }
        >
          <Button onPress={applyDiscountCode}>
            Apply Max Discount with Yt Points
          </Button>
        </Link>
      }

    </BlockStack>
  );
}