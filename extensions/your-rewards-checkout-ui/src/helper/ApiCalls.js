
async function CallApiFromShopifyApp(urlEndpoint = "/api/getdicountcodes", method = "GET",access_token, body) {
    console.log('===============data fetching from apps backend=====/api/getdicountcodes================');
    const baseUrl = "https://f51f-2405-204-348f-897f-9040-d530-eeb2-3723.in.ngrok.io/";
    const finalURL = `${baseUrl}${urlEndpoint}`
    const response = await fetch(finalURL, {
        method,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip",
            'Authorization': `Bearer ${access_token}`
        },
        body:JSON.stringify(body?body:{})
    },
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log(error);
        throw new Error("Error while featching data from app's  backend");
    }
}

async function CallApiYourTokenServer(urlEndpoint = "/api/getdicountcodes", method = "GET",access_token, body) {
    console.log('===============data fetching from apps backend=====/api/getdicountcodes================');
    const baseUrl = "yourtokenbackend";
    const finalURL = `${baseUrl}${urlEndpoint}`
    const response = await fetch(finalURL, {
        method,
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${access_token}`
        },
        body:JSON.stringify(body?body:{})
    },
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log(error);
        throw new Error("Error while featching data from yourtoken server");
    }
}


export {CallApiFromShopifyApp,CallApiYourTokenServer}