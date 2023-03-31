import useWindowDimensions from "../../../utilities/hooks/useWIndowDimensions";

import styles from "./Display.module.css";

import Container from "./../Container/Container";

const Display = (props) => {
  const { width } = useWindowDimensions();

  let items = [...props.items];

  if (width > 1800) {
    items = items.slice(0, 6);
  } else if (width > 1500) {
    items = items.slice(0, 5);
  } else if (width > 1200) {
    items = items.slice(0, 4);
  } else if (width > 1000) {
    items = items.slice(0, 6);
  } else {
    items = items.slice(0, 4);
  }

  return (
    <div className={styles.display}>
      <h2>{props.heading}</h2>
      <div>
        {props.children}
        {items.map((p) => (
          <Container
            id={p._id || p.id}
            key={p._id || p.id || p.name}
            heading={p.name}
            description={p.description || p.author}
            image={p.image}
            mixColor={p.mixColor}
            type={p.type}
            history={props.history}
            songs={p.songs}
            audio={p.audio}
            countToHistory={props.countToHistory}
          ></Container>
        ))}
      </div>
    </div>
  );
};

export default Display;
