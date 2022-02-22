import useFetch from "../../../../utilities/hooks/useFetch";
import { useSelector } from "react-redux";
import hostUrl from "../../../../utilities/data/hostUrl";

import Display from "../../../UI/Display/Display";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const Albums = () => {
  const likedAlbums = useSelector((state) => state.user.user.likedAlbums);

  const { result, isLoading, error } = useFetch(`${hostUrl}/albums/${likedAlbums.length > 0 ? likedAlbums : "null"}`, {
    method: "GET",
  });

  if (error && likedAlbums.length > 0) return <h1>Something went wrong...</h1>;
  if (isLoading && likedAlbums.length > 0)
    return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (likedAlbums.length === 0) return <h1>No favourite albums found.</h1>;
  if (!result) return <></>;

  const albums = [...result].map((a) => {
    return { ...a, type: "album" };
  });

  return <Display heading="Albums" items={albums}></Display>;
};

export default Albums;
