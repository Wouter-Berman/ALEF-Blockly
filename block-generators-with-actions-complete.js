/**
 * Code generators for custom Blockly blocks to generate rule text according to ModelSpecs_Simple
 * Updated to work with separate action blocks
 */

// Register the JavaScript generator
Blockly.JavaScript.addReservedWords('generateRuleText');

// Ensure JavaScript generator exists
if (typeof Blockly === 'undefined') {
  throw new Error('Blockly is not defined. Make sure Blockly is loaded before this script.');
}

// Initialize JavaScript generator if needed
if (!Blockly.JavaScript) {
  console.warn('Blockly.JavaScript not found - initializing it now');
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

// Code generator for the business rule block
javascript.javascriptGenerator.forBlock['business_rule'] = function(block) {
  var ruleName = block.getFieldValue('RULE_NAME');
  var ruleId = block.getFieldValue('RULE_ID');
  var validFrom = block.getFieldValue('VALID_FROM');
  var validUntil = block.getFieldValue('VALID_UNTIL');
  var action = Blockly.JavaScript.valueToCode(block, 'ACTION', Blockly.JavaScript.ORDER_ATOMIC) || 'missing action';
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  var code = 'Rule ' + ruleName + '\n';
  code += 'valid from ' + validFrom;
  if (validUntil) {
    code += ' until ' + validUntil;
  }
  code += '\n';
  
  // Include the action (the action block will include target, operator, and source)
  code += action;
  
  if (conditions && conditions.trim()) {
    code += '\nwhen ' + conditions.trim();
  }
  
  return code;
};

// Code generator for the assignment action block
javascript.javascriptGenerator.forBlock['assignment_action'] = function(block) {
  var target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ATOMIC) || 'missing target';
  var source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_ATOMIC) || 'missing source';
  
  var code = target + ' becomes ' + source;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for the compliance action block
javascript.javascriptGenerator.forBlock['compliance_action'] = function(block) {
  var target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ATOMIC) || 'missing target';
  var comparison = block.getFieldValue('COMPARISON');
  var source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_ATOMIC) || 'missing source';
  
  var code = target + ' must be ' + comparison + ' ' + source;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for fact reference block
javascript.javascriptGenerator.forBlock['fact_reference'] = function(block) {
  var objectType = block.getFieldValue('OBJECT_TYPE');
  var roles = Blockly.JavaScript.statementToCode(block, 'ROLES');
  var attribute = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTE', Blockly.JavaScript.ORDER_ATOMIC);
  
  // Convert internal OBJECT_TYPE constant to display name (in English)
  var objectTypeMap = {
    'VLUCHT': 'the flight',
    'NATUURLIJK_PERSOON': 'the natural person',
    'CONTINGENT_TREINMILES': 'the train miles contingent',
    'UITWORPMELDING': 'the rejection notification'
  };
  
  var code = '';
  
  // If we have an attribute, add it
  if (attribute) {
    if (roles && roles.trim()) {
      code = attribute + ' of ' + roles.trim();
    } else {
      code = attribute + ' of ' + objectTypeMap[objectType];
    }
  } else {
    if (roles && roles.trim()) {
      code = roles.trim();
    } else {
      code = objectTypeMap[objectType];
    }
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for role block
javascript.javascriptGenerator.forBlock['role'] = function(block) {
  var roleName = block.getFieldValue('ROLE_NAME');
  
  // Convert internal ROLE_NAME constant to display name (in English)
  var roleNameMap = {
    'PASSAGIER': 'the passenger',
    'REIS': 'the trip',
    'VASTGESTELD_CONTINGENT_TREINMILES': 'the established train miles contingent',
    'REDEN_UITWORP': 'the rejection reason'
  };
  
  return roleNameMap[roleName];
};

// Code generator for attribute block
javascript.javascriptGenerator.forBlock['attribute'] = function(block) {
  var attributeName = block.getFieldValue('ATTRIBUTE_NAME');
  
  // Convert internal ATTRIBUTE_NAME constant to display name (in English)
  var attributeNameMap = {
    'AFSTAND_TOT_BESTEMMING': 'the distance to destination',
    'BEREIKBAAR_PER_TREIN': 'accessible by train',
    'DATUM_VAN_DE_VLUCHT': 'the date of the flight',
    'LEEFTIJD': 'the age',
    'TE_BETALEN_BELASTING': 'the payable tax',
    'BELASTING_OP_BASIS_VAN_AFSTAND': 'the distance-based tax',
    'BELASTING_OP_BASIS_VAN_REISDUUR': 'the travel duration-based tax',
    'TOTAAL_TE_BETALEN_BELASTING': 'the total payable tax',
    'AANTAL_PASSAGIERS': 'the number of passengers',
    'TREINMILES': 'the train miles'
  };
  
  return [attributeNameMap[attributeName], Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for characteristic block
javascript.javascriptGenerator.forBlock['characteristic'] = function(block) {
  var characteristicName = block.getFieldValue('CHARACTERISTIC_NAME');
  
  // Convert internal CHARACTERISTIC_NAME constant to display name (in English)
  var characteristicNameMap = {
    'BELASTE_REIS': 'a taxed trip',
    'ONBELASTE_REIS': 'an untaxed trip',
    'RONDVLUCHT': 'a roundtrip flight',
    'KLIMAATNEUTRAAL': 'climate neutral',
    'RECHT_OP_DUURZAAMHEIDSKORTING': 'entitled to sustainability discount',
    'PASSAGIER_LAGE_TARIEF': 'a passenger eligible for the low distance-based tax rate',
    'PASSAGIER_HOGE_TARIEF': 'a passenger eligible for the high distance-based tax rate'
  };
  
  return [characteristicNameMap[characteristicName], Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for expression block
javascript.javascriptGenerator.forBlock['expression'] = function(block) {
  var functionName = block.getFieldValue('FUNCTION_NAME');
  var parameters = Blockly.JavaScript.statementToCode(block, 'PARAMETERS');
  
  var code = '';
  
  if (parameters && parameters.trim()) {
    code = functionName + ' ' + parameters.trim();
  } else {
    code = functionName;
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for simple condition block
javascript.javascriptGenerator.forBlock['simple_condition'] = function(block) {
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || 'missing left operand';
  var operator = block.getFieldValue('OPERATOR');
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || 'missing right operand';
  
  var code = left + ' ' + operator + ' ' + right;
  
  return code;
};

// Code generator for complex condition block
javascript.javascriptGenerator.forBlock['complex_condition'] = function(block) {
  var multiplicity = block.getFieldValue('MULTIPLICITY');
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  var code = multiplicity + ' of the following conditions are met:\n';
  
  // Split conditions by line and add bullet points
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

// Code generator for nested complex condition block
javascript.javascriptGenerator.forBlock['nested_complex_condition'] = function(block) {
  var multiplicity = block.getFieldValue('MULTIPLICITY');
  var conditions = Blockly.JavaScript.statementToCode(block, 'CONDITIONS');
  
  var code = multiplicity + ' of the following conditions are met:\n';
  
  // Split conditions by line and add bullet points with double indent
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

// Code generator for literal block
javascript.javascriptGenerator.forBlock['literal'] = function(block) {
  var value = block.getFieldValue('VALUE');
  var unit = block.getFieldValue('UNIT');
  
  var unitMap = {
    'NONE': '',
    'EUR': 'EUR',
    'KM': 'km',
    'JR': 'yr',
    'U': 'h',
    'MINUUT': 'min'
  };
  
  var code = value;
  if (unit !== 'NONE') {
    code += ' ' + unitMap[unit];
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for boolean literal block
javascript.javascriptGenerator.forBlock['boolean_literal'] = function(block) {
  var value = block.getFieldValue('VALUE');
  
  return [value, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for parameter reference block
javascript.javascriptGenerator.forBlock['parameter_reference'] = function(block) {
  var parameterName = block.getFieldValue('PARAMETER_NAME');
  
  // Parameters are displayed using their original name
  return ['the ' + parameterName, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for math operation block
javascript.javascriptGenerator.forBlock['math_operation'] = function(block) {
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var operator = block.getFieldValue('OPERATOR');
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  
  var code = left + ' ' + operator + ' ' + right;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for minimum/maximum block
javascript.javascriptGenerator.forBlock['minimum_maximum'] = function(block) {
  var func = block.getFieldValue('FUNCTION');
  var left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  
  var code = func + ' of ' + left + ' and ' + right;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Code generator for rounding block
javascript.javascriptGenerator.forBlock['rounding'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var direction = block.getFieldValue('DIRECTION');
  var decimals = block.getFieldValue('DECIMALS');
  
  var code = value + ' ' + direction + ' to ' + decimals + ' decimals';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Function to check if all code generators are registered
function verifyCodeGenerators() {
  // List of all block types that should have generators
  const blockTypes = [
    'business_rule',
    'assignment_action',
    'compliance_action',
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
  
  // Check if generators exist for all block types
  let missingGenerators = [];
  blockTypes.forEach(type => {
    if (!javascript.javascriptGenerator.forBlock[type]) {
      missingGenerators.push(type);
    }
  });
  
  if (missingGenerators.length > 0) {
    console.warn('Missing code generators for block types:', missingGenerators.join(', '));
  } else {
    console.log('All code generators are registered properly');
  }
  
  return missingGenerators.length === 0;
}

// Run verification when script loads
verifyCodeGenerators();
