
// // import React, { useEffect, useState } from "react";
// // import { Steps } from "antd";

// // // Ticket progress steps
// // const steps = [
// //     "Created",
// //     "Approved",
// //     "Denied",
// //     "Assigned to Manager",
// //     "Review Ticket",
// //     "Assigned to Agent",
// //     "Completed by Agent",
// //     "Re-open",
// //     "Closed",
// // ];

// // const TicketProgress = ({ status }) => {
// //     const [currentStep, setCurrentStep] = useState(0);

// //     useEffect(() => {
// //         const statusIndex = steps.indexOf(status);
// //         if (statusIndex !== -1) setCurrentStep(statusIndex);
// //     }, [status]);

// //     return (
// //         <>
// //             <Steps
// //                 current={currentStep}
// //                 progressDot
// //                 items={steps.map((step, index) => ({
// //                     title: step,
// //                     className: index === currentStep ? "blinking-step" : "",
// //                 }))}
// //             />

// //             {/* Add styles dynamically */}
// //             <style>
// //                 {`
// //           /* Green progress line for completed steps */
// //           .ant-steps-item-finish .ant-steps-item-icon {
// //             background-color: green !important;
// //             border-color: green !important;
// //           }

// //           .ant-steps-item-finish .ant-steps-item-content {
// //             color: green !important;
// //           }

// //           /* Blinking effect for active step */
// //           .blinking-step .ant-steps-item-icon {
// //             animation: blink 1s infinite;
// //           }

// //           @keyframes blink {
// //             0% { opacity: 1; }
// //             50% { opacity: 0.4; }
// //             100% { opacity: 1; }
// //           }
// //         `}
// //             </style>
// //         </>
// //     );
// // };

// // export default TicketProgress;


// import React, { useEffect, useState } from "react";
// import { Steps } from "antd";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Ticket progress steps
// const steps = [
//   "Created",
//   "Approved",
//   "Denied",
//   "Assigned to Manager",
//   "Review Ticket",
//   "Assigned to Agent",
//   "Completed by Agent",
//   "Re-open",
//   "Closed",
// ];

// const TicketProgress = ({ status }) => {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     const statusIndex = steps.indexOf(status);
//     if (statusIndex !== -1) setCurrentStep(statusIndex);
//   }, [status]);

//   return (
//     <div className="container-fluid px-3">
//       <div className="row">
//         <div className="col-md-12">
//           <div style={{ overflowX: "auto", width: "100%" }}>
//             <div style={{ minWidth: "900px" }}>
//               <Steps
//                 current={currentStep}
//                 progressDot
//                 items={steps.map((step, index) => ({
//                   title: step,
//                   className: index === currentStep ? "blinking-step" : "",
//                 }))}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           .ant-steps-item-finish .ant-steps-item-icon {
//             background-color: #6f2da8 !important;
//             border-color: #6f2da8 !important;
//           }

//           .ant-steps-item-finish .ant-steps-item-content {
//             color: #6f2da8 !important;
//           }

//           .blinking-step .ant-steps-item-icon {
//             animation: blink 1s infinite;
//           }

//           @keyframes blink {
//             0% { opacity: 1; }
//             50% { opacity: 0.4; }
//             100% { opacity: 1; }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TicketProgress;


import React, { useEffect, useRef, useState } from "react";
import { Steps, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

// Ticket progress steps
const steps = [
  "Created",
  "Approved / Denied",
  "Denied",
  "Assigned to Manager",
  "Review Ticket",
  "Assigned to Agent",
  "Completed by Agent",
  "Re-open",
  "Closed",
];

const TicketProgress = ({ status }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const statusIndex = steps.indexOf(status);
    if (statusIndex !== -1) setCurrentStep(statusIndex);
  }, [status]);

  const scroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollAmount = 200;
      scrollContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container-fluid px-3">
      <div className="row align-items-center">
        <div className="col-auto">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => scroll("left")}
          />
        </div>

        <div className="col overflow-hidden">
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="custom-scroll"
          >
            <div style={{ minWidth: "900px", flex: "1 0 auto" }}>
              <Steps
                current={currentStep}
                progressDot
                items={steps.map((step, index) => ({
                  title: step,
                  className: index === currentStep ? "blinking-step" : "",
                }))}
              />
            </div>
          </div>
        </div>

        <div className="col-auto">
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => scroll("right")}
            style={{color:"#6f2da8"}}
          />
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }

        .ant-steps-item-finish .ant-steps-item-icon {
          background-color: #6f2da8 !important;
          border-color: #6f2da8 !important;
        }

        .ant-steps-item-finish .ant-steps-item-content {
          color: #6f2da8 !important;
        }

        .blinking-step .ant-steps-item-icon {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TicketProgress;


// import React, { useEffect, useRef, useState } from "react";
// import { Steps, Button } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Ticket progress steps
// const steps = [
//   "Created",
//   "Approved / Denied",
//   "Assigned to Manager",
//   "Review Ticket",
//   "Assigned to Agent",
//   "Completed by Agent",
//   "Re-open",
//   "Closed",
// ];

// const TicketProgress = ({ status }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     // Set the current step to the 'Approved / Denied' step initially
//     let statusIndex = steps.indexOf("Approved / Denied");
//     setCurrentStep(statusIndex);

//     // If status is 'Approved', keep it at 'Approved / Denied'
//     // If status is 'Denied', we will apply danger color to the step
//   }, [status]);

//   const scroll = (direction) => {
//     const scrollContainer = scrollRef.current;
//     if (scrollContainer) {
//       const scrollAmount = 200;
//       scrollContainer.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="container-fluid px-3">
//       <div className="row align-items-center">
//         <div className="col-auto">
//           <Button
//             shape="circle"
//             icon={<LeftOutlined />}
//             onClick={() => scroll("left")}
//           />
//         </div>

//         <div className="col overflow-hidden">
//           <div
//             ref={scrollRef}
//             style={{
//               display: "flex",
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//             className="custom-scroll"
//           >
//             <div style={{ minWidth: "900px", flex: "1 0 auto" }}>
//               <Steps
//                 current={currentStep}
//                 progressDot
//                 items={steps.map((step, index) => {
//                   const isCurrent = index === currentStep;
//                   const isApproved = status === "Approved";
//                   const isDenied = status === "Denied";

//                   return {
//                     title: step,
//                     className: `${
//                       isCurrent ? "blinking-step" : ""
//                     } ${step === "Approved / Denied" ? (isApproved ? "approved-step" : isDenied ? "denied-step" : "") : ""}`,
//                     status: step === "Approved / Denied" && isDenied ? "error" : undefined,
//                   };
//                 })}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="col-auto">
//           <Button
//             shape="circle"
//             icon={<RightOutlined />}
//             onClick={() => scroll("right")}
//             style={{ color: "#6f2da8" }}
//           />
//         </div>
//       </div>

//       <style>{`
//         .custom-scroll::-webkit-scrollbar {
//           display: none;
//         }

//         .ant-steps-item-finish .ant-steps-item-icon {
//           background-color: #6f2da8 !important;
//           border-color: #6f2da8 !important;
//         }

//         .ant-steps-item-finish .ant-steps-item-content {
//           color: #6f2da8 !important;
//         }

//         .blinking-step .ant-steps-item-icon {
//           animation: blink 1s infinite;
//         }

//         @keyframes blink {
//           0% { opacity: 1; }
//           50% { opacity: 0.4; }
//           100% { opacity: 1; }
//         }

//         .approved-step .ant-steps-item-icon {
//           background-color: #4caf50 !important;
//           border-color: #4caf50 !important;
//         }

//         .approved-step .ant-steps-item-title,
//         .approved-step .ant-steps-item-description {
//           color: #4caf50 !important;
//         }

//         .denied-step .ant-steps-item-icon {
//           background-color: #f44336 !important;
//           border-color: #f44336 !important;
//         }

//         .denied-step .ant-steps-item-title,
//         .denied-step .ant-steps-item-description {
//           color: #f44336 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TicketProgress;
