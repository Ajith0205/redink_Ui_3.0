import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import '../Style/Home.css';  // Ensure this path is correct

function Home() {
  var [eventData, setEventData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [editPopup, setEditPopup] = useState(false);
  const [editEventDetails, setEditEventDetails] = useState({});

  const [newEvent, setNewEvent] = useState({
    image: '',
    eventName: '',
    eventDate: '',
    eventPlace: ''
  });

  var navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    eventUploadList();
  }, []);

  const eventUploadList = () => {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: Base_Url + "event/uploadList",
    }).then((response) => {
      setEventData(response.data.dto.eventList);
    }, error => {
      console.log(error);
    });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // fileReader.readAsDataURL(files[0]);

    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onloadend = () => {

      setNewEvent({
        ...newEvent,
        image: fileReader.result
      });
    };
    // reader.readAsDataURL(file);
  };

  const handleAddEvent = () => {

    console.log("newEvent", newEvent);

    axios({
      method: "post",
      headers: { Authorization: token },
      url: "http://192.168.1.143:8008/event/upload",
      data: newEvent,

      // status:""
    }).then((response) => {
      console.log("Event Uploads", response.data)
      var notice = response.data.dto.event.image
      console.log("da", notice);
      // console.log(response.data.status);
      if (response.data.status) {
        eventUploadList();
        setShowPopup(false);
        setNewEvent({
          image: '',
          eventName: '',
          eventDate: '',
          eventPlace: ''
        });
        // window.location.reload();
      }

    }, error => {
      console.log(error);
    })


  };

  const handleEdit = (row) => {
    // Implement edit functionality using row data
    console.log('Editing row:', row);
    setEditPopup(true);
    setEditEventDetails(row);
  };
  const handleDelete = (row) => {

    console.log('Deleting row:', row);

    axios({
      method: "DELETE",
      headers: { Authorization: token },
      url: Base_Url + "event/eventdelete?id=" + row.id,
      //data:inputs
    }).then((response) => {
      console.log(response);
      if (response?.data?.status) {
        eventUploadList();

      }


    })
  };

  const handleOnUpdate = (e) => {
    e.preventDefault();
    let name = e.target.name;
    console.log("name", name);
    if (name != "image") {
      let value = e.target.value;
      // console.log("name",value);
      setEditEventDetails(preValue => ({ ...preValue, [name]: value }))
    } else {
      let files = e.target.files;
      let fileReader = new FileReader();
      // console.log("shdfgshj",files);
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event) => {
        let value = event.target.result;
        //  console.log("value", value)
        setEditEventDetails(preValue => ({ ...preValue, [name]: value }))
      }

    }
  }


  const handleUpdateEvent = () => {
    // Edit event logic here
    console.log("editEventDetails", editEventDetails);
    axios({
      method: "PUT",
      headers: { Authorization: token },
      url: Base_Url + "event/update?id=" + editEventDetails?.id,
      data: editEventDetails,
    }).then((response) => {
      console.log(response);

      if (response.data.status) {
        eventUploadList();
        setEditPopup(false);
        setEditEventDetails({});
      }

    })




  };

  const handleDeleteImage = (id) => {
    // Delete image logic here
    console.log("id", id);
    axios({
      method: "DELETE",
      headers: { Authorization: token },
      url: Base_Url + "event/image/" + id,
    }).then((response) => {
      console.log(response);
      if (response?.data?.status) {
        eventUploadList();
        setEditPopup(false);
        setEditEventDetails({});
      }
    })


  };

  return (
    <div className="container">
      <div className=''>
        <div className='d-flex justify-content-between'>
          <h3>Events</h3>
          <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
            Add Event
          </button>

        </div>
        <div className=''>
          <div className='row'>
            {
              eventData != null ? eventData.map((event, index) => (
                <div key={index} className="col-lg-12">
                  <div className='card'>
                    <div className="mt-5 mb-5 p-5">
                      <img src={event?.image} alt={event?.eventName} className="img-fluid event-image" />
                      <div className='row mt-2'>
                        <div className='col-3'>
                          <label>Event Name: {event?.eventName}</label>
                        </div>
                        <div className='col-3'>
                          <label>Date: {event?.eventDate}</label>
                        </div>
                        <div className='col-3'>
                          <label>Place: {event?.eventPlace}</label>
                        </div>
                        <div className='col-3 text-end'>
                          {/* <button className="btn btn-warning me-2" onClick={() => handleEdit(event)}>
                        Edit
                      </button> */}

                          <span style={{ cursor: 'pointer', color: "blue" }} onClick={() => handleEdit(event)}>
                            <svg token="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" tooltip="Edit">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </span>

                          {/* <button className="btn btn-danger" onClick={() => handleDelete(event)}>
                        Delete
                      </button> */}

                          <span tooltip="Delete" style={{ cursor: 'pointer', color: "red" }}> <svg onClick={() => handleDelete(event)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <div><h3 style={{ textAlign: "center" }}>No Event Found</h3></div>
            }
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Add Event</h2>
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventName"
                    value={newEvent.eventName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="eventDate"
                    value={newEvent.eventDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Event Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventPlace"
                    value={newEvent.eventPlace}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Event Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />

                </div>
                <button className="btn btn-success" onClick={handleAddEvent}>Save Event</button>
                <button className="btn btn-danger" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}

          {editPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Edit Event</h2>
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventName"
                    value={editEventDetails.eventName}
                    onChange={handleOnUpdate}
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="eventDate"
                    value={editEventDetails.eventDate}
                    onChange={handleOnUpdate}
                  />
                </div>
                <div className="form-group">
                  <label>Event Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventPlace"
                    value={editEventDetails.eventPlace}
                    onChange={handleOnUpdate}
                  />
                </div>
                <div className="form-group">
                  <label>Event Image</label>
                  <input
                    type="file"
                    name='image'
                    className="form-control"
                    // defaultValue={editEventDetails.image}
                    onChange={handleOnUpdate}
                  />
                  <div className='d-flex'>

                    <img src={editEventDetails?.image} style={{ width: "100px", height: "100px" }} />
                    <span tooltip="Delete" style={{ cursor: 'pointer', color: "red" }}> <svg onClick={() => handleDeleteImage(editEventDetails.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg></span>
                  </div>
                </div>
                <button className="btn btn-success" onClick={handleUpdateEvent}>Update</button>
                <button className="btn btn-danger" onClick={() => setEditPopup(false)}>Cancel</button>
              </div>
            </div>
          )}

        </div>

      </div>




    </div>
  );
}

export default Home;
