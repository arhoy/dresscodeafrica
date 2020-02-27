import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div``;

const ProductDescriptionContainer = styled.div`
  margin-top: 3rem;
  & h4 {
    font-size: 2.3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.darkGrey};
  }
`;
const ProductDescription = styled.div`
  font-family: 'helvetica', sans-serif;
  font-weight: 300;
  & pre {
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    font-family: courier;
  }
`;

export const ProductDisplay = ({ product }) => {
  return (
    <Container>
      <ProductDescriptionContainer>
        <h4> Description and Features </h4>
        <ProductDescription
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </ProductDescriptionContainer>
    </Container>
  );
};
