require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Define site URL here
let URL;
if (process.env.NODE_ENV === 'production') {
  URL = 'https://dresscodecafe.netlify.com/';
} else {
  URL = 'http://localhost:8000';
}

const queries = require('./src/utils/algolia');

module.exports = {
  siteMetadata: {
    title: 'Dress Code Africa',
    description: 'Online Ecommerce for the African Continent',
    author: 'Alex Quasar',
    twitterUsername: '@_dresscode',
    image: '/default.png',
    siteUrl: URL,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-playground`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-emotion`,
    },

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Merienda\:300,500,700`,
          `Sacramento`,
          `Montserrat`,
          `Parisienne`,
        ],
        display: 'swap',
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Roboto`,
    //         subsets: [`100,400,700`],
    //       },
    //       {
    //         family: `Sacramento`,
    //         variants: [`400`, `700`],
    //       },
    //       {
    //         family: `Montserrat`,
    //         variants: [`400`, `700`],
    //       },
    //     ],
    //   },
    // },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `miss.knitsalot`,
      },
    },
    `gatsby-plugin-twitter`,

    // {
    //   resolve: `gatsby-plugin-stripe`,
    // },
    // {
    //   resolve: `gatsby-source-stripe`,
    //   options: {
    //     objects: [
    //       'Balance',
    //       'BalanceTransaction',
    //       'Product',
    //       'ApplicationFee',
    //       'Sku',
    //       'Subscription',
    //     ],
    //     secretKey: process.env.STRIPE_SECRET_KEY,
    //     downloadFiles: true,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-snipcart',
    //   options: {
    //     apiKey: process.env.SNIPCART_API,
    //     autopop: true,
    //     js: 'https://cdn.snipcart.com/themes/v3.0.0/default/snipcart.js',
    //     styles: 'https://cdn.snipcart.com/themes/v3.0.0/default/snipcart.css',
    //   },
    // },

    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
        hitsPerPage: 8,
        chunkSize: 10000,
      },
    },

    // {
    //   resolve: 'gatsby-plugin-crisp-chat',
    //   options: {
    //     websiteId: process.env.CRISP_WEBSITE_ID,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
    //   },
    // },
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from Shopify.
     */
    {
      resolve: 'gatsby-source-shopify',
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        // If you are running your shop on a custom domain, you need to use that
        // as the shop name, without a trailing slash, for example:
        // shopName: "gatsby-shop.com",
        shopName: process.env.GATSBY_SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESSS_TOKEN,

        // Set the API version you want to use. For a list of available API versions,
        // see: https://help.shopify.com/en/api/storefront-api/reference/queryroot
        // Defaults to 2019-07
        apiVersion: '2020-01',

        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,

        // Number of records to fetch on each request when building the cache
        // at startup. If your application encounters timeout errors during
        // startup, try decreasing this number.
        paginationSize: 250,

        // List of collections you want to fetch.
        // Possible values are: 'shop' and 'content'.
        // Defaults to ['shop', 'content'].
        includeCollections: ['shop', 'content'],
      },
    },
  ],
};
