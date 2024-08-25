import CheckRoll from "../roll.mjs";
import ATDWActorBase from "./base-actor.mjs";

export default class ATDWCharacter extends ATDWActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.ATDW.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 8, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.ATDW.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = this.toObject();


    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data.abilities[k] = v.value
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
  async roll(options) {
    const rollData = this.getRollData()

    if (options?.attr && rollData.abilities?.[options.attr]) {
      let desc = this.abilities[options.attr].label
      let value = rollData.abilities[options.attr]
      let roll = CheckRoll.create(desc, value)
      roll.toMessage();
    }


  }
}