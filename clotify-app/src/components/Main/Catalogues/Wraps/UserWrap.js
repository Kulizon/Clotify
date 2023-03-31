import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import shuffle from "./../../../../utilities/shuffle";
import hostUrl from "../../../../utilities/data/hostUrl";

import CatalogueInfo from "../CatalogueInfo/CatalogueInfo";
import UserCatalogue from "../UserCatalogue/UserCatalogue";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const UserWrap = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [user, setUser] = useState();

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (props.userID === currentUser._id) {
      setUser({ ...currentUser });
    } else {
      const fetchData = async () => {
        const response = await fetch(`${hostUrl}/users/${props.userID}`);
        const result = await response.json();
        setUser({ ...result });
      };
      fetchData();
    }
  }, [currentUser, props.userID]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      let songsIDs = "";
      const likedSongs = [...user.likedSongs];
      shuffle(likedSongs);
      for (let i = 0; i < 5; i++) {
        if (!likedSongs[i]) break;
        songsIDs += `${likedSongs[i]},`;
      }

      const response = await fetch(`${hostUrl}/songs/${songsIDs ? songsIDs : "null"}`);
      const result = await response.json();
      setFeaturedSongs([...result]);

      let albumsIDs = "";
      const likedAlbums = [...user.likedAlbums];
      shuffle(likedAlbums);
      for (let i = 0; i < 7; i++) {
        if (!likedAlbums[i]) break;
        albumsIDs += `${likedAlbums[i]},`;
      }

      if (albumsIDs === "") {
        setFeaturedAlbums([]);
        return;
      }

      const albumsResponse = await fetch(`${hostUrl}/albums/${albumsIDs.slice(0, -1)}`);
      const albumsResult = await albumsResponse.json();
      setFeaturedAlbums([...albumsResult]);
    };

    fetchData();
    setIsLoading(false);
  }, [user]);

  if (isLoading) return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;
  if (!user) return <></>;

  return (
    <>
      <CatalogueInfo type="user" heading={user.name} image={user.image}></CatalogueInfo>
      <UserCatalogue
        featuredAlbums={[...featuredAlbums].map((a) => {
          return { ...a, type: "album" };
        })}
        featuredSongs={featuredSongs}
      ></UserCatalogue>
    </>
  );
};

export default UserWrap;
