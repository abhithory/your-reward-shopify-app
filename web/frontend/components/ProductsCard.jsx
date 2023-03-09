import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const handleGetWebhooks = async () => {
    setIsLoading(true);
    console.log('=============handleGetWebhooks ok=======================');
    
    const response = await fetch("/api/getWebhooks");

    if (response.ok) {
      setIsLoading(false);

      console.log('=============response ok=======================');
      console.log(await response.json());
      console.log('====================================');

    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  const handlecreateWebhook = async () => {
    setIsLoading(true);
    console.log('=============createWebhook ok=======================');
    
    const response = await fetch("/api/createWebhook",{
      method:"POST"
    });

    if (response.ok) {
      setIsLoading(false);

      console.log('=============response ok=======================');
      console.log( response);
      console.log(await response.json());
      console.log('====================================');

    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  const handleUpdateWebhooks = async () => {
    setIsLoading(true);
    console.log('=============createWebhook ok=======================');
    
    const response = await fetch("/api/updateWebhook",{
      method:"POST"
    });

    if (response.ok) {
      setIsLoading(false);

      console.log('=============response ok=======================');
      console.log( response);
      console.log(await response.json());
      console.log('====================================');

    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  return (
    <>
      <Button onClick={handlecreateWebhook}>Create Webhook</Button>;
      <Button onClick={handleUpdateWebhooks}>Update Webhook</Button>;
      <Button onClick={handleGetWebhooks}>Get Webhook</Button>;

    </>
  );
}
