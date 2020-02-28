import React from 'react';
import styled from '@emotion/styled';
import noImage from '../../../../../images/image_not_available.gif';
import NoStyleLink from '../../../Links/NoStyleLink';
import { getPrice } from '../../../../utils/shopify/renderPrice';
import { truncateString } from '../../../../utils/truncateString';

const Container = styled.div`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 100;
  font-size: 2rem;
  text-align: center;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const PriceTag = styled.span`
  font-size: 1.6rem;
  text-align: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primaryDark};
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    font-size: 2.1rem;
  }
`;

const ComparePriceTag = styled.span`
  font-size: 1.4rem;
  text-align: center;

  text-decoration: line-through;
  color: ${props => props.theme.colors.black};
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    font-size: 2.1rem;
  }
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const CustomLink = styled(NoStyleLink)``;

const EachProductStyle2 = ({ product, checkout }) => {
  return (
    <Container key={product.id}>
      <CustomLink to={`/product/${product.handle}/`}>
        {product.images[0] && product.images[0].localFile ? (
          <Img
            src={
              product.images[0].localFile.childImageSharp.fluid.src || noImage
            }
            alt={product.handle}
          />
        ) : (
          <Img src={noImage} />
        )}
      </CustomLink>

      <Title>{truncateString(product.title, 30)}</Title>
      <PriceContainer>
        <PriceTag>{getPrice(product.variants[0].price, checkout)}</PriceTag>
        {product.variants[0].compareAtPrice &&
          product.variants[0].compareAtPrice > 0 && (
            <ComparePriceTag>
              {getPrice(product.variants[0].compareAtPrice, checkout)}
            </ComparePriceTag>
          )}
      </PriceContainer>
    </Container>
  );
};

export default EachProductStyle2;
