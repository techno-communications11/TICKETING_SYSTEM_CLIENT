
// // // // import React, { useEffect, useState } from "react";
// // // // import { Steps } from "antd";

// // // // // Ticket progress steps
// // // // const steps = [
// // // //     "Created",
// // // //     "Approved",
// // // //     "Denied",
// // // //     "Assigned to Manager",
// // // //     "Review Ticket",
// // // //     "Assigned to Agent",
// // // //     "Completed by Agent",
// // // //     "Re-open",
// // // //     "Closed",
// // // // ];

// // // // const TicketProgress = ({ status }) => {
// // // //     const [currentStep, setCurrentStep] = useState(0);

// // // //     useEffect(() => {
// // // //         const statusIndex = steps.indexOf(status);
// // // //         if (statusIndex !== -1) setCurrentStep(statusIndex);
// // // //     }, [status]);

// // // //     return (
// // // //         <>
// // // //             <Steps
// // // //                 current={currentStep}
// // // //                 progressDot
// // // //                 items={steps.map((step, index) => ({
// // // //                     title: step,
// // // //                     className: index === currentStep ? "blinking-step" : "",
// // // //                 }))}
// // // //             />

// // // //             {/* Add styles dynamically */}
// // // //             <style>
// // // //                 {`
// // // //           /* Green progress line for completed steps */
// // // //           .ant-steps-item-finish .ant-steps-item-icon {
// // // //             background-color: green !important;
// // // //             border-color: green !important;
// // // //           }

// // // //           .ant-steps-item-finish .ant-steps-item-content {
// // // //             color: green !important;
// // // //           }

// // // //           /* Blinking effect for active step */
// // // //           .blinking-step .ant-steps-item-icon {
// // // //             animation: blink 1s infinite;
// // // //           }

// // // //           @keyframes blink {
// // // //             0% { opacity: 1; }
// // // //             50% { opacity: 0.4; }
// // // //             100% { opacity: 1; }
// // // //           }
// // // //         `}
// // // //             </style>
// // // //         </>
// // // //     );
// // // // };

// // // // export default TicketProgress;


// // // import React, { useEffect, useState } from "react";
// // // import { Steps } from "antd";
// // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // Ticket progress steps
// // // const steps = [
// // //   "Created",
// // //   "Approved",
// // //   "Denied",
// // //   "Assigned to Manager",
// // //   "Review Ticket",
// // //   "Assigned to Agent",
// // //   "Completed by Agent",
// // //   "Re-open",
// // //   "Closed",
// // // ];

// // // const TicketProgress = ({ status }) => {
// // //   const [currentStep, setCurrentStep] = useState(0);

// // //   useEffect(() => {
// // //     const statusIndex = steps.indexOf(status);
// // //     if (statusIndex !== -1) setCurrentStep(statusIndex);
// // //   }, [status]);

// // //   return (
// // //     <div className="container-fluid px-3">
// // //       <div className="row">
// // //         <div className="col-md-12">
// // //           <div style={{ overflowX: "auto", width: "100%" }}>
// // //             <div style={{ minWidth: "900px" }}>
// // //               <Steps
// // //                 current={currentStep}
// // //                 progressDot
// // //                 items={steps.map((step, index) => ({
// // //                   title: step,
// // //                   className: index === currentStep ? "blinking-step" : "",
// // //                 }))}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style>
// // //         {`
// // //           .ant-steps-item-finish .ant-steps-item-icon {
// // //             background-color: #6f2da8 !important;
// // //             border-color: #6f2da8 !important;
// // //           }

// // //           .ant-steps-item-finish .ant-steps-item-content {
// // //             color: #6f2da8 !important;
// // //           }

// // //           .blinking-step .ant-steps-item-icon {
// // //             animation: blink 1s infinite;
// // //           }

// // //           @keyframes blink {
// // //             0% { opacity: 1; }
// // //             50% { opacity: 0.4; }
// // //             100% { opacity: 1; }
// // //           }
// // //         `}
// // //       </style>
// // //     </div>
// // //   );
// // // };

// // // export default TicketProgress;


// // // import React, { useCallback, useEffect, useRef, useState } from "react";
// // // import { Steps, Button } from "antd";
// // // import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

// // // // Ticket progress steps
// // // const steps = [
// // //   "Created",
// // //   // "Approved / Denied",
// // //   // "Denied",
// // //   // "Assigned to Manager",
// // //   "Recieved to Manager",
// // //   // "Recieved to Manager & Review Ticket",
// // //   // "Review Ticket",
// // //   "Assigned to Agent",
// // //   "Completed by Agent",
// // //   // "Re-open",
// // //   "Closed",
// // // ];
// // // // ticketId

// // // const TicketProgress = ({ status = [],id }) => {
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const scrollRef = useRef(null);
// // //   const fetchAllTicketProgress = useCallback(async () => {
// // //     try {
// // //       const response = await getNewTicketProgressServices();
// // //       const filtereddata=await response.data.data.filter((data)=>data.ticketId===id);

// // //       console.log(filtereddata);
// // //     } catch (error) {

// // //     }
// // //   }, []);
// // //   useEffect(() => {
// // //     fetchAllTicketProgress();
// // //   }, [fetchAllTicketProgress])
// // //   useEffect(() => {
// // //     const statusIndex = steps.indexOf(status);
// // //     if (statusIndex !== -1) setCurrentStep(statusIndex);
// // //   }, [status]);

// // //   const scroll = (direction) => {
// // //     const scrollContainer = scrollRef.current;
// // //     if (scrollContainer) {
// // //       const scrollAmount = 200;
// // //       scrollContainer.scrollBy({
// // //         left: direction === "left" ? -scrollAmount : scrollAmount,
// // //         behavior: "smooth",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid px-3">
// // //       <div className="row align-items-center">
// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<LeftOutlined />}
// // //             onClick={() => scroll("left")}
// // //           />
// // //         </div>

// // //         <div className="col overflow-hidden">
// // //           <div
// // //             ref={scrollRef}
// // //             style={{
// // //               display: "flex",
// // //               overflowX: "auto",
// // //               scrollbarWidth: "none",
// // //               msOverflowStyle: "none",
// // //             }}
// // //             className="custom-scroll"
// // //           >
// // //             <div style={{ minWidth: "900px", flex: "1 0 auto" }}>
// // //               <Steps
// // //                 current={currentStep}
// // //                 progressDot
// // //                 items={steps.map((step, index) => ({
// // //                   title: step,
// // //                   className: index === currentStep ? "blinking-step" : "",
// // //                 }))}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<RightOutlined />}
// // //             onClick={() => scroll("right")}
// // //             style={{ color: "#6f2da8" }}
// // //           />
// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           display: none;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-icon {
// // //           background-color: #6f2da8 !important;
// // //           border-color: #6f2da8 !important;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-content {
// // //           color: #6f2da8 !important;
// // //         }

// // //         .blinking-step .ant-steps-item-icon {
// // //           animation: blink 1s infinite;
// // //         }

// // //         @keyframes blink {
// // //           0% { opacity: 1; }
// // //           50% { opacity: 0.4; }
// // //           100% { opacity: 1; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default TicketProgress;

// // // import React, { useCallback, useEffect, useRef, useState } from "react";
// // // import { Steps, Button } from "antd";
// // // import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

// // // // ✅ Ticket progress steps (fixed order)
// // // const steps = [
// // //   "Created",
// // //   "Pending", // 👈 added new step for pending tickets
// // //   "Recieved to Manager",
// // //   "Assigned to Agent",
// // //   "Completed by Agent",
// // //   "Closed",
// // // ];

// // // const TicketProgress = ({ id, status }) => {
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const scrollRef = useRef(null);

// // //   // ✅ Fetch ticket progress by ticketId
// // //   const fetchAllTicketProgress = useCallback(async () => {
// // //     try {
// // //       const response = await getNewTicketProgressServices();
// // //       const filteredData = response.data.data.filter(
// // //         (item) => item.ticketId === id
// // //       );

// // //       console.log("Filtered Progress Data:", filteredData);

// // //       if (filteredData.length > 0) {
// // //         // ✅ Sort by updatedAt (oldest → newest)
// // //         const sortedData = filteredData.sort(
// // //           (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
// // //         );

// // //         // ✅ Get last status (most recent update)
// // //         const latestStatus = sortedData[sortedData.length - 1].status;

// // //         // ✅ Find index from our defined steps
// // //         const statusIndex = steps.indexOf(latestStatus);

// // //         if (statusIndex !== -1) {
// // //           setCurrentStep(statusIndex);
// // //         } else {
// // //           setCurrentStep(0); // fallback
// // //         }
// // //       } else {
// // //         // ✅ No progress data → rely on `status` prop
// // //         if (status?.toLowerCase() === "pending") {
// // //           // after created
// // //           const pendingIndex = steps.indexOf("Pending");
// // //           setCurrentStep(pendingIndex !== -1 ? pendingIndex : 1);
// // //         } else if (status?.toLowerCase() === "close") {
// // //           // closed step
// // //           const closedIndex = steps.indexOf("Closed");
// // //           setCurrentStep(closedIndex !== -1 ? closedIndex : steps.length - 1);
// // //         } else {
// // //           setCurrentStep(0); // default: Created
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching ticket progress:", error.message);
// // //     }
// // //   }, [id, status]);

// // //   useEffect(() => {
// // //     if (id) fetchAllTicketProgress();
// // //   }, [fetchAllTicketProgress, id]);

// // //   const scroll = (direction) => {
// // //     const scrollContainer = scrollRef.current;
// // //     if (scrollContainer) {
// // //       const scrollAmount = 200;
// // //       scrollContainer.scrollBy({
// // //         left: direction === "left" ? -scrollAmount : scrollAmount,
// // //         behavior: "smooth",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid px-3">
// // //       <div className="row d-flex align-items-center">
// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<LeftOutlined />}
// // //             onClick={() => scroll("left")}
// // //           />
// // //         </div>

// // //         <div className="col mt-3 border d-flex  overflow-hidden">
// // //           <div
// // //             ref={scrollRef}
// // //             style={{
// // //               display: "flex",
// // //               overflowX: "auto",
// // //               scrollbarWidth: "none",
// // //               msOverflowStyle: "none",
// // //             }}
// // //             className="custom-scroll"
// // //           >
// // //             <div style={{ minWidth: "1000px", flex: "1 0 auto" }}>
// // //               <Steps
// // //                 current={currentStep}
// // //                 progressDot
// // //                 items={steps.map((step, index) => ({
// // //                   title: step,
// // //                   className: index === currentStep ? "blinking-step" : "",
// // //                 }))}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<RightOutlined />}
// // //             onClick={() => scroll("right")}
// // //             style={{ color: "#6f2da8" }}
// // //           />
// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           display: none;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-icon {
// // //           background-color: #6f2da8 !important;
// // //           border-color: #6f2da8 !important;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-content {
// // //           color: #6f2da8 !important;
// // //         }

// // //         .blinking-step .ant-steps-item-icon {
// // //           animation: blink 1s infinite;
// // //         }

// // //         @keyframes blink {
// // //           0% { opacity: 1; }
// // //           50% { opacity: 0.4; }
// // //           100% { opacity: 1; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default TicketProgress;

// // import React, { useCallback, useEffect, useRef, useState } from "react";
// // import { Steps, Button } from "antd";
// // import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

// // // ✅ Ticket progress steps (fixed order)
// // const steps = [
// //   "Created",
// //   "Pending",
// //   "Recieved to Manager",
// //   "Assigned to Agent",
// //   "Completed by Agent",
// //   "Closed",
// // ];

// // const TicketProgress = ({ id, status }) => {
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const scrollRef = useRef(null);

// //   // ✅ Fetch ticket progress by ticketId
// //   const fetchAllTicketProgress = useCallback(async () => {
// //     try {
// //       const response = await getNewTicketProgressServices();
// //       const filteredData = response.data.data.filter(
// //         (item) => item.ticketId === id
// //       );

// //       if (filteredData.length > 0) {
// //         const sortedData = filteredData.sort(
// //           (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
// //         );

// //         const latestStatus = sortedData[sortedData.length - 1].status;
// //         const statusIndex = steps.indexOf(latestStatus);

// //         setCurrentStep(statusIndex !== -1 ? statusIndex : 0);
// //       } else {
// //         // ✅ If no progress data → fallback to status prop
// //         if (status?.toLowerCase() === "pending") {
// //           const pendingIndex = steps.indexOf("Pending");
// //           setCurrentStep(pendingIndex !== -1 ? pendingIndex : 1);
// //         } else if (status?.toLowerCase() === "close") {
// //           const closedIndex = steps.indexOf("Closed");
// //           setCurrentStep(closedIndex !== -1 ? closedIndex : steps.length - 1);
// //         } else {
// //           setCurrentStep(0); // default: Created
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error fetching ticket progress:", error.message);
// //     }
// //   }, [id, status]);

// //   useEffect(() => {
// //     if (id) fetchAllTicketProgress();
// //   }, [fetchAllTicketProgress, id]);

// //   const scroll = (direction) => {
// //     const scrollContainer = scrollRef.current;
// //     if (scrollContainer) {
// //       const scrollAmount = 200;
// //       scrollContainer.scrollBy({
// //         left: direction === "left" ? -scrollAmount : scrollAmount,
// //         behavior: "smooth",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="container-fluid px-3">
// //       <div className="row justify-content-center align-items-center">
// //         <div className="col-auto">
// //           <Button
// //             shape="circle"
// //             icon={<LeftOutlined />}
// //             onClick={() => scroll("left")}
// //             style={{ borderColor: "#6f2da8", color: "#6f2da8" }}
// //           />
// //         </div>

// //         {/* ✅ Center Aligned Steps Container */}
// //         <div
// //           className="col-auto d-flex justify-content-center border rounded-3 py-3 px-4 bg-white shadow-sm"
// //           style={{ maxWidth: "90%" }}
// //         >
// //           <div
// //             ref={scrollRef}
// //             style={{
// //               display: "flex",
// //               overflowX: "auto",
// //               scrollbarWidth: "none",
// //               msOverflowStyle: "none",
// //               justifyContent: "center",
// //             }}
// //             className="custom-scroll"
// //           >
// //             <div style={{ flex: "1 0 auto", minWidth: "800px" }}>
// //               <Steps
// //                 current={currentStep}
// //                 progressDot
// //                 size="small"
// //                 responsive={false}
// //                 items={steps.map((step, index) => ({
// //                   title: (
// //                     <span
// //                       style={{
// //                         fontSize: "13px",
// //                         whiteSpace: "nowrap",
// //                       }}
// //                     >
// //                       {step}
// //                     </span>
// //                   ),
// //                   className: index === currentStep ? "blinking-step" : "",
// //                 }))}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-auto">
// //           <Button
// //             shape="circle"
// //             icon={<RightOutlined />}
// //             onClick={() => scroll("right")}
// //             style={{ borderColor: "#6f2da8", color: "#6f2da8" }}
// //           />
// //         </div>
// //       </div>

// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar {
// //           display: none;
// //         }

// //         .ant-steps {
// //           justify-content: center !important;
// //         }

// //         .ant-steps-item-title {
// //           font-size: 13px !important;
// //           color: #555 !important;
// //         }

// //         .ant-steps-item-finish .ant-steps-item-icon {
// //           background-color: #6f2da8 !important;
// //           border-color: #6f2da8 !important;
// //         }

// //         .ant-steps-item-finish .ant-steps-item-content {
// //           color: #6f2da8 !important;
// //         }

// //         .ant-steps-item-icon {
// //           width: 20px !important;
// //           height: 20px !important;
// //         }

// //         .ant-steps-item-title {
// //           line-height: 20px !important;
// //         }

// //         .blinking-step .ant-steps-item-icon {
// //           animation: blink 1s infinite;
// //         }

// //         @keyframes blink {
// //           0% { opacity: 1; }
// //           50% { opacity: 0.4; }
// //           100% { opacity: 1; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default TicketProgress;


// // // import React, { useCallback, useEffect, useRef, useState } from "react";
// // // import { Steps, Button } from "antd";
// // // import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

// // // // ✅ Ticket progress steps (fixed order)
// // // const steps = [
// // //   "Created",
// // //   "Recieved to Manager",
// // //   "Assigned to Agent",
// // //   "Completed by Agent",
// // //   "Closed",
// // // ];

// // // const TicketProgress = ({ id, status }) => {
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const scrollRef = useRef(null);

// // //   // ✅ Fetch ticket progress by ticketId
// // //   const fetchAllTicketProgress = useCallback(async () => {
// // //     try {
// // //       const response = await getNewTicketProgressServices();
// // //       const filteredData = response.data.data.filter(
// // //         (item) => item.ticketId === id
// // //       );

// // //       console.log("Filtered Progress Data:", filteredData);

// // //       if (filteredData.length > 0) {
// // //         // ✅ Sort by updatedAt (oldest → newest)
// // //         const sortedData = filteredData.sort(
// // //           (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
// // //         );

// // //         // ✅ Get last status (most recent update)
// // //         const latestStatus = sortedData[sortedData.length - 1].status;

// // //         // ✅ Find index from our defined steps
// // //         const statusIndex = steps.indexOf(latestStatus);

// // //         if (statusIndex !== -1) {
// // //           setCurrentStep(statusIndex);
// // //         } else {
// // //           setCurrentStep(0); // fallback
// // //         }
// // //       } else {
// // //         setCurrentStep(0); // no data yet
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching ticket progress:", error.message);
// // //     }
// // //   }, [id]);

// // //   useEffect(() => {
// // //     if (id) fetchAllTicketProgress();
// // //   }, [fetchAllTicketProgress, id]);

// // //   const scroll = (direction) => {
// // //     const scrollContainer = scrollRef.current;
// // //     if (scrollContainer) {
// // //       const scrollAmount = 200;
// // //       scrollContainer.scrollBy({
// // //         left: direction === "left" ? -scrollAmount : scrollAmount,
// // //         behavior: "smooth",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid px-3">
// // //       <div className="row align-items-center">
// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<LeftOutlined />}
// // //             onClick={() => scroll("left")}
// // //           />
// // //         </div>

// // //         <div className="col overflow-hidden">
// // //           <div
// // //             ref={scrollRef}
// // //             style={{
// // //               display: "flex",
// // //               overflowX: "auto",
// // //               scrollbarWidth: "none",
// // //               msOverflowStyle: "none",
// // //             }}
// // //             className="custom-scroll"
// // //           >
// // //             <div style={{ minWidth: "900px", flex: "1 0 auto" }}>
// // //               <Steps
// // //                 current={currentStep}
// // //                 progressDot
// // //                 items={steps.map((step, index) => ({
// // //                   title: step,
// // //                   className: index === currentStep ? "blinking-step" : "",
// // //                 }))}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<RightOutlined />}
// // //             onClick={() => scroll("right")}
// // //             style={{ color: "#6f2da8" }}
// // //           />
// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           display: none;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-icon {
// // //           background-color: #6f2da8 !important;
// // //           border-color: #6f2da8 !important;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-content {
// // //           color: #6f2da8 !important;
// // //         }

// // //         .blinking-step .ant-steps-item-icon {
// // //           animation: blink 1s infinite;
// // //         }

// // //         @keyframes blink {
// // //           0% { opacity: 1; }
// // //           50% { opacity: 0.4; }
// // //           100% { opacity: 1; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default TicketProgress;


// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Steps, Button } from "antd";
// // // import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // Ticket progress steps
// // // const steps = [
// // //   "Created",
// // //   "Approved / Denied",
// // //   "Assigned to Manager",
// // //   "Review Ticket",
// // //   "Assigned to Agent",
// // //   "Completed by Agent",
// // //   "Re-open",
// // //   "Closed",
// // // ];

// // // const TicketProgress = ({ status }) => {
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const scrollRef = useRef(null);

// // //   useEffect(() => {
// // //     // Set the current step to the 'Approved / Denied' step initially
// // //     let statusIndex = steps.indexOf("Approved / Denied");
// // //     setCurrentStep(statusIndex);

// // //     // If status is 'Approved', keep it at 'Approved / Denied'
// // //     // If status is 'Denied', we will apply danger color to the step
// // //   }, [status]);

// // //   const scroll = (direction) => {
// // //     const scrollContainer = scrollRef.current;
// // //     if (scrollContainer) {
// // //       const scrollAmount = 200;
// // //       scrollContainer.scrollBy({
// // //         left: direction === "left" ? -scrollAmount : scrollAmount,
// // //         behavior: "smooth",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid px-3">
// // //       <div className="row align-items-center">
// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<LeftOutlined />}
// // //             onClick={() => scroll("left")}
// // //           />
// // //         </div>

// // //         <div className="col overflow-hidden">
// // //           <div
// // //             ref={scrollRef}
// // //             style={{
// // //               display: "flex",
// // //               overflowX: "auto",
// // //               scrollbarWidth: "none",
// // //               msOverflowStyle: "none",
// // //             }}
// // //             className="custom-scroll"
// // //           >
// // //             <div style={{ minWidth: "900px", flex: "1 0 auto" }}>
// // //               <Steps
// // //                 current={currentStep}
// // //                 progressDot
// // //                 items={steps.map((step, index) => {
// // //                   const isCurrent = index === currentStep;
// // //                   const isApproved = status === "Approved";
// // //                   const isDenied = status === "Denied";

// // //                   return {
// // //                     title: step,
// // //                     className: `${
// // //                       isCurrent ? "blinking-step" : ""
// // //                     } ${step === "Approved / Denied" ? (isApproved ? "approved-step" : isDenied ? "denied-step" : "") : ""}`,
// // //                     status: step === "Approved / Denied" && isDenied ? "error" : undefined,
// // //                   };
// // //                 })}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-auto">
// // //           <Button
// // //             shape="circle"
// // //             icon={<RightOutlined />}
// // //             onClick={() => scroll("right")}
// // //             style={{ color: "#6f2da8" }}
// // //           />
// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           display: none;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-icon {
// // //           background-color: #6f2da8 !important;
// // //           border-color: #6f2da8 !important;
// // //         }

// // //         .ant-steps-item-finish .ant-steps-item-content {
// // //           color: #6f2da8 !important;
// // //         }

// // //         .blinking-step .ant-steps-item-icon {
// // //           animation: blink 1s infinite;
// // //         }

// // //         @keyframes blink {
// // //           0% { opacity: 1; }
// // //           50% { opacity: 0.4; }
// // //           100% { opacity: 1; }
// // //         }

// // //         .approved-step .ant-steps-item-icon {
// // //           background-color: #4caf50 !important;
// // //           border-color: #4caf50 !important;
// // //         }

// // //         .approved-step .ant-steps-item-title,
// // //         .approved-step .ant-steps-item-description {
// // //           color: #4caf50 !important;
// // //         }

// // //         .denied-step .ant-steps-item-icon {
// // //           background-color: #f44336 !important;
// // //           border-color: #f44336 !important;
// // //         }

// // //         .denied-step .ant-steps-item-title,
// // //         .denied-step .ant-steps-item-description {
// // //           color: #f44336 !important;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default TicketProgress;



// import React, { useCallback, useEffect, useState } from "react";
// import { Steps, Button } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

// const steps = [
//   "Created",
//   "Pending",
//   "Recieved to Manager",
//   "Assigned to Agent",
//   "Completed by Agent",
//   "Closed",
// ];

// const TicketProgress = ({ id, status }) => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const fetchAllTicketProgress = useCallback(async () => {
//     try {
//       const response = await getNewTicketProgressServices();
//       const filteredData = response.data.data.filter(
//         (item) => item.ticketId === id
//       );

//       if (filteredData.length > 0) {
//         const sortedData = filteredData.sort(
//           (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
//         );
//         const latestStatus = sortedData[sortedData.length - 1].status;
//         const statusIndex = steps.indexOf(latestStatus);
//         setCurrentStep(statusIndex !== -1 ? statusIndex : 0);
//       } else {
//         // fallback: use prop status
//         if (status?.toLowerCase() === "pending") {
//           setCurrentStep(steps.indexOf("Pending"));
//         } else if (status?.toLowerCase() === "close") {
//           setCurrentStep(steps.indexOf("Closed"));
//         } else {
//           setCurrentStep(0);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching ticket progress:", error.message);
//     }
//   }, [id, status]);

//   useEffect(() => {
//     if (id) fetchAllTicketProgress();
//   }, [fetchAllTicketProgress, id]);

//   return (
//     <div
//       className="ticket-progress-wrapper"
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <div
//         className="ticket-progress-container"
//         style={{
//           width: "100%",
//           maxWidth: "1500px",
//           background: "#fff",
//           borderRadius: "16px",
//           padding: "30px 50px",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <h5
//           style={{
//             color: "#6f2da8",
//             fontWeight: 600,
//             marginBottom: "20px",
//             fontSize: "18px",
//             textAlign: "center",
//           }}
//         >
//           Ticket Progress
//         </h5>

//         <Steps
//           current={currentStep}
//           progressDot
//           responsive={false}
//           style={{ width: "100%" }}
//           items={steps.map((step, index) => ({
//             title: (
//               <span
//                 style={{
//                   fontSize: "13px",
//                   color:
//                     index === currentStep
//                       ? "#6f2da8"
//                       : index < currentStep
//                         ? "#8e44ad"
//                         : "#999",
//                   fontWeight: index === currentStep ? "600" : "400",
//                 }}
//               >
//                 {step}
//               </span>
//             ),
//             className: index === currentStep ? "blinking-step" : "",
//           }))}
//         />
//       </div>

//       <style>{`
//         .ant-steps {
//           display: flex;
//           justify-content: space-between;
//           width: 100%;
//         }

//         .ant-steps-item-finish .ant-steps-item-icon {
//           background-color: #6f2da8 !important;
//           border-color: #6f2da8 !important;
//         }

//         .ant-steps-item-process .ant-steps-item-icon {
//           background-color: #6f2da8 !important;
//           border-color: #6f2da8 !important;
//         }

//         .ant-steps-item-wait .ant-steps-item-icon {
//           border-color: #ccc !important;
//         }

//         .ant-steps-item-finish .ant-steps-item-tail::after {
//           background-color: #6f2da8 !important;
//         }

//         .ant-steps-item-tail::after {
//           height: 3px !important;
//           border-radius: 2px;
//         }

//         .blinking-step .ant-steps-item-icon {
//           animation: blink 1s infinite;
//         }

//         @keyframes blink {
//           0% { opacity: 1; }
//           50% { opacity: 0.5; }
//           100% { opacity: 1; }
//         }

//         @media (max-width: 768px) {
//           .ant-steps-item-title {
//             font-size: 12px !important;
//           }
//           .ticket-progress-container {
//             padding: 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TicketProgress;


import React, { useCallback, useEffect, useState } from "react";
import { Steps } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { getNewTicketProgressServices } from "../../Services/ticketprogress.services";

const steps = [
  "Created",
  "Pending",
  // "Open",
  "Recieved to Manager",
  "Assigned to Agent",
  "Completed by Agent",
  "Closed",
];

const TicketProgress = ({ id, status }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const fetchAllTicketProgress = useCallback(async () => {
    try {
      const response = await getNewTicketProgressServices();
      const filteredData = response.data.data.filter(
        (item) => item.ticketId === id
      );

      if (filteredData.length > 0) {
        const sortedData = filteredData.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
        const latestStatus = sortedData[sortedData.length - 1].status;
        const statusIndex = steps.indexOf(latestStatus);
        setCurrentStep(statusIndex !== -1 ? statusIndex : 0);
      } else {
        // fallback: use prop status
        if (status?.toLowerCase() === "pending") {
          setCurrentStep(steps.indexOf("Pending"));
        } else if (status?.toLowerCase() === "open") {
          setCurrentStep(steps.indexOf("Pending"));
        }else if (status?.toLowerCase() === "close") {
          setCurrentStep(steps.indexOf("Closed"));
        } else {
          setCurrentStep(0);
        }
      }
    } catch (error) {
      console.error("Error fetching ticket progress:", error.message);
    }
  }, [id, status]);

  useEffect(() => {
    if (id) fetchAllTicketProgress();
  }, [fetchAllTicketProgress, id]);

  return (
    <div className="ticket-progress-wrapper">
      <div className="ticket-progress-card">
        <h5 className="ticket-progress-title">Ticket Progress</h5>

        <Steps
          current={currentStep}
          progressDot
          responsive={false}
          direction="horizontal"
          className="ticket-steps"
          items={steps.map((step, index) => ({
            title: (
              <span
                style={{
                  fontSize: "13px",
                  color:
                    index === currentStep
                      ? "#6f2da8"
                      : index < currentStep
                        ? "#9c6eda"
                        : "#999",
                  fontWeight: index === currentStep ? "600" : "400",
                }}
              >
                {step}
              </span>
            ),
            className: index === currentStep ? "glow-step" : "",
          }))}
        />
      </div>

      <style>{`
        /* ===== Wrapper & Card ===== */
        .ticket-progress-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 40px 15px;
        }

        .ticket-progress-card {
          width: 100%;
          max-width: 1300px;
          background: #ffffff;
          border-radius: 18px;
          padding: 35px 50px;
          box-shadow: 0 6px 20px rgba(111, 45, 168, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease-in-out;
        }

        .ticket-progress-card:hover {
          box-shadow: 0 8px 25px rgba(111, 45, 168, 0.25);
        }

        .ticket-progress-title {
          color: #6f2da8;
          font-weight: 600;
          margin-bottom: 25px;
          font-size: 18px;
          text-align: center;
          letter-spacing: 0.5px;
        }

        /* ===== Steps Styling ===== */
        .ant-steps {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .ant-steps-item-icon {
          transition: all 0.3s ease;
        }

        .ant-steps-item-finish .ant-steps-item-icon,
        .ant-steps-item-process .ant-steps-item-icon {
          background-color: #6f2da8 !important;
          border-color: #6f2da8 !important;
          box-shadow: 0 0 10px rgba(111, 45, 168, 0.4);
        }

        .ant-steps-item-wait .ant-steps-item-icon {
          border-color: #d3c3e3 !important;
        }

        .ant-steps-item-finish .ant-steps-item-tail::after {
          background-color: #6f2da8 !important;
        }

        .ant-steps-item-tail::after {
          height: 3px !important;
          border-radius: 2px;
        }

        /* ===== Glow Animation for Active Step ===== */
        .glow-step .ant-steps-item-icon {
          animation: pulse-glow 1.8s infinite ease-in-out;
        }

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(111, 45, 168, 0.6);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(111, 45, 168, 0.1);
            transform: scale(1.08);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(111, 45, 168, 0.4);
            transform: scale(1);
          }
        }

        /* ===== Responsive Design ===== */
        @media (max-width: 1024px) {
          .ticket-progress-card {
            padding: 25px 30px;
          }
          .ticket-progress-title {
            font-size: 16px;
          }
        }

        @media (max-width: 768px) {
          .ant-steps {
            flex-direction: column;
            align-items: flex-start;
          }

          .ant-steps-item {
            display: flex;
            align-items: center;
          }

          .ant-steps-item-tail {
            display: none !important;
          }

          .ticket-progress-card {
            padding: 20px;
          }

          .ticket-progress-title {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .ticket-progress-title {
            font-size: 14px;
          }

          .ant-steps-item-title {
            font-size: 12px !important;
          }

          .ticket-progress-card {
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(111, 45, 168, 0.15);
          }
        }
      `}</style>
    </div>
  );
};

export default TicketProgress;
