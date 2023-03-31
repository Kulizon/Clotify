import { useState, useEffect } from "react";
import useFetch from "../../../../utilities/hooks/useFetch";
import { useSelector } from "react-redux";
import shuffle from "../../../../utilities/shuffle";
import hostUrl from "../../../../utilities/data/hostUrl";

import FeaturedContainer from "../../../UI/FeaturedContainer/FeaturedContainer";
import Display from "../../../UI/Display/Display";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const Podcasts = () => {
  const { likedPodcasts: likedPodcastsIDs, likedEpisodes } = useSelector((state) => state.user.user);

  const [episodesExamples, setEpisodesExamples] = useState([]);

  const {
    result: podcastsResult,
    isLoading: isPodcastsLoading,
    error: podcastsError,
  } = useFetch(`${hostUrl}/podcasts/${likedPodcastsIDs.length > 0 ? likedPodcastsIDs.join(",") : "null"}`, {
    method: "GET",
  });

  useEffect(() => {
    const getData = async () => {
      if (likedEpisodes.length !== 0) {
        const shuffledEpisodes = [...likedEpisodes];
        shuffle(shuffledEpisodes);

        const response = await fetch(`${hostUrl}/episodes/${shuffledEpisodes.slice(0, 5).join(",")}`);
        const result = await response.json();
        setEpisodesExamples(result);
      }
    };

    getData();
  }, [likedEpisodes, likedPodcastsIDs]);

  if (podcastsError && likedPodcastsIDs.length > 0) return <h1>Something went wrong...</h1>;
  if (isPodcastsLoading && likedPodcastsIDs.length > 0)
    return <SpinningWheel isLoading={isPodcastsLoading} className="catalogue-loading"></SpinningWheel>;

  let likedPodcasts = [];
  if (podcastsResult) {
    likedPodcasts = [...podcastsResult].map((p) => {
      return { ...p, type: "podcast" };
    });
  }

  return (
    <>
      <Display heading="Podcasts" items={likedPodcasts}>
        <FeaturedContainer
          heading="Your episodes"
          subheading={`${likedEpisodes.length} favourite episodes`}
          to="/library/your-episodes"
          description={
            <div>
              {episodesExamples.map((e) => (
                <p key={e.name}>{e.name} • </p>
              ))}
            </div>
          }
          alternative={true}
        ></FeaturedContainer>
      </Display>
    </>
  );
};

export default Podcasts;
