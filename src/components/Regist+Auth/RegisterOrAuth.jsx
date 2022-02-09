import Modal from "@mui/material/Modal";
import Registration from "./Registaration";
import React from "react";
import Authorization from "./Authorization";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModal} from "../../redux/authReducer";
import './auth.css'
import LoginIcon from '@mui/icons-material/Login';


function RegisterOrAuth() {
    const modalOpen = useSelector(state => state.auth.modalOpen)
    const dispatch = useDispatch()
    const [tab, setTab] = React.useState(0)
    const handleOpen = () => dispatch(setOpenModal());
    const handleClose = () => {
        dispatch(setOpenModal());
        setTab(0);
    }
    return (
        <>
            <div className="menu_item">
                <div onClick={handleOpen} className='icon'>
                    <LoginIcon/>
                    <span className='icon_name'>Войти</span>
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>

                    {!tab ? <Authorization setTab={setTab}/> :
                        <Registration setTab={setTab}/>}
                </div>

            </Modal>
        </>
    )
}

export default RegisterOrAuth;