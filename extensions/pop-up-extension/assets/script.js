

const buttonClick = document.querySelector("#click-button");

document.querySelector("#click-button").addEventListener("click", async function () {
  console.log('====================================');
  console.log(window.Shopify.shop);
  console.log('====================================');


  const url = "https://bb73-2409-4052-2ea8-32c-e5bb-265a-c528-13df.in.ngrok.io" + "/test/auth"
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "skip",
      shop: window.Shopify.shop
    },
  });

  console.log('====================================');
  console.log(await response.json());
  console.log('====================================');

})