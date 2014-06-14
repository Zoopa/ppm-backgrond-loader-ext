var ExtensionModule = (function (module) {

    module.StatType = {
        SPEED: "Speed",
        ACCELERATION: "Acceleration",
        HANDLING: "Handling"
    };

    module.ExtraType = {
        SKILL: "Skill",
        EQUIPMENT: "Equipment",
        FACILITY: "Facility"
    };

    module.PlayerType = {
        ME: 1,
        OPPONENT: 2
    };

    module.WindowPosition = {
        TOP_LEFT: {
            top: 0,
            right: undefined,
            bottom: undefined,
            left: 0
        },
        TOP_RIGHT: {
            top: 0,
            right: 0,
            bottom: undefined,
            left: undefined
        },
        BOTTOM_LEFT: {
            top: undefined,
            right: undefined,
            bottom: 0,
            left: 0
        },
        BOTTOM_RIGHT: {
            top: undefined,
            right: 0,
            bottom: 0,
            left: undefined
        }
    };

    module.ExtraStatMap = {
        0: {
            statType: module.StatType.SPEED,
            extraType: module.ExtraType.EQUIPMENT
        },
        1: {
            statType: module.StatType.ACCELERATION,
            extraType: module.ExtraType.EQUIPMENT
        },
        2: {
            statType: module.StatType.HANDLING,
            extraType: module.ExtraType.EQUIPMENT
        },
        3: {
            statType: module.StatType.SPEED,
            extraType: module.ExtraType.SKILL
        },
        4: {
            statType: module.StatType.ACCELERATION,
            extraType: module.ExtraType.SKILL
        },
        5: {
            statType: module.StatType.HANDLING,
            extraType: module.ExtraType.SKILL
        },
        6: {
            statType: module.StatType.SPEED,
            extraType: module.ExtraType.FACILITY
        },
        7: {
            statType: module.StatType.ACCELERATION,
            extraType: module.ExtraType.FACILITY
        },
        8: {
            statType: module.StatType.HANDLING,
            extraType: module.ExtraType.FACILITY
        }
    };

    module.StatPlayerMap = {
        1: {
            statType: module.StatType.SPEED,
            playerType: module.PlayerType.OPPONENT
        },
        2: {
            statType: module.StatType.SPEED,
            playerType: module.PlayerType.ME
        },
        5: {
            statType: module.StatType.ACCELERATION,
            playerType: module.PlayerType.OPPONENT
        },
        6: {
            statType: module.StatType.ACCELERATION,
            playerType: module.PlayerType.ME
        },
        9: {
            statType: module.StatType.HANDLING,
            playerType: module.PlayerType.OPPONENT
        },
        10: {
            statType: module.StatType.HANDLING,
            playerType: module.PlayerType.ME
        }
    };

    return module;

}(ExtensionModule || {}));