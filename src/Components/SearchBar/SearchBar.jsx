import { useRef } from "react";
import toast from "react-hot-toast";

export default function SearchBar({
  query,
  setQuery,
  getAndSetImages,
  setPage,
}) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const inputVal = inputRef.current.value.trim().toLowerCase();

    if (inputVal === "" || inputVal === query) {
      toast.error("Please type something different to search!");
    } else {
      setQuery(inputVal);
      setPage(1);
      getAndSetImages();
    }
  }

  return (
    <header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
