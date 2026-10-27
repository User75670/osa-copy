const { combineStats, removeUpgrades, weaponArray, weaponMirror, weaponStack, makeAuto, makeBattle, makeBird, makeCap, makeFlank, makeFore, makeGuard, makeGunner, makeOver } = require("../../facilitators.js");
const { base } = require("../../constants.js");
const g = require("../../gunvals.js");
const preset = require("../../presets.js");

// Tier 3 (Level 45)
const autoTanksT3 = [
    "blaster",
    "gatlingGun",
    "machineFlank"
];
for (type of autoTanksT3) {
    const alreadyDefined = Class[`auto${type.charAt(0).toUpperCase() + type.slice(1)}`] ? true : false;

    if (!alreadyDefined) Class[`auto${type.charAt(0).toUpperCase() + type.slice(1)}`] = makeAuto(type);
    Class[`megaAuto${type.charAt(0).toUpperCase() + type.slice(1)}`] = makeAuto(type, `Mega Auto-${Class[type].LABEL}`, preset.makeAuto.mega);
    Class[`tripleAuto${type.charAt(0).toUpperCase() + type.slice(1)}`] = makeAuto(type, `Triple Auto-${Class[type].LABEL}`, preset.makeAuto.triple);

    if (Config.arms_race || !alreadyDefined) {
        Class[`auto${type.charAt(0).toUpperCase() + type.slice(1)}`].UPGRADES_TIER_4 = ["mega", "triple"].map(x => `${x}Auto${type.charAt(0).toUpperCase() + type.slice(1)}`);
    } else {
        Class[`auto${type.charAt(0).toUpperCase() + type.slice(1)}`].UPGRADES_TIER_4 = [];
    };
};

const doubleTanksT3 = [
    "artillery",
    "blaster",
    "diesel",
    "gatlingGun",
    "minigun",
    "sprayer"
];
for (type of doubleTanksT3) {
    const truncatedType = type.replace(/Gun$/, "");
    const truncatedLabel = Class[type].LABEL.replace(/\s+Gun$/, "");

    Class[`double${truncatedType.charAt(0).toUpperCase() + truncatedType.slice(1)}`] = makeFlank(type, 2, `Double ${truncatedLabel}`, { extraStats: [g.doubleTwin] });
    Class[`triple${truncatedType.charAt(0).toUpperCase() + truncatedType.slice(1)}`] = makeFlank(type, 3, `Triple ${truncatedLabel}`, { extraStats: [g.doubleTwin, g.tripleTwin], danger: Class[type].DANGER + 2 });

    Class[`double${truncatedType.charAt(0).toUpperCase() + truncatedType.slice(1)}`].UPGRADES_TIER_4 = ["triple"].map(x => `${x}${truncatedType.charAt(0).toUpperCase() + truncatedType.slice(1)}`);
};

// Tier 4 (Level 60)
const autoTanksT4 = [
    "doubleArtillery",
    "doubleBlaster",
    "doubleDiesel",
    "doubleGatling",
    "doubleMinigun",
    "doubleSprayer",
    "machineTriple"
];
for (type of autoTanksT4) {
    Class[`auto${type.charAt(0).toUpperCase() + type.slice(1)}`] = makeAuto(type);
};

const doubleTanksT4 = [
    "atomizer",
    "foamer",
    "focal",
    "redistributor",
    "splasher"
];
for (type of doubleTanksT4) {
    const truncatedType = type.replace(/Gun$/, "");
    Class[`double${truncatedType.charAt(0).toUpperCase() + truncatedType.slice(1)}`] = makeFlank(type, 2, `Double ${Class[type].LABEL.replace(/\s+Gun$/, "")}`, { extraStats: [g.doubleTwin] });
};

Class.machineQuadruple = makeFlank("machineGun", 4, "Machine Quadruple", { extraStats: [g.doubleTwin, g.tripleTwin], danger: 8 });

// Existing Upgrade Management
const better_retrograde = require("../../groups/tanks/retrograde.js");
if (!better_retrograde) return;

if (Config.retrograde && Config.arms_race) {
    Class.artillery.UPGRADES_TIER_3.push("doubleArtillery");
    Class.blaster.UPGRADES_TIER_3.push("doubleBlaster", "autoBlaster");
    Class.diesel.UPGRADES_TIER_3.push("doubleDiesel");
    Class.gatlingGun.UPGRADES_TIER_3.push("doubleGatling", "autoGatlingGun");
    Class.machineFlank.UPGRADES_TIER_3.push("doubleArtillery", "doubleMinigun", "doubleGunner", "doubleSprayer", "doubleBlaster", "doubleGatling", "doubleDiesel", "triMachine", "autoMachineFlank");
    Class.minigun.UPGRADES_TIER_3.push("doubleMinigun");
    Class.sprayer.UPGRADES_TIER_3.push("doubleSprayer");

    Class.autoMachineFlank.UPGRADES_TIER_4.push(...["Artillery", "Minigun", "Gunner", "Sprayer", "Blaster", "Gatling", "Diesel"].map(x => `autoDouble${x}`)/*, "hexaMachine*/);
    Class.doubleArtillery.UPGRADES_TIER_4.push("autoDoubleArtillery");
    Class.doubleBlaster.UPGRADES_TIER_4.push("autoDoubleBlaster");
    Class.doubleDiesel.UPGRADES_TIER_4.push("autoDoubleDiesel");
    Class.doubleGatling.UPGRADES_TIER_4.push("autoDoubleGatling");
    Class.doubleGunner.UPGRADES_TIER_4.push("autoDoubleGunner");
    Class.doubleMinigun.UPGRADES_TIER_4.push("autoDoubleMinigun");
    Class.doubleSprayer.UPGRADES_TIER_4.push("doubleRedistributor", "doubleAtomizer", "doubleFocal", "doubleSplasher"/*, "triFrother"*/, "doubleFoamer", "autoDoubleSprayer");
    Class.machineTriple.UPGRADES_TIER_4 = ["machineQuadruple", "tripleArtillery", "tripleMinigun", "tripleGunner", "tripleSprayer", "tripleBlaster", "tripleGatling", "tripleDiesel"/*, "hexaMachine"*/, "autoMachineTriple"];
};
