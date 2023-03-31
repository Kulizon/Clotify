
import useFetch from "../../../../utilities/hooks/useFetch";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import PlaylistCatalogue from "../PlaylistCatalogue/PlaylistCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const PlaylistWrap = (props) => {
  const { result, isLoading, error } = useFetch(`${hostUrl}/playlists/${props.playlistID}`, { method: "GET" });

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (!result) return <></>;
  const playlistInfo = result;

  return (
    <>
      <CatalogueInfo
        type="playlist"
        heading={playlistInfo.name}
        image={playlistInfo.image}
        authorProfilePicture=""
        author={playlistInfo.author}
        amount={`${playlistInfo.songs.length} tracks`}
      ></CatalogueInfo>
      <PlaylistCatalogue
        id={playlistInfo._id}
        songs={playlistInfo.songs}
        author={playlistInfo.author}
        authorID={playlistInfo.authorID}
        name={playlistInfo.name}
        image={playlistInfo.image}
      ></PlaylistCatalogue>
    </>
  );
};

export default PlaylistWrap;
