import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import * as yup from "yup";
import {authIsFetching, clearServerError, getAuthUser, setUserProfile} from "../../../redux/auth/authActions";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #2f49ff',
    boxShadow: 24,
    p: 4,
};

const schema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательно к заполнению'),
    password: yup.string().required('Обязательно к заполнению').min(6, 'Пароль должен быть более 6 символов'),
}).required();

function Authorization({setTab, handleClose}) {
    const dispatch = useDispatch()
    const {loadingStatus, serverError} = useSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm({
        resolver: yupResolver(schema)
    })

    if (serverError && !errors.server) {
        setError('server', {
            type: "custom",
            message: 'Не верное имя пользователя или пароль'
        })
    }

    const onSubmit = data => {
        dispatch(authIsFetching())
        dispatch(getAuthUser(data))
    }

    const changeTab = () => {
        setTab(1)
    }

    const className = (filedName) => {

        if (errors[filedName] || errors.server) {
            return 'form-reg_input  form-reg_input--error'
        }

        return 'form-reg_input'
    }

    const clearError = (e, filed) => {
        clearErrors([filed])
        clearErrors('server')
        dispatch(clearServerError())
    }

    return (

        <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-reg_close' onClick={handleClose}>
                    <CloseIcon sx={{
                        fontSize: 30
                    }}/>
                </div>
                <div className='form__top'>
                    <h3 className='form-reg_title'>Авторизация</h3>
                    {loadingStatus && <div className='form__loader form__loader--small'></div>}
                </div>
                <div className='form-reg_fields'>
                    <label className='form-reg_label'>
                        <div>
                            <span className='form-reg_desc'>Email</span>
                            <input className={className('email')}
                                   {...register("email")}
                                   onChange={e => clearError(e, "email")}
                            />
                        </div>
                        <p className='form_error'>{errors.email?.message}</p>
                        {errors.server && <p className='form_error'>{errors.server?.message}</p>}
                    </label>
                    <label className='form-reg_label'>
                        <div>
                            <span className='form-reg_desc'>Пароль</span>
                            <input className={className('password')}
                                   type='password'
                                   {...register("password")}
                                   onChange={e => clearError(e, "password")}
                            />
                        </div>
                        <p className='form_error'>{errors.password?.message}</p>
                    </label>
                </div>
                <div className='auth_btns'>
                    <button className='btn' disabled={loadingStatus === 'fetching'} type='submit'>Войти</button>
                    <button className='btn' onClick={changeTab}
                            disabled={loadingStatus === 'fetching'}>Зарегистрироваться
                    </button>
                </div>
            </form>
        </Box>
    )
}

export default Authorization