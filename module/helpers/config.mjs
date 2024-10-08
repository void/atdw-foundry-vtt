export const ATDW = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
ATDW.abilities = {
  str: 'ATDW.Ability.Str.long',
  dex: 'ATDW.Ability.Dex.long',
  con: 'ATDW.Ability.Con.long',
  int: 'ATDW.Ability.Int.long',
  wil: 'ATDW.Ability.Wil.long',
  cha: 'ATDW.Ability.Cha.long',
};

ATDW.abilityAbbreviations = {
  str: 'ATDW.Ability.Str.abbr',
  dex: 'ATDW.Ability.Dex.abbr',
  con: 'ATDW.Ability.Con.abbr',
  int: 'ATDW.Ability.Int.abbr',
  wis: 'ATDW.Ability.Wil.abbr',
  cha: 'ATDW.Ability.Cha.abbr',
};

ATDW.skills = {
  arsaidh_technology: { initial: -5 },
  close_combat: { initial: 0 },
  medical_aid: { initial: 0 },
  manipulation: { initial: 0 },
  perception: { initial: 0 },
  pilot: { initial: 0 },
  ranged_combat: { initial: 0 },
  resolve: { initial: 0 },
  science: { initial: 0 },
  stealth: { initial: 0 },
  survival: { initial: 0 },
  technology: { initial: 0 }
}
ATDW.skillNames = {
  arsaidh_technology: "ATDW.Skills.arsaidh_technology",
  close_combat: "ATDW.Skills.close_combat",
  medical_aid: "ATDW.Skills.medical_aid",
  manipulation: "ATDW.Skills.manipulation",
  perception: "ATDW.Skills.perception",
  pilot: "ATDW.Skills.pilot",
  ranged_combat: "ATDW.Skills.ranged_combat",
  combat: "ATDW.Skills.combat",
  resolve: "ATDW.Skills.resolve",
  science: "ATDW.Skills.science",
  stealth: "ATDW.Skills.stealth",
  survival: "ATDW.Skills.survival",
  technology: "ATDW.Skills.technology",
}