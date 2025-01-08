import { HouseRules } from "../house-rules.mjs";

export class ResurrectionChallengeDialog extends Application {
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
    this.contributionChecks = [];
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/dnd5e/templates/apps/resurrection-challenge.html",
      width: 400,
      height: "auto"
    });
  }

  getData() {
    return {
      actor: this.actor,
      contributionChecks: this.contributionChecks,
      difficultyClass: this.getDifficultyClass()
    };
  }

  getDifficultyClass() {
    const resurrectionCount = this.actor.system.attributes.resurrections || 0;
    return HouseRules.resurrection.baseDC + (resurrectionCount * HouseRules.resurrection.dcIncreasePerResurrection);
  }

  async _updateObject(event, formData) {
    const skill = formData.skill;
    const checkResult = await this.actor.rollSkill(skill);
    this.contributionChecks.push({
      skill: skill,
      result: checkResult.total,
      success: checkResult.total >= formData.dc
    });
    this.render();
  }

  async _performResurrection() {
    const successfulChecks = this.contributionChecks.filter(c => c.success).length;
    const failedChecks = this.contributionChecks.filter(c => !c.success).length;
    const finalDC = this.getDifficultyClass() - (successfulChecks * HouseRules.resurrection.dcDecreasePerSuccess) + (failedChecks * HouseRules.resurrection.dcIncreasePerFailure);
    
    const resurrectionRoll = new Roll("1d20").roll();
    const success = resurrectionRoll.total >= finalDC;

    if (success) {
      await this.actor.update({
        "system.attributes.hp.value": 1,
        "system.attributes.dying": 0,
        "system.attributes.death.success": 0,
        "system.attributes.death.failure": 0
      });
      ui.notifications.info(`${this.actor.name} has been successfully resurrected!`);
    } else {
      ui.notifications.warn(`The resurrection attempt for ${this.actor.name} has failed.`);
    }

    this.close();
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.contribution-check').click(this._onContributionCheck.bind(this));
    html.find('.perform-resurrection').click(this._performResurrection.bind(this));
  }

  _onContributionCheck(event) {
    event.preventDefault();
    const skillSelect = this.element.find('select[name="skill"]');
    const dcInput = this.element.find('input[name="dc"]');
    this._updateObject(event, {
      skill: skillSelect.val(),
      dc: parseInt(dcInput.val())
    });
  }
}