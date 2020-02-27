/* eslint-disable */

import React, { useState, useContext, useEffect, useCallback } from 'react';

import styled from '@emotion/styled';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import StoreContext from '../../../context/StoreContext';
import { ButtonStyle2 } from '../../reusableStyles/buttons/Button';
import { ShopifyCartButton } from '../cart/ShopifyCartButton';
import { ShopifyImage1 } from '../imageComponents/ShopifyImage1';
import { ProductDisplay } from './ProductDisplay';
import { ProductOptions } from './ProductOptions';

import { H2 } from '../../reusableStyles/typography/Typography';
import noImage from '../../../../images/image_not_available.gif';

const Container = styled.div`
  display: grid;
  min-height: 80vh;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    grid-template-columns: 1fr;
    grid-row-gap: 4rem;
  }
`;

const SubContainer1 = styled.div`
  grid-column: 1/2;
  padding: 2rem;
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SubContainer2 = styled.div`
  grid-colum: 2/-1;
  background: ${props => props.theme.colors.primaryLight};
  padding: 4rem 5rem;
  & input,
  select {
    padding: 0.5rem;
    width: 10rem;
    border-radius: 4px;
    outline: none;
    border: none;
  }
  & label {
    display: flex;
    width: 10rem;
    margin-bottom: 3px;
  }
`;

const ProductTitle = styled(H2)`
  &.mobile {
    font-size: 3.8rem;
  }
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    &.desktop {
      display: none;
    }
  }
  @media (min-width: ${props => props.theme.screenSize.eightHundred}) {
    &.mobile {
      display: none;
    }
  }
`;

const PriceContainer = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primaryDark};
  @media (min-width: ${props => props.theme.screenSize.eightHundred}) {
    &.mobile {
      display: none;
    }
  }
`;

const ShopifyImages = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & img {
    width: 8rem;
    margin: 4px;
    cursor: pointer;
  }
`;

const ProductTemplate = ({ product }) => {
  const {
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
    images,
  } = product;

  const [variant, setVariant] = useState({ ...initialVariant });
  const [quantity, setQuantity] = useState(1);
  const [imageId, setImageId] = useState(0);
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext);

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;
  const [available, setAvailable] = useState(productVariant.availableForSale);

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(() => {
        // this checks the currently selected variant for availability
        const result = variants.filter(
          variant => variant.shopifyId === productVariant.shopifyId,
        );
        setAvailable(result[0].availableForSale);
      });
    },
    [client.product, productVariant.shopifyId, variants],
  );

  useEffect(() => {
    checkAvailability(product.shopifyId);
  }, [productVariant, checkAvailability, product.shopifyId]);

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value);
  };

  const handleOptionChange = (index, e, name) => {
    const optionIndex = e.target.selectedIndex;

    if (name === 'Color') {
      setImageId(optionIndex);
    }
    const { value } = e.target;

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions),
    );

    setVariant({ ...selectedVariant });
  };

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity);
  };

  const handleImageClick = i => {
    setImageId(i);
  };

  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    });
    if (match === undefined) return true;
    if (match.availableForSale === true) return false;
    return true;
  };

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price);

  return (
    <Container>
      <SubContainer1>
        <ProductTitle className="mobile">{product.title}</ProductTitle>
        <PriceContainer className="mobile">{price}</PriceContainer>
        <ShopifyImage1
          onClick={e => handleImageClick(imageId)}
          images={images || null}
          imageId={imageId}
        />
        <ShopifyImages>
          {product.images.map((image, i) => (
            <img
              key={i}
              onClick={e => handleImageClick(i)}
              src={image.originalSrc || null}
              alt={``}
            />
          ))}
        </ShopifyImages>
      </SubContainer1>
      <SubContainer2>
        <ProductTitle className="desktop">{product.title}</ProductTitle>
        <PriceContainer>{price}</PriceContainer>
        <ProductDisplay product={product} />
        <ProductOptions
          options={product.options}
          handleOptionChange={handleOptionChange}
          handleQuantityChange={handleQuantityChange}
          checkDisabled={checkDisabled}
          quantity={quantity}
        />

        <ButtonStyle2
          type="submit"
          disabled={!available || adding}
          onClick={handleAddToCart}
          style={{ display: 'block' }}
        >
          Add to Cart
        </ButtonStyle2>
        <ShopifyCartButton text1={`CheckOut`} text2={`Cart`} />
        {!available && <p>This Product is out of Stock!</p>}
      </SubContainer2>
    </Container>
  );
};

ProductTemplate.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      }),
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
  addVariantToCart: PropTypes.func,
};

export default ProductTemplate;
