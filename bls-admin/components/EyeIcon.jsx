// export const EyeIcon = (props) => (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1em"
//       role="presentation"
//       viewBox="0 0 20 20"
//       width="1em"
//       {...props}
//     >
//       <path
//         d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={1.5}
//       />
//       <path
//         d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={1.5}
//       />
//     </svg>
//   );
import React from "react";

const EyeIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-blue-500 hover:text-blue-700 focus:outline-none"
      title="View Details"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.558 1.857-2.217 4.284-4.376 5.652C15.18 17.852 13.618 18 12 18c-1.618 0-3.18-.148-5.166-1.348C4.675 16.284 3.016 13.857 2.458 12z"
        />
      </svg>
    </button>
  );
};

export default EyeIcon;
