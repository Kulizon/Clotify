import { useParams } from "react-router";

import styles from "./Library.module.css";

import Playlists from "./Playlists/Playlists";
import Albums from "./Albums/Albums";
import Podcasts from "./Podcasts/Podcasts";
import Authors from "./Authors/Authors";

import Catalogues from "../Catalogues/Catalogues";

const Library = () => {
  const params = useParams();

  let content;
  if (params.type === "playlists") content = <Playlists></Playlists>;
  else if (params.type === "podcasts") content = <Podcasts></Podcasts>;
  else if (params.type === "authors") content = <Authors></Authors>;
  else if (params.type === "albums") content = <Albums></Albums>;
  else {
    content = <Catalogues></Catalogues>;
  }

  return <main className={`${styles.library} main`}>{content}</main>;
};

export default Library;
