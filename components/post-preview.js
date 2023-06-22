import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
<a class="mb-0 overflow-hidden text-center bg-white rounded shadow dark:bg-gray-700" href={`/posts/${slug}`}>
                    <div class="relative overflow-hidden h-72">
                        <img class="object-cover w-full h-full transition-all hover:scale-110"
                            src="{coverImage.responsiveImage}" alt="">
                    </div>
                    <div class="relative z-20 p-8 -mt-16 ">
                        <img class="object-cover w-20 h-20 mx-auto mb-4 border-4 border-white rounded-full dark:border-gray-500"
                            src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?cs=srgb&amp;dl=pexels-thorn-yang-139829.jpg&amp;fm=jpg"
                            alt="">
                        <span class="block mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300">
                            John Doe • 6th Jun, 2022
                        </span>
                        <h2 class="mb-3 text-2xl font-bold leading-9 text-blue-800 dark:text-white">
                            Lorem ipsum dolor sit amet, consectetur
                        </h2>
                        <p class="text-base leading-7 text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                    </div>
                </a>
  );
}
