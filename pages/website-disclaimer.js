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

export default function websitedisclaimer({ subscription }) {
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
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Website Disclaimer</h1><div className="w-full mb-4">
      <div className="h-1 mx-auto bg-indigo-400 w-64  my-0 py-0 rounded-t"></div>
    </div>
    <div className=" m-4 ">
    <div class="grid lg:grid-cols-3 grid-cols-auto gap-4">
  <div><img src="https://www.datocms-assets.com/103068/1687961214-wbbdisclaim.png" ></img></div>
  <div class="lg:col-span-2 bg-white rounded-lg shadow p-8"> 
  <p>If you require any more information or have any questions about our site&rsquo;s disclaimer, please feel free to contact us by email at&nbsp;<a href="mailto:shahkrunalg@gmail.com">shahkrunalg@gmail.com</a>.</p>
<h2>Disclaimers for Krunal Shah</h2>
<p>All the information on this website &ndash; https://code-arc.vercel.app/ &ndash; is published in good faith and for general information purpose only. Code Arc does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (Code Arc), is strictly at your own risk. Code Arc will not be liable for any losses and/or damages in connection with the use of our website.</p>
<p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone &lsquo;bad&rsquo;.</p>
<p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their &ldquo;Terms of Service&rdquo; before engaging in any business or uploading any information.</p>
<h2>Consent</h2>
<p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
<h2>Update</h2>
<p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
 </div>
</div>
 
      </div>
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
