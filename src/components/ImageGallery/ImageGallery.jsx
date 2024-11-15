import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <li
          className={styles.galleryItem}
          key={image.id}
          onClick={() => onImgClick(image)}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
