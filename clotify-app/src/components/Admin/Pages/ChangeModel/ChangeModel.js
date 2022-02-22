import { useParams } from "react-router";
import { useSelector } from "react-redux";

import styles from "./ChangeModel.module.css";

import AdminAside from "../../AdminAside/AdminAside";
import SongForm from "./../../Forms/SongForm";
import AlbumForm from "./../../Forms/AlbumForm";
import AuthorForm from "./../../Forms/AuthorForm";
import PlaylistForm from "./../../Forms/PlaylistForm";
import PodcastForm from "../../Forms/PodcastForm";
import EpisodeForm from "../../Forms/EpisodeForm";

const ChangeModel = () => {
  const { model, id } = useParams();
  const items = useSelector((state) => state.admin.data[model]);
  if (!items) return <></>;

  const item = items.filter((i) => i._id === id)[0];

  return (
    <main className={styles.main}>
      <AdminAside></AdminAside>
      <div>
        <h1>Change {model.slice(0, -1)}</h1>
        {model === "songs" && <SongForm songToChange={item} toChange={true}></SongForm>}
        {model === "albums" && <AlbumForm albumToChange={item} toChange={true}></AlbumForm>}
        {model === "playlists" && <PlaylistForm playlistToChange={item} toChange={true}></PlaylistForm>}
        {model === "authors" && <AuthorForm authorToChange={item} toChange={true}></AuthorForm>}
        {model === "podcasts" && <PodcastForm podcastToChange={item} toChange={true}></PodcastForm>}
        {model === "episodes" && <EpisodeForm episodeToChange={item} toChange={true}></EpisodeForm>}
      </div>
    </main>
  );
};

export default ChangeModel;
