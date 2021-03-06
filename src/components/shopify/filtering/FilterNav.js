import React, { useState } from 'react';

import styled from '@emotion/styled';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Container = styled.div`
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
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

const FilterNav = ({ title, collections, setSelectedCollection }) => {
  const onClickHandler = handle => {
    setSelectedCollection(handle);
  };

  const showItemHandler = () => {
    setShowItems(prev => !prev);
  };

  const [showItems, setShowItems] = useState(true);
  return (
    <Container>
      <TitleContainer onClick={showItemHandler}>
        <Title>{title}</Title>
        {showItems ? <IconUp /> : <IconDown />}
      </TitleContainer>
      {showItems && (
        <div>
          <Item onClick={e => onClickHandler(null)} key={-1}>
            Show All
          </Item>
          {collections.map(collection => (
            <Item
              onClick={e => onClickHandler(collection.handle)}
              key={collection.id}
            >
              {collection.title}
            </Item>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FilterNav;
