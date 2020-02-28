import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { useStaticQuery, graphql, Link } from 'gatsby';

import StoreContext from '../../../context/StoreContext';
import noImage from '../../../../images/image_not_available.gif';

const Grid = styled.div`
  background: ${props => props.theme.colors.white};
  min-height: 60vh;
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    grid-template-columns: 1fr;
  }
`;

const Product = styled.div`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 100;
  font-size: 1.4rem;
  text-align: center;
`;

const PriceTag = styled.span`
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.primaryDark};
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    font-size: 2.1rem;
  }
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const ProductNikeGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const data = useStaticQuery(
    graphql`
      {
        shopifyCollection(products: { elemMatch: { tags: { eq: "Nike" } } }) {
          products {
            id
            title
            handle
            createdAt
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  fluid(maxWidth: 910) {
                    src
                  }
                }
              }
            }
            variants {
              price
            }
          }
        }
      }
    `,
  );

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'CDN',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0));
  console.log('dfsdfsf', data.shopifyCollection.products);
  return (
    <Grid>
      {data.shopifyCollection.products.map(product => (
        <Product key={product.id}>
          <Link to={`/product/${product.handle}/`}>
            {product.images[0] && product.images[0].localFile ? (
              <Img
                src={
                  product.images[0].localFile.childImageSharp.fluid.src ||
                  noImage
                }
                alt={product.handle}
              />
            ) : (
              <Img src={noImage} />
            )}
          </Link>

          <Title>{product.title}</Title>
          <PriceTag>{getPrice(product.variants[0].price)}</PriceTag>
        </Product>
      ))}
    </Grid>
  );
};

export default ProductNikeGrid;
