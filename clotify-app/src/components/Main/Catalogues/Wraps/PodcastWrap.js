import useFetch from "../../../../utilities/hooks/useFetch";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import PodcastCatalogue from "../PodcastCatalogue/PodcastCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const PodcastWrap = (props) => {
  const { result, isLoading, error } = useFetch(`${hostUrl}/podcasts/${props.podcastID}`, { method: "GET" });

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (!result) return <></>;
  const podcastInfo = result[0];

  return (
    <>
      <CatalogueInfo
        type="podcast"
        heading={podcastInfo.name}
        image={podcastInfo.image}
        author={podcastInfo.author}
        amount={`${podcastInfo.episodes.length} episodes`}
      ></CatalogueInfo>
      <PodcastCatalogue
        episodes={podcastInfo.episodes}
        description={podcastInfo.description}
        id={podcastInfo._id}
      ></PodcastCatalogue>
    </>
  );
};

export default PodcastWrap;
