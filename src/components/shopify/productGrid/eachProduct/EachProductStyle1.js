import React from 'react';
import styled from '@emotion/styled';
import noImage from '../../../../../images/image_not_available.gif';
import NoStyleLink from '../../../Links/NoStyleLink';

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
  max-width: 30rem;
  max-height: 40rem;
  object-fit: cover;
`;

const CustomLink = styled(NoStyleLink)``;

const EachProductStyle1 = ({ product, checkout }) => {
  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'CFA',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0));
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

      <Title>{product.title}</Title>
      <PriceTag>{getPrice(product.variants[0].price)}</PriceTag>
    </Container>
  );
};

export default EachProductStyle1;
