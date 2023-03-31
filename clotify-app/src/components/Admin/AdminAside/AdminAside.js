import styles from "./AdminAside.module.css";

import Group from "../Pages/ModelsDisplay/Group/Group";

const AdminAside = () => {
  return (
    <aside className={styles.aside}>
      <Group heading="Authentication" models={[{ name: "Users" }]} displayChage={false} hideLinks={true}></Group>
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
      ></Group>
    </aside>
  );
};

export default AdminAside;
