import styles from "./ModelsDisplay.module.css";

import Group from "./Group/Group";

const ModelsDisplay = () => {
  return (
    <main className={styles.main}>
      <h1>Site Administration</h1>
      <Group heading="Authentication" models={[{ name: "Users" }]} hideLinks={true}></Group>
      <Group
        heading="Clotify"
        models={[
          { name: "Songs" },
          { name: "Albums" },
          { name: "Authors" },
          { name: "Playlists" },
          { name: "Episodes" },
          { name: "Podcasts" },
        ]}
        displayChange={true}
      ></Group>
    </main>
  );
};

export default ModelsDisplay;
