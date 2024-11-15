import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  let url = `https://api.unsplash.com/search/photos/?client_id=NO4bIwCQaOslhJk3_yAfW6IJQglvzrALVESzW6_aMGM&page=${page}&query=${query}`;

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

  useEffect(() => {
    setQuery("");
    setPage(1);
    setImages([]);
  }, []);

  return (
    <>
      <SearchBar
        query={query}
        setQuery={setQuery}
        getAndSetImages={getAndSetImages}
        setPage={setPage}
      />
      <ImageGallery
        images={images}
        getAndSetImages={getAndSetImages}
        setPage={setPage}
        query={query}
        loading={loading}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
export default App;
