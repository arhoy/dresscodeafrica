import React from 'react';
import styled from '@emotion/styled';
import { ShopifyCartButton } from '../../shopify/cart/ShopifyCartButton';

const Container = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0 auto;
`;

const Promo = styled.div`
  & p {
    font-size: 1.4rem;
    &.desktop {
      @media (max-width: ${props => props.theme.screenSize.mobileL}) {
        display: none;
      }
    }
    &.mobile {
      @media (min-width: ${props => props.theme.screenSize.mobileL}) {
        display: none;
      }
    }
  }
`;

const NavShopify = () => {
  return (
    <Container>
      <Promo>
        <p className="desktop">Free Shipping On Orders Over CFA 500K</p>
        <p className="mobile">Free Shipping CFA 500K+</p>
      </Promo>
      <ShopifyCartButton text1={`CART`} text2={`CART`} />
    </Container>
  );
};

export default NavShopify;
