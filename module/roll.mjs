const Roll = foundry.dice.Roll;

export default class CheckRoll extends Roll {
  static create(desc, value, modifier = 0) {
    let formula = '1d20 + @value ';
    if (modifier)
      formula += ' + @modifier'
    let data = { value: value, modifier: modifier };
    let options = { desc: desc };
    let roll = new this(formula, data, options);
    return roll;
  }

  static CHAT_TEMPLATE = "/systems/atdw/templates/dice/roll.hbs";

  async render(flavor, template = this.constructor.CHAT_TEMPLATE, isPrivate = false) {

    if (!this._evaluated) await this.evaluate({ allowInteractive: !isPrivate });
    const chatData = {
      formula: isPrivate ? "???" : this._formula,
      flavor: isPrivate ? null : flavor ?? this.options.flavor,
      user: game.user.id,
      tooltip: isPrivate ? "" : await this.getTooltip(),
      total: isPrivate ? "?" : Math.round(this.total * 100) / 100,
      desc: this.options.desc,
      result: this.total >= 20 ? 'Sucess' : 'Failure'
    };

    return renderTemplate(template, chatData);
  }
}
