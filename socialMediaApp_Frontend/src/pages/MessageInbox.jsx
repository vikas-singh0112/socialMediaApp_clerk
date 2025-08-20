import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import chattingImg from "../assets/chatting.svg";

function MessageInbox() {
  return (
    <div className="w-5/6 flex">
      <div className="w-2/6 flex flex-col items-center border-r-2 border-[#58576a]">
        <div className="w-3/4 mt-12">
          <Label htmlFor="searchInbox" className="hidden">
            search inbox
          </Label>
          <Input type="text" id="searchInbox" placeholder="Search" />
        </div>
        <div className="w-3/4 mt-4 border border-[#58576a]"></div>
        <div className="w-full mt-6 ">
          <h3 className="text-left px-12">Messages</h3>
          <div className="px-12">
            <ul className="flex flex-col gap-2">
              <li className="bg-green-900 px-3 py-1.5">message 1</li>
              <li className="bg-green-900 px-3 py-1.5">message 1</li>
              <li className="bg-green-900 px-3 py-1.5">message 1</li>
              <li className="bg-green-900 px-3 py-1.5">message 1</li>
              <li className="bg-green-900 px-3 py-1.5">message 1</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-4/6 min-h-screen flex items-end">
        {/* chat feature is pending */}
        <img src={chattingImg} alt="" />
      </div>
    </div>
  );
}

export default MessageInbox;
