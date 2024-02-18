import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { Data, Post } from '../../../const';
import { Button, Chip, Stack } from '@mui/material';
import { mutate } from 'swr';

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
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const theme = createTheme({
	palette: {
		primary: {
			main: "#30475E",
		},
	},
});

interface props {
	setSearchQuery: any;
}

export default function SearchAppBar({ setSearchQuery }: props) {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ flexGrow: 1, maxWidth: "1700px", margin: 'auto' }}>
				<AppBar position="static" >
					<Toolbar sx={{ justifyContent: 'center' }}>
						<Typography
							fontFamily="Ubuntu"
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
						>
							Acterio Posts Explorer
						</Typography>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								color='primary'
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
					</Toolbar>
				</AppBar>
			</Box>
		</ThemeProvider >
	);
}