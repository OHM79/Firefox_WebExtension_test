/*
ポップアップの選択肢をクリックしたときに動作する機能
*/
document.getElementById("windowAlert").onclick = function () {
	loadStorage.$loaded.then(function () {
		let test = loadStorage.printPageUrl;
		window.alert("window alertだよ。" + test);
	});
};