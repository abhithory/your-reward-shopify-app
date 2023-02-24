
const GET_DISCOUNT_COPONS_QUERY = `
query discounts($first: Int!) {
  codeDiscountNodes(first: $first) {
    edges {
      node {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            codes(first: 1) {
              edges {
                node {
                  code
                }
              }
            }
          }
          ... on DiscountCodeBxgy {
            codes(first: 1) {
              edges {
                node {
                  code
                }
              }
            }
          }
          ... on DiscountCodeFreeShipping {
            codes(first: 1) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const CREATE_DISCOUNT_COUPON = `mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            codes(first: 10) {
              nodes {
                code
              }
            }
            startsAt
            endsAt
            customerSelection {
              ... on DiscountCustomerAll {
                allCustomers
              }
            }
            customerGets {
              value {
                ... on DiscountPercentage {
                  percentage
                }
              }
              items {
                ... on AllDiscountItems {
                  allItems
                }
              }
            }
            appliesOncePerCustomer
          }
        }
      }
      userErrors {
        field
        code
        message
      }
    }
  }
  `


export { GET_DISCOUNT_COPONS_QUERY,CREATE_DISCOUNT_COUPON };