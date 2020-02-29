import React, { useState } from 'react';

import { Link } from 'gatsby';

import { FaAlignRight } from 'react-icons/fa';

import styled from '@emotion/styled';

import { MobileMenu1 } from '../menus-mobile/Main/MobileMenu1';

import NoStyleLink from '../Links/NoStyleLink';

import Search from '../algolia/Search';

const Container = styled.div`
  background: ${props => props.theme.colors.lightgrey};
  padding-bottom: 2rem;
`;

const Header = styled.header`
  height: 80px;
  position: relative;

  color: ${props => props.theme.colors.black};

  display: flex;

  margin: 0 auto;

  justify-content: space-around;
  align-items: center;

  z-index: 1;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    display: flex;
  }
`;

const Logo = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
`;
const LogoLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.black};
  font-size: 2.9rem;
  padding: 0;
  margin: 0;

  text-decoration: none !important;
`;

const NavContainer = styled.nav`
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    display: none;
  }
`;

const BurgerIcon = styled(FaAlignRight)`
  cursor: pointer;
  @media (min-width: ${props => props.theme.screenSize.mobileL}) {
    display: none;
  }
`;

const CustomLink = styled(NoStyleLink)`
  color: inherit;
  height: 100%;
  padding: 1rem;
  margin: 1rem;
  & :hover {
    background: ${props => props.theme.colors.primaryLight};
  }
`;

const HeaderMid = styled.div`
  padding: 3px 0;
  grid-column: 1/-1;
  margin: 0 auto;
  width: 80%;
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    width: 100%;
  }
`;

const Nav = () => {
  const [mobileMenuOpen, setMobileMenu] = useState(false);

  const mobileMenuHandler = () => {
    setMobileMenu(prevState => !prevState);
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoLink to="/">Dress Code</LogoLink>
        </Logo>

        <NavContainer>
          <CustomLink to="/">Home </CustomLink>
          <CustomLink to="/shop">Shop </CustomLink>
          <CustomLink to="/contact">Contact </CustomLink>
        </NavContainer>

        <BurgerIcon onClick={mobileMenuHandler} />
        {mobileMenuOpen ? (
          <MobileMenu1 mobileMenuHandler={mobileMenuHandler} />
        ) : null}
      </Header>

      <HeaderMid>
        <Search />
      </HeaderMid>
    </Container>
  );
};

export default Nav;
