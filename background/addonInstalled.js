browser.runtime.onInstalled.addListener((details) => {
	// インストールとアップデートを判定
	console.log(details);
	if (details.reason == "install") {
		console.log("First Install");
		localSettingFileGet(); // local Storageに設定情報を保存

	} else if (details.reason == "update") {
		localSettingFileGet(); // local Storageに設定情報を保存
		var thisVersion = browser.runtime.getManifest().version;
		console.log("Updated From " + details.previousVersion + " to " + thisVersion + "!");
	}
	
});