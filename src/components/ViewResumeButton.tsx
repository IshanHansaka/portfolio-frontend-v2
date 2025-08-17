'use client';

export default function ViewResumeButton() {
  return (
    <button
      onClick={() =>
        window.open(
          'https://drive.google.com/file/d/1gQrlTRM31Ckh-ff927mtn_DKlAPxa4b1/view?usp=sharing'
        )
      }
      className="mt-6 md:mt-6 px-6 py-2 font-medium cursor-pointer border-2 border-slate-800 bg-slate-800 text-white rounded-md hover:bg-white hover:text-slate-800 transition duration-300 ease-in-out"
    >
      View My Resume
    </button>
  );
}
