// function getWindowLocation() {
//   // if (isInsideRealBrowser()) {
//       return window.location;
// //   } else {
// //       return window.privacyLabradorLocation.location;
// //   }
// }


// console.log(getWindowLocation());
// // content-script.js
// function handleResponse(message) {
//   console.log(`background script sent a response: ${message.response}`);
// }

// function handleError(error) {
//   console.log(`Error: ${error}`);
// }

// function sendMessage() {
//   console.log("sending message from content");
//   var sending = chrome.runtime.sendMessage({
//     content: "message from the content script"
//   });
//   if(sending){
//     sending.then(handleResponse, handleError);
//   }
// }

// sendMessage();

function initCertDetails() {
  console.log('Initializing cert details');
  document.querySelector('h1').textContent = 'Certificate details';
}

if (global) {
  global.initCertDetails = initCertDetails;
}
