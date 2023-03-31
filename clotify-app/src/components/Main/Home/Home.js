import { useSelector } from "react-redux";

import styles from "./Home.module.css";

import Display from "./../../UI/Display/Display";
import Latest from "./Latest/Latest";

const Home = () => {
  const mixes = useSelector((state) => state.user.mixes);
  const propositions = useSelector((state) => state.home.propositions);

  return (
    <main className={`main ${styles.home}`}>
      <h1>Good Morning</h1>
      <Latest></Latest>
      <Display heading="Created for You" items={mixes}></Display>
      {propositions.map((p, index) => {
        return (
          <Display
            heading={`For ${propositions[index][0].author} fans`}
            key={propositions[index][0].author}
            items={p}
          ></Display>
        );
      })}
    </main>
  );
};

export default Home;
