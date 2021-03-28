import { useStaticQuery, graphql, Link } from 'gatsby';

import React from 'react';

import TagsData from '../components/tags-data';

const IndexPage = () => {
  const {
    allSitePage: { nodes }
  } = useStaticQuery(graphql`
    query {
      allSitePage(filter: { path: { regex: "//blog//" } }) {
        nodes {
          path
          context {
            slug
          }
        }
      }
    }
  `);

  return (
    <main>
      <h1>Charts.css demo</h1>
      <p>
        A demo repo for creating accessible charts using Charts.css:{' '}
        <a
          href="https://github.com/PaulieScanlon/gatsby-accessible-charts"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/PaulieScanlon/gatsby-accessible-charts
        </a>
      </p>
      <h2>Tags Chart</h2>
      <p>Bar</p>
      <TagsData>
        {(tags) => {
          return (
            <table className="charts-css bar show-labels">
              <caption>Tags Chart Bar</caption>
              <tbody>
                {tags.map((item, index) => {
                  const { tag, count } = item;
                  return (
                    <tr key={index}>
                      <th>{tag}</th>
                      <td
                        style={{
                          '--size': `calc(${count / 10})`
                        }}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }}
      </TagsData>
      <hr />
      <h2>Tags Chart</h2>
      <p>Column + Legend</p>
      <TagsData>
        {(tags) => {
          return (
            <div className="grid">
              <ul className="charts-css legend legend-square">
                {tags.map((item, index) => {
                  const { tag } = item;
                  return <li key={index}>{tag}</li>;
                })}
              </ul>

              <table className="charts-css column show-labels">
                <caption>Tags Chart Column</caption>
                <tbody>
                  {tags.map((item, index) => {
                    const { count } = item;
                    return (
                      <tr key={index}>
                        <th>{count}</th>
                        <td
                          style={{
                            '--size': `calc(${count / 10})`
                          }}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }}
      </TagsData>
      <hr />
      <h2>Tags Chart</h2>
      <p>Area</p>
      <TagsData>
        {(tags) => {
          return (
            <table className="charts-css area show-data-axes">
              <caption>Tags Chart Area</caption>
              <tbody>
                {tags.map((item, index) => {
                  const { tag, count } = item;
                  return (
                    <tr key={index}>
                      <td
                        style={{
                          '--start':
                            index === 0.0 ? 0.0 : tags[index - 1].count / 10,
                          '--size': count / 10
                        }}
                      >
                        <span className="data">{`${tag} x${count}`}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }}
      </TagsData>
      <hr />
      <h2>Tags List</h2>
      <p>Just a standard HTML list</p>
      <TagsData>
        {(tags) => {
          return (
            <ul>
              {tags.map((item, index) => {
                const { tag, count } = item;
                return <li key={index}>{`${tag} | ${count} `}</li>;
              })}
            </ul>
          );
        }}
      </TagsData>
      <hr />
      <h2>Blog</h2>
      <p>Links to blog posts</p>
      <ul>
        {nodes
          .sort((a, b) => b.path - a.path)
          .map((node, index) => {
            const {
              path,
              context: { slug }
            } = node;

            return (
              <li key={index}>
                <Link to={path}>{slug}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
};

export default IndexPage;
