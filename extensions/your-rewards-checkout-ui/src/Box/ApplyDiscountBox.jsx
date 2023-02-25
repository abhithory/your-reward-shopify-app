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
  const [userStoreDetails, setUserStoreDetails] = useState(null)
  const [isLoginModel, setIsLoginModel] = useState(true);
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

  const loadDetails = async function () {
    setLoadingData(true)
    // await CallApiYourTokenServer
    const response = {
      isUserLogin: false,
      userTotalTokens: 1200,
      isStoreConnected: true,
      percentTokenUserGetFromOrderAmount: 15,
      maxTokensUserCanGetFromTransaction: 400,
      maxTokensCanUseInOneOrder: 600,
      tokenSymbol: "YT",
      oneINRfromTokens: 50,
    };
    // setTimeout(() => {
      setLoadingData(false)
      setUserStoreDetails(response);
    // }, 1000);
  }

  async function loginSignup(e){
    e.preventDefault();
    
  }

  useEffect(() => {
    loadDetails();
  }, [shopeinfo]);


  return (
    <BlockStack>
      {loadingData ?
        <Text size="medium">Loading.... add scrollbar</Text>
        :
        userStoreDetails?.isStoreConnected &&
        <>
          {userStoreDetails?.isUserLogin ?
            <>
              <Text size="medium">You  have {userStoreDetails?.userTotalTokens} {userStoreDetails?.tokenSymbol} points</Text>
              <Button onPress={applyDiscountCode}>
                Apply Max Discount with {userStoreDetails?.tokenSymbol} Points
              </Button>
              <Text size="small">Cutomize Discount</Text>
            </>
            :
            <Link
              overlay={
                <Modal padding title="You are not logined in Your token">
                  <BlockLayout>
                    <Text size="medium">{isLoginModel ? "Login" : "Signup"} in your YourToken account</Text>
                    {!isLoginModel &&
                      <TextField type='text' label="Enter your Full Name" />
                    }
                    <TextField type='email' label="Enter your email" />
                    <TextField email='password' label="Enter Password" />
                    <Button>
                      {isLoginModel ? "Login" : "Signup"}
                    </Button>

                    <Link onPress={() => setIsLoginModel(!isLoginModel)}>
                      {isLoginModel ? "Don't Have Your token account" : "Already have your token account"}
                    </Link>


                  </BlockLayout>
                </Modal>
              }
            >
              <Button onPress={applyDiscountCode}>
                Apply Discount with {userStoreDetails?.tokenSymbol} Points
              </Button>
            </Link>
          }
        </>
      }

    </BlockStack>
  );
}