import { StructuredText, Image } from 'react-datocms';

export default function PostBody({ content }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="prose prose-lg prose-blue max-w-none" id="main-content">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === 'ImageBlockRecord') {
              return <Image data={record.image.responsiveImage} />;
            }

            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
