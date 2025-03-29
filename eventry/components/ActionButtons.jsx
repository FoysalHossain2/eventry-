'use client'

import Link from "next/link";

import { useAuth } from "@/app/hooks/useAuth";
import { addInterestedEvent } from "@/app/actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const ActionButtons = ({eventId, interestedUserIds, fromDetails, goingUserIds }) => {

  const {Auth} = useAuth();
  const router = useRouter();

  const isInterested = interestedUserIds?.find((id) => id === Auth?.id);
  const isGoing = goingUserIds?.find(id => id === Auth?.id);

  const [Interested, setInterested] = useState(isInterested)
  const [Going, setGoing] = useState(isGoing)
  const [isPending, startTransition] = useTransition();

  async function toggleInterest() {
    if (Auth) {
      await addInterestedEvent(eventId, Auth?.id);
      setInterested(!Interested)
    } else {
      router.push('/login')
    }
  }

  const markGoing = () => {
    if (Auth) {
      router.push(`/payment/${eventId}`)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button 
        onClick={() => startTransition(() => {
          toggleInterest();
        })}
        className={`w-full ${
          Interested && "bg-indigo-600 hover:bg-indigo-800"
        }`}>
        Interested
      </button>
      <button
        disabled={Auth && Going}
        onClick={markGoing}
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons
