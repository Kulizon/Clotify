import useFetch from "../../../../utilities/hooks/useFetch";
import { useSelector } from "react-redux";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import PodcastCatalogue from "../PodcastCatalogue/PodcastCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

import favouriteEpisodes from "./../../../../assets/Images/favouriteEpisodes.png";

const FavouriteEpisodesWrap = () => {
  const { likedEpisodes, username } = useSelector((state) => state.user.user);

  const { result, isLoading, error } = useFetch(
    `${hostUrl}/episodes/${likedEpisodes.join(",")},`,
    { method: "GET" }
  );

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading)
    return (
      <SpinningWheel
        isLoading={isLoading}
        className="catalogue-loading"
      ></SpinningWheel>
    );

  if (!result) return <></>;
  const episodes = result;

  return (
    <>
      <CatalogueInfo
        type="playlist"
        heading="Your Episodes"
        image={favouriteEpisodes}
        author={username}
        amount={`${likedEpisodes.length} episodes`}
      ></CatalogueInfo>
      <PodcastCatalogue
        episodes={episodes}
        hideFollow={true}
        hideDescription={true}
      ></PodcastCatalogue>
    </>
  );
};

export default FavouriteEpisodesWrap;
