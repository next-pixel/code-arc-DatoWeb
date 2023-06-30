import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import { BreadcrumbJsonLd,ArticleJsonLd,NextSeo } from 'next-seo';
export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        post(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          summary
          seoReadabilityAnalysis
          content {
            value
            blocks {
              __typename
              ...on ImageBlockRecord {
                id
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
                ...responsiveImageFragment
              },
              url
            }
          }
        }

        morePosts: allPosts(orderBy: date_DESC, first: 3, filter: {slug: {neq: $slug}}) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
                ...responsiveImageFragment
              }
            }
          }
        }

        allPostsMq: allPosts(orderBy: date_DESC) {
          title
          slug
        }
      }

      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  };
}

export default function Post({ subscription, preview }) {
  const {
    data: { site, post, morePosts,allPostsMq },
  } = useQuerySubscription(subscription);

  const metaTags = post.seo.concat(site.favicon);
  const siteURL = 'https://code-arc.vercel.app'
//console.log(allPostsMq)
  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(metaTags)}
      </Head>
      <Container>
        <Intro mqposts={allPostsMq} />
        <BreadcrumbJsonLd
      itemListElements={[
        {
          type: "ListItem",
          position: 1,
          name: 'Home',
          item: siteURL,
        },
        {
          type: "ListItem",
          position: 2,
          name: 'Posts',
          item: siteURL + '/posts',
        },
        {
          type: "ListItem",
          position: 3,
          name: post.title,
          item: siteURL + '/posts/' + post.slug ,
        }
      ]}
    />
    <NextSeo
      title={post.title}
      description={post.summary}
      openGraph={{
        url: siteURL,
        title: post.title,
        description: post.summary,
        images: [
          { url: post.ogImage.url,
            alt: post.title, }
        ],
        siteName: 'Code Arc',
        type: 'article',
        article: {
          publishedTime: post.date,
          modifiedTime: post.date,
          expirationTime: post.date,
          section: '.NEt',
          authors: [
            post.author.picture.url
          ],
          tags: ['.NET'],
        }
      }}
      twitter={{
        handle: '@shahkrunal258',
        site: '@codearc',
        cardType: 'summary_large_image',
      }}
    />
     <ArticleJsonLd
      url={siteURL + '/posts/' + post.slug}
      title={post.title}
      images={[
        post.ogImage.url
      ]}
      datePublished={post.date}
      dateModified={post.date}
      authorName={[post.author.name]}
      publisherName={post.author.name}
      publisherLogo={post.author.picture.url}
      description={post.summary}
      isAccessibleForFree={true}
    />
    <ArticleJsonLd
      type="BlogPosting"
      url={siteURL + '/posts/' + post.slug}
      isAccessibleForFree={true}
      publisherName={post.author.name}

      title={post.title}
      images={[
        post.ogImage.url
      ]}
      datePublished={post.date}
      dateModified={post.date}
      authorName={post.author.name}
      description={post.summary}
      
    />
        <article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
        <SectionSeparator />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
