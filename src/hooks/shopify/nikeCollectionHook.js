import { graphql, useStaticQuery } from 'gatsby';

const NikeCollectionHook = () => {
  const data = useStaticQuery(graphql`
    {
      shopifyCollection(products: { elemMatch: { tags: { eq: "Nike" } } }) {
        id
        products {
          id
          title
        }
      }
    }
  `);

  const items = data.allItems.nodes;

  return items;
};

export default NikeCollectionHook;
