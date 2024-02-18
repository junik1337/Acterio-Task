"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useParams } from 'next/navigation';
import { Post } from '../../../../const';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


const RenderPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		if (id) {
			const fetchPost = async () => {
				try {
					const response = await axios.get(`https://dummyjson.com/posts/${id}`);
					setPost(response.data);
				} catch (error) {
					console.error('Error fetching post:', error);
				}
			};

			fetchPost();
		}
	}, [id]);

	if (!post) {
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
	}

	const theme = createTheme({
		palette: {
			primary: { main: '#F6416C' },
			secondary: { main: '#00B8A9' },
			error: { main: '#ff1744' },
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className=' w-screen h-screen flex flex-col items-center justify-center'>
				<div
					className=" min-w-[50%] max-w-[500px] gap-6 bg-white rounded-b-lg border-t-8 border-[#F05454] px-4 py-5 flex flex-col justify-around shadow-md"
				>
					<div role='button' onClick={() => {
						window.location.href = `/posts`;
					}}>
						<KeyboardReturnIcon />
					</div>
					<p className="text-4xl font-bold font-['Title']">{post.title}</p>
					<div className="py-3">
						<p className="text-secondary text-xl font-['Title']">
							{post.body}
						</p>
					</div>
					<div className="flex justify-between">
						<BookmarkBorderIcon />
						<div className="text-sm flex gap-2">
							{post.tags.map((tag: string, key: number) => {
								return (
									<button key={key} className="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out">
										{tag}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default RenderPost;
