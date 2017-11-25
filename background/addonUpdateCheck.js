browser.runtime.onStartup.addListener(() => {
	// インストールとアップデートを判定 web-extではこの実行を確認することはできないため
	// アドオンをインストールした後にFirefoxの起動を検知するイベント
	console.log("on startup");
	checkUpdate();
});

function checkUpdate() {
	console.log("checkUpdate");
	let getUpdateVer;
	let xhr = new XMLHttpRequest();
	// バージョン情報を取得するURL
	let nowTime = new Date(); // キャッシュの無効のために無効なクエリパラメータを付与
	// 通信先が/api/の階層の下でないと通信時にbouncerのログイン画面で止まる
	console.log(loadStorage.addonWebPageUrl + "/api/version.json?timestamp=" + nowTime.getTime());
	xhr.open("get", loadStorage.addonWebPageUrl + "/api/version.json?timestamp=" + nowTime.getTime(), true);

	xhr.onreadystatechange = function () {
		// note xhr.status 200 通信成功
		// note xhr.status  0   ローカルから取得成功
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			let myData = JSON.parse(xhr.responseText);
			getUpdateVer = myData["version"];
			console.log("取得Ver： " + getUpdateVer);
			let thisVersion = browser.runtime.getManifest().version;

			if (versionCompere(getUpdateVer, thisVersion) === 1) {
				alert("最新Versionが公開されました。\n更新ページを開きます。");
				// CheckNewVersion.openWebpage();
				browser.tabs.create({
					url: loadStorage.addonWebPageUrl
				});
			} else {
				// alert("現在、最新のバージョンがインストールされています。"); // ここでアラートを出すと以降の処理が実行されない
				console.log(url);
				browser.tabs.create({
					url: loadStorage.addonWebPageUrl
				});
			}

		} else if (xhr.readyState === 4 && (xhr.status !== 200 && xhr.status !== 0)) {
			console.log("更新情報を取得できませんでした。" + xhr.status);
		}
	};
	xhr.send(null);
}

//	現在のVerと取得したVerの比較
function versionCompere(v1, v2, options) {
	let lexicographical = options && options.lexicographical,
		zeroExtend = options && options.zeroExtend,
		v1parts = v1.split('.'),
		v2parts = v2.split('.');

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	}
	if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		return NaN;
	}
	if (zeroExtend) {
		while (v1parts.length < v2parts.length) v1parts.push("0");
		while (v2parts.length < v1parts.length) v2parts.push("0");
	}
	if (!lexicographical) {
		v1parts = v1parts.map(Number);
		v2parts = v2parts.map(Number);
	}
	for (let i = 0; i < v1parts.length; ++i) {
		if (v2parts.length == i) {
			return 1;
		}
		if (v1parts[i] == v2parts[i]) {
			continue;
		} else if (v1parts[i] > v2parts[i]) {
			return 1;
		} else {
			return -1;
		}
	}
	if (v1parts.length != v2parts.length) {
		return -1;
	}
	return 0;
}