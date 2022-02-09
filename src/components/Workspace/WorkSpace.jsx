import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {deleteUserPost, getUserProfile, userIsLoading} from "../../redux/userReducer";
import './workspace.css'
import {WorkSpaceLoader} from "../Loaders";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


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


function WorkSpace() {
    const [modal, setModal] = useState({
        id: null,
        title: ''
    })
    const posts = useSelector(state => state.user.posts)
    const isLoading = useSelector(state => state.user.isLoading)
    const id = useSelector(state => state.auth.id)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(userIsLoading())
        dispatch(getUserProfile(id))
    }, [])

    const handleClose = () => {
        setModal({id: null, title: ''})
    }

    const deletePost = () => {
        dispatch(deleteUserPost(modal.id))
        handleClose()
    }

    return (
        <>
            {isLoading ? <WorkSpaceLoader/> : <div className='workspace'>
                {posts.length ? <ul className='workspace_list'>
                    {posts.map(el => <PreviewPost key={el._id} title={el.title} createdAt={el.createdAt}
                                                  views={el.views}
                                                  id={el._id} setModal={setModal}/>)}
                </ul> : <p className='workspace__desc'>У вас пока нету записей для редактирования.</p>}
                <Link to={`/workspace/create`}>
                    <button className='btn btn--big'>Создать новую запись</button>
                </Link>
            </div>}
            {modal.id &&
            <Modal
                open={!!modal.id}
                onClose={handleClose}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box sx={style}>
                    <p className='workspace__quest'>Вы действительно хотите удалить этот пост ?</p>
                    <p className='workspace__delete-title'>{modal.title}</p>
                    <img className='workspace__modal-img' src={'http://localhost:5656'+ posts.filter(post => post._id === modal.id)[0].photoUrl } alt={modal.title}/>
                    <div className='workspace__modal-btn'>
                        <button className='btn' onClick={deletePost}>Да</button>
                        <button className='btn' onClick={handleClose}>Нет</button>
                    </div>
                </Box>

            </Modal>
            }
        </>
    )
}


function PreviewPost({title, createdAt, views, id, setModal}) {
    const date = new Date(createdAt).toLocaleDateString()
    const deletePost = () => {
        setModal({id: id, title: title})
    }
    return (
        <li className='workspace_item'>
            <div className='workspace_top'>
                <h3 className='workspace_title'>{title}</h3>
                <div>
                    <Link to={`/workspace/edit/${id}`} style={{
                        marginRight: '15px'
                    }}>
                        <button className='btn'>Редактировать</button>
                    </Link>
                    <button className='btn' onClick={deletePost}>Удалить</button>
                </div>
            </div>
            <div className='workspace_bottom'>
                <div className='views'>
                    <span className='views_count'>{views} </span>
                    <RemoveRedEyeIcon/>
                </div>
                <time>Дата создания поста {date}</time>
            </div>
        </li>
    )
}

export default WorkSpace