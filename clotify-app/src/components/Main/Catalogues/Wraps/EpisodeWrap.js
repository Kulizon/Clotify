import useFetch from "../../../../utilities/hooks/useFetch";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import EpisodeCatalogue from "../EpisodeCatalogue/EpisodeCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const EpisodeWrap = (props) => {
  const { result, isLoading, error } = useFetch(`${hostUrl}/episodes/${props.episodeID},`, { method: "GET" });

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (!result) return <></>;
  const episodeInfo = result[0];

  return (
    <>
      <CatalogueInfo
        type="podcast-episode"
        heading={episodeInfo.name}
        image={episodeInfo.image}
        author={episodeInfo.podcast}
      ></CatalogueInfo>
      <EpisodeCatalogue episode={episodeInfo}></EpisodeCatalogue>
    </>
  );
};

export default EpisodeWrap;
