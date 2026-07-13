import { useEffect, useState } from "react";
import Smartinfo from "../components/Smartinfo";

const Prelogin = () => {
  const [showIntroLogo, setShowIntroLogo] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntroLogo(false);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (showIntroLogo) {
    return (
      <div className="min-h-screen grid place-items-center bg-(--surface-muted)">
        <svg
          className="h-20 w-72"
          viewBox="0 0 320 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Smart Save"
          role="img"
        >
          <circle cx="40" cy="40" r="28" fill="#00D492" />

          <path
            d="M28 46L40 34L49 43L58 24"
            stroke="white"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M52 24H60V32"
            stroke="white"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          <text
            x="85"
            y="38"
            fontSize="18"
            fontFamily="Inter, Arial"
            fontWeight="500"
            fill="#64748B"
          >
            Smart
          </text>

          <text
            x="85"
            y="58"
            fontSize="30"
            fontFamily="Inter, Arial"
            fontWeight="800"
            fill="#0F172A"
          >
            Save
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div>
      <Smartinfo />
    </div>
  );
};

export default Prelogin;
