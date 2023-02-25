import {useEffect, useState} from 'react';
import {
  extend,
  render,
  useExtensionInput,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Text,
  TextContainer,
  Separator,
  Tiles,
  TextBlock,
  Layout,
} from '@shopify/post-purchase-ui-extensions-react';

extend('Checkout::PostPurchase::ShouldRender', async ({storage}) => {
  const postPurchaseOffer = {
    "data":"this is datapostPurchaseOffer"
  }

  await storage.update(postPurchaseOffer);

  return {render: true};
});

render('Checkout::PostPurchase::Render', () => <App />);

export function App() {
  const {
    storage,
    inputData,
    calculateChangeset,
    applyChangeset,
    done,
  } = useExtensionInput();
  const [calculatedPurchase, setCalculatedPurchase] = useState();

  useEffect(() => {
    console.log("Use effect");
    console.log(inputData);
    console.log(shop);
  }, []);

  return (
    <BlockStack spacing="loose">
            <Text size="medium" emphasized>
              It&#39;s not too late to add this to your order
            </Text>

            <Button onPress={() => {
              console.log("done");
              done();
            }}>
              Done Done
            </Button>

            <Button onPress={() => {
              console.log("Get data");
              console.log(inputData);
              console.log(shop);
            }}>
              get Data
            </Button>
       
    </BlockStack>
  );
}
