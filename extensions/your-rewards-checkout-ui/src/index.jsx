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
import RewardFromOrder from './Box/RewardFromOrderBox.jsx';
import ApplyDiscountBox from './Box/ApplyDiscountBox.jsx';



render('Checkout::Dynamic::Render', () => (
  // <RewardFromOrder />
  <ApplyDiscountBox />

));

// render('Checkout::Reductions::RenderAfter', () => (
//   <ApplyDiscountBox />
// ));



