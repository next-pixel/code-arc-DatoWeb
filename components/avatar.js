import { Image } from "react-datocms";

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 mr-4">
        <Image
          alt={name}
          data={{
            ...picture.responsiveImage,
            alt: `Avatar Image for ${name}`,
          }}
          className="rounded-full"
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
