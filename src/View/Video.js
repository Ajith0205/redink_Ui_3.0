import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../Service/Constant';
import '../Style/Video.css';
function Video() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [url, setUrl] = useState();

  const [showPopup, setShowPopup] = useState(false);



  useEffect(() => {
    allVideos()
  }, [])
  const token = localStorage.getItem("token");
  // console.log("token",token);

  const config2 = {

    headers: { Authorization: `${token}` },
    // 'content-type': 'multipart/form-data',

  }
  const config1 = {
    headers: { Authorization: `${token}` },
    responseType: "blob",
    'content-type': 'application/json',
  };


  const allVideos = () => {
  
    axios({
      method: "get",
      headers: { Authorization: token },
      url: "http://192.168.1.143:8008/videoUpload/videoList",
      //data:inputs
    }).then((response) => {
      console.log(response);
      // setEventData(response.data.dto.eventList)

      setVideoUrls(response?.data?.dto?.videoUploadsList)
    }, error => {
      console.log(error);
    })



  }
  const isButtonVisible = false;

  // useEffect(()=>{
  //     downloadVideo()
  // },[])

  // const downloadVideo1 = (videoId) => {
  //   axios({
  //     url: `http://192.168.1.143:8008/videoUpload/download/${videoId}`,
  //     method: 'GET',
  //     responseType: 'blob',
  //     headers: {
  //         Authorization: `${token}`, // Replace with your actual token
  //       },
  //   })
  //     .then((response) => {
  //       const blob = new Blob([response.data], { type: 'video/mp4' });
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = 'video.mp4';
  //       document.body.appendChild(link);
  //       link.click();
  //       URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.error('Error downloading video:', error);
  //     });
  // };




  const downloadVideo = (id) => {
    axios.get(Base_Url+"videoUpload/downloadVideo/" + id, config1).then((res) => {
      
      const href = URL.createObjectURL(res.data);

      var filename = res.headers.pragma;
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {
      console.error('Error during download:', error);
    });
  }




  //    const downloadVideo = (id) => {
  //         const videoUrl =  ("url", "http://192.168.1.143:8008/videoUpload/downloadVideo/"+id ); 

  //         axios.get(videoUrl, {
  //           responseType: 'blob', // Set the response type to 'blob'
  //         })
  //         .then(response => {
  //           const blob = new Blob([response.data], { type: 'video/mp4' });
  //           const url = URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.setAttribute('download', 'video.mp4');
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //         })
  //         .catch(error => {
  //           console.error('Error downloading video:', error);
  //         });
  //       }



  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const [multiSelectedFile, setMultiSelectedFile] = useState(null);
  const [multititle, setMultiTitle] = useState('');
  const [multidescription, setMultiDescription] = useState('');

  const handleFileChange = (event) => {
    // alert("in");
    console.log("event", event?.target?.files[0]);
    setSelectedFile(event?.target?.files[0]);
  };

  const handleMultiFileChange = (e) => {
    console.log("...e.target.files", e.target.files);
    const filesArray = Array.from(e.target.files);
    setMultiSelectedFile(filesArray)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleMultiTitleChange = (event) => {
    setMultiTitle(event.target.value);
  };

  const handleMultiDescriptionChange = (event) => {
    setMultiDescription(event.target.value);
  };

  const deleteVideo = (id) => {
    axios({
      method: "delete",
      headers: { Authorization: token },
      url: Base_Url + "videoUpload/delete/" + id,
    }).then((response) => {
      console.log(response);
      allVideos();
    }, error => {
      console.log(error);
    })
  }

  const handleUpload = () => {

    const url = Base_Url + "videoUpload/upload?title=" + title + "&description=" + description;
    const formData = new FormData()
    formData.append('file', selectedFile)
    // formData.append('fileName', selectedFile.name)

    // console.log("url", url);
    // console.log("formdata", formData);
    // console.log("config2", config2);

    axios.post(url, formData, config2).then((res) => {
      if (res.data?.status) {
        console.log("Upload", res);
        allVideos()
      }
    })
  }

  const handlemultiUpload = () => {
    // alert("in")
    const url = Base_Url + "videoUpload/uploadVideos?title=" + multititle + "&description=" + multidescription;
    const formData = new FormData();
    // formData.append('files', multiSelectedFile);
    // Append all selected files to the formData
    multiSelectedFile.forEach((file) => {
      console.log("file", file);
      formData.append('file', file);
    });
    // console.log("url", url);
    // console.log("formdata", formData);
    // console.log("config2", config2);

    axios.post(url, formData, config2).then((res) => {
      if (res.data?.status) {
        // console.log("multiUpload", res);
        allVideos()

        setMultiDescription("")
        setMultiTitle("")
        setMultiSelectedFile("")
        window.location.reload();

      }
    })
  }

  return (
    < >
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Videos</h3>
  
          <span onClick={() => setShowPopup(true)} style={{ float: 'right', cursor: 'pointer', marginRight: '10px',color: 'blue' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>

          </span>
        </div>
        <div className="card-body">
          {videoUrls?.map((video, index) => (
            <div className="video-row" key={index}>
              <div
                className="video-container"
                onClick={() => {
                  setUrl(video?.fileName);
                  document.getElementById('videoprev').load();
                }}
              >
                <video
                  className="gallery_item_video"
                  style={{ cursor: 'pointer' }}
                  data-bs-target="#viewgalleryvideo"
                  data-bs-toggle="modal"
                  autoPlay
                  loop
                  muted
                >
                  <source src={video?.fileName} />
                </video>
              </div>
            
              <span  onClick={() => downloadVideo(video?.id)}  style={{ cursor: 'pointer', color: 'blue' }}>
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg>

              </span>
              {
               video.deleteStatus &&
               <span onClick={() => deleteVideo(video?.id)} style={{ cursor: 'pointer', color: 'red' }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >
               <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
             </svg>
             </span>
              }
             

            </div>
          ))}
        </div>
      </div>
      <div className="modal fade" id="viewgalleryvideo" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body home_image">
              <div className="overlayText">
                <div className="right-button">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => { document.getElementById('videoprev').pause(); }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <svg tooltip="Close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="img_container">
                <video
                  id="videoprev"
                  className="preview_video"
                  style={{ cursor: 'pointer' }}
                  src={url}
                  type="video/mp4"
                  autoPlay
                  loop
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="card">
          <div className="popup">
            <div className="popup-inner">
              

              <div className="d-flex justify-content-between align-items-center">
             
                <h2>Add Video</h2>
            
        <span onClick={() => setShowPopup(false)} style={{ cursor: 'pointer', color: "red" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </span>
      </div>
              <div className="card-body">
                <div className="form-group">
                  <label>videos</label>
                  <input className='form-control' type="file" multiple onChange={handleMultiFileChange} />
                </div>
                <div className="form-group">
                  <label>Tiltle</label>
                  <input className='form-control' type="text" name="title" value={multititle} onChange={handleMultiTitleChange} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input className='form-control' type="text" name="description" value={multidescription} onChange={handleMultiDescriptionChange} />
                </div>
                <div className='' style={{alignItems :"center"}}>
                  <button className='btn btn-success' onClick={handlemultiUpload}  >Upload</button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );


}

export default Video
