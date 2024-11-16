export default function ImageCard({ image, onImgClick }) {
  return (
    <img
      width={"350px"}
      height={"350px"}
      src={`${image.urls.raw}&w=350&h=350&fit=crop`}
      alt={image.description}
      onClick={() => onImgClick(image)}
    />
  );
}
