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

    const baseUrl = "https://eeab-2409-4050-2d9f-9a98-b592-1a65-19db-1529.in.ngrok.io"
    const getToken = `${baseUrl}/api/getdicountcodes`
    const getDemo = `${baseUrl}/customapi/test`
    const getWithServer = "https://localhost:3000/getcopons";

    const data = await fetch(getWithServer,{
      method:"GET",
      headers:{
          "Content-Type": "application/json",
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