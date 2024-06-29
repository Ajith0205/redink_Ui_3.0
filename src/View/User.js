import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import '../Style/User.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../Service/Constant';
import Modal from 'react-modal';

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
      
    }
};


const User = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState('');
    const [eventData, setEventData] = useState([]);
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isToggled, setIsToggled] = useState(false);

    const config = {
        headers: { Authorization: token },
    };

    const handleDelete = (id) => {

        // alert("deleted");
        // console.log('Deleting row:', id);
        axios.delete(Base_Url + "user/deleteUser?id=" + id, config).then((res) => {
            // console.log(res);
            
            if (res?.data?.status) {
                usersList();
            }
        })
    };

    const handleViewPhoto = (photoUrl) => {
        setSelectedPhoto(photoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedPhoto('');
        setModalIsOpen(false);
    };
    const toggleButton = () => {
        setIsToggled(prevState => !prevState);
      };

      

    useEffect(() => {
        usersList();
    }, []);

    const usersList = () => {
        axios({
            method: "get",
            headers: { Authorization: token },
            url: Base_Url + "user/getAllUsers",
        }).then((response) => {
            setEventData(response.data.users);
        }).catch(error => {
            console.log(error);
        });
    };


    const changeStatus =(index)=>{
        // console.log("index",index);
        let tempUser = { ...eventData }
        let status = !tempUser[index].status
        let userId = tempUser[index].id

        axios.get(Base_Url+"user/statusChange?id="+userId +"&status="+status,config).then((res)=>{
            if(res?.data?.status){
                usersList()
            }
        })
    }

    const handleEdit = (id) => {
        navigate("/createuser");
        localStorage.setItem("editUserId", id);

    }
    const columns = [
        { 
            name: 'Profile',
            cell: (row) => (
                <div>
                    {row.profile ? (
                        <button onClick={() => handleViewPhoto(row.profile)}>  <img src={row.profile} alt="Profile" style={{ width: "50px", height: "50px" }} /> </button>
                    ) : (
                        <span>No Photo</span>
                    )}
                </div>
            ),
            width: '100px',
            sortable: true 
        },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Father Name', selector: row => row.fatherName, sortable: true },
        { name: 'Gender', selector: row => row.gender, sortable: true },
        { name: 'Email-Id', selector: row => row.email, sortable: true },
        { name: 'Date Of Birth', selector: row => row.dateofbirth, sortable: true },
        { name: 'Address', selector: row => row.address, sortable: true },
        { name: 'AadharNo', selector: row => row.aadharNo, sortable: true },
        { name: 'Whats App No', selector: row => row.whatsappNo, sortable: true },
        { name: 'Role', selector: row => row.selectRole, sortable: true },
        { name: 'Game', selector: row => row.selectgame, sortable: true },
        { 
            name: 'Action', 
            cell: (row, index) => (
                <div className="d-flex ">
                    <span onClick={() => handleEdit(row.id)}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" tooltip="Edit">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                       <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                     </svg>
                    </span>

                 
                   
                <span tooltip="Delete"  onClick={() => handleDelete(row.id)}> <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg></span> 

              <div className="form-check form-switch" style={{ marginLeft: '9px' }}>
                        <input className="form-check-input  btn btn-md border-primary"
                          type="checkbox"
                          checked={row?.status}

                          onChange={() => changeStatus(index)}
                          role="switch"
                        />
                       
                      </div>
                   
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


  

    const addUser = () => {
        navigate('/createUser');
    };

    return (
        <div>
           <div className="button-container">
                <button className="primary-button" onClick={addUser} > Add User</button>
            </div>

            <div className="data-table-container">
               <DataTable
                title="User Information"
                columns={columns}
                data={eventData}
                customStyles={customStyles}
                pagination
                />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="View Photo Modal"
            >
                <img src={selectedPhoto} alt="User Photo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <div style={customStyles.closeButton} onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
               </svg></div>
            </Modal>
        </div>
    );
};

export default User;
