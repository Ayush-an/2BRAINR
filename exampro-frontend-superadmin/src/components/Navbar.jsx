// src/components/Navbar.jsx
import {
  BellIcon,
  EnvelopeIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FiFile } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import getUser from "../utils/getUser";



export default function Navbar() {
  const user = getUser();
  const photo = localStorage.getItem("userPhoto") || user?.photo;

  const [emailOpen, setEmailOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="flex items-center justify-between w-full px-6 py-4 bg-white shadow">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Bars3Icon className="w-6 h-6 text-gray-600 cursor-pointer" />

          {/* Search */}
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg w-72">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search projects"
              className="w-full ml-3 text-sm bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <FiFile className="w-6 h-6 text-gray-600 cursor-pointer" />

          {/* EMAIL ICON */}
       <EnvelopeIcon
  className="w-6 h-6 text-gray-600 cursor-pointer"
  onClick={() => setEmailOpen(true)}
/>


          {/* NOTIFICATION ICON */}
          <BellIcon
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => setNotifOpen(true)}
          />

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={photo || "https://i.pravatar.cc/40"}
              className="object-cover w-10 h-10 rounded-full"
              alt="profile"
            />
            <div className="flex items-center gap-1">
              <span className="font-medium">{user?.name || "User"}</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------- */}
      {/* EMAIL DIALOG */}
      {/* --------------------------------------------------- */}
      <Transition show={emailOpen} as={Fragment}>
  <Dialog
    as="div"
    className="fixed inset-0 z-50 flex items-center justify-center"
    onClose={() => setEmailOpen(false)}
  >
    {/* Background */}
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0 bg-black/30" />
    </Transition.Child>

    {/* Email Card */}
    <Transition.Child
      as={Fragment}
      enter="transform transition ease-out duration-200"
      enterFrom="scale-90 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transform transition ease-in duration-150"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-90 opacity-0"
    >
      <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Send Email</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Email sent successfully (Demo)");
            setEmailOpen(false);
          }}
          className="space-y-4"
        >
          {/* To */}
          <div>
            <label className="block mb-1 text-sm font-medium">To</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="receiver@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 text-sm font-medium">Subject</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="Email subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              required
              className="w-full h-24 px-3 py-2 border rounded-md outline-none"
              placeholder="Type your message..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md"
              onClick={() => setEmailOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Transition.Child>
  </Dialog>
</Transition>



      {/* --------------------------------------------------- */}
      {/* NOTIFICATION RIGHT DRAWER */}
      {/* --------------------------------------------------- */}
      <Transition show={notifOpen} as={Fragment}>
  <Dialog
    as="div"
    className="fixed inset-0 z-50 overflow-hidden"
    onClose={() => setNotifOpen(false)}
  >
    <div className="absolute inset-0 overflow-hidden">

      {/* Background blur */}
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-0 bg-black/30" />
      </Transition.Child>

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 flex w-screen max-w-sm">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-200"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-150"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="w-full p-6 bg-white shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Notifications</h2>

            <div className="space-y-3">
              <div className="p-3 bg-gray-100 rounded-md">New user registered</div>
              <div className="p-3 bg-gray-100 rounded-md">Password updated</div>
            </div>

            <button
              className="mt-4 text-blue-600"
              onClick={() => setNotifOpen(false)}
            >
              Close
            </button>
          </div>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
    </>
  );
}
