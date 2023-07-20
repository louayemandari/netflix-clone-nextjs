import React from "react";
import netflix from '../imgs/netflix-logo.png'
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { Avatar } from "@mui/material";
function Navbar() {
  return (
    <div className=" sticky z-1 top-0 flex flex-row justify-between bg-opacity-20 z-50 ">
      <div className="flex flex-row " >
        <div className="mx-3 w-1/6 "> <Image src={netflix} className="my-2" /></div>
        <div className="mx-2 my-2"> <h1 className="text-slate-100">Home</h1></div>
        <div className="mx-2 my-2"> <h1 className="text-slate-100">TV Shows</h1></div>
        <div className="mx-2 my-2"> <h1 className="text-slate-100">Movies</h1></div>
        <div className="mx-2 my-2"> <h1 className="text-slate-100">My List</h1></div>
      </div>

      <div className="flex flex-row mx-1 ">
        <div className="mx-2 my-2 "><SearchIcon className="text-slate-100"/></div>
        <div className="mx-2 my-2"><NotificationsIcon className="text-slate-100"/></div>
        <div className="mx-2 my-2"><Avatar  variant="rounded">
  N
</Avatar></div>
      </div>
    </div>
  );
}

export default Navbar;
