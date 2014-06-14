var ExtensionModule = (function (module) {

    /*
        Private Attributes
    */
    var playerLeft = null;
    var playerRight = null;
    var containerOpponent = null;
    var containerMe = null;

    /*
        Private Methods
    */
    var registerMouseOverEvents = function(documentRoot) {
        var query = documentRoot.querySelectorAll("a");

        for (var i = 0; i < query.length; i++) {
            var thisElement = query[i];
            var thisElementUrl = query[i].href;

            if(isJumpButton(thisElementUrl)) {
                addMouseOverEventHandler(thisElement, thisElementUrl);
            }
        }
    };

    var addMouseOverEventHandler = function(element, url) {
        element.addEventListener("mouseover", function(e) {
            loadDuelPage(url);
        }, false);
    };

    var injectContainer = function(document) {
        containerOpponent = createContainer(document, "#F7DADF", module.WindowPosition.TOP_RIGHT);
        containerMe = createContainer(document, "#DCF7DA", module.WindowPosition.BOTTOM_RIGHT);
    };

    var createContainer = function(document, containerColor, windowPosition) {
        container = document.createElement("div");
        applyContainerStyle(container, containerColor);
        pinContainerToWindow(document, container, windowPosition);
        return container;
    };

    var applyContainerStyle = function(container, containerColor) {
        container.style.position = "fixed";
        container.style.padding = "0.5em";
        container.style.border = "2px solid silver";
        container.style.backgroundColor = containerColor;
        container.style.visibility = "hidden";
        container.style.opacity = 0.85;
        container.style.color = "#000000";
        container.style.zIndex = "99999";
    };

    var pinContainerToWindow = function(document, container, windowPosition) {
        container.style.top = windowPosition.top;
        container.style.right = windowPosition.right;
        container.style.bottom = windowPosition.bottom;
        container.style.left = windowPosition.left;
        document.body.appendChild(container);
    };

    var isJumpButton = function(url) {
        return url.indexOf("/report/rival") > -1;
    };

    var loadDuelPage = function(url) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", onDuelPageLoaded, false);
        req.send(null);
    };

    var onDuelPageLoaded = function(info) {
        var htmlDoc = parseHtmlDocument(info.target.responseText);
        createPlayers();
        getTotalPlayerPoints(htmlDoc);
        renderPlayers();
    };

    var parseHtmlDocument = function(responseText) {
        var parser = new DOMParser();
        return parser.parseFromString(responseText, "text/html");
    };

    var createPlayers = function() {
        playerLeft = new module.Player();
        playerRight = new module.Player();
    };

    var renderPlayers = function() {
        playerLeft.render(containerOpponent);
        playerRight.render(containerMe);
    };

    var getTotalPlayerPoints = function(documentRoot) {
        getPlayerStats(documentRoot, module.PlayerType.OPPONENT);
        getPlayerExtras(documentRoot, module.PlayerType.OPPONENT);        
        getPlayerStats(documentRoot, module.PlayerType.ME);
        getPlayerExtras(documentRoot, module.PlayerType.ME);
    };

    var getPlayerStats = function(documentRoot, playerType) {
        var query = documentRoot.querySelectorAll("div.content_table td");
        var player = (playerType === module.PlayerType.OPPONENT) ? playerLeft : playerRight;

        for (var i = 0; i < query.length; i++) {
            var statPlayer = module.StatPlayerMap[i];

            if(statPlayer && statPlayer.playerType === playerType) {
                player.addStat(statPlayer.statType, query[i].innerHTML);
            }
        }
    };

    var getPlayerExtras = function(documentRoot, playerType) {
        var playerTypeDiv = (playerType === module.PlayerType.OPPONENT) ? "div.two_col_left" : "div.two_col_right";
        var player = (playerType === module.PlayerType.OPPONENT) ? playerLeft : playerRight;
        var query = documentRoot.querySelectorAll(playerTypeDiv + " div.sum_points_element_span");

        for (var i = 0; i < query.length; i++) {
            var extraStat = module.ExtraStatMap[i];
            player.addExtra(extraStat.extraType, extraStat.statType, query[i].innerHTML);
        }
    };

    /*
        Public Mehtods
    */
    module.startExtension = function() {
        injectContainer(document);
        registerMouseOverEvents(document);
    };

    return module;

}(ExtensionModule || {}));

/*
    Run
*/
(function() {
    ExtensionModule.startExtension();
})();