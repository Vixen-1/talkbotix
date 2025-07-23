import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
const NotAuthenticated = () => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">TalkBotix</h2>
        </Link>
      </nav>
      <div className="card-cta cursor-default">
        <div className="flex flex-col gap-10 cursor-default">
          <h2>🚀 Get Interview-Ready Like Never Before!</h2>
          <div className="flex flex-col gap-2">
            <p className="text-[19px]">
              <span className="font-bold text-[21px]">Meet Talkbotix</span> –
              your smartest interview coach, powered by AI and built to help you
              nail every job interview with confidence. Practice real-time,
              voice-based mock interviews crafted just for you, and turn your
              nervousness into job-ready brilliance.
            </p>
            <p className="text-[18px]">
              ✨ Whether you are aiming for your first job or your dream role —
              Talkbotix has your back!
            </p>
            <div className="flex flex-row gap-2 max-sm:flex-col">
              <p>🔹 New here? </p>
              <Link
                href="/sign-up"
                className="text-blue-400 font-bold capitalize cursor-pointer"
              >
                👉 Click here to kickstart your journey!
              </Link>
            </div>
            <div className="flex flex-row gap-2 max-sm:flex-col">
              <p>🔹 Already a pro with us?</p>
            <Link
              href="/sign-in"
              className="text-blue-400 font-bold capitalize cursor-pointer"
            >
              🔐 Sign in to continue growing →
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthenticated;
