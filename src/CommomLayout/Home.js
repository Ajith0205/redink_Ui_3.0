import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import '../Style/Home.css';  // Ensure this path is correct
import EventList from '../View/EventList';




function Home() {
  const [eventData, setEventData] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState('');
  const token = localStorage.getItem("token");
  const role=localStorage.getItem("role");
  const userId= userDetails.userId !=null ? userDetails.userId : localStorage.getItem("id"); 

  useEffect(() => {
    usersList();
}, []);

const usersList = () => {
    axios({
        method: "get",
        headers: { Authorization: token },
        url: Base_Url + "user/getAllUsers",
    }).then((response) => {
        setUsers(response.data.users);
    }).catch(error => {
        console.log(error);
    });
};

  useEffect(() => {
    eventUploadList();
    allVideos();
  }, [userId]);

  const eventUploadList = () => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "event/user/eventGet?userId="+userId,
    }).then((response) => {
      setEventData(response.data.dto.eventList);
    }).catch(error => {
      console.log(error);
    });
  };

  const allVideos = () => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "videoUpload/userBasedVideos?userId="+userId,
    }).then((response) => {
      setVideoUrls(response?.data?.dto?.videoUploadsList);
    }).catch(error => {
      console.log(error);
    });
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

  const config1 = {
    headers: { Authorization: `${token}` },
    responseType: "blob",
    'content-type': 'application/json',
  };


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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
   
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="header-title">Home</h4>
          {
                      role == "ADMIN" &&
                      <div   className='input-field'>
                      <label className='form-label'></label>
                       <select
            id="userId"
            className="form-control user-select"
            name="userId"
            value={userDetails.userId}
            onChange={(e) => handleInputChange(e)}
          >
            <option selected>--- Select User ---</option>
            {users?.map((item) => (
              <option value={item?.id}>{item?.username}</option>
            ))}
          </select>
                      </div>
                    }
                   
        </div>
        <div className="card-body">
          <EventList eventData={eventData} eventUploadList={eventUploadList} />
          {videoUrls?.map((video, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <div className="video-row">
                  <div
                    className="video-container"
                    onClick={() => {
                      setUrl(video?.fileName);
                      document.getElementById("videoprev").load();
                    }}
                  >
                    <video
                      className="gallery_item_video"
                      style={{ cursor: "pointer" }}
                      data-bs-target="#viewgalleryvideo"
                      data-bs-toggle="modal"
                      autoPlay
                      loop
                      muted
                    >
                      <source src={video?.fileName} />
                    </video>
                  </div>
                  <span
                    onClick={() => downloadVideo(video?.id)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-download"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                  </span>
                  {video.deleteStatus && (
                    <span
                      onClick={() => deleteVideo(video?.id)}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="viewgalleryvideo"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body home_image">
              <div className="overlayText">
                <div className="right-button">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      document.getElementById("videoprev").pause();
                    }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <svg
                      tooltip="Close"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="img_container">
                <video
                  id="videoprev"
                  className="preview_video"
                  style={{ cursor: "pointer" }}
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
    </div>
  );
  
  // return (
  //   <div className="container">
    
  //     <div className="card">
  //       <div className='card-header'>
  //       <h4 textAlign="center">Home</h4>
  //       { 
  //                     role == "ADMIN" && 
  //                     <select
  //                     id="userId"
  //                     className="form-control"
  //                     name="userId"
  //                     value={userDetails.userId}
  //                     onChange={(e) =>
  //                       handleInputChange(e)
  //                     }
  //                   >
                   
  //                       <option selected>
  //                         --- Select User ---
  //                       </option>
                     
  //                     {users?.map((item) => {
  //                       return (
  //                         <option value={item?.id}>{item?.username}</option>
  //                       );
  //                     })}
  //                   </select>   }
      
  //       </div>
      
  //       <div className="card-body">
  //         <EventList eventData={eventData} eventUploadList={eventUploadList} />
  //         {videoUrls?.map((video, index) => (
  //           <div className="card mb-3" key={index}>
  //             <div className="card-body">
  //               <div className="video-row">
  //                 <div
  //                   className="video-container"
  //                   onClick={() => {
  //                     setUrl(video?.fileName);
  //                     document.getElementById('videoprev').load();
  //                   }}
  //                 >
  //                   <video
  //                     className="gallery_item_video"
  //                     style={{ cursor: 'pointer' }}
  //                     data-bs-target="#viewgalleryvideo"
  //                     data-bs-toggle="modal"
  //                     autoPlay
  //                     loop
  //                     muted
  //                   >
  //                     <source src={video?.fileName} />
  //                   </video>
  //                 </div>
                  
  //                 <span onClick={() => downloadVideo(video?.id)} style={{ cursor: 'pointer', color: 'blue' }}>
  //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
  //                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  //                     <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
  //                   </svg>
  //                 </span>
                  
  //                 {video.deleteStatus && (
  //                   <span onClick={() => deleteVideo(video?.id)} style={{ cursor: 'pointer', color: 'red' }}>
  //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16" >
  //                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
  //                     </svg>
  //                   </span>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  
  //     <div className="modal fade" id="viewgalleryvideo" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  //       <div className="modal-dialog modal-dialog-centered" role="document">
  //         <div className="modal-content">
  //           <div className="modal-body home_image">
  //             <div className="overlayText">
  //               <div className="right-button">
  //                 <button
  //                   type="button"
  //                   className="btn btn-link"
  //                   onClick={() => { document.getElementById('videoprev').pause(); }}
  //                   data-bs-dismiss="modal"
  //                   aria-label="Close"
  //                 >
  //                   <svg tooltip="Close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  //                     <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  //                   </svg>
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="img_container">
  //               <video
  //                 id="videoprev"
  //                 className="preview_video"
  //                 style={{ cursor: 'pointer' }}
  //                 src={url}
  //                 type="video/mp4"
  //                 autoPlay
  //                 loop
  //                 controls
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  
}
export default Home;
