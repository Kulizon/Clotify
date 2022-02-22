import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import AddButtons from "./AddButtons/AddButtons";

const PodcastForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nameRef = useRef();
  const imageRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !imageRef.current.value || !authorRef.current.value || !descriptionRef.current.value)
      return;

    const newPodcast = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
    };

    let url = `${hostUrl}/podcasts/create`;

    if (props.toChange) url = `${hostUrl}/podcasts/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPodcast),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/podcasts");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        imageRef.current.value = "";
        authorRef.current.value = "";
        descriptionRef.current.value = "";
      }
    } else {
      console.log(result.message);
    }
  };

  const podcastInfo = props.podcastToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}
      <form onSubmit={submitHandler}>
        <TextInput label="Name:" inputRef={nameRef} defaultValue={podcastInfo && podcastInfo.name}></TextInput>
        <TextInput label="Image:" inputRef={imageRef} defaultValue={podcastInfo && podcastInfo.image}></TextInput>
        <TextInput label="Author:" inputRef={authorRef} defaultValue={podcastInfo && podcastInfo.author}></TextInput>
        <TextInput
          label="Description:"
          inputRef={descriptionRef}
          defaultValue={podcastInfo && podcastInfo.description}
        ></TextInput>
        <AddButtons model="authors"></AddButtons>
      </form>
    </>
  );
};

export default PodcastForm;
