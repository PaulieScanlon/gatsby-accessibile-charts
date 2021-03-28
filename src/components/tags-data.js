import { useStaticQuery, graphql } from 'gatsby';

import React, { Fragment } from 'react';

const TagsData = ({ children }) => {
  const tags = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { tags: { ne: null } } }) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)
    .allMdx.nodes.reduce((items, item) => {
      const { tags } = item.frontmatter;
      tags.map((tag) => items.push(tag));
      return items;
    }, [])
    .reduce((items, item) => {
      const existingItem = items.find((index) => index.tag === item);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        items.push({
          tag: item,
          count: 1
        });
      }
      return items;
    }, [])
    .sort((a, b) => b.count - a.count);
  // .slice(0, 5) // optional

  return (
    <Fragment>
      {typeof children === 'function'
        ? children(tags.length ? tags : null)
        : children}
    </Fragment>
  );
};

export default TagsData;
