// import React from "react";
// import '../Tabs.css'

// function Notification() {
//   const handleNotificationClick = () => {
//     Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         new Notification("Notification Title", {
//           body: "Notification Body",
//         });
//       }
//     });
//   };

//   return (
//     <div>
//       <button className="red" onClick={handleNotificationClick}>
//         CLICK
//       </button>
//     </div>
//   );
// }

// export default Notification

import React from "react";

function Notification() {
  const handleNotificationClick = () => {
    if (/Mobi/.test(navigator.userAgent)) {
      // User is on a mobile device
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Notification Title", {
            body: "You clicked the button on your mobile device!",
          });
        }
      });
    } else {
      // User is on a desktop browser
      alert("You clicked the button on your desktop browser!");
    }
  };

  return (
    <div className="red-container table_center">
      <div className="red " onClick={handleNotificationClick}>
        <div>PRESS</div>
      </div>
    </div>
  );
}

export default Notification;




