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

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  const [selectedCollection, setSelectedCollection] = useState(null);
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
      </SectionNav>

      {selectedCollection ? (
        <SectionRender>
          {data.allShopifyProduct.nodes
            .filter(product =>
              product.tags.includes(selectedCollection.toLowerCase()),
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
          {data.allShopifyProduct.nodes.map(product => (
            <EachProductStyle2
              key={product.id}
              product={product}
              checkout={checkout}
            />
          ))}
        </SectionRender>
      )}
    </Grid>
  );
};

export default ProductGrid;
