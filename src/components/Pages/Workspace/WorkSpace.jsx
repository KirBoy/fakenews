import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteUserPost, getUserProfile, userIsLoading} from "../../../redux/user/userAction";
import './workspace.css'
import {WorkSpaceLoader} from "../../common/Loaders";
import WorkspaceModal from "./WorkspaceModal";
import WorkspacePosts from "./WorkspacePosts";

function WorkSpace() {
    const dispatch = useDispatch()
    const [modal, setModal] = useState({
        id: null,
        title: ''
    })
    const {posts, isLoading} = useSelector(state => state.user)
    const id = useSelector(state => state.auth.id)

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
            {isLoading ?
                <WorkSpaceLoader/> :
                <div className='workspace'>
                    {posts.length ?
                        <ul className='workspace_list'>
                            {posts.map(el => <WorkspacePosts key={el._id}
                                                          title={el.title}
                                                          createdAt={el.createdAt}
                                                          views={el.views}
                                                          id={el._id}
                                                          setModal={setModal}/>)}
                        </ul> :
                        <p className='workspace__desc'>У вас пока нету записей для редактирования.</p>}
                    <Link to={`/workspace/create`}>
                        <button className='btn btn--big'>Создать новую запись</button>
                    </Link>
                </div>}
            {modal.id &&
            <WorkspaceModal modal={modal}
                            onClose={handleClose}
                            posts={posts}
                            onClick={deletePost}/>
            }
        </>
    )
}

export default WorkSpace