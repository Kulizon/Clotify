import { useParams } from "react-router";

import styles from "./AddModel.module.css";

import AdminAside from "../../AdminAside/AdminAside";
import SongForm from "../../Forms/SongForm";
import AlbumForm from "../../Forms/AlbumForm";
import PlaylistForm from "../../Forms/PlaylistForm";
import AuthorForm from "../../Forms/AuthorForm";
import PodcastForm from "../../Forms/PodcastForm";
import EpisodeForm from "../../Forms/EpisodeForm";

const AddModel = () => {
  const params = useParams();

  return (
    <main className={styles.main}>
      <AdminAside></AdminAside>
      <div>
        <h1>Add {params.model.slice(0, -1)}</h1>
        {params.model === "songs" && <SongForm></SongForm>}
        {params.model === "albums" && <AlbumForm></AlbumForm>}
        {params.model === "playlists" && <PlaylistForm></PlaylistForm>}
        {params.model === "authors" && <AuthorForm></AuthorForm>}
        {params.model === "podcasts" && <PodcastForm></PodcastForm>}
        {params.model === "episodes" && <EpisodeForm></EpisodeForm>}
      </div>
    </main>
  );
};

export default AddModel;
