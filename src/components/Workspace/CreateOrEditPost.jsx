import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {addNewPost, editPost, postIsFetching, resetPostStatus} from "../../redux/userReducer";
import {postsAPI} from "../../api";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

function CreateOrEditPost() {
    const [values, setValues] = React.useState({
        title: '',
        text: '',
        photoUrl: null,
        desc: '',
    })

    const [error, setError] = React.useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate();
    const post = useSelector(state => state.user.posts.filter(el => el._id === params.id))
    const postLoadingStatus = useSelector(state => state.user.postLoadingStatus)
    const dispatch = useDispatch()

    React.useEffect(async () => {
        if (params.id) {
            setValues({
                title: post[0].title,
                text: post[0].text,
                desc: post[0].description,
                photoUrl: post[0].photoUrl,
            })
        }
    }, [])


    const onChange = async (e) => {

        setError(false)

        if (e.target.name === 'title') {
            setValues(prevState => {
                return {
                    ...prevState,
                    title: e.target.value,
                }
            })
        }

        if (e.target.name === 'text') {

            setValues(prevState => {
                return {
                    ...prevState,
                    text: e.target.value,
                }
            })
        }

        if (e.target.name === 'file') {
            const formData = new FormData()
            formData.append('file', e.target.files[0])

            const img = await postsAPI.addPostImg(formData)

            setValues(prevState => {
                return {
                    ...prevState,
                    photoUrl: img.url,
                }
            })
        }

        if (e.target.name === 'desc') {
            setValues(prevState => {
                return {
                    ...prevState,
                    desc: e.target.value,
                }
            })
        }

    }

    if (postLoadingStatus === 'added') {
        dispatch(resetPostStatus())
        navigate('/workspace')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        for (let value in values) {
            if (!values[value].trim()) {
                setError(true)
                return;
            }
        }


        if (params.id) {
            dispatch(postIsFetching())
            dispatch(editPost(values, params.id))

        } else {
            dispatch(postIsFetching())
            dispatch(addNewPost(values))
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <div className='workspace__inner'>
                <div>
                    <label>Заголовок
                        <textarea onChange={onChange} value={values.title}
                                  className='workspace_create-title' name="title"
                                  placeholder='Введите заголовок'>
            </textarea>
                    </label>
                    <label>Описание
                        <textarea onChange={onChange} value={values.desc}
                                  className='workspace_create-desc' name="desc"
                                  placeholder='Введите описание статьи'>
            </textarea>
                    </label>
                    <label>
                        Текст статьи
                        <textarea onChange={onChange} className='workspace_create-text'
                                  name="text"
                                  value={values.text}
                                  placeholder='Введите текст статьи'>
            </textarea>
                    </label>
                </div>
                <div className='workspace__files'>
                    {values.photoUrl ? <img className='workspace__img' onLoad={event => setIsLoading(false)}
                                            src={'http://localhost:5656' + values.photoUrl}
                                            alt={values.title}/> : <div className='workspace__block'></div>}
                    {isLoading && values.photoUrl && <div className='workspace__isloading'></div>}
                    <label className='workspace__label'>
                        <input className='workspace__file' type="file" accept="image/png, , image/jpeg"
                               onChange={onChange} name='file'/>
                        <div className='workspace__upload'>
                            <span>Загрузить фото</span>
                            <div className='workspace__icon'>
                                <UploadFileOutlinedIcon sx={{fontSize: 45}}/>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div className='form__top'>
                <button className='btn' type='submit' disabled={postLoadingStatus === 'fetching'&&!isLoading}>Отправить</button>
                {postLoadingStatus === 'fetching' && <div className='form__loader form__loader--small'></div>}
                {error && <p className='workspace__error'>Необходимо заполнить все поля</p>}
            </div>
        </form>
    )
}

export default CreateOrEditPost