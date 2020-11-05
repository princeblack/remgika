import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImages } from "@fortawesome/free-solid-svg-icons";
import NewsItems from "./NewsItems";
import { useForm } from "react-hook-form";
import { postNewsGroup, getAllGroupNews, deleteNews } from "../../actions";
import TextareaAutosize from "react-autosize-textarea";

const News = (props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  useEffect(() => {
    const id = props.data._id;
    props.getAllGroupNews(id);
  }, [props.data._id]);
  useEffect(() => {
    const id = props.data._id;
    if (props.addNewsGroup) {
      props.getAllGroupNews(id);
    }
  }, [props.addNewsGroup]);
  useEffect(() => {
    if (props.deleteGroupNew) {
      const id = props.data._id;
      props.getAllGroupNews(id);
    }
  }, [props.deleteGroupNew]);

  const news = props.GroupNews;
  let allNews;
  allNews = news.map((el, index) => {
    return <NewsItems data={el} key={el._id}></NewsItems>;
  });
  const maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    const check = document.querySelector(".iAmAlert");
    if (check) {
      check.remove();
    }
    var imgBlok = document.getElementById("image-block");
    if (imgBlok.hasChildNodes()) {
      for (let index = 0; index < imgBlok.childNodes.length; index++) {
        if (imgBlok.hasChildNodes()) {
          imgBlok.removeChild(imgBlok.childNodes[index]);
          index--;
        }
      }
    }
    if (files.length > 4) {
      const div = document.querySelector(".text-contenair");
      const input = document.querySelector(".text-contenair");
      const alert = document.createElement("div");
      alert.className = "iAmAlert";
      alert.style.color = "red";
      alert.style.fontSize = "20px";
      alert.style.fontWeight = "400";
      alert.innerHTML = "You can only choose a maximum of 4 photos";
      div.appendChild(alert);
      var imgBlok = document.getElementById("image-block");
      if (imgBlok.hasChildNodes()) {
        for (let index = 0; index < imgBlok.childNodes.length; index++) {
          if (imgBlok.hasChildNodes()) {
            imgBlok.removeChild(imgBlok.childNodes[index]);
            index--;
          }
        }
      }
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line no-loop-func
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container

        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  const handlefiles = (event) => {
    if (maxSelectFile(event) && checkMimeType(event)) {
      for (let index = 0; index < event.target.files.length; index++) {
        var imgBlok = document.getElementById("image-block");
        var output = document.createElement("Img");
        output.src = URL.createObjectURL(event.target.files[index]);
        // eslint-disable-next-line no-loop-func
        output.onload = () => {
          URL.revokeObjectURL(output.src); // free memory
        };
        imgBlok.appendChild(output);
      }
    }
  };

  const onSubmit = (e) => {
    const data = new FormData();
    const id = props.data._id;
    if (e.imgCollection.length > 0) {
      for (const key of Object.keys(e.imgCollection)) {
        data.append("imgCollection", e.imgCollection[key]);
      }
    }
    // if (e.imgCollection.length === 0) {
    //   data.delete("imgCollection");
    // }
    
    if (e.content) {
      data.append("content", `${e.content}`);
    }
    data.append("groupId", id);
    if (e.content || e.imgCollection.length > 0) {
      props.postNewsGroup(data);
    }
    
    reset(
      {
        content: "",
        imgCollection: "",
      },
      {
        errors: true, // errors will not be reset
        dirtyFields: true, // dirtyFields will not be reset
        dirty: true, // dirty will not be reset
        isSubmitted: false,
        touched: false,
        isValid: false,
        submitCount: false,
      }
    );
    var imgBlok = document.getElementById("image-block");
    if (imgBlok.hasChildNodes()) {
      for (let index = 0; index < imgBlok.childNodes.length; index++) {
        if (imgBlok.hasChildNodes()) {
          imgBlok.removeChild(imgBlok.childNodes[index]);
          index--;
        }
      }
    }
  };
  let member = false;
  if (props.info.group) {
    for (let i = 0; i < props.info.group.length; i++) {
      if (props.data._id === props.info.group[i]) {
        member = true;
      }
    }
  }
  return (
    <>
      <div className="pageContenair">
        {member && (
          <div className="postContenair">
            <div className="contenair">
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-contenair">
                  <TextareaAutosize
                    name="content"
                    rows="4"
                    ref={register}
                    autoFocus
                  ></TextareaAutosize>
                  {errors.content && <p>content is required</p>}
                </div>
                <div className="file-contenair">
                  <input
                    type="file"
                    name="imgCollection"
                    className="input"
                    onChange={handlefiles}
                    multiple
                    accept=".png, .jpg, .jpeg, .gif"
                    ref={register}
                  ></input>
                  <input className="submit" type="submit" value="Post"></input>
                </div>
                <div id="image-block"></div>
              </form>
            </div>
          </div>
        )}

        <div className="news-contenair">{allNews}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    GroupNews: state.GroupNews,
    addNewsGroup: state.addNewsGroup,
    deleteGroupNew: state.deleteGroupNew,
  };
};

export default connect(mapStateToProps, {
  postNewsGroup,
  getAllGroupNews,
  deleteNews,
})(News);
