import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImages } from "@fortawesome/free-solid-svg-icons";
import { NewsItems } from "./NewsItems";
import { useForm } from "react-hook-form";
import { postNewsGroup, getAllGroupNews } from "../../actions";

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
  const news = props.GroupNews.reverse();
  let allNews;
  allNews = news.map((el, index) => {
    return <NewsItems data={el} key={el._id}></NewsItems>;
  });
  const maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 4) {
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
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line no-loop-func
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        console.log(files[x]);

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
      // if return true allow to setState
      // var output = document.getElementById("output");
      var imgBlokremove = document.getElementById("image-block");
      // var outputreomve = document.createElement("Img");

      if (imgBlokremove.hasChildNodes() ||imgBlokremove.childNodes.length > 0 ) {
        for (let index = 0; index <= imgBlokremove.childNodes.length; index++) {
          imgBlokremove.removeChild(imgBlokremove.childNodes[0])
        }
      }
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
    for (var key in e) {
      data.append(key, e[key]);
      if (e.imgCollection.length === 0) {
        data.delete("imgCollection");
      }
    }
    data.append("groupId", id);
    props.postNewsGroup(data);
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
      for (let index = 0; index <= imgBlok.childNodes.length; index++) {
        imgBlok.removeChild(imgBlok.childNodes[0])
      }
    }
  };
  return (
    <>
      <div className="pageContenair">
        <div className="postContenair">
          <div className="contenair">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="text-contenair">
                <textarea name="content" rows="4" ref={register} autoFocus />
                {errors.content && <p>content is required</p>}
              </div>
              <div className="file-contenair">
                <input
                  type="file"
                  name="imgCollection"
                  className="input"
                  onChange={handlefiles}
                  multiple
                  ref={register}
                ></input>
                <input
                  className="submit"
                  type="submit"
                  value="Post"
                ></input>
              </div>
              <div id="image-block"></div>
            </form>
          </div>
        </div>
        <div className="news-contenair">
          {allNews}
        </div>
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
  };
};

export default connect(mapStateToProps, { postNewsGroup, getAllGroupNews })(
  News
);
