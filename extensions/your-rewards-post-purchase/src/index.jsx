import { useEffect, useState } from 'react';
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

extend('Checkout::PostPurchase::ShouldRender', async ({ storage }) => {
  // const postPurchaseOffer = {
  //   "data": "this is datapostPurchaseOffer"
  // }
  // await storage.update(postPurchaseOffer);

  const render = true;
  console.log('====================================');
  console.log("Here we can set render true false");
  console.log('====================================');

  return { render };
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
  const [pointsGenerated, setPointsGenerated] = useState(null);
  const [isUserLogedin, setIsUserLogedin] = useState(null);

  async function checkIsUserLogined() {
    // featch api for checking user is logined or not


    const reponse = {
      isUserLogin: true,
      otheruserDetails: {}
    }
    setTimeout(() => {
      setIsUserLogedin(reponse.isUserLogin);
      if (reponse.isUserLogin) giveRewardToUser();
    }, 5000);

  }

  async function giveRewardToUser() {

    const body = {
      orderReferanceId: inputData.initialPurchase.referenceId,
      shopDomain: inputData.shop.domain,
      orderPriceData: inputData.initialPurchase.totalPriceSet.shopMoney,  // {amount,currencyCode}
      shopifyToken: inputData.token
    }
    // console.log(body);


    // callApiForGeneratingTokens
    const reponse = {
      pointsGenerated: body.orderPriceData.amount / 10,
      userTotalPoints: body.orderPriceData.amount / 10 + 1201
    }

    console.log('====================================');
    console.log("generating points");
    console.log('====================================');

    setTimeout(() => {
      setPointsGenerated(reponse);
      // done();
    }, 5000);
  }

  useEffect(() => {
    setIsUserLogedin(null)
    setPointsGenerated(null)
    console.log("Use effect");
    checkIsUserLogined();
  }, [inputData]);

  return (
    <BlockStack spacing="loose">


      <Text size="medium" emphasized>
        {isUserLogedin === null ? "We are checking user details" : (isUserLogedin === false ? "You are not logedin in our loyalty program." : "Thanks for using our loyalty program")}
      </Text>

      {pointsGenerated ?
        <>
          <Text size="medium" emphasized>
            You earned {pointsGenerated?.pointsGenerated} YT token From this order;
          </Text>
          <Text size="medium" emphasized>
            Now you total Points {pointsGenerated?.userTotalPoints} YT 😈
          </Text>
          <Button onPress={() => {
            done();
          }}>
            Go to Order Status Page
          </Button>
          <Text size="small" emphasized>
            You will automatically redirected to Next page after 5 secounds
          </Text>
        </>
        :
        (isUserLogedin === null || isUserLogedin === true ?
          <>
            <Text size="medium" emphasized>
              Loading...
            </Text>
            <Text size="medium" emphasized>
              Wait one secound Please. we are generating loyalty points for you.
            </Text>
          </>
          :
          (isUserLogedin === false &&
            <>

              <Text size="medium" emphasized>
                So, you can't get 255 loyalty points for this purchase.
              </Text>
              <Text size="medium" emphasized>
                Login Nexttime for getting Loyalty Points
              </Text>
              <Button onPress={() => {
            done();
          }}>
            Go to Order Status Page
          </Button>
            </>
          )
        )
      }



    </BlockStack >
  );
}
