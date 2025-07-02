/**
 * Custom Blockly blocks for rule-based syntax following ModelSpecs_Simple.txt
 * With separate blocks for assignment and compliance actions
 */

// Define all custom blocks using JSON definitions
Blockly.defineBlocksWithJsonArray([
  // Main rule block with a single action input
  {
    type: 'business_rule',
    message0: 'Rule: %1 ID: %2',
    message1: 'Valid from %1 until %2 %3',
    message2: 'Actions: %1',
    message3: 'Conditions %1',
    args0: [
      {
        type: 'field_input',
        name: 'RULE_NAME',
        text: 'rule name',
      },
      {
        type: 'field_input',
        name: 'RULE_ID',
        text: 'rule id',
      },
    ],
    args1: [
      {
        type: 'field_input',
        name: 'VALID_FROM',
        text: '2018',
      },
      {
        type: 'field_input',
        name: 'VALID_UNTIL',
        text: '',
      },
      {
        type: 'input_end_row',
        name: 'NAME',
      },
    ],
    args2: [
      {
        type: 'input_statement',
        name: 'ACTIONS',
        check: ['assignment_action', 'compliance_action'],
      },
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'CONDITIONS',
        check: 'condition',
      },
    ],
    colour: 210,
    inputsInline: true,
    tooltip: 'Define a business rule',
    helpUrl: '',
  },

  // Assignment action block (target becomes source)
  {
    type: 'assignment_action',
    message0: '%1 becomes %2',
    args0: [
      {
        type: 'input_value',
        name: 'TARGET',
        check: 'fact_reference',
      },
      {
        type: 'input_value',
        name: 'SOURCE',
        check: ['fact_reference', 'literal', 'expression'],
      },
    ],
    previousStatement: ['assignment_action', 'compliance_action'],
    nextStatement: ['assignment_action', 'compliance_action'],
    colour: 180,
    inputsInline: true,
    tooltip: 'Assignment action: target becomes source',
    helpUrl: '',
  },

  // Compliance action block (target must be comparison source)
  {
    type: 'compliance_action',
    message0: '%1 must be %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'TARGET',
        check: 'fact_reference',
      },
      {
        type: 'field_dropdown',
        name: 'COMPARISON',
        options: [
          ['equal to', 'EQUAL_TO'],
          ['not equal to', 'NOT_EQUAL_TO'],
          ['greater than', 'GREATER_THAN'],
          ['less than', 'LESS_THAN'],
          ['greater than or equal to', 'GREATER_THAN_EQUAL'],
          ['less than or equal to', 'LESS_THAN_EQUAL'],
        ],
      },
      {
        type: 'input_value',
        name: 'SOURCE',
        check: ['fact_reference', 'literal', 'expression'],
      },
    ],
    output: 'compliance_action',
    colour: 160,
    tooltip: 'Compliance action: target must satisfy a comparison with source',
    helpUrl: '',
  },

  // Object block (new)
  {
    type: 'object',
    message0: 'Object: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'OBJECT_TYPE',
        options: [
          ['vlucht', 'VLUCHT'],
          ['natuurlijk persoon', 'NATUURLIJK_PERSOON'],
          ['contingent treinmiles', 'CONTINGENT_TREINMILES'],
          ['uitworpmelding', 'UITWORPMELDING'],
          ['burger', 'BURGER'],
          ['zorgtoeslag', 'ZORGTOESLAG'],
          ['zorgverzekeraar', 'ZORGVERZEKERAAR'],
        ],
      },
    ],
    output: 'object',
    colour: 130,
    tooltip: 'Reference to an object',
    helpUrl: '',
  },

  // Fact reference block
  {
    type: 'fact_reference',
    message0: 'Object: %1 Attribute: %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'OBJECT_TYPE',
        options: [
          ['vlucht', 'VLUCHT'],
          ['natuurlijk persoon', 'NATUURLIJK_PERSOON'],
          ['contingent treinmiles', 'CONTINGENT_TREINMILES'],
          ['uitworpmelding', 'UITWORPMELDING'],
          ['burger', 'BURGER'],
          ['zorgtoeslag', 'ZORGTOESLAG'],
          ['zorgverzekeraar', 'ZORGVERZEKERAAR'],
        ],
      },
      {
        type: 'input_value',
        name: 'ATTRIBUTE',
        check: ['attribute', 'characteristic'],
      },
    ],
    output: 'fact_reference',
    colour: 140,
    tooltip: 'Reference to a fact',
    helpUrl: '',
  },

  // Role block
  {
    type: 'role',
    message0: 'Role: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ROLE_NAME',
        options: [
          ['passagier', 'PASSAGIER'],
          ['reis', 'REIS'],
          [
            'vastgesteld contingent treinmiles',
            'VASTGESTELD_CONTINGENT_TREINMILES',
          ],
          ['reden uitworp', 'REDEN_UITWORP'],
        ],
      },
    ],
    previousStatement: 'role',
    nextStatement: 'role',
    colour: 120,
    tooltip: 'Reference to a role',
    helpUrl: '',
  },

  // Attribute block
  {
    type: 'attribute',
    message0: 'Attribute: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ATTRIBUTE_NAME',
        options: [
          ['afstand tot bestemming', 'AFSTAND_TOT_BESTEMMING'],
          ['bereikbaar per trein', 'BEREIKBAAR_PER_TREIN'],
          ['datum van de vlucht', 'DATUM_VAN_DE_VLUCHT'],
          ['leeftijd', 'LEEFTIJD'],
          ['te betalen belasting', 'TE_BETALEN_BELASTING'],
          ['belasting op basis van afstand', 'BELASTING_OP_BASIS_VAN_AFSTAND'],
          [
            'belasting op basis van reisduur',
            'BELASTING_OP_BASIS_VAN_REISDUUR',
          ],
          ['totaal te betalen belasting', 'TOTAAL_TE_BETALEN_BELASTING'],
          ['aantal passagiers', 'AANTAL_PASSAGIERS'],
          ['treinmiles', 'TREINMILES'],
          ['burgerservicenummer', 'BURGERSERVICENUMMER'],
          ['woonland', 'WOONLAND'],
          ['income', 'INCOME'],
          ['net_worth', 'NET_WORTH'],
          ['combined_net_worth', 'COMBINED_NET_WORTH'],
          ['partner_income', 'PARTNER_INCOME'],
          ['standaardpremie', 'STANDAARDPREMIE'],
          ['polisnummer zorgverzekering', 'POLISNUMMER_ZORGVERZEKERING'],
          ['geboortedatum', 'GEBOORTEDATUM'],
          ['hoogte_toeslag', 'HOOGTE_TOESLAG'],
          ['toeslagjaar', 'TOESLAGJAAR'],
          ['datum van berekening', 'DATUM_VAN_BEREKENING'],
          ['UZOVI-code', 'UZOVI_CODE'],
          ['naam', 'NAAM'],
          ['facility type', 'FACILITY_TYPE'],
          ['detention status', 'DETENTION_STATUS'],
        ],
      },
    ],
    output: 'attribute',
    colour: 100,
    tooltip: 'Reference to an attribute',
    helpUrl: '',
  },

  // Characteristic block
  {
    type: 'characteristic',
    message0: 'Characteristic: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'CHARACTERISTIC_NAME',
        options: [
          ['belaste reis', 'BELASTE_REIS'],
          ['onbelaste reis', 'ONBELASTE_REIS'],
          ['rondvlucht', 'RONDVLUCHT'],
          ['klimaatneutraal', 'KLIMAATNEUTRAAL'],
          ['recht op duurzaamheidskorting', 'RECHT_OP_DUURZAAMHEIDSKORTING'],
          [
            'passagier waarvoor het lage tarief voor belasting op basis van afstand van toepassing is',
            'PASSAGIER_LAGE_TARIEF',
          ],
          [
            'passagier waarvoor het hoge tarief voor belasting op basis van afstand van toepassing is',
            'PASSAGIER_HOGE_TARIEF',
          ],
          ['verzekerde volgens ZVW', 'VERZEKERDE_VOLGENS_ZVW'],
          ['heeft partner', 'HEEFT_PARTNER'],
          ['verzekerde zorgtoeslag', 'VERZEKERDE_ZORGTOESLAG'],
          ['voorlopig toegekend', 'VOORLOPIG_TOEGEKEND'],
          ['definitief vastgesteld', 'DEFINITIEF_VASTGESTELD'],
          ['is incarcerated', 'IS_INCARCERATED'],
          ['heeft zorgverzekering plicht', 'HEEFT_ZORGVERZEKERING_PLICHT'],
          ['vrijheidsbenemende maatregel', 'VRIJHEIDSBENEMENDE_MAATREGEL'],
        ],
      },
    ],
    output: 'characteristic',
    colour: 80,
    tooltip: 'Reference to a characteristic',
    helpUrl: '',
  },

  // Expression block
  {
    type: 'expression',
    message0: 'Function: %1',
    message1: 'Parameters %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'FUNCTION_NAME',
        options: [
          ['calculate as', 'CALCULATE_AS'],
          ['set to', 'SET_TO'],
          ['sum of', 'SUM_OF'],
          ['count of', 'COUNT_OF'],
          ['duration between', 'DURATION_BETWEEN'],
          ['if then else', 'IF_THEN_ELSE'],
        ],
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'PARAMETERS',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
    ],
    output: 'expression',
    colour: 290,
    tooltip: 'Function expression',
    helpUrl: '',
  },

  // Simple condition block
  {
    type: 'simple_condition',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: ['fact_reference', 'expression'],
      },
      {
        type: 'field_dropdown',
        name: 'OPERATOR',
        options: [
          ['is equal to', 'EQUALS'],
          ['is not equal to', 'NOT_EQUALS'],
          ['is greater than', 'GREATER_THAN'],
          ['is less than', 'LESS_THAN'],
          ['is greater than or equal to', 'GREATER_THAN_EQUALS'],
          ['is less than or equal to', 'LESS_THAN_EQUALS'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
    ],
    previousStatement: 'condition',
    nextStatement: 'condition',
    colour: 260,
    tooltip: 'Simple condition',
    helpUrl: '',
  },

  // Complex condition block
  {
    type: 'complex_condition',
    message0: '%1 of the following conditions:',
    message1: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'MULTIPLICITY',
        options: [
          ['all', 'ALL'],
          ['any', 'ANY'],
          ['none', 'NONE'],
          ['exactly one', 'EXACTLY_ONE'],
        ],
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'CONDITIONS',
        check: 'condition',
      },
    ],
    previousStatement: 'condition',
    nextStatement: 'condition',
    colour: 230,
    tooltip: 'Complex condition',
    helpUrl: '',
  },

  // Nested complex condition block
  {
    type: 'nested_complex_condition',
    message0: '%1 of the following conditions:',
    message1: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'MULTIPLICITY',
        options: [
          ['all', 'ALL'],
          ['any', 'ANY'],
          ['none', 'NONE'],
          ['exactly one', 'EXACTLY_ONE'],
        ],
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'CONDITIONS',
        check: 'condition',
      },
    ],
    previousStatement: 'condition',
    nextStatement: 'condition',
    colour: 200,
    tooltip: 'Nested complex condition',
    helpUrl: '',
  },

  // Literal value block
  {
    type: 'literal',
    message0: 'Value: %1 Unit: %2',
    args0: [
      {
        type: 'field_input',
        name: 'VALUE',
        text: '0',
      },
      {
        type: 'field_dropdown',
        name: 'UNIT',
        options: [
          ['', 'NONE'],
          ['EUR', 'EUR'],
          ['km', 'KM'],
          ['jr', 'JR'],
          ['u', 'U'],
          ['minuut', 'MINUUT'],
        ],
      },
    ],
    output: 'literal',
    colour: 330,
    tooltip: 'Literal value',
    helpUrl: '',
  },

  // Boolean literal block
  {
    type: 'boolean_literal',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['true', 'TRUE'],
          ['false', 'FALSE'],
        ],
      },
    ],
    output: 'literal',
    colour: 330,
    tooltip: 'Boolean value',
    helpUrl: '',
  },

  // Parameter reference block
  {
    type: 'parameter_reference',
    message0: 'Parameter: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'PARAMETER_NAME',
        options: [
          [
            'PERCENTAGE REISDUUR EERSTE SCHIJF',
            'PERCENTAGE_REISDUUR_EERSTE_SCHIJF',
          ],
          [
            'PERCENTAGE REISDUUR TWEEDE SCHIJF',
            'PERCENTAGE_REISDUUR_TWEEDE_SCHIJF',
          ],
          [
            'BOVENGRENS AFSTAND EERSTE SCHIJF',
            'BOVENGRENS_AFSTAND_EERSTE_SCHIJF',
          ],
          [
            'BOVENGRENS AFSTAND TWEEDE SCHIJF',
            'BOVENGRENS_AFSTAND_TWEEDE_SCHIJF',
          ],
          ['LAGE BASISTARIEF EERSTE SCHIJF', 'LAGE_BASISTARIEF_EERSTE_SCHIJF'],
          ['LAGE BASISTARIEF TWEEDE SCHIJF', 'LAGE_BASISTARIEF_TWEEDE_SCHIJF'],
          ['HOGE BASISTARIEF EERSTE SCHIJF', 'HOGE_BASISTARIEF_EERSTE_SCHIJF'],
          ['HOGE BASISTARIEF TWEEDE SCHIJF', 'HOGE_BASISTARIEF_TWEEDE_SCHIJF'],
          [
            'LAGE TARIEF VERMINDERING EERSTE SCHIJF',
            'LAGE_TARIEF_VERMINDERING_EERSTE_SCHIJF',
          ],
          [
            'LAGE TARIEF VERMINDERING TWEEDE SCHIJF',
            'LAGE_TARIEF_VERMINDERING_TWEEDE_SCHIJF',
          ],
          [
            'HOGE TARIEF VERMINDERING EERSTE SCHIJF',
            'HOGE_TARIEF_VERMINDERING_EERSTE_SCHIJF',
          ],
          [
            'HOGE TARIEF VERMINDERING TWEEDE SCHIJF',
            'HOGE_TARIEF_VERMINDERING_TWEEDE_SCHIJF',
          ],
          [
            'KORTING VOOR KLIMAATNEUTRALE VLUCHT',
            'KORTING_VOOR_KLIMAATNEUTRALE_VLUCHT',
          ],
          ['MINIMUM AGE', 'MINIMUM_AGE'],
          ['INCOME THRESHOLD SINGLE', 'INCOME_THRESHOLD_SINGLE'],
          ['INCOME THRESHOLD PARTNER', 'INCOME_THRESHOLD_PARTNER'],
          ['ASSET LIMIT SINGLE', 'ASSET_LIMIT_SINGLE'],
          ['ASSET LIMIT PARTNER', 'ASSET_LIMIT_PARTNER'],
          ['REDUCTION PERCENTAGE', 'REDUCTION_PERCENTAGE'],
          [
            'INCOME THRESHOLD SINGLE PERCENTAGE',
            'INCOME_THRESHOLD_SINGLE_PERCENTAGE',
          ],
          [
            'INCOME THRESHOLD PARTNER PERCENTAGE',
            'INCOME_THRESHOLD_PARTNER_PERCENTAGE',
          ],
          ['COMBINED_INCOME_THRESHOLD', 'COMBINED_INCOME_THRESHOLD'],
          ['COMBINED_ASSET_LIMIT', 'COMBINED_ASSET_LIMIT'],
        ],
      },
    ],
    output: 'parameter_reference',
    colour: 20,
    tooltip: 'Reference to a parameter',
    helpUrl: '',
  },

  // Math operation block
  {
    type: 'math_operation',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OPERATOR',
        options: [
          ['plus', 'PLUS'],
          ['minus', 'MINUS'],
          ['multiplied by', 'MULTIPLY'],
          ['divided by', 'DIVIDE'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
    ],
    output: 'expression',
    colour: 290,
    tooltip: 'Mathematical operation',
    helpUrl: '',
  },

  // Minimum/maximum block
  {
    type: 'minimum_maximum',
    message0: '%1 of %2 and %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'FUNCTION',
        options: [
          ['minimum', 'MIN'],
          ['maximum', 'MAX'],
        ],
      },
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
    ],
    output: 'expression',
    colour: 290,
    tooltip: 'Minimum or maximum of two values',
    helpUrl: '',
  },

  // Rounding block
  {
    type: 'rounding',
    message0: '%1 %2 to %3 decimals',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['rounded up', 'CEILING'],
          ['rounded down', 'FLOOR'],
          ['rounded', 'ROUND'],
        ],
      },
      {
        type: 'field_number',
        name: 'DECIMALS',
        value: 0,
        min: 0,
        max: 10,
      },
    ],
    output: 'expression',
    colour: 290,
    tooltip: 'Round a value',
    helpUrl: '',
  },

  // IF_THEN_ELSE conditional expression block
  {
    type: 'if_then_else',
    message0: 'if %1 then %2 else %3',
    args0: [
      {
        type: 'input_value',
        name: 'CONDITION',
        check: ['fact_reference', 'expression'],
      },
      {
        type: 'input_value',
        name: 'THEN_VALUE',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
      {
        type: 'input_value',
        name: 'ELSE_VALUE',
        check: [
          'fact_reference',
          'literal',
          'expression',
          'parameter_reference',
        ],
      },
    ],
    output: 'expression',
    colour: 290,
    tooltip: 'Conditional expression: if condition then value else other value',
    helpUrl: '',
  },

  // Rule reference block for navigation
  {
    type: 'rule_reference',
    message0: '📋 regel: %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'RULE_ID',
        options: [
          ['ZVW verzekerde status bepaling', 'zvw-verzekerde-01'],
          ['Standaardpremie berekening', 'standaardpremie-01'],
          ['Zorgtoeslag hoogte berekening', 'zorgtoeslag-hoogte-01'],
          ['Minimumleeftijd controle', 'minimumleeftijd-01'],
        ],
      },
    ],
    output: ['fact_reference', 'literal', 'expression'],
    colour: 300,
    tooltip: 'Verwijzing naar een andere regel - klik om te navigeren',
    helpUrl: '',
    // Custom click handler will be added in main.js
  },

  // Rule output reference block with filtered dropdown
  {
    type: 'rule_output_reference',
    message0: '📤 %1: %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'RULE_ID',
        options: [
          ['ZVW', 'zvw-verzekerde-01'],
          ['Penitentiaire Beginselenwet', 'penitentiaire-beginselenwet-01'],
          ['Standaardpremie', 'standaardpremie-01'],
          ['Leeftijd', 'leeftijd-controle-01'],
          ['Inkomen Single', 'inkomen-alleenstaande-01'],
          ['Inkomen Partners', 'inkomen-partners-01'],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OUTPUT_NAME',
        options: function () {
          // Get the current rule selection to show appropriate outputs
          const ruleId = this.getSourceBlock()
            ? this.getSourceBlock().getFieldValue('RULE_ID')
            : 'zvw-verzekerde-01';
          return window.getOutputsForRule
            ? window.getOutputsForRule(ruleId)
            : [
                ['is_verzekerde', 'is_verzekerde_volgens_zvw'],
                ['polisnummer_geldig', 'polisnummer_geldig'],
                ['woonland_nl', 'woonland_nederland'],
              ];
        },
      },
    ],
    output: ['fact_reference', 'literal', 'expression'],
    colour: 320,
    tooltip:
      'Verwijzing naar een specifieke output van een andere regel - klik om te navigeren',
    helpUrl: '',
  },

  // Parameter reference to other laws/rules
  {
    type: 'law_parameter_reference',
    message0: '⚖️ parameter uit %1: %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'LAW_ID',
        options: [
          ['Zorgverzekeringswet (ZVW)', 'zvw'],
          ['Zorgtoeslagwet', 'zorgtoeslagwet'],
          ['Algemene Wet Bijzondere Ziektekosten', 'awbz'],
          ['Wet op de zorgtoeslag', 'wzk'],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'PARAMETER_NAME',
        options: [
          ['MINIMUM_AGE', 'MINIMUM_AGE'],
          ['STANDAARDPREMIE', 'STANDAARDPREMIE'],
          ['INCOME_THRESHOLD_SINGLE', 'INCOME_THRESHOLD_SINGLE'],
          ['COMBINED_INCOME_THRESHOLD', 'COMBINED_INCOME_THRESHOLD'],
          ['REDUCTION_PERCENTAGE', 'REDUCTION_PERCENTAGE'],
        ],
      },
    ],
    output: 'parameter_reference',
    colour: 40,
    tooltip:
      'Parameter uit een specifieke wet - klik om naar de wet te navigeren',
    helpUrl: '',
  },
]);

// Helper function to get outputs for a specific rule
function getOutputsForRule(ruleId) {
  const ruleOutputs = {
    'zvw-verzekerde-01': [
      ['is_verzekerde', 'is_verzekerde_volgens_zvw'],
      ['polisnummer_geldig', 'polisnummer_geldig'],
      ['woonland_nl', 'woonland_nederland'],
    ],
    'penitentiaire-beginselenwet-01': [['is_incarcerated', 'is_incarcerated']],
    'standaardpremie-01': [
      ['standaardpremie_bedrag', 'standaardpremie_bedrag'],
      ['premie_per_maand', 'premie_per_maand'],
    ],
    'leeftijd-controle-01': [
      ['voldoet_minimumleeftijd', 'voldoet_aan_minimumleeftijd'],
      ['is_meerderjarig', 'is_meerderjarig'],
    ],
    'inkomen-alleenstaande-01': [
      ['inkomen_boven_drempel', 'inkomen_boven_drempel'],
      ['vermogen_onder_grens', 'vermogen_onder_grens'],
      ['recht_op_toeslag', 'recht_op_toeslag'],
    ],
    'inkomen-partners-01': [
      [
        'gezamenlijk_inkomen_boven_drempel',
        'gezamenlijk_inkomen_boven_drempel',
      ],
      ['gezamenlijk_vermogen_onder_grens', 'gezamenlijk_vermogen_onder_grens'],
      ['partners_recht_op_toeslag', 'partners_recht_op_toeslag'],
    ],
  };

  return ruleOutputs[ruleId] || [['geen outputs', 'no_outputs']];
}

// Make function globally available
window.getOutputsForRule = getOutputsForRule;
