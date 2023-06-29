

export default function SEOTags({ seodatas }) {
  console.log(seodatas)
  return (
    <>
      {seodatas.map((seodata) => (
        <meta name={seodata.keyword} content={seodata.synonyms}></meta>
      ))}
  </>
  );
}
