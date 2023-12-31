import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
     <div className=" mx-auto pt-5">
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
   <Date dateString={date} />
      </div>
      <div className="mb-8 md:mb-16 mx-5 sm:mx-5">
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div className="max-w-2xl mx-auto mx-5">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
           <Date dateString={date} />
        </div>
        
      </div></div>
    </>
  );
}
