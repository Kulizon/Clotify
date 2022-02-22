import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import Dropdown from "./Inputs/Dropdown/Dropdown";
import DateInput from "./Inputs/DateInput/DateInput";
import AddButtons from "./AddButtons/AddButtons";

const EpisodeForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nameRef = useRef();
  const audioRef = useRef();
  const episodeLengthRef = useRef();
  const imageRef = useRef();
  const podcastRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  let { podcasts } = useSelector((state) => state.admin.data);
  if (!podcasts) return <></>;

  podcasts = podcasts.map((a) => {
    return { value: a._id, label: a.name };
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !nameRef.current.value ||
      !imageRef.current.value ||
      !descriptionRef.current.value ||
      !audioRef.current.value ||
      !episodeLengthRef.current.value ||
      !podcastRef.current.props.value
    )
      return;

    const newEpisode = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      audio: audioRef.current.value,
      podcast: podcastRef.current.props.placeholder,
      podcastID: podcastRef.current.props.value,
      description: descriptionRef.current.value,
      episodeLength: episodeLengthRef.current.value,
      date: dateRef.current.value,
    };

    let url = `${hostUrl}/episodes/create`;

    if (props.toChange) url = `${hostUrl}/episodes/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newEpisode),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/episodes");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        imageRef.current.value = "";
        podcastRef.current.setValue("");
        descriptionRef.current.value = "";
        episodeLengthRef.current.value = "";
        audioRef.current.value = "";
        dateRef.current.value = "";
      }
    } else {
      console.log(result.message);
    }
  };

  const episodeInfo = props.episodeToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}
      <form onSubmit={submitHandler}>
        <TextInput label="Name:" inputRef={nameRef} defaultValue={episodeInfo && episodeInfo.name}></TextInput>
        <TextInput label="Audio:" inputRef={audioRef} defaultValue={episodeInfo && episodeInfo.audio}></TextInput>
        <TextInput
          label="Episode Length:"
          inputRef={episodeLengthRef}
          defaultValue={episodeInfo && episodeInfo.episodeLength}
        ></TextInput>
        <TextInput label="Image:" inputRef={imageRef} defaultValue={episodeInfo && episodeInfo.image}></TextInput>
        <Dropdown
          label="Podcast:"
          inputRef={podcastRef}
          options={podcasts}
          defaultValue={episodeInfo && { label: episodeInfo.podcast, value: episodeInfo.podcastID }}
          className={episodeInfo && "disabled"}
        ></Dropdown>
        <TextInput
          label="Description:"
          inputRef={descriptionRef}
          defaultValue={episodeInfo && episodeInfo.description}
        ></TextInput>

        <DateInput
          label="Date:"
          inputRef={{ dateRef }}
          defaultValue={episodeInfo && { date: episodeInfo.date }}
        ></DateInput>
        <AddButtons model="authors"></AddButtons>
      </form>
    </>
  );
};

export default EpisodeForm;
