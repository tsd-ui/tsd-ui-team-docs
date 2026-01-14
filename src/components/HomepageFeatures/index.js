import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'R&D as Blog Posts',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Use the Blog feature of Docusaurus to share TAS updates and R&D initiatives with the rest of the team, in a way that lives alongside our current docs. This helps the team know what you've been up to and provides an easy way to share knowledge across the team, and even supports comments.
      </>
    ),
  },
  {
    title: 'Git-Synced, Versionable Docs',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        These are living and breathing docs. Please help to keep them up-to-date. They <a href={"https://github.com/securesign/team-docs"} rel={"nofollow noopener"} target={"_blank"}>live in GitHub</a> just like us, and can be integrated into one of our existing CI/CD pipelines to ensure they stay up-to-date.
      </>
    ),
  },
  {
    title: 'Want to Learn More?',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        These docs are meant to be quite intuitive to use, but for more information about how to make the most of them, please see our guide to Contributing.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
