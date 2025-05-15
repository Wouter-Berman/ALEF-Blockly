/**
 * Code generators voor aangepaste Blockly blokken om regeltekst te genereren volgens ModelSpecs_Simple
 * Aangepast om in het Nederlands te werken met aparte action blokken
 */

// Registreer de JavaScript generator
Blockly.JavaScript.addReservedWords('generateRuleText');

// Zorg ervoor dat JavaScript generator bestaat
if (typeof Blockly === 'undefined') {
  throw new Error('Blockly is niet gedefinieerd. Zorg ervoor dat Blockly is geladen vóór dit script.');
}

// Initialiseer JavaScript generator indien nodig
if (!Blockly.JavaScript) {
  console.warn('Blockly.JavaScript niet gevonden - initialiseer het nu');
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

// Code generator voor het business rule blok
javascript.javascriptGenerator.forBlock['business_rule'] = function(block) {
  var ruleName = block.getFieldValue('RULE_NAME');
  var ruleId = block.getFieldValue('RULE_ID');
  var validFrom = block.getFieldValue('VALID_FROM');
  var validUntil = block.getFieldValue('VALID_UNTIL');
  var action = Blockly.JavaScript.valueToCode(block, 'ACTION', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekende actie';
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  var code = 'Regel ' + ruleName + '\n';
  code += 'geldig vanaf ' + validFrom;
  if (validUntil) {
    code += ' t/m ' + validUntil;
  }
  code += '\n';
  
  // Voeg de actie toe (het action blok bevat target, operator en source)
  code += action;
  
  if (conditions && conditions.trim()) {
    code += '\nindien ' + conditions.trim();
  }
  
  return code;
};

// Code generator voor het assignment action blok
javascript.javascriptGenerator.forBlock['assignment_action'] = function(block) {
  var target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekend doel';
  var source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekende bron';
  
  var code = target + ' moet ' + source;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor het compliance action blok
javascript.javascriptGenerator.forBlock['compliance_action'] = function(block) {
  var target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekend doel';
  var comparison = block.getFieldValue('COMPARISON');
  var source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekende bron';
  
  // Vertaal de vergelijkingsoperatoren naar het Nederlands
  var comparisonMap = {
    'EQUAL_TO': 'gelijk aan',
    'NOT_EQUAL_TO': 'ongelijk aan',
    'GREATER_THAN': 'groter dan',
    'LESS_THAN': 'kleiner dan',
    'GREATER_THAN_EQUAL': 'groter dan of gelijk aan',
    'LESS_THAN_EQUAL': 'kleiner dan of gelijk aan'
  };
  
  var code = target + ' moet zijn ' + comparisonMap[comparison] + ' ' + source;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor het object blok
javascript.javascriptGenerator.forBlock['object'] = function(block) {
  var objectType = block.getFieldValue('OBJECT_TYPE');
  
  // Vertaal interne OBJECT_TYPE constante naar weergavenaam (in het Nederlands)
  var objectTypeMap = {
    'VLUCHT': 'de vlucht',
    'NATUURLIJK_PERSOON': 'de natuurlijk persoon',
    'CONTINGENT_TREINMILES': 'het contingent treinmiles',
    'UITWORPMELDING': 'de uitworpmelding'
  };
  
  var code = objectTypeMap[objectType] || objectType;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor fact reference blok (aangepast om optioneel object te gebruiken)
javascript.javascriptGenerator.forBlock['fact_reference'] = function(block) {
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
  var roles = Blockly.JavaScript.statementToCode(block, 'ROLES');
  var attribute = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = '';
  
  // Als we een attribuut hebben, voeg het toe
  if (attribute) {
    if (roles && roles.trim()) {
      code = attribute + ' van ' + roles.trim();
    } else if (object) {
      code = attribute + ' van ' + object;
    } else {
      code = attribute;
    }
  } else {
    if (roles && roles.trim()) {
      code = roles.trim();
    } else if (object) {
      code = object;
    } else {
      code = 'ontbrekende feitreferentie';
    }
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor role blok
javascript.javascriptGenerator.forBlock['role'] = function(block) {
  var roleName = block.getFieldValue('ROLE_NAME');
  
  // Vertaal interne ROLE_NAME constante naar weergavenaam (in het Nederlands)
  var roleNameMap = {
    'PASSAGIER': 'zijn passagier',
    'REIS': 'zijn reis',
    'VASTGESTELD_CONTINGENT_TREINMILES': 'zijn vastgesteld contingent treinmiles',
    'REDEN_UITWORP': 'zijn reden uitworp'
  };
  
  return roleNameMap[roleName];
};

// Code generator voor attribute blok
javascript.javascriptGenerator.forBlock['attribute'] = function(block) {
  var attributeName = block.getFieldValue('ATTRIBUTE_NAME');
  
  // Vertaal interne ATTRIBUTE_NAME constante naar weergavenaam (in het Nederlands)
  var attributeNameMap = {
    'AFSTAND_TOT_BESTEMMING': 'de afstand tot bestemming',
    'BEREIKBAAR_PER_TREIN': 'bereikbaar per trein',
    'DATUM_VAN_DE_VLUCHT': 'de datum van de vlucht',
    'LEEFTIJD': 'de leeftijd',
    'TE_BETALEN_BELASTING': 'de te betalen belasting',
    'BELASTING_OP_BASIS_VAN_AFSTAND': 'de belasting op basis van afstand',
    'BELASTING_OP_BASIS_VAN_REISDUUR': 'de belasting op basis van reisduur',
    'TOTAAL_TE_BETALEN_BELASTING': 'de totaal te betalen belasting',
    'AANTAL_PASSAGIERS': 'het aantal passagiers',
    'TREINMILES': 'de treinmiles'
  };
  
  return [attributeNameMap[attributeName], Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor characteristic blok
javascript.javascriptGenerator.forBlock['characteristic'] = function(block) {
  var characteristicName = block.getFieldValue('CHARACTERISTIC_NAME');
  
  // Vertaal interne CHARACTERISTIC_NAME constante naar weergavenaam (in het Nederlands)
  var characteristicNameMap = {
    'BELASTE_REIS': 'een belaste reis',
    'ONBELASTE_REIS': 'een onbelaste reis',
    'RONDVLUCHT': 'een rondvlucht',
    'KLIMAATNEUTRAAL': 'klimaatneutraal',
    'RECHT_OP_DUURZAAMHEIDSKORTING': 'recht op duurzaamheidskorting',
    'PASSAGIER_LAGE_TARIEF': 'een passagier waarvoor het lage tarief voor belasting op basis van afstand van toepassing is',
    'PASSAGIER_HOGE_TARIEF': 'een passagier waarvoor het hoge tarief voor belasting op basis van afstand van toepassing is'
  };
  
  return [characteristicNameMap[characteristicName], Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor expression blok
javascript.javascriptGenerator.forBlock['expression'] = function(block) {
  var functionName = block.getFieldValue('FUNCTION_NAME');
  var parameters = Blockly.JavaScript.statementToCode(block, 'PARAMETERS');
  
  // Vertaal functienamen naar het Nederlands
  var functionNameMap = {
    'CALCULATE_AS': 'berekend worden als',
    'SET_TO': 'gesteld worden op',
    'SUM_OF': 'de som van',
    'COUNT_OF': 'het aantal',
    'DURATION_BETWEEN': 'de tijdsduur van'
  };
  
  var code = '';
  
  if (parameters && parameters.trim()) {
    code = (functionNameMap[functionName] || functionName) + ' ' + parameters.trim();
  } else {
    code = functionNameMap[functionName] || functionName;
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor simple condition blok
javascript.javascriptGenerator.forBlock['simple_condition'] = function(block) {
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekende linkeroperand';
  var operator = block.getFieldValue('OPERATOR');
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || 'ontbrekende rechteroperand';
  
  // Vertaal operatoren naar het Nederlands
  var operatorMap = {
    'EQUALS': 'gelijk is aan',
    'NOT_EQUALS': 'ongelijk is aan',
    'GREATER_THAN': 'groter is dan',
    'LESS_THAN': 'kleiner is dan',
    'GREATER_THAN_EQUALS': 'groter of gelijk is aan',
    'LESS_THAN_EQUALS': 'kleiner of gelijk is aan'
  };
  
  var code = left + ' ' + (operatorMap[operator] || operator) + ' ' + right;
  
  return code;
};

// Code generator voor complex condition blok
javascript.javascriptGenerator.forBlock['complex_condition'] = function(block) {
  var multiplicity = block.getFieldValue('MULTIPLICITY');
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  // Vertaal multipliciteit naar het Nederlands
  var multiplicityMap = {
    'ALL': 'er aan alle',
    'ANY': 'er aan ten minste één van de',
    'NONE': 'er aan geen van de',
    'EXACTLY_ONE': 'er aan precies één van de'
  };
  
  var code = (multiplicityMap[multiplicity] || multiplicity) + ' volgende voorwaarden wordt voldaan :\n';
  
  // Split voorwaarden per regel en voeg bulletpoints toe
  if (conditions && conditions.trim()) {
    var conditionLines = conditions.split('\n');
    for (var i = 0; i < conditionLines.length; i++) {
      if (conditionLines[i].trim()) {
        code += '  • ' + conditionLines[i].trim() + '\n';
      }
    }
  }
  
  return code;
};

// Code generator voor nested complex condition blok
javascript.javascriptGenerator.forBlock['nested_complex_condition'] = function(block) {
  var multiplicity = block.getFieldValue('MULTIPLICITY');
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  // Vertaal multipliciteit naar het Nederlands
  var multiplicityMap = {
    'ALL': 'alle',
    'ANY': 'ten minste één van de',
    'NONE': 'geen van de',
    'EXACTLY_ONE': 'precies één van de'
  };
  
  var code = (multiplicityMap[multiplicity] || multiplicity) + ' volgende voorwaarden :\n';
  
  // Split voorwaarden per regel en voeg bulletpoints toe met dubbele inspringing
  if (conditions && conditions.trim()) {
    var conditionLines = conditions.split('\n');
    for (var i = 0; i < conditionLines.length; i++) {
      if (conditionLines[i].trim()) {
        code += '    •• ' + conditionLines[i].trim() + '\n';
      }
    }
  }
  
  return code;
};

// Code generator voor literal blok
javascript.javascriptGenerator.forBlock['literal'] = function(block) {
  var value = block.getFieldValue('VALUE');
  var unit = block.getFieldValue('UNIT');
  
  var unitMap = {
    'NONE': '',
    'EUR': 'EUR',
    'KM': 'km',
    'JR': 'jr',
    'U': 'u',
    'MINUUT': 'minuut'
  };
  
  var code = value;
  if (unit !== 'NONE') {
    code += ' ' + (unitMap[unit] || unit);
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor boolean literal blok
javascript.javascriptGenerator.forBlock['boolean_literal'] = function(block) {
  var value = block.getFieldValue('VALUE');
  
  return [value === 'TRUE' ? 'waar' : 'onwaar', Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor parameter reference blok
javascript.javascriptGenerator.forBlock['parameter_reference'] = function(block) {
  var parameterName = block.getFieldValue('PARAMETER_NAME');
  
  // Parameters worden weergegeven met hun originele naam
  return ['de ' + parameterName, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor math operation blok
javascript.javascriptGenerator.forBlock['math_operation'] = function(block) {
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var operator = block.getFieldValue('OPERATOR');
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  
  // Vertaal operatoren naar het Nederlands
  var operatorMap = {
    'PLUS': 'plus',
    'MINUS': 'min',
    'MULTIPLY': 'maal',
    'DIVIDE': 'gedeeld door'
  };
  
  var code = left + ' ' + (operatorMap[operator] || operator) + ' ' + right;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor minimum/maximum blok
javascript.javascriptGenerator.forBlock['minimum_maximum'] = function(block) {
  var func = block.getFieldValue('FUNCTION');
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  
  var code = func + ' van ' + left + ' en ' + right;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator voor rounding blok
javascript.javascriptGenerator.forBlock['rounding'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var direction = block.getFieldValue('DIRECTION');
  var decimals = block.getFieldValue('DECIMALS');
  
  // Vertaal afronding naar het Nederlands
  var directionMap = {
    'CEILING': 'naar boven afgerond',
    'FLOOR': 'naar beneden afgerond',
    'ROUND': 'afgerond'
  };
  
  var code = value + ' ' + (directionMap[direction] || direction) + ' op ' + decimals + ' decimalen';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Functie om te controleren of alle code generators geregistreerd zijn
function verifyCodeGenerators() {
  // Lijst van alle bloktypes die generators moeten hebben
  const blockTypes = [
    'business_rule',
    'assignment_action',
    'compliance_action',
    'object',
    'fact_reference',
    'role',
    'attribute',
    'characteristic',
    'expression',
    'simple_condition',
    'complex_condition',
    'nested_complex_condition',
    'literal',
    'boolean_literal',
    'parameter_reference',
    'math_operation',
    'minimum_maximum',
    'rounding'
  ];
  
  // Controleer of generators bestaan voor alle bloktypes
  let missingGenerators = [];
  blockTypes.forEach(type => {
    if (!javascript.javascriptGenerator.forBlock[type]) {
      missingGenerators.push(type);
    }
  });
  
  if (missingGenerators.length > 0) {
    console.warn('Ontbrekende code generators voor bloktypes:', missingGenerators.join(', '));
  } else {
    console.log('Alle code generators zijn correct geregistreerd');
  }
  
  return missingGenerators.length === 0;
}

// Voer verificatie uit bij het laden van het script
verifyCodeGenerators();
