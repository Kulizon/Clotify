import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import AddButtons from "./AddButtons/AddButtons";

const AuthorForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nameRef = useRef();
  const imageRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !imageRef.current.value) return;

    const newAuthor = {
      name: nameRef.current.value,
      image: imageRef.current.value,
    };

    let url = `${hostUrl}/authors/create`;

    if (props.toChange) url = `${hostUrl}/authors/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newAuthor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/authors");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        imageRef.current.value = "";
      }
    } else {
      console.log(result.message);
    }
  };

  const authorInfo = props.authorToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}
      <form onSubmit={submitHandler}>
        <TextInput label="Name:" inputRef={nameRef} defaultValue={authorInfo && authorInfo.name}></TextInput>
        <TextInput label="Image:" inputRef={imageRef} defaultValue={authorInfo && authorInfo.image}></TextInput>
        <AddButtons model="authors"></AddButtons>
      </form>
    </>
  );
};

export default AuthorForm;
