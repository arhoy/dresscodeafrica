import React from 'react';

import styled from '@emotion/styled';
import Slider from 'react-slick';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import {
  Container,
  BlurbContainer,
  CustomH2,
  CustomP,
  ImageContainerSlider,
  StyledImage,
  CustomButton,
} from '../HomeStyling';

import NoStyleLink from '../../Links/NoStyleLink';

import SliderContainer2 from '../../reusableStyles/slider/SliderContainer2';
import { Bold, P } from '../../reusableStyles/typography/Typography';

// Image is first column reverse
const CustomContainerReverse = styled(Container)`
grid-template-columns: 4fr 5fr;
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    display: flex;
    flex-direction: column-reverse;
  
`;
// Blurb is first in regular container
const CustomContainer = styled(Container)`
  grid-template-columns: 5fr 4fr;
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    display: flex;
    flex-direction: column;
  }
`;

export const ContentfulHomeSection = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    fadeIn: false,
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
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <RTFBold>{text}</RTFBold>,
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  };

  // pulling out variables from the section
  const {
    title,
    subtitle: { subtitle },
    description: { json },
    pictures,
    columnReverse,
  } = data;

  const RTFBold = ({ children }) => <Bold>{children}</Bold>;
  const Text = ({ children }) => <P>{children}</P>;

  if (!pictures)
    return (
      <BlurbContainer>
        <CustomH2>{title}</CustomH2>
        <CustomP>{subtitle && subtitle}</CustomP>

        {documentToReactComponents(json, options)}
      </BlurbContainer>
    );

  if (columnReverse)
    return (
      <CustomContainerReverse>
        <ImageContainerSlider>
          {pictures.length > 1 ? (
            <Slider {...settings}>
              {pictures.map((image, i) => (
                <SliderContainer2 key={i}>
                  <StyledImage fluid={image.fluid} />
                </SliderContainer2>
              ))}
            </Slider>
          ) : (
            <StyledImage fluid={pictures[0].fluid} />
          )}
        </ImageContainerSlider>
        <BlurbContainer>
          <CustomH2>{title}</CustomH2>
          <CustomP>{subtitle && subtitle}</CustomP>

          {documentToReactComponents(json, options)}

          <CustomButton>
            <NoStyleLink to="/shop">Shop Now</NoStyleLink>
          </CustomButton>
        </BlurbContainer>
      </CustomContainerReverse>
    );

  return (
    <CustomContainer>
      <BlurbContainer>
        <CustomH2>{title}</CustomH2>
        <CustomP>{subtitle && subtitle}</CustomP>

        {documentToReactComponents(json, options)}

        <CustomButton>
          <NoStyleLink to="/shop">Show Now</NoStyleLink>
        </CustomButton>
      </BlurbContainer>
      <ImageContainerSlider>
        {pictures.length > 1 ? (
          <Slider {...settings}>
            {pictures.map((image, i) => (
              <SliderContainer2 key={i}>
                <StyledImage fluid={image.fluid} />
              </SliderContainer2>
            ))}
          </Slider>
        ) : (
          <StyledImage fluid={pictures[0].fluid} />
        )}
      </ImageContainerSlider>
    </CustomContainer>
  );
};
