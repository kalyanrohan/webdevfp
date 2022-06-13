import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Badge } from "react-bootstrap";
import { useUpdateUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/bot.jpeg";
import { AppContext } from "../context/appContext";
import ImageUploading from 'react-images-uploading';


const Ktp = () => {
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [updateUser, { isLoading, error }] = useUpdateUserMutation();
    const navigate = useNavigate();
    const maxNumber = 1;
    const [final, setFinal]= useState();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { socket } = useContext(AppContext);
    const [images, setImages] = useState([]);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setFinal(imageList);
        console.log(imageList[0].data_url)
      };
    
    const onSubmit = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setFinal(imageList);
        console.log(imageList[0].data_url)
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "GoodHeadUploadSetting");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dqzeq3nyp/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function handleSignup(e) {
        // signup the user
        updateUser({name}).then(({ data }) => {
            if (data) {
                socket.emit("new-user");
                console.log(data);
                navigate("/chat");
            }
        });
    }
    return (
        <Container>
            <Row>
                <Col className="d-flex align-items-center justify-content-center flex-direction-row">
                <div>
                <h1>
                    Verify Image 
                </h1>
                </div>
                <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                  <button onClick={onSubmit}>Submit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

                </Col>
            </Row>
        </Container>
    );

}
export default Ktp;
