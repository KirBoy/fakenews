import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setQuery} from "../../redux/posts/postsActions";
import {useNavigate} from "react-router-dom";
import debounce from 'lodash.debounce'

function SearchForm() {
    const [queryInput, setQueryInput] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setQuery(queryInput))
        navigate("/");
    }, [queryInput])

    const updateQuery = e => setQueryInput(e?.target?.value)
    const debounceOnChange = debounce(updateQuery, 300)
    const onClick = () => navigate("/");

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >
            <InputBase
                sx={{ml: 1, flex: 1, fontFamily: 'Rubik'}}
                placeholder="Поиск"
                inputProps={{'aria-label': 'search google maps'}}
                onChange={debounceOnChange}
            />
            <IconButton type="button" onClick={onClick} sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}

export default SearchForm