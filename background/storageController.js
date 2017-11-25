// LoadStorageを使うためにjsonの構成情報を読み込んで初期処理を行う
var loadStorage = new LoadStorage(function () {
	let LoadStorageJson;
	let xhr = new XMLHttpRequest();
	let nowTime = new Date(); // キャッシュの無効のために無効なクエリパラメータを付与
	xhr.open("get", browser.extension.getURL("storageSetting.json") + "?timestamp=" + nowTime.getTime(), false);
	xhr.onreadystatechange = () => {
		// note xhr.status 200 通信成功
		// note xhr.status  0   ローカルから取得成功
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			LoadStorageJson = JSON.parse(xhr.responseText);
			// 下記で値をnullにしないとJsonの情報を読みこんでしまう。
			for (let key in LoadStorageJson) {
				LoadStorageJson[key] = null;
			}
		} else if (xhr.readyState === 4 && (xhr.status !== 200 && xhr.status !== 0)) {}
	};

	xhr.send(null);
	return LoadStorageJson;
}());

function onError(error) {
	console.log(`Error:${error}`);
}

function localSettingFileGetToSave() {
	console.log("storageSetting.json取得開始");
	let xhr = new XMLHttpRequest();
	let nowTime = new Date(); // キャッシュの無効のために無効なクエリパラメータを付与
	xhr.open("get", browser.extension.getURL("storageSetting.json") + "?timestamp=" + nowTime.getTime(), true);

	xhr.onreadystatechange = () => {
		// note xhr.status 200 通信成功
		// note xhr.status  0   ローカルから取得成功
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			let myData = JSON.parse(xhr.responseText);
			writeLocalStorage(myData);
		} else if (xhr.readyState === 4 && (xhr.status !== 200 && xhr.status !== 0)) {
			console.log("storageSetting.jsonを取得できませんでした。" + xhr.status);
		}
	};

	xhr.send(null);
}

async function writeLocalStorage(myData) {
	// 下記コマンドでアドオンのデバック画面で実行すると保存されているのものが確認できる
	// browser.storage.local.get(function(items){console.log(items)})
	try {
		let setting = await browser.storage.local.set(myData);
	} catch (err) {
		onError(err);
	}
}

/**
 * ※現状不要
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