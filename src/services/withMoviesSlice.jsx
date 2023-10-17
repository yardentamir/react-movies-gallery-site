import { actions as favoriteActions } from "features/favoritesSlice";
import { actions as nowPlayingActions } from "features/nowPlayingSlice";
import { actions as popularActions } from "features/popularSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../features/favoritesSlice";
import { fetchNowPlaying } from "../features/nowPlayingSlice";
import { fetchPopular } from "../features/popularSlice";
import { FAVORITE, NOW_PLAYING, POPULAR } from "../pages/home/constants";

export function withMoviesSlice(WrappedComponent) {
  return function WithMoviesSlice(props) {

    const [selectedFilter, setSelectedFilter] = useState(POPULAR);
    const [actions, setActions] = useState(popularActions);
    const state = useSelector((state) => state[selectedFilter]);
    const dispatch = useDispatch();

    const favoritesIds = JSON.parse(sessionStorage.getItem("favorites"));
    const newIds = favoritesIds?.filter((id) => !state.movies?.includes(id));
    // console.log("New IDs in the second array:", newIds);

    useEffect(() => {
      console.log("sending...", state.counter)
      switch (selectedFilter) {

        case POPULAR:
          setActions(popularActions);
          if (state.movies?.length <= 0) {
            dispatch(fetchPopular(state.page));
          }
          break;

        case FAVORITE:
          setActions(favoriteActions);
          dispatch(fetchFavorites({ newIds, favoritesIds }));
          break;

        case NOW_PLAYING:
          setActions(nowPlayingActions);
          if (state.movies?.length <= 0) {
            dispatch(fetchNowPlaying(state.page));
          }
          break;

        default:
          setActions(popularActions);
          if (state.movies?.length <= 0) {
            dispatch(fetchPopular(state.page));
          }
          break;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilter]);


    const handleScroll = useCallback((e) => {
      e.preventDefault();
      if (state.hasMore) {
        const scrollTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        const scrollHeight =
          (document.documentElement && document.documentElement.scrollHeight) ||
          document.body.scrollHeight;
        const clientHeight =
          document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
          if (selectedFilter === POPULAR) {

            dispatch(fetchPopular(state.page + 1));
          }
          else if (selectedFilter === NOW_PLAYING) {

            dispatch(fetchNowPlaying(state.page + 1));
          }

          dispatch(actions.pageIncrement());

        }
      }
    }, [dispatch, state.hasMore, state.page, selectedFilter, actions]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [handleScroll]);

    const onChangeFilter = (filterName) => {
      setSelectedFilter(filterName);
      actions?.resetCounter();
      window.scrollTo({ top: 0, behavior: 'smooth' });


      switch (filterName) {
        case POPULAR:
          dispatch(popularActions.resetCounter());
          break;

        case FAVORITE:
          dispatch(favoriteActions.resetCounter());
          break;

        case NOW_PLAYING:
          dispatch(nowPlayingActions.resetCounter());
          break;

        default:
          dispatch(popularActions.resetCounter());
          break;
      }
    }


    return <WrappedComponent {...props} {...state} onChangeFilter={onChangeFilter} />;
  };
}