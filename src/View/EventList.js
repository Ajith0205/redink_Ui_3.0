
import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { Base_Url } from '../Service/Constant';
const customStyles = {
    modal: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        overflow: 'hidden',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        color: 'red',
        // height: '20px',
        // width: '20px',
    }
  };
const EventList = ({ eventData,eventUploadList }) =>{
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState('');
 
    const token = localStorage.getItem("token");

    const handleViewPhoto = (photoUrl) => {
        setSelectedPhoto(photoUrl);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedPhoto('');
        setModalIsOpen(false);
    };

    
    //   const handleEdit = (event) => {
    //     // Add your edit event logic here
    //   };
    
      const handleDelete = (event) => {
     axios({
            method: "DELETE",
            headers: { Authorization: token },
            url: Base_Url + "event/eventdelete?id=" + event.id,
            //data:inputs
          }).then((response) => {
            console.log(response);
            if (response?.data?.status) {
              eventUploadList();
      
            }
      
      
          })
      };

      return (
        <div className="event-list">
          {eventData != null ? eventData.map((event, index) => (
            <div key={index} className="col-lg-12">
              <div className='card'>
                <div className="mt-5 mb-5 p-5 d-flex align-items-center justify-content-between">
                  <div>
                    <span onClick={() => handleViewPhoto(event?.image)}>
                      <img src={event?.image} alt={event?.eventName} className="img-fluid event-image" />
                    </span>
                  </div>
                  <div style={{ alignItems: "center" }}>
                    {event.deleteStatus && (
                      <span tooltip="Delete" style={{ cursor: 'pointer', color: "red" }}>
                        <svg onClick={() => handleDelete(event)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
                <div className='row mt-2 px-5'>
                  <div className='col'>
                    <label>Event Name: {event?.eventName}</label>
                  </div>
                  <div className='col'>
                    <label>Date: {event?.eventDate}</label>
                  </div>
                  <div className='col'>
                    <label>Place: {event?.eventPlace}</label>
                  </div>
                </div>
              </div>
            </div>
          )) : <div className='noEvent'><h3>No Event Found</h3></div>}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="View Photo Modal"
          >
            <img src={selectedPhoto} alt="User Photo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <div style={customStyles.closeButton} onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          </Modal>
        </div>
      );
      
}

export default EventList
