import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import PageImage from "@/components/page-image";

export async function getStaticProps({ preview = false }) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        page(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
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
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1200 }) {
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
      slug: "about-us",
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function about({ subscription }) {
  const {
    data: { site, page, morePosts,allPostsMq },
  } = useQuerySubscription(subscription);

  const metaTags = page.seo.concat(site.favicon);

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}
        <meta name="keywords" content={metaTags.metakeywords}></meta>
        </Head>
        <Container>
          <Intro mqposts={allPostsMq} />
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">{page.title}</h1><div className="w-full mb-4">
      <div className="h-1 mx-auto bg-indigo-400 w-64  my-0 py-0 rounded-t"></div>
    </div>
    <div className=" m-4 ">
    <div className="grid lg:grid-cols-3 grid-cols-auto gap-4">
  <div><PageImage
          title={page.title}
          responsiveImage={page.coverImage.responsiveImage}
        /></div>
  <div className="lg:col-span-2 bg-white rounded-lg shadow p-8"> 
  <article>
  <PostBody content={page.content} /></article>
 </div>
</div>
 
      </div>
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
