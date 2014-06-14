var ExtensionModule = (function (module) {

	module.Player = function(){
		this.stats = [];
		this.extras = [];
	};

	module.Player.prototype.addStat = function(statType, value) {
		this.stats.push({
			"statType": statType,
			"value": value
		});
	};

	module.Player.prototype.addExtra = function(extraType, statType, value) {
		this.extras.push({
			"extraType": extraType,
			"statType": statType,
			"value": value
		});
	};

	module.Player.prototype.render = function(container) {
		var content = "<strong>Stats</strong>:<br />";

		this.stats.forEach(function(entry) {
			content += entry.statType + ":\t<strong>" + entry.value + "</strong><br />";
		});

		content += "<br /><strong>Extras</strong>:<br />";

		this.extras.forEach(function(entry) {
			content += entry.extraType + " [" + entry.statType + "]:\t<strong>" + entry.value + "</strong><br />";
		});

		container.innerHTML = content;
		container.style.visibility = "visible";
	};

	return module;

}(ExtensionModule || {}));