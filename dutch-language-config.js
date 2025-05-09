/**
 * Nederlandse taalconfiguratie voor de regel editor
 * Dit bestand kan gebruikt worden om de editor te vertalen naar het Nederlands
 */

const nlConfig = {
  // Regel blok vertalingen
  ruleBlock: {
    ruleName: "Regel:",
    ruleId: "ID:",
    validFrom: "Geldig vanaf",
    validUntil: "tot en met",
    action: "Actie:",
    conditions: "Voorwaarden"
  },

  // Actie blok vertalingen
  actionBlocks: {
    // Assignment action
    assignment: {
      becomes: "wordt"
    },
    // Compliance action
    compliance: {
      mustBe: "moet zijn",
      equalTo: "gelijk aan",
      notEqualTo: "ongelijk aan",
      greaterThan: "groter dan",
      lessThan: "kleiner dan",
      greaterThanOrEqual: "groter dan of gelijk aan",
      lessThanOrEqual: "kleiner dan of gelijk aan"
    }
  },

  // Object blok vertalingen
  objectBlocks: {
    objectType: "Object:",
    roles: "Rollen",
    attribute: "Attribuut"
  },

  // Expressie blok vertalingen
  expressionBlocks: {
    function: "Functie:",
    parameters: "Parameters",
    calculateAs: "berekend worden als",
    setTo: "gesteld worden op",
    sumOf: "de som van",
    countOf: "het aantal",
    durationBetween: "de tijdsduur van"
  },

  // Voorwaarde blok vertalingen
  conditionBlocks: {
    isEqualTo: "gelijk is aan",
    isNotEqualTo: "ongelijk is aan",
    isGreaterThan: "groter is dan",
    isLessThan: "kleiner is dan",
    isGreaterThanOrEqual: "groter of gelijk is aan",
    isLessThanOrEqual: "kleiner of gelijk is aan",
    all: "er aan alle",
    any: "er aan ten minste één van de",
    none: "er aan geen van de",
    exactlyOne: "er aan precies één van de",
    followingConditions: "volgende voorwaarden wordt voldaan:"
  },

  // Waarde blok vertalingen
  valueBlocks: {
    value: "Waarde:",
    unit: "Eenheid:",
    parameter: "Parameter:"
  },

  // Math operatie blok vertalingen
  mathBlocks: {
    plus: "plus",
    minus: "min",
    multipliedBy: "maal",
    dividedBy: "gedeeld door",
    minimum: "minimum",
    maximum: "maximum",
    roundedUp: "naar boven afgerond",
    roundedDown: "naar beneden afgerond",
    rounded: "afgerond",
    toDecimals: "op %1 decimalen"
  },

  // Object types
  objectTypes: {
    vlucht: "de vlucht",
    natuurlijkPersoon: "de natuurlijk persoon",
    contingentTreinmiles: "het contingent treinmiles",
    uitworpmelding: "de uitworpmelding"
  },

  // Interface vertalingen
  ui: {
    saveButton: "Opslaan",
    loadButton: "Laden",
    generateButton: "Genereer Regeltekst",
    rulesCategory: "Regels",
    actionsCategory: "Acties",
    objectsCategory: "Objecten",
    expressionsCategory: "Expressies",
    mathCategory: "Wiskunde",
    conditionsCategory: "Voorwaarden",
    valuesCategory: "Waarden",
    examplesCategory: "Voorbeelden",
    loadDistanceExample: "Laad voorbeeld: Afstand initialisatie",
    loadTaxCalculationExample: "Laad voorbeeld: Belastingberekening",
    generatedRule: "Gegenereerde regel"
  }
};

/**
 * Functie om de taal van de Blockly editor te veranderen naar Nederlands
 * Deze functie moet worden aangeroepen nadat Blockly is geïnitialiseerd
 */
function setDutchLanguage() {
  // Pas de UI-elementen aan
  document.querySelector('h1').textContent = "Regel Syntax Editor";
  document.querySelector('h2').textContent = nlConfig.ui.generatedRule;
  document.getElementById('saveButton').textContent = nlConfig.ui.saveButton;
  document.getElementById('loadButton').textContent = nlConfig.ui.loadButton;
  document.getElementById('generateButton').textContent = nlConfig.ui.generateButton;
  
  // Stel Blockly categorieën in (als die er zijn)
  const categories = document.querySelectorAll('.blocklyTreeLabel');
  if (categories.length >= 7) {
    categories[0].textContent = nlConfig.ui.rulesCategory;
    categories[1].textContent = nlConfig.ui.actionsCategory;
    categories[2].textContent = nlConfig.ui.objectsCategory;
    categories[3].textContent = nlConfig.ui.expressionsCategory;
    categories[4].textContent = nlConfig.ui.conditionsCategory;
    categories[5].textContent = nlConfig.ui.valuesCategory;
    categories[6].textContent = nlConfig.ui.examplesCategory;
  }
  
  // Andere aanpassingen kunnen hier worden toegevoegd
  console.log("Taal aangepast naar Nederlands");
}

// Exporteer de configuratie en de functie
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { nlConfig, setDutchLanguage };
}
