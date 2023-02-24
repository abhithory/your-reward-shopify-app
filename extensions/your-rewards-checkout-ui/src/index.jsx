import React from 'react';
import { useEffect } from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
  useSessionToken,
  useShop
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const translate = useTranslate();
  const sessionToken = useSessionToken();
  const shop = useShop();


  useEffect(async () => {
    console.log('===============data fetching from backend=====================');
    const access_token = await sessionToken.get()
    console.log(access_token);

    const baseUrl = "https://250e-2405-204-348f-897f-89ff-2da3-fc07-c027.in.ngrok.io"
    const getDiscounts = `${baseUrl}/api/getdicountcodes`

    const data = await fetch(getDiscounts,{
      method:"GET",
      headers:{
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning":"skip",
          // 'Authorization': `Bearer ${access_token}`
      }
    })

    try {
      console.log('===============data=====================');
      console.log(data);
      console.log(await data.text());
      console.log('====================================');
    } catch (error) {
      console.log('===============error=====================');
      console.log(error);
      console.log();
      console.log('====================================');
    }
  }, [])
  
  return (
    <Banner title="your-rewards-checkout-ui">
      {translate('welcome', {extensionPoint})}
    </Banner>
  );
}