/**
 * これだとアドオンの起動時にbatが実行されてしまいダメ
 */
// console.log("test");
// var port = chrome.runtime.connectNative('firefox.webextension.test');

// port.onMessage.addListener((response) => {
// 	console.log("Received: " + response);
// });

// chrome.browserAction.onClicked.addListener(() => {
// 	console.log("Sending:  ping");
// 	port.postMessage("aa");
// });

chrome.browserAction.onClicked.addListener(() => {
	chrome.runtime.sendNativeMessage('firefox.webextension.test', {
		text: "Hello"
	},
	function (response) {
		console.log("Received " + response);
	});
});



/**
 * 成功
 */
// var port = null;

// function onNativeMessage(message) {
// 	// console.log("Received message: <b>" + JSON.stringify(message) + "</b>");
// 	console.log("Received message: <b>" + message + "</b>");
// }

// function onDisconnected(msg) {
// 	if (chrome.runtime.lastError) {
// 		console.log("Failed to connect: " + chrome.runtime.lastError.message);
// 	} else {
// 		console.log("Failed to connect: ");
// 		console.log(msg);
// 	}
// 	port = null;
// }

// function connect() {
// 	var hostName = "firefox.webextension.test";
// 	port = chrome.runtime.connectNative(hostName);
// 	port.onMessage.addListener(onNativeMessage);
// 	port.onDisconnect.addListener(onDisconnected);

// 	if (port) {
// 		console.log("connected\n");
// 	} else {
// 		console.log("Not connected\n");
// 	}
// }

// chrome.browserAction.onClicked.addListener(() => {
// 	if (port == null){
// 		connect();
// 	}

// 	if (port) {
// 		var message = {
// 			"url": "url_string",
// 			"ffPath": "localStorage.path"
// 		};
// 		port.postMessage(message);
// 	}
// });