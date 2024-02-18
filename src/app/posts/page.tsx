"use client";
import useSWR from "swr";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Data, Post } from '../../../const';
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PostCard from "../components/PostCard";
import SearchAppBar from "../components/SearchAppBar";

axios.defaults.withCredentials = false;

const fetcher: any = async (url: string) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};


export default function Posts() {
	const [deleted, setDeleted] = useState<Post | null>(null);
	const [data, setData] = useState<Data | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const itemsPerPage: number = 15;

	const { data: Posts, error, isLoading } = useSWR<Data | undefined>(
		`https://dummyjson.com/posts?limit=${itemsPerPage}&skip=${itemsPerPage * (currentPage - 1)}`,
		fetcher);

	useEffect(() => {
		if (Posts) {
			setTotalPages(Math.ceil(Posts.total / Posts.limit));
		}
	}, [Posts]);

	useEffect(() => {
		if (deleted && data) {
			const updatedPosts = data.posts.filter(post => post.id !== deleted.id);
			setData({ ...data, posts: updatedPosts });
		}
	}, [deleted]);

	useEffect(() => {
		if (Posts && searchQuery) {
			const filtered = Posts.posts.filter(post =>
				post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
			);
			setData({ ...Posts, posts: filtered });
		} else if (Posts) {
			setData(Posts);
		}
	}, [Posts, searchQuery]);

	if (isLoading)
		return (
			<div className="loader h-screen w-screen">
				<div className="loaderMiniContainer">
					<div className="barContainer">
						<span className="bar"></span>
						<span className="bar bar2"></span>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 101 114"
						className="svgIcon"
					>
						<circle
							strokeWidth="7"
							stroke="black"
							transform="rotate(36.0692 46.1726 46.1727)"
							r="29.5497"
							cy="46.1727"
							cx="46.1726"
						></circle>
						<line
							strokeWidth="7"
							stroke="black"
							y2="111.784"
							x2="97.7088"
							y1="67.7837"
							x1="61.7089"
						></line>
					</svg>
				</div>
			</div>
		);

	if (error) {
		return <div>ERROR</div>;
	}

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		event.stopPropagation();
		setCurrentPage(value);
	};

	const theme = createTheme({
		palette: {
			primary: {
				main: '#DDDDDD',
			},
			secondary: {
				main: '#30475E',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<SearchAppBar setSearchQuery={setSearchQuery} />
			<main className="flex flex-col items-center justify-center bg-background h-full w-full">
				<Grid container spacing={2} className="p-6" justifyContent="center" alignContent="center" >
					{data?.posts?.map((post: Post) => (
						<Grid item xs={12} sm={6} md={4} lg={4} key={post.id} style={{ display: 'flex', justifyContent: 'center' }}>
							<PostCard data={post} setter={setDeleted} />
						</Grid>))}
				</Grid>
				<Stack className="p-6" spacing={2}>
					<Pagination sx={{
						'& .MuiPaginationItem-root': {
							color: 'white',
						},
						'& .MuiPaginationItem-root.Mui-selected': {
							backgroundColor: '#30475E',
							color: 'white',
						},
					}} hideNextButton hidePrevButton page={currentPage} count={totalPages} size="large" shape="rounded" onChange={handleChange} />
				</Stack>
				<div className="text-primary flex flex-col gap-2 justify-center items-center font-['Body'] p-4">
					<p>Abderrachid Yassir</p>
					Copyright © 2024 - All right reserved
				</div>
			</main >
		</ThemeProvider>
	);
};