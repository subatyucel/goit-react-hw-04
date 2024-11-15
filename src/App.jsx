import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Loader from "./Components/Loader/Loader";
import LoadMore from "./Components/LoadMore/LoadMore";
import ImageModal from "./Components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  //api url
  const url = `https://api.unsplash.com/search/photos/?client_id=NO4bIwCQaOslhJk3_yAfW6IJQglvzrALVESzW6_aMGM&page=${page}&query=${query}`;

  //send request function
  async function getAndSetImages(more = false) {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.results.length === 0) {
        toast.error(
          "Nothing to find with this value, please try something else!"
        );
      } else {
        more
          ? setImages((prevImages) => [...prevImages, ...data.results])
          : setImages([...data.results]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function openModal(image) {
    setModalImg(image);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalImg(null);
  }

  //calling getAndSetImages function on query or page change
  useEffect(() => {
    if (query) {
      if (page > 1) {
        getAndSetImages(true);
      } else {
        getAndSetImages();
      }
    }
  }, [query, page]);

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
      <ImageGallery images={images} onImgClick={openModal} />
      {loading && <Loader />}
      {images.length > 1 && <LoadMore setPage={setPage} />}
      {modalImg && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalImg={modalImg}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
export default App;
