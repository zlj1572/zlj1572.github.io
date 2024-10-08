var port;
function sendDataToApp() {
    console.log('Sending data to application...');
    port.postMessage("{\"message\":\"some message\"}");
}

function sendNavigationCommand() {
    console.log('Sending navigation command...');
    port.postMessage("{\"message\":\"navigation command\"}");
}

function navigateToAnotherScreen(url) {
    console.log('Navigating to another screen...');
    window.location.href = url;
}

function displayReceivedData(msg) {
    console.log('Message from native - ' + msg);
    const dataReceivedDiv = document.getElementById('dataReceived');
    if (msg) {
        dataReceivedDiv.textContent = "Data received from app - " + msg;
    } else {
        dataReceivedDiv.textContent = 'Data received from app - No data received';
    }
}

window.addEventListener("message", function (event) {
    // optionally check for the origin to be your app
    console.log("origin:",event.origin)
    console.log("data:",event.data)
    console.log("event:",event)
    // if (!event.origin.includes("YOUR_PACKAGE_NAME")) return;

    // get the port then use it for communication.
    port = event.ports[0];
    console.log('port:',port);
    if (typeof port === 'undefined') return;

    // Post message on this port.
    
    console.log('Posting a message to native...');
    port.postMessage("{\"message\":\"connection ack\"}");

    // Receive upcoming messages on this port.
    port.onmessage = function(event) {
        console.log("message:",event.data);
        console.log("event:", event)
        const json = JSON.parse(event.data);
        console.log("json ~> " + JSON.stringify(json));

        if (json.navigateTo) {
            navigateToAnotherScreen(json.navigateTo);
        }

        displayReceivedData(event.data);
    };
});
