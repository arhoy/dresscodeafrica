import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';

import { useStaticQuery, graphql } from 'gatsby';

import StoreContext from '../../../context/StoreContext';
import EachProductStyle2 from './eachProduct/EachProductStyle2';
import FilterNav from '../filtering/FilterNav';
import FilterNavMobile from '../filtering/FilterNavMobile';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    grid-template-columns: 1fr;
  }
`;

const SectionNav = styled.div`
  background: ${props => props.theme.colors.primaryLight};
  padding: 2rem;
  min-width: 30rem;
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const SectionProducts = styled.div`
  padding: 4rem 2rem;
`;

const SectionRender = styled.div`
  background: ${props => props.theme.colors.white};
  min-height: 60vh;
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    grid-template-columns: 1fr;
  }
`;

const SortButton = styled.button`
  margin: 2rem 0;
  outline: none;
  border: none;
  background: transparent;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 6px;
  padding: 3px 5px;
  cursor: pointer;
  background: ${props => props.theme.colors.white};
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    color: ${props => props.theme.colors.white};
  }
`;

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  const data = useStaticQuery(
    graphql`
      {
        allShopifyCollection(sort: { fields: [title], order: ASC }) {
          nodes {
            id
            title
            handle
          }
        }

        allShopifyProduct(sort: { fields: [title], order: DESC }) {
          nodes {
            id
            title
            handle
            createdAt
            tags
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  fluid(maxWidth: 910) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
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

  const [selectedCollection, setSelectedCollection] = useState('');

  const [sortDesc, setSortDesc] = useState(false);

  return (
    <Grid>
      <SectionNav>
        <FilterNav
          title={'Collections'}
          collections={data.allShopifyCollection.nodes}
          setSelectedCollection={setSelectedCollection}
        />
        <FilterNavMobile
          title={'Collections'}
          collections={data.allShopifyCollection.nodes}
          setSelectedCollection={setSelectedCollection}
        />
        <SortButton onClick={e => setSortDesc(prev => !prev)}>
          {' '}
          {sortDesc ? 'Sort By Highest Price' : 'Sort By Lowest Price'}{' '}
        </SortButton>
      </SectionNav>

      <SectionProducts>
        {/* <SectionProductsHeader>
          <Header>Welcome to Dress Code</Header>
          <Blurb>Active Shoppers {getRandomInt(2, 10)}</Blurb>
        </SectionProductsHeader> */}
        {selectedCollection ? (
          <SectionRender>
            {data.allShopifyProduct.nodes
              .filter(product =>
                product.tags.includes(selectedCollection.toLowerCase()),
              )
              .sort((a, b) =>
                sortDesc
                  ? a.variants[0].price - b.variants[0].price
                  : b.variants[0].price - a.variants[0].price,
              )
              .map(product => (
                <EachProductStyle2
                  key={product.id}
                  product={product}
                  checkout={checkout}
                />
              ))}
          </SectionRender>
        ) : (
          <SectionRender>
            {data.allShopifyProduct.nodes
              .sort((a, b) =>
                sortDesc
                  ? a.variants[0].price - b.variants[0].price
                  : b.variants[0].price - a.variants[0].price,
              )
              .map(product => (
                <EachProductStyle2
                  key={product.id}
                  product={product}
                  checkout={checkout}
                />
              ))}
          </SectionRender>
        )}
      </SectionProducts>
    </Grid>
  );
};

export default ProductGrid;
