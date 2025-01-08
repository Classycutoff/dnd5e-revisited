export function applyClassFeatureChanges() {
  // Cunning Action
  CONFIG.DND5E.classFeatures.rogue["Cunning Action"] = {
    name: "Cunning Action",
    level: 2,
    description: "Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. Once per turn you have a free action, which doesn't consume any actions. This action can be used only to take the Dash, Disengage, or Hide actions."
  };

  // Patient Defense
  CONFIG.DND5E.classFeatures.monk["Patient Defense"] = {
    name: "Patient Defense",
    level: 2,
    description: "You can spend 1 ki point to take the Dodge action as a free action that doesn't consume any actions on your turn."
  };

  // Step of the Wind
  CONFIG.DND5E.classFeatures.monk["Step of the Wind"] = {
    name: "Step of the Wind",
    level: 2,
    description: "You can spend 1 ki point to take the Disengage or Dash action as a free action that doesn't consume any actions on your turn, and your jump distance is doubled for the turn."
  };

  // Extra Attack
  const extraAttackClasses = ["barbarian", "fighter", "monk", "paladin", "ranger"];
  const extraAttackDescription = "Beginning at Xth level, you can attack twice, instead of once, on one of your Actions used to take the Attack action on your turn. You can use the extra attacks multiple times in a turn if you use an Action Surge or a similar skill.";

  extraAttackClasses.forEach(className => {
    if (CONFIG.DND5E.classFeatures[className] && CONFIG.DND5E.classFeatures[className]["Extra Attack"]) {
      CONFIG.DND5E.classFeatures[className]["Extra Attack"].description = extraAttackDescription.replace("Xth", CONFIG.DND5E.classFeatures[className]["Extra Attack"].level);
    }
  });
}

// Add this function to the appropriate initialization hook in dnd5e.mjs