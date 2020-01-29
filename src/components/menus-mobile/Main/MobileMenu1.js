import React from 'react';

import {
  MobileMenuContainer,
  CloseIcon,
  CloseIconContainer,
  StyledLink,
  LinkContainerUl,
  LinkWrapper,
} from '../MobileMenuStyles1';

export const MobileMenu1 = ({ mobileMenuHandler }) => {
  return (
    <MobileMenuContainer>
      <CloseIconContainer>
        <CloseIcon onClick={mobileMenuHandler} /> close
      </CloseIconContainer>

      <LinkContainerUl>
        <LinkWrapper>
          {' '}
          <StyledLink to="/"> Home </StyledLink>{' '}
        </LinkWrapper>
        <LinkWrapper>
          {' '}
          <StyledLink to="/shop"> Shop </StyledLink>{' '}
        </LinkWrapper>
        <LinkWrapper>
          {' '}
          <StyledLink to="/contact"> Contact</StyledLink>{' '}
        </LinkWrapper>
      </LinkContainerUl>
    </MobileMenuContainer>
  );
};
