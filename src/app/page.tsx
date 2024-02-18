import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Home() {
  return (
    <div className='flex items-center justify-evenly flex-col w-screen h-screen  '>
      <div className="flex flex-col justify-center items-center gap-8 font-['Title'] text-7xl text-center text-white">
        <p>Welcome to Acterio Posts Explorer!</p>
        <p className='w-[40%] text-2xl text-primary'>
          Discover a world of posts with our simple yet powerful application. Explore topics that interest you, react to posts, and engage with a wide variety of content.
        </p>
      </div>
      <ul className="flex font-['Title'] text-primary flex-col gap-1 text-3xl text-left">
        <li>
          <ArrowRightIcon />
          Explore posts
        </li>
        <li>
          <ArrowRightIcon />
          React to posts you love
        </li>
        <li>
          <ArrowRightIcon />
          Search for posts by tags
        </li>
        <li>
          <ArrowRightIcon />
          Delete posts
        </li>
      </ul>
      <div className="container">
        <div className="palette">
          <div className="color"><span>222831</span></div>
          <div className="color"><span>30475E</span></div>
          <div className="color"><span>DDDDDD</span></div>
          <div className="color"><span>F05454</span></div>
          <div className="color"><span>E76F51</span></div>
        </div>
        <div id="stats" className="font-['Title'] text-background">
          Color palette
        </div>
      </div>
      <Link href="/posts">
        <button className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#F05454] group px-8 py-2">
          <span className="relative z-10 text-white group-hover:text-white text-xl duration-500">View posts!</span>
          <span className="absolute w-full h-full bg-[#F05454] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-[#F05454] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
      </Link>
    </div >
  );
}
