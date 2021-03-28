import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

const MdxTemplate = ({
  data: {
    mdx: {
      frontmatter: { tags },
      body
    }
  }
}) => {
  return (
    <main>
      <Link to="/">Back</Link>
      <MDXProvider>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      slug
      frontmatter {
        tags
      }
      body
    }
  }
`;

export default MdxTemplate;
