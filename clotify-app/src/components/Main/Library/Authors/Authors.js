import useFetch from "../../../../utilities/hooks/useFetch";
import { useSelector } from "react-redux";
import hostUrl from "../../../../utilities/data/hostUrl";

import Display from "../../../UI/Display/Display";
import SpinningWheel from "../../../UI/SpinningWheel/SpinningWheel";

const Authors = () => {
  const following = useSelector((state) => state.user.user.following);

  const { result, isLoading, error } = useFetch(
    `${hostUrl}/authors/multiple/${following.length > 0 ? following : "null"}`,
    { method: "GET" }
  );

  if (error && following.length > 0) return <h1>Something went wrong...</h1>;
  if (isLoading && following.length > 0)
    return <SpinningWheel isLoading={isLoading} className="catalogue-loading"></SpinningWheel>;

  if (following.length === 0) return <h1>No followed artists found.</h1>;
  if (!result) return <></>;

  const authors = [...result].map((a) => {
    return { ...a, type: "author" };
  });

  return <Display heading="Authors" items={authors}></Display>;
};

export default Authors;
