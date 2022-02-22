import hostUrl from "../../../../utilities/data/hostUrl";
import useFetch from "../../../../utilities/hooks/useFetch";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import AlbumCatalogue from "../AlbumCatalogue/AlbumCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const AlbumWrap = (props) => {
  const { result, isLoading, error } = useFetch(`${hostUrl}/albums/${props.albumID}`, { method: "GET" });

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (!result) return <></>;
  const albumInfo = result[0];

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
        songs={albumInfo.songs}
        name={albumInfo.name}
        image={albumInfo.image}
        author={albumInfo.author}
        id={albumInfo._id}
      ></AlbumCatalogue>
    </>
  );
};

export default AlbumWrap;
