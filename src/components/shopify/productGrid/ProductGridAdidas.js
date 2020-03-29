import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import { useStaticQuery, graphql } from 'gatsby';

import StoreContext from '../../../context/StoreContext';

import EachProductStyle1 from './eachProduct/EachProductStyle1';
import { H2Centered } from '../../reusableStyles/typography/Typography';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const CustomSlider = styled(Slider)``;

const ProductNikeGrid = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 5000,
    fadeIn: false,
    autoplay: true,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const data = useStaticQuery(
    graphql`
      {
        shopifyCollection(products: { elemMatch: { tags: { eq: "adidas" } } }) {
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
              compareAtPrice
            }
          }
        }
      }
    `,
  );

  return (
    <Container>
      <H2Centered> Trending Adidas Products</H2Centered>
      <CustomSlider {...settings}>
        {data.shopifyCollection.products.map(product => (
          <EachProductStyle1
            key={product.id}
            product={product}
            checkout={checkout}
          />
        ))}
      </CustomSlider>
    </Container>
  );
};

export default ProductNikeGrid;
