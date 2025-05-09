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
    editorTitle: "Regeleditor (ModelSpecs_Simple)",
    outputTitle: "Gegenereerde regel",
    languageLabel: "Taal:",
    saveButton: "Opslaan",
    loadButton: "Laden",
    generateButton: "Genereer regeltekst",
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
    loadComplianceExample: "Laad voorbeeld: Compliance regel"
  }
};

/**
 * Functie om de taal van de Blockly editor te veranderen naar Nederlands
 * Deze functie moet worden aangeroepen nadat Blockly is geïnitialiseerd
 */
function setDutchLanguage() {
  // Voeg een klasse toe aan de body voor CSS styling
  document.body.classList.add('dutch-language');
  
  // Pas de UI-elementen aan
  document.getElementById('editor-title').textContent = nlConfig.ui.editorTitle;
  document.getElementById('output-title').textContent = nlConfig.ui.outputTitle;
  document.getElementById('language-label').textContent = nlConfig.ui.languageLabel;
  document.getElementById('saveButton').textContent = nlConfig.ui.saveButton;
  document.getElementById('loadButton').textContent = nlConfig.ui.loadButton;
  document.getElementById('generateButton').textContent = nlConfig.ui.generateButton;
  
  // Update categorieën
  document.getElementById('category-rules').setAttribute('name', nlConfig.ui.rulesCategory);
  document.getElementById('category-actions').setAttribute('name', nlConfig.ui.actionsCategory);
  document.getElementById('category-objects').setAttribute('name', nlConfig.ui.objectsCategory);
  document.getElementById('category-expressions').setAttribute('name', nlConfig.ui.expressionsCategory);
  document.getElementById('category-math').setAttribute('name', nlConfig.ui.mathCategory);
  document.getElementById('category-conditions').setAttribute('name', nlConfig.ui.conditionsCategory);
  document.getElementById('category-values').setAttribute('name', nlConfig.ui.valuesCategory);
  document.getElementById('category-examples').setAttribute('name', nlConfig.ui.examplesCategory);
  
  // Update voorbeeld knoppen
  document.getElementById('load-example-distance').setAttribute('text', nlConfig.ui.loadDistanceExample);
  document.getElementById('load-example-tax').setAttribute('text', nlConfig.ui.loadTaxCalculationExample);
  document.getElementById('load-example-compliance').setAttribute('text', nlConfig.ui.loadComplianceExample);
  
  // Voor een volledige implementatie zouden we ook de Blockly.Msg objecten moeten aanpassen
  // en de blokdefinities opnieuw moeten genereren met Nederlandse teksten
  
  console.log('Taal ingesteld op Nederlands');
}

// Om terug te gaan naar Engels, verwijderen we de dutch-language klasse
function setEnglishLanguage() {
  document.body.classList.remove('dutch-language');
  
  // De rest van de code is reeds geïmplementeerd in de index.html
  console.log('Language set to English');
}

// Exporteer de configuratie en de functies
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { nlConfig, setDutchLanguage, setEnglishLanguage };
}
