import Link from "next/link";
import Marquee from "react-fast-marquee";
export default function Intro({ mqposts }) {
  return (
<nav
        className="flex items-center justify-between flex-wrap bg-white  lg:px-12 shadow border-solid border-t-2 border-indigo-400">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-16"> <a href="/">
                <img className="w-44" src='https://www.datocms-assets.com/103068/1687417296-code-arc3-1.png' /></a>
            </div>
            
        </div>
    
        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="text-md font-bold text-indigo-400 lg:flex-grow">
               
            </div>
            
            
            <div className="flex ">
                <Marquee pauseOnHover="true" speed={30}>
                {mqposts.map((post,index) => (
                  <><Link key={index} href={`/posts/${post.slug}`} title={post.title}>
                    <a className="hover:underline" title={post.title}>{post.title}</a>
                  </Link><span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span></>
        ))}

                </Marquee>
    
                
            </div>
        </div>
    
    </nav>

  );
}
