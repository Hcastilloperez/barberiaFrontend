const LogoScissors = ({ className = "h-8 w-8" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#CA8A04" strokeWidth="2.5" />
    <path
      d="M16 14V26C16 30.4183 19.5817 34 24 34C28.4183 34 32 30.4183 32 26V14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M12 14L16 14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M32 14L36 14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M16 26C16 26 18 28 24 28C30 28 32 26 32 26"
      stroke="#EAB308"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 34L16 40C16 41.1046 16.8954 42 18 42H30C31.1046 42 32 41.1046 32 40V34"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line x1="20" y1="42" x2="20" y2="44" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="42" x2="28" y2="44" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M18 14V12C18 10.8954 18.8954 10 20 10H28C29.1046 10 30 10.8954 30 12V14"
      stroke="#A8A29E"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default LogoScissors;