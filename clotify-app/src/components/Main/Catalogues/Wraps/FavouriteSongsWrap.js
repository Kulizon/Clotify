import useFetch from "../../../../utilities/hooks/useFetch";
import { useSelector } from "react-redux";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import PlaylistCatalogue from "../PlaylistCatalogue/PlaylistCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const FavouriteSongsWrap = (props) => {
  const { likedSongs, username } = useSelector((state) => state.user.user);

  const { result, isLoading, error } = useFetch(`${hostUrl}/songs/${likedSongs.join(",")},`, { method: "GET" });

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (!result) return <></>;
  const songs = result;

  return (
    <>
      <CatalogueInfo
        type="playlist"
        heading={"Favourite Songs"}
        image={"https://dohouse.pl/wp-content/uploads/2021/12/liked.png"}
        authorProfilePicture=""
        author={username}
        amount={`${likedSongs.length} tracks`}
      ></CatalogueInfo>
      <PlaylistCatalogue songs={songs} hideFavourite={true}></PlaylistCatalogue>
    </>
  );
};

export default FavouriteSongsWrap;
