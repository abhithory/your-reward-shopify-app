import {
    useSessionToken,
} from '@shopify/checkout-ui-extensions-react';



export default async function CallApi(urlEndpoint = "/api/getdicountcodes", method = "GET", body) {
    console.log('===============data fetching from apps backend=====/api/getdicountcodes================');
    const sessionToken = useSessionToken();
    const access_token = await sessionToken.get()
    const baseUrl = "https://250e-2405-204-348f-897f-89ff-2da3-fc07-c027.in.ngrok.io";
    const finalURL = `${baseUrl}${urlEndpoint}`
    const response = await fetch(finalURL, {
        method,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip",
            // 'Authorization': `Bearer ${access_token}`
        }
    },
        body
    );
    if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data);
    } else {
        console.log(error);
        throw new Error("Error while featching data from app's  backend");
    }
    return data;
}
