import React from 'react';

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
import CallApi from '../helper/ApiCalls';

export default function ApplyDiscountBox() {
  const applyCoponCode = useApplyDiscountCodeChange(); // apply discount copons
  const sessionToken = useSessionToken();


  const applyDiscountCode = async function () {
    const access_token = await sessionToken.get()

    // const discountCoponsData  = await CallApi("/api/getDiscountCopons", "GET",access_token);
    const body = {
      customer:"usermeail", 
      discountAmount:55
    }
    const copounGeneratedData  = await CallApi("/api/createDiscountCopon", "POST",access_token,body);
    console.log("discountCoponsData new");
    const generatedCoponCode = copounGeneratedData.data.codeDiscountNode.codeDiscount.codes.nodes[0].code;
    console.log(generatedCoponCode);
    await applyCoponCode({ type: "addDiscountCode", code: generatedCoponCode });
  }

  return (
    <BlockStack>
      <Text size="medium">You have 55 YT points</Text>
      {/* <Link
        overlay={
          <Modal padding title="Apply Discount with Loyaly points">
            <ModelContent />
          </Modal>
        }
      > */}
      <Button onPress={applyDiscountCode}>
        Apply Discount with Yt Points
      </Button>

      <Text size="medium">Cutomize Discount</Text>

      {/* </Link> */}
    </BlockStack>
  );
}