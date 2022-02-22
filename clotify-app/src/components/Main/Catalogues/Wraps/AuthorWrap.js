import useFetch from "../../../../utilities/hooks/useFetch";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import AuthorCatalogue from "../AuthorCatalogue/AuthorCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const AuthorWrap = (props) => {
  const {
    result: authorResult,
    isLoading: isAuthorLoading,
    error: authorError,
  } = useFetch(`${hostUrl}/authors/${props.authorID}`, {
    method: "GET",
  });

  const albumsIDs = authorResult ? authorResult.albums.map((a) => a.id) : "";

  const {
    result: albumsResult,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useFetch(`${authorResult ? `${albumsIDs ? `${hostUrl}/albums/${albumsIDs}` : ""}` : ""}`, {
    method: "GET",
  });

  const songsIDs = albumsResult ? [] : "";

  if (albumsResult)
    albumsResult.forEach((a) => {
      a.songs.forEach((a) => songsIDs.push(a.id));
    });

  const songsUrl = songsIDs ? songsIDs.join(",") + "," : "";

  const {
    result: songsResult,
    isLoading: isSongsLoading,
    error: songsError,
  } = useFetch(`${albumsResult && authorResult ? `${songsUrl ? `${hostUrl}/songs/${songsUrl}` : ""}` : ""}`, {
    method: "GET",
  });

  if (authorError || albumsError || songsError) return <h1>Something went wrong...</h1>;
  if (isAuthorLoading) return <SpinningWheel isLoading={isAuthorLoading} className="catalogue-loading"></SpinningWheel>;
  if (isAlbumsLoading) return <SpinningWheel isLoading={isAlbumsLoading} className="catalogue-loading"></SpinningWheel>;
  if (isSongsLoading) return <SpinningWheel isLoading={isSongsLoading} className="catalogue-loading"></SpinningWheel>;
  if (!authorResult || !albumsResult || !songsResult) return <></>;

  const authorInfo = authorResult;
  const authorAlbums = albumsResult;
  const featuredSongs = songsResult.slice(0, 5);

  return (
    <>
      <CatalogueInfo type="author" heading={authorInfo.name} image={authorInfo.image}></CatalogueInfo>
      <AuthorCatalogue songs={featuredSongs} albums={authorAlbums} id={authorInfo._id}></AuthorCatalogue>
    </>
  );
};

export default AuthorWrap;
