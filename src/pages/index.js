import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Layout from '../components/layouts/Layout';
import {
  Section,
  SectionGrey,
  Container1200,
  SectionHexaGrey,
  SectionParallelGrey,
} from '../components/reusableStyles/sections/Sections';

import Slider from 'react-slick';
import SliderContainer2 from '../components/reusableStyles/slider/SliderContainer2';
import { H1 } from '../components/reusableStyles/typography/Typography';
import { ButtonStyle2Large } from '../components/reusableStyles/buttons/Button';
import Home1 from '../components/home/Home1';

import Home3 from '../components/home/Home3';

import HomeReview from '../components/home/HomeReview';

import Map1 from '../components/mapbox/Map1';
import NoStyleLink from '../components/Links/NoStyleLink';
import Home4 from '../components/home/Home4';
import ProductGridNike from '../components/shopify/productGrid/ProductGridNike';
import ProductGridApple from '../components/shopify/productGrid/ProductGridApple';
import ProductGridZara from '../components/shopify/productGrid/ProductGridZara';
const fadeInDown = keyframes`
from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
`;

const HerosContainer = styled.div`
  z-index: -1;

  display: flex;

  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    flex-direction: column;
  }
`;

const HeroBackgroundImage = styled(BackgroundImage)`
  width: 100%;
  height: 80vh;
  background-attachment: fixed;
  background-image: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  );
  background-size: cover;
  background-position: top;
  align-items: top;
  opacity: 1 !important;
  @media (max-width: ${props => props.theme.screenSize.nineHundred}) {
    height: 70vh;
  }
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    height: 60vh;
  }
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    height: 40vh;
  }
  @media (max-width: ${props => props.theme.screenSize.mobileS}) {
    height: 35vh;
  }
`;

const HeroContentContainer = styled.div`
  min-width: 30rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.black};
  max-width: 80rem;
  margin: 0 auto;

  padding: 3rem;
  border-top-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  & ${H1} {
    color: ${props => props.theme.colors.black};
    font-weight: 100;
    font-size: 6rem;
    animation: ${fadeInDown} 0.4s;
 ;
      (max-width: ${props => props.theme.screenSize.mobileL}) {
      font-size: 4rem;
    }
  }
  & span {
    font-weight: 500;
    padding: 2rem 0;
    animation: ${fadeInDown} 0.3s;
    animation-fill-mode: both;
    animation-delay: .7s;
    @media (max-width: ${props => props.theme.screenSize.mobileL}) {
      display: none;
    }
  }
  & ${ButtonStyle2Large} {
   
    animation: ${fadeInDown} 0.2s;
    animation-fill-mode: both;
    animation-delay: 1s;
    border-radius: 0;
    font-size: 1.8rem;
    font-weight: 100;
  }
`;

export const query = graphql`
  {
    heroImage: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1000) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

const Home = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
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
  return (
    <Layout full={true}>
      <Slider {...settings}>
        <SliderContainer2>
          <HerosContainer>
            <HeroBackgroundImage fluid={data.heroImage.childImageSharp.fluid}>
              <HeroContentContainer>
                <HeroContent>
                  <H1>Dress Code</H1>
                  <span>Premium Electronics and Fashion Store</span>
                  <ButtonStyle2Large>
                    <NoStyleLink to="/shop">Shop Now</NoStyleLink>
                  </ButtonStyle2Large>
                </HeroContent>
              </HeroContentContainer>
            </HeroBackgroundImage>
          </HerosContainer>
        </SliderContainer2>
      </Slider>

      <ProductGridApple />

      <SectionGrey>
        <Home1 />
      </SectionGrey>
      <ProductGridNike />
      <SectionGrey>
        <Home3 />
      </SectionGrey>

      <ProductGridZara />

      <SectionHexaGrey>
        <Home4 />
      </SectionHexaGrey>

      <Section>
        <Container1200>
          <HomeReview />
        </Container1200>
      </Section>

      <SectionParallelGrey>
        <Container1200>
          <Map1
            title={`Our Locations`}
            mapStyle="mapbox://styles/arhoy/ck5w4r15h22j21iqlfx08pytp"
            width="100%"
            height="50vh"
          />
        </Container1200>
      </SectionParallelGrey>
    </Layout>
  );
};

export default Home;
