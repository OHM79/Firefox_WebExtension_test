var loadStorage = new LoadStorage({
	"getSettingFileURL": "",
	"AddonWebPageUrl": "",
	"ticketNoUrl": "",
	"jopsdbTicketNoUrl": "",
	"ticketSearchUrl": "",
	"ticketFolderPath": "",
	"siteOpMenberSearchUrl": "",
	"printPageUrl": "",
	"installCheckerUrl": "",
	"jpopsServerSearchUrl": "",
	"opsServerSearchUrl": "",
	"WikiSearchUrl": "",
	"WikiSearchAfterUrl": "",
	"RackUrl": "",
	"rackIdListUrl": "",
	"allSerachLight": "",
	"allSerachHeavy": "",
	"tantou": "",
	"tantoubusyo": "",
	"title": "",
	"hostname": "",
	"rack": "",
	"kyoten": "",
	"status": "",
	"kataban": "",
	"Yserial": "",
	"serial": "",
	"ticketno": "",
	"mail": "",
	"taiousoti": "",
	"jikeiretsu": ""
});


function onError(error) {
	console.log(`Error:${error}`);
}

function localSettingFileGet() {
	console.log("Local取得開始");
	let xhr = new XMLHttpRequest();
	let nowTime = new Date(); // キャッシュの無効のために無効なクエリパラメータを付与
	xhr.open("get", browser.extension.getURL("storageSetting.json") + "?timestamp=" + nowTime.getTime(), true);

	xhr.onreadystatechange = () => {
		// note xhr.status 200 通信成功
		// note xhr.status  0   ローカルから取得成功
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			let myData = JSON.parse(xhr.responseText);
			console.log(myData);
			writeLocalStorage(myData);
			console.log("connection End");
		} else if (xhr.readyState === 4 && (xhr.status !== 200 && xhr.status !== 0)) {
			console.log("更新情報を取得できませんでした。" + xhr.status);
		}
	};

	xhr.send(null);
}

async function writeLocalStorage(myData) {
	// 下記コマンドでアドオンのデバック画面で実行すると保存されているのものが確認できる
	// browser.storage.local.get(function(items){console.log(items)})
	try {
		setting = await browser.storage.local.set(myData);
	} catch (err) {
		onError(err);
	}
}



/**
 * ローカルストレージから読み込んで使用する処理
 * @param {string} key ローカルストレージから読み込むキー
 * @param {function} callback 読み込んだキーを使う処理
 * 使用方法
 * readLocalStorageValue("ticketNoUrl", (readValue, key) => {
 * 	console.log("読み込んだのは " + readValue[key] + " これ");
 * });
 */
async function readLocalStorageValue(key, callback) {
	try {
		let getValue = await browser.storage.local.get(key);
		callback(getValue, key);
	} catch (err) {
		onError(err);
	}
}