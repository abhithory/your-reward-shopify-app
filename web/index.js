// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
// const cors = require('cors');
import cors from "cors";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import router from "./routes/index.js";
import { GET_DISCOUNT_COPONS_QUERY } from "./routes/queries.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

app.use(cors())


// another route


router.post("/test/auth", async (req, res) => {

  console.log("/api/getDiscountCopons");

  const { shop } = req.headers;

  const shopOffline = shopify.api.session.getOfflineId(String(shop)); // offline_shop
  let session = await shopify.config.sessionStorage.loadSession(shopOffline); //session

  const client = new shopify.api.clients.Graphql({
    session
  });
  const discounts = await client.query({
    data: {
      query: GET_DISCOUNT_COPONS_QUERY,
      variables: {
        first: 25,
      },
    },
  });

  console.log('====================================');
  console.log(discounts.body.data);
  console.log('====================================');
  return res.status(200).json({
    data: discounts.body.data
  });
});

// Set up Shopify authentication and webhook handling

app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());
app.use(router);

app.use(serveStatic(STATIC_PATH, { index: false }));
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
