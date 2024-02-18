import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Post } from '../../../const';
import { useState } from 'react';

interface props {
	data: Post;
	setter: any;
}

const PostCard = ({ data, setter }: props) => {
	const [Reactions, setReactions] = useState<number>(data.reactions);

	const deletePost = async (postId: number) => {
		try {
			setter(data);
		} catch (error) {
			console.error('There was an error deleting the post:', error);
		}
	};

	return (
		<div className="parent">
			<div className="card">
				<div className="content-box">
					<span className="card-title">{data.title}</span>
					<p className="card-content">
						{data.body.substring(0, 100)}...
					</p>
					<span
						className="see-more"
						role='button'
						onClick={() => {
							window.location.href = `/posts/${data.id}`;
						}}
					>
						See More
					</span>
				</div>
				<div className="date-box">
					<span className="month">userID</span>
					<span className="date">{data.userId}</span>
				</div>
				<Stack marginBlockStart={1} marginBlockEnd={1} justifyContent="center" alignItems="center" direction="row" spacing={1}>
					{data.tags.map((tag: string, key: number) => {
						return (
							<Chip sx={{
								bgcolor: 'white',
								border: "3px solid #F05454",
								color: '#222831',
								'&:hover': {
									bgcolor: '#30475E',
									color: 'white',
								},
								fontFamily: "Title",
								fontWeight: 600,
							}} key={key} label={`${tag}`} />
						);
					})}
				</Stack>
			</div>
			<div className='flex items-center justify-between h-[50px] '>
				<button
					className="Btn"
					onClick={() => {
						setReactions((prevReactions) => prevReactions + 1);
					}}
				>
					<span className="leftContainer">
						<svg fill="white" className='text-[12px]' viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>
					</span>
					<span className="likeCount">
						{Reactions}
					</span>
				</button>
				<button className="buttohover" onClick={() => deletePost(data.userId)}>
					<span className="text text-[12px]">Delete</span>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
						</svg>
					</span>
				</button>
			</div>
		</div>
	);
};

export default PostCard;