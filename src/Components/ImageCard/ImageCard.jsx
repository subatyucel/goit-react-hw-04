export default function ImageCard({ image }) {
  return <img src={image.urls.small} alt={image.description} />;
}
