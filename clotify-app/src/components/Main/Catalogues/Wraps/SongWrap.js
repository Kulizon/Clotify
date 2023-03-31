import useFetch from "../../../../utilities/hooks/useFetch";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import AlbumCatalogue from "../AlbumCatalogue/AlbumCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const SongWrap = (props) => {
  const {
    result: songResult,
    isLoading: isSongLoading,
    error: songError,
  } = useFetch(`${hostUrl}/songs/${props.songID},`, {
    method: "GET",
  });

  const {
    result: albumResult,
    isLoading: isAlbumLoading,
    error: albumError,
  } = useFetch(`${songResult ? `${hostUrl}/albums/${songResult[0].albumID}` : ""}`, { method: "GET" });

  if (songError || albumError) return <h1>Something went wrong...</h1>;
  if (isSongLoading) return <SpinningWheel isLoading={isSongLoading} className="catalogue-loading"></SpinningWheel>;
  if (isAlbumLoading) return <SpinningWheel isLoading={isAlbumLoading} className="catalogue-loading"></SpinningWheel>;
  if (!songResult || !albumResult) return <></>;

  const songInfo = songResult[0];
  const albumInfo = albumResult[0];

  return (
    <>
      <CatalogueInfo
        type="album"
        heading={albumInfo.name}
        image={albumInfo.image}
        authorProfilePicture=""
        author={albumInfo.author}
        amount={`${albumInfo.songs.length} tracks`}
      ></CatalogueInfo>
      <AlbumCatalogue
        id={albumInfo._id}
        name={albumInfo.name}
        songs={albumInfo.songs}
        image={albumInfo.image}
        author={albumInfo.author}
        highlightedID={songInfo._id}
      ></AlbumCatalogue>
    </>
  );
};

export default SongWrap;
