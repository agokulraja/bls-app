import React from "react";
import PropTypes from "prop-types";

const WhatsAppButton = ({ tooltipText, phoneNumber, message }) => {
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <div className="wabtn" id="wabutton">
      <style>
        {`
          [wa-tooltip] {
            position: relative;
            cursor: default;
          }
          [wa-tooltip]:hover::before {
            content: attr(wa-tooltip);
            font-size: 16px;
            text-align: center;
            position: absolute;
            display: block;
            min-width: 200px;
            max-width: 200px;
            bottom: calc(100% + 10px);
            transform: translate(-50%);
            animation: fade-in 500ms ease;
            background: #00E785;
            border-radius: 4px;
            padding: 10px;
            color: #ffffff;
            z-index: 1;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <a
        wa-tooltip={tooltipText}
        target="_blank"
        href={waLink}
        style={{
          cursor: "pointer",
          height: "62px",
          width: "auto",
          padding: "10px",
          position: "fixed",
          color: "#fff",
          bottom: "20px",
          right: "20px",
          display: "flex",
          fontSize: "18px",
          fontWeight: "600",
          alignItems: "center",
          zIndex: 999999999,
          backgroundColor: "#00E785",
          boxShadow: "4px 5px 10px rgba(0, 0, 0, 0.4)",
          borderRadius: "100px",
          animation: "pulse 2.5s ease infinite",
        }}
      >
        <svg
          width="42"
          height="42"
          style={{ padding: "5px" }}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1024_354)">
            <path
              d="M23.8759 4.06939C21.4959 1.68839 18.3316 0.253548 14.9723 0.0320463C11.613 -0.189455 8.28774 0.817483 5.61565 2.86535C2.94357 4.91323 1.10682 7.86244 0.447451 11.1638C-0.21192 14.4652 0.351026 17.8937 2.03146 20.8109L0.0625 28.0004L7.42006 26.0712C9.45505 27.1794 11.7353 27.7601 14.0524 27.7602H14.0583C16.8029 27.7599 19.4859 26.946 21.768 25.4212C24.0502 23.8965 25.829 21.7294 26.8798 19.1939C27.9305 16.6583 28.206 13.8682 27.6713 11.1761C27.1367 8.48406 25.8159 6.01095 23.8759 4.06939ZM14.0583 25.4169H14.0538C11.988 25.417 9.96008 24.8617 8.1825 23.8091L7.7611 23.5593L3.3945 24.704L4.56014 20.448L4.28546 20.0117C2.92594 17.8454 2.32491 15.2886 2.57684 12.7434C2.82877 10.1982 3.91938 7.80894 5.67722 5.95113C7.43506 4.09332 9.76045 2.87235 12.2878 2.48017C14.8152 2.08799 17.4013 2.54684 19.6395 3.78457C21.8776 5.02231 23.641 6.96875 24.6524 9.3179C25.6638 11.6671 25.8659 14.2857 25.2268 16.7622C24.5877 19.2387 23.1438 21.4326 21.122 22.999C19.1001 24.5655 16.6151 25.4156 14.0575 25.4157L14.0583 25.4169Z"
              fill="#E0E0E0"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.6291 7.98363C10.3723 7.41271 10.1019 7.40123 9.85771 7.39143C9.65779 7.38275 9.42903 7.38331 9.20083 7.38331C9.0271 7.3879 8.8562 7.42837 8.69887 7.5022C8.54154 7.57602 8.40119 7.68159 8.28663 7.81227C7.899 8.17929 7.59209 8.62305 7.38547 9.11526C7.17884 9.60747 7.07704 10.1373 7.08655 10.6711C7.08655 12.3578 8.31519 13.9877 8.48655 14.2164C8.65791 14.4452 10.8581 18.0169 14.3425 19.3908C17.2382 20.5327 17.8276 20.3056 18.4562 20.2485C19.0848 20.1913 20.4843 19.4194 20.7701 18.6189C21.056 17.8183 21.0557 17.1323 20.9701 16.989C20.8844 16.8456 20.6559 16.7605 20.3129 16.5889C19.9699 16.4172 18.2849 15.5879 17.9704 15.4736C17.656 15.3594 17.4275 15.3023 17.199 15.6455C16.9705 15.9888 16.3139 16.7602 16.1137 16.9895C15.9135 17.2189 15.7136 17.2471 15.3709 17.0758C14.3603 16.6729 13.4275 16.0972 12.6143 15.3745C11.8648 14.6818 11.2221 13.8819 10.7072 13.0007C10.5073 12.6579 10.6857 12.472 10.8579 12.3007C11.0119 12.1472 11.2006 11.9005 11.3722 11.7003C11.5129 11.5271 11.6282 11.3346 11.7147 11.1289C11.7603 11.0343 11.7817 10.9299 11.7768 10.825C11.7719 10.7201 11.7409 10.6182 11.6867 10.5283C11.6001 10.3566 10.9337 8.66151 10.6291 7.98363Z"
              fill="white"
            />
          </g>
        </svg>
        <span className="button-text"></span>
      </a>
    </div>
  );
};

WhatsAppButton.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default WhatsAppButton
