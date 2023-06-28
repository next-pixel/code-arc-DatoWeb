import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import HeroPost from "@/components/hero-post";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        blog {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
        allPosts(orderBy: date_DESC, first: 20) {
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

      ${metaTagsFragment}
      ${responsiveImageFragment}
    `,
    preview,
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
    data: { allPosts, site, blog ,allPostsMq},
  } = useQuerySubscription(subscription);

  const morePosts = allPosts.slice(1);
  const metaTags = blog.seo.concat(site.favicon);

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}
        <meta name="keywords" content={metaTags.metakeywords}></meta>
        </Head>
        <Container>
          <Intro mqposts={allPostsMq} />
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">About US</h1><div className="w-full mb-4">
      <div className="h-1 mx-auto bg-indigo-400 w-64  my-0 py-0 rounded-t"></div>
    </div>
    <div className=" m-4 ">
    <div class="grid lg:grid-cols-3 grid-cols-auto gap-4">
  <div><img src="https://www.datocms-assets.com/103068/1687942456-about.png" ></img></div>
  <div class="lg:col-span-2 bg-white rounded-lg shadow p-8"> I am Krunal Shah or you can say kunal shah, i am writing a blogs, i have Over 8 years of experience in web development such as developing dynamic applications with top technologies. Deep knowledge of .NET Core, Angular CLI, Node Js, React, Asp.NET MVC, Sql Server, Oracle, Azure, HTML5, Javascript and CSS3, etc. and a Microsoft Certified: Azure Developer Associate.
 </div>
</div>
 
      </div>
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
