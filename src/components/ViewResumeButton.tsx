'use client';

export default function ViewResumeButton() {
  return (
    <button
      onClick={() =>
        window.open(
          'https://drive.google.com/file/d/1cHLMgH_WU3xiYS9B2crjpVbosSajvTip/view'
        )
      }
      className="mt-10 px-6 py-2 border-2 border-black bg-black text-white rounded-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
    >
      View My Resume
    </button>
  );
}
