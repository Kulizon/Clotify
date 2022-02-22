import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import shuffle from "./../../../../utilities/shuffle";
import hostUrl from "../../../../utilities/data/hostUrl";

import Display from "../../../UI/Display/Display";
import FeaturedContainer from "../../../UI/FeaturedContainer/FeaturedContainer";

const Playlists = () => {
  const { likedSongs, playlists } = useSelector((state) => state.user.user);
  const [songsExamples, setSongsExamples] = useState([]);

  useEffect(() => {
    if (likedSongs.length === 0) return;

    const shuffledSongs = [...likedSongs];
    shuffle(shuffledSongs);

    const getData = async () => {
      const response = await fetch(`${hostUrl}/songs/${shuffledSongs.slice(0, 5).join(",")}`);
      const result = await response.json();
      setSongsExamples(result);
    };
    getData();
  }, [likedSongs]);

  const userPlaylists = playlists.filter((p) => p.type === "playlist");

  return (
    <>
      <Display heading="Playlists" items={userPlaylists}>
        <FeaturedContainer
          heading="Favourite Songs"
          subheading={`${likedSongs.length} favourite tracks`}
          to="/library/favourite-songs"
          description={
            <div>
              {songsExamples.map((s) => (
                <p key={s.name}>
                  <span>{s.author} </span>- {s.name} •{" "}
                </p>
              ))}
            </div>
          }
        ></FeaturedContainer>
      </Display>
    </>
  );
};

export default Playlists;
