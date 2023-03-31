import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import Dropdown from "./Inputs/Dropdown/Dropdown";
import DateInput from "./Inputs/DateInput/DateInput";
import AddButtons from "./AddButtons/AddButtons";

const AlbumForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nameRef = useRef();
  const imageRef = useRef();
  const authorRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  let { authors } = useSelector((state) => state.admin.data);
  if (!authors) return <></>;

  authors = authors.map((a) => {
    return { value: a._id, label: a.name };
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !imageRef.current.value) return;

    const newAlbum = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      author: authorRef.current.props.placeholder,
      authorID: authorRef.current.props.value,
      date: dateRef.current.value,
    };

    let url = `${hostUrl}/albums/create`;

    if (props.toChange) url = `${hostUrl}albums/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newAlbum),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/albums");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        imageRef.current.value = "";
        authorRef.current.setValue("");
        dateRef.current.value = "";
      }
    } else {
      console.log(result.message);
    }
  };

  const albumInfo = props.albumToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}
      <form onSubmit={submitHandler}>
        <TextInput label="Name:" inputRef={nameRef} defaultValue={albumInfo && albumInfo.name}></TextInput>
        <TextInput label="Image:" inputRef={imageRef} defaultValue={albumInfo && albumInfo.image}></TextInput>
        <Dropdown
          label="Author:"
          inputRef={authorRef}
          options={authors}
          defaultValue={albumInfo && { label: albumInfo.author, value: albumInfo.authorID }}
          className={albumInfo && "disabled"}
        ></Dropdown>
        <DateInput
          label="Date:"
          inputRef={{ dateRef, timeRef }}
          defaultValue={albumInfo && { date: albumInfo.date, time: albumInfo.time }}
        ></DateInput>
        <AddButtons></AddButtons>
      </form>
    </>
  );
};

export default AlbumForm;
