import ImageCard from "../ImageCard/ImageCard";
import { ColorRing } from "react-loader-spinner";

export default function ImageGallery({
  images,
  getAndSetImages,
  setPage,
  loading,
}) {
  function handleLoadMore(e) {
    e.preventDefault();
    setPage((curPage) => curPage + 1);
    getAndSetImages(true);
  }

  return (
    <>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} />
          </li>
        ))}

        {loading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}
      </ul>

      {images.length > 0 && (
        <button onClick={(e) => handleLoadMore(e)}>Load More</button>
      )}
    </>
  );
}
