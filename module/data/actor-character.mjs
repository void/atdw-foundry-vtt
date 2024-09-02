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

    // Iterate over skill names and create a new SchemaField for each.
    schema.skills = new fields.SchemaField(Object.keys(CONFIG.ATDW.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: CONFIG.ATDW.skills[skill].initial, min: -5, max: 10 }),
      });
      return obj;
    }, {}));



    return schema;
  }

  prepareDerivedData() {
    //  Add labels to abilities
    for (const key in this.abilities) {
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.ATDW.abilities[key]) ?? key;
    }
    //  Add labels to skills
    for (const key in this.skills) {
      // Handle skill label localization.
      this.skills[key].label = game.i18n.localize(CONFIG.ATDW.skillNames[key]) ?? key;
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


    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        data.skills[k] = v.value
      }
    }


    data.lvl = this.attributes.level.value;

    return data
  }
  async roll(options) {
    const rollData = this.getRollData()
    var desc
    var value

    //roll attribute
    if (options?.attr && rollData.abilities?.[options.attr]) {
      desc = this.abilities[options.attr].label
      value = rollData.abilities[options.attr]
    }

    //roll skill
    if (options?.skill && rollData.skills?.[options.skill] != undefined) {
      desc = this.skills[options.skill].label
      value = rollData.skills[options.skill]
    }
    let roll = CheckRoll.create(desc, value)
    roll.toMessage();
  }
}