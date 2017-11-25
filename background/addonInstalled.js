browser.runtime.onInstalled.addListener((details) => {
	// インストールとアップデートを判定
	if (details.reason == "install") {
		console.log("First Install");
		localSettingFileGetToSave(); // local Storageに設定情報を保存

	} else if (details.reason == "update") {
		localSettingFileGetToSave(); // local Storageに設定情報を保存
		let thisVersion = browser.runtime.getManifest().version;
		console.log("Updated From " + details.previousVersion + " to " + thisVersion + "!");
	}
	
});