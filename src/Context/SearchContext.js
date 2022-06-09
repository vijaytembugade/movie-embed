import { createContext, useContext, useEffect, useReducer } from "react";
import { debounce } from "../utils/debounce";
import { v4 as uuid } from "uuid";
const SearchContext = createContext();
const url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`; // dark

console.log(process.env.REACT_APP_API_KEY);

const SearchProvider = ({ children }) => {
  const initialState = {
    page: 1,
    text: "",
    data: [],
    loading: false,
    totalResult: 1,
  };

  const dataReducer = (state, action) => {
    switch (action.type) {
      case "SET_PAGE": {
        return { ...state, page: action.payload };
      }
      case "SET_TEXT": {
        return { ...state, text: action.payload };
      }
      case "SET_DATA": {
        return { ...state, data: action.payload };
      }
      case "SET_LOADING": {
        return { ...state, loading: action.payload };
      }
      case "SET_TOTAL_RESULTS": {
        return { ...state, totalResult: action.payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  const { page, text, data } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url + `s=${text}&page=${page}`);
        const result = await res.json();
        if (result.Response === "True") {
          dispatch({ type: "SET_LOADING", payload: true });
          dispatch({ type: "SET_TOTAL_RESULTS", payload: result.totalResults });
          if (result.Search.length > 0) {
            const structuredMovieData = result.Search.map(async (movie) => {
              async function fetchNewData() {
                const res = await fetch(url + `i=${movie.imdbID}`);
                const data = await res.json();
                return data;
              }
              const movieData = await fetchNewData();
              const requiredData = {
                key: uuid(),
                title: movieData.Title,
                releaseDate: movieData.Released,
                director: movieData.Director,
                genres: movieData.Genre,
                rating: movieData.Ratings.find(
                  (item) => item.Source === "Rotten Tomatoes"
                )?.Value,
              };
              return requiredData;
            });
            (async () => {
              const requiredData = await Promise.all(structuredMovieData);
              dispatch({ type: "SET_DATA", payload: requiredData });
              dispatch({ type: "SET_LOADING", payload: false });
            })();
          }
        } else {
          throw new Error("Result is not avaialble");
        }
      } catch (err) {
        dispatch({ type: "SET_DATA", payload: [] });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchData();
  }, [page, text]);

  function searchDispatch(text) {
    return dispatch({ type: "SET_TEXT", payload: text });
  }

  const debounceSearch = debounce(searchDispatch);

  const handleSearch = (e) => {
    debounceSearch(e.target.value.trim());
  };

  const handlePageChange = (number) => {
    dispatch({ type: "SET_PAGE", payload: number });
  };
  const handleDateChange = (dates = []) => {
    if (dates !== null) {
      const filterData = data?.filter(
        (movie) =>
          new Date(movie.releaseDate)?.getTime() > dates[0]?._d.getTime() &&
          new Date(movie.releaseDate)?.getTime() < dates[1]?._d.getTime()
      );

      dispatch({ type: "SET_DATA", payload: filterData });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        state,
        dispatch,
        handleSearch,
        handlePageChange,
        handleDateChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
