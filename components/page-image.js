import { Image } from "react-datocms";
import cn from "classnames";
import Link from "next/link";

export default function PageImage({ title, responsiveImage, slug }) {
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Image for ${title}`,
      }}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="mx-1">
      {slug ? (
        <Link href={`/${slug}`} title={title}>
          <a aria-label={title} title={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
