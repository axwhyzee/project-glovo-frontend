import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        fontSize: "0.7em",
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '28ch',
            // '&:focus': {
            //     width: '36ch',
            // },
        },
    },
}));

function SearchBox({ update }) {
    const [value, setValue] = useState("");
    const onSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            update(value);
            setValue("");
        }
    }
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                name="Query"
                autoComplete="off"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={onSubmit}
                placeholder="Find and colour terms… (Ctrl+/)"
                inputProps={{ 'aria-label': 'Colour terms' }}
            />
        </Search>)
}

export default SearchBox;