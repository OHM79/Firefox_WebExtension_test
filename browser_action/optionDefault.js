document.getElementById("updateCheck").addEventListener("click", () => {
	checkUpdate();
});

document.getElementById("reloadStorageJson").addEventListener("click", () => {
	localSettingFileGetToSave(); // local Storageに設定情報を保存
});

document.getElementById("restart").addEventListener("click", () => {
	browser.runtime.reload();
});

document.getElementById("windowAlert").addEventListener("click", () => {
	// ポップアップの選択肢をクリックしたときに動作する機能
	let test = loadStorage.printPageUrl;
	window.alert("window alertだよ。" + test);
});