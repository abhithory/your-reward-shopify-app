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


  const applyDiscountCode = async function () {

    const discountCoponsData  = await CallApi("/api/getDiscountCopons", "POST");

    console.log("discountCoponsData");
    console.log(discountCoponsData);
    // CallApi("/api/createDiscountCopon")
    // const disocuntToken = "YXG022NQJKB2";
    // console.log(await applyCoponCode({ type: "addDiscountCode", code: disocuntToken }));
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