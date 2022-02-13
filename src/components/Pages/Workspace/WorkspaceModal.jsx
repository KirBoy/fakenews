import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 625,
    bgcolor: 'background.paper',
    border: '1px solid #2f49ff',
    boxShadow: 24,
    p: 4,
};


function WorkspaceModal({modal, onClose, posts, onClick}) {
    return <Modal
        open={!!modal.id}
        onClose={onClose}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Box sx={style}>
            <p className='workspace__quest'>Вы действительно хотите удалить этот пост ?</p>
            <p className='workspace__delete-title'>{modal.title}</p>
            <img className='workspace__modal-img'
                 src={"http://localhost:5656" + posts.filter(post => post._id === modal.id)[0].photoUrl}
                 alt={modal.title}/>
            <div className='workspace__modal-btn'>
                <button className='btn' onClick={onClick}>Да</button>
                <button className='btn' onClick={onClose}>Нет</button>
            </div>
        </Box>
    </Modal>;
}

export default WorkspaceModal

