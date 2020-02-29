import React, { useState } from 'react';

import styled from '@emotion/styled';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Container = styled.div`
  padding: 0.5rem 1rem;
  @media (min-width: ${props => props.theme.screenSize.mobileL}) {
    display: none;
  }
`;

const Item = styled.div`
  margin: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconDown = styled(FaChevronDown)`
  font-size: 1rem;
`;

const IconUp = styled(FaChevronUp)`
  font-size: 1rem;
`;

const Title = styled.h4`
  font-weight: bold;
  font-size: 2rem;
  margin-right: 6px;
`;

const FilterNavMobile = ({ title, collections, setSelectedCollection }) => {
  const onClickHandler = handle => {
    setSelectedCollection(handle);
  };

  const showItemHandler = () => {
    setShowItems(prev => !prev);
  };

  const [showItems, setShowItems] = useState(false);
  return (
    <Container>
      <TitleContainer onClick={showItemHandler}>
        <Title>{title}</Title>
        {showItems ? <IconUp /> : <IconDown />}
      </TitleContainer>

      {showItems &&
        collections.map(collection => (
          <Item
            onClick={e => onClickHandler(collection.handle)}
            key={collection.id}
          >
            {collection.title}
          </Item>
        ))}
    </Container>
  );
};

export default FilterNavMobile;
