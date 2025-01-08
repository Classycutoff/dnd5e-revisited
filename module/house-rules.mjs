// House Rules for DnD 5e

export const HouseRules = {
  // Three action economy
  actionEconomy: {
    actions: 3,
    description: "On your turn, you can take three actions. The most common actions you can take are described in the 'Actions in Combat' section later in this chapter. Many class features and other abilities provide additional options for your action."
  },

  // Dash wording change
  dash: {
    description: "When you take the Dash action, you can move your movement speed. The increase equals your speed, after applying any modifiers. The 'Movement and Position' section in this chapter gives the rules for your movement."
  },

  // Movement and position wording change
  movement: {
    description: "On your turn, you can take the Dash action to move a distance up to your speed. You can use as much or as little of your speed as you like on your turn, provided you take more Dash actions if your character needs to move more than your speed. These movements follow the rules defined in this section."
  },

  // Death saving throws
  deathSavingThrows: {
    description: "Whenever you start your turn with 0 hit points, you must make a special saving throw, called a death saving throw, to determine whether you creep closer to death or hang onto life. Unlike other saving throws, this one isn't tied to any ability score. You are in the hands of fate now, aided only by spells and features that improve your chances of succeeding on a saving throw. Roll a d20. If the roll is 10 or higher, you succeed. Otherwise, you fail. A success or failure has no effect by itself. On your third success, you become stable (see below) and get a level of the Dying condition. On your third failure, you die. The successes and failures don't need to be consecutive; keep track of both until you collect three of a kind. If you have any Dying levels, you will start with that many failures. The number of both is reset to zero when you regain any hit points or become stable. Rolling 1 or 20. When you make a death saving throw and roll a 1 on the d20, it counts as two failures. If you roll a 20 on the d20, you regain 1 hit point and receive a Dying level.",
    applyDyingCondition: true
  },

  // Resurrection rules
  resurrection: {
    description: "If a character is dead, and a resurrection is attempted by a spell or spell effect with longer than a 1 action casting time, a Resurrection Challenge is initiated.",
    contributionChecks: 3,
    baseDC: 10,
    dcIncreasePerResurrection: 1,
    dcDecreasePerSuccess: 3,
    dcIncreasePerFailure: 1,
    bypassSpells: ["True Resurrection", "Wish"],
    rapidResurrection: {
      spells: ["Revivify"],
      dc: 10,
      dcIncreasePerResurrection: 1,
      failureConsequence: "Increase future Resurrection checks' DC by 1"
    }
  }
};

// Export any additional house rules or modifications here