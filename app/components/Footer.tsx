"use client";

export default function Footer() {
  return (
    <div className="flex justify-center items-center flex-col my-10 gap-7">
      {/* social media icons  */}
      <div className="flex gap-7">
        <i className="fa-brands fa-square-facebook text-2xl cursor-pointer"></i>
        <i className="fa-brands fa-instagram text-2xl cursor-pointer"></i>
        <i className="fa-brands fa-twitter text-2xl cursor-pointer"></i>
        <i className="fa-brands fa-youtube text-2xl cursor-pointer"></i>
      </div>

      {/* seo pages  */}
      <div className="flex gap-7">
        <p className="text-sm font-bold cursor-pointer">Conditions of Use</p>
        <p className="text-sm font-bold cursor-pointer">Privacy & Policy</p>
        <p className="text-sm font-bold cursor-pointer">Press Room</p>
      </div>

      {/* copyright  */}
      <p className="text-gray-500 text-sm font-bold">
        © 2021 MovieBox by Adriana Eka Prayudha
      </p>
    </div>
  );
}
