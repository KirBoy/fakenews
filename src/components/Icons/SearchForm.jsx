import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setQuery} from "../redux/postsReducer";
import {useNavigate} from "react-router-dom";


function SearchForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        dispatch(setQuery(data.search))
        navigate("/");
    }

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputBase
                sx={{ml: 1, flex: 1, fontFamily: 'Rubik'}}
                placeholder="Поиск"
                inputProps={{'aria-label': 'search google maps'}}
                {...register("search")}
            />
            <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}

export default SearchForm