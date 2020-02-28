import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { ContentfulHomeSection } from './Section/ContentfulSection';

const Home1 = () => {
  const contentfulData = useStaticQuery(graphql`
    {
      contentfulSectionSimple(
        id: { eq: "acbf10c2-11a2-5b9c-8282-79d1af5f53e3" }
      ) {
        id
        title
        columnReverse
        subtitle {
          subtitle
        }
        pictures {
          fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        description {
          json
        }
      }
    }
  `);

  return (
    <ContentfulHomeSection data={contentfulData.contentfulSectionSimple} />
  );
};

export default Home1;
