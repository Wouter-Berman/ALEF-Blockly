/**
 * Code generators voor de objectmodel blokken
 */

// Generator voor het objectmodel blok
javascript.javascriptGenerator.forBlock['object_model'] = function(block) {
  var modelName = block.getFieldValue('MODEL_NAME');
  var objectTypes = Blockly.JavaScript.statementToCode(block, 'OBJECT_TYPES');
  var relationshipTypes = Blockly.JavaScript.statementToCode(block, 'RELATIONSHIP_TYPES');
  var typeDefinitions = Blockly.JavaScript.statementToCode(block, 'TYPE_DEFINITIONS');
  var parameters = Blockly.JavaScript.statementToCode(block, 'PARAMETERS');
  
  var code = '// Objectmodel: ' + modelName + '\n\n';
  
  // Objecttypes
  if (objectTypes.trim()) {
    code += '// Objecttypes\n' + objectTypes + '\n';
  }
  
  // Relatietypes
  if (relationshipTypes.trim()) {
    code += '// Feittypen\n' + relationshipTypes + '\n';
  }
  
  // Parameters
  if (parameters.trim()) {
    code += '// Parameters\n' + parameters + '\n';
  }
  
  // Typedefinities
  if (typeDefinitions.trim()) {
    code += '// Domeinen\n' + typeDefinitions;
  }
  
  return code;
};

// Generator voor het objecttype blok
javascript.javascriptGenerator.forBlock['object_type'] = function(block) {
  var article = block.getFieldValue('ARTICLE');
  var objectName = block.getFieldValue('OBJECT_NAME');
  var animate = block.getFieldValue('ANIMATE') === 'TRUE' ? ' (bezield)' : '';
  var characteristics = Blockly.JavaScript.statementToCode(block, 'CHARACTERISTICS');
  var attributes = Blockly.JavaScript.statementToCode(block, 'ATTRIBUTES');
  
  var code = 'Objecttype ' + article + ' ' + objectName + animate + '\n';
  
  // Kenmerken toevoegen als die er zijn
  if (characteristics) {
    code += characteristics;
  }
  
  // Attributen toevoegen als die er zijn
  if (attributes) {
    code += attributes;
  }
  
  return code;
};

// Generator voor het animate_extension blok (niet direct nodig, wordt afgehandeld in object_type)
javascript.javascriptGenerator.forBlock['animate_extension'] = function(block) {
  return '';
};

// Generator voor het characteristic_def blok
javascript.javascriptGenerator.forBlock['characteristic_def'] = function(block) {
  var charType = block.getFieldValue('CHAR_TYPE');
  var charName = block.getFieldValue('CHAR_NAME');
  var charSubtype = block.getFieldValue('CHAR_SUBTYPE');
  
  var code = '';
  if (charType === 'CHARACTERISTIC') {
    code = 'de\t' + charName + '\tkenmerk\n';
  } else if (charType === 'CHARACTERISTIC_POSSESSIVE') {
    code = 'de\t' + charName + '\tkenmerk (bezittelijk)\n';
  } else if (charType === 'CHARACTERISTIC_ADJECTIVE') {
    code = 'is\t' + charName + '\tkenmerk (bijvoeglijk)\n';
  }
  
  return code;
};

// Generator voor het attribute_def blok
javascript.javascriptGenerator.forBlock['attribute_def'] = function(block) {
  var article = block.getFieldValue('ARTICLE');
  var attrName = block.getFieldValue('ATTR_NAME');
  var attrType = Blockly.JavaScript.valueToCode(block, 'ATTR_TYPE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = article + '\t' + attrName + '\t' + attrType + '\n';
  
  return code;
};

// Generator voor het relationship_type blok
javascript.javascriptGenerator.forBlock['relationship_type'] = function(block) {
  var relName = block.getFieldValue('REL_NAME');
  var role1Article = block.getFieldValue('ROLE1_ARTICLE');
  var role1Name = block.getFieldValue('ROLE1_NAME');
  var role1Object = block.getFieldValue('ROLE1_OBJECT');
  var role1Multiplicity = block.getFieldValue('ROLE1_MULTIPLICITY');
  var role2Article = block.getFieldValue('ROLE2_ARTICLE');
  var role2Name = block.getFieldValue('ROLE2_NAME');
  var role2Object = block.getFieldValue('ROLE2_OBJECT');
  var role2Multiplicity = block.getFieldValue('ROLE2_MULTIPLICITY');
  var relString = block.getFieldValue('REL_STRING');
  
  var code = 'Feittype ' + relName + '\n';
  code += role1Article + '\t' + role1Name + '\t' + role1Object + '\n';
  code += role2Article + '\t' + role2Name + '\t' + role2Object + '\n';
  code += relString + '\n\n';
  
  return code;
};

// Generator voor het type_definition blok
javascript.javascriptGenerator.forBlock['type_definition'] = function(block) {
  var typeName = block.getFieldValue('TYPE_NAME');
  var dataType = Blockly.JavaScript.valueToCode(block, 'DATA_TYPE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = 'Domein ' + typeName + ' is van het type ' + dataType + '\n';
  
  return code;
};

// Generator voor het type_definition_ref blok
javascript.javascriptGenerator.forBlock['type_definition_ref'] = function(block) {
  var typeRef = block.getFieldValue('TYPE_REF');
  
  return [typeRef, Blockly.JavaScript.ORDER_ATOMIC];
};

// Generator voor het parameter blok
javascript.javascriptGenerator.forBlock['parameter'] = function(block) {
  var paramArticle = block.getFieldValue('PARAM_ARTICLE');
  var paramName = block.getFieldValue('PARAM_NAME');
  var paramType = Blockly.JavaScript.valueToCode(block, 'PARAM_TYPE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = 'Parameter ' + paramArticle + ' ' + paramName + ' : ' + paramType + '\n';
  
  return code;
};

// Generator voor het data_type blok
javascript.javascriptGenerator.forBlock['data_type'] = function(block) {
  var dataType = block.getFieldValue('DATA_TYPE');
  var numberSpec = Blockly.JavaScript.valueToCode(block, 'NUMBER_SPEC', Blockly.JavaScript.ORDER_ATOMIC);
  var unit = block.getFieldValue('UNIT');
  
  var code = '';
  
  // Vertaal dataType
  var dataTypeMap = {
    'NUMERIC': 'Numeriek',
    'PERCENTAGE': 'Percentage',
    'TEXT': 'Tekst',
    'BOOLEAN': 'Boolean',
    'DATE_DAYS': 'Datum in dagen',
    'DATE_TIME_MS': 'Datum en tijd in milliseconden'
  };
  
  code = dataTypeMap[dataType] || dataType;
  
  // Voeg number specification toe als die er is
  if (numberSpec) {
    code += ' ' + numberSpec;
  }
  
  // Voeg eenheid toe als die er is
  if (unit) {
    code += ' met eenheid ' + unit;
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Generator voor het number_specification blok
javascript.javascriptGenerator.forBlock['number_specification'] = function(block) {
  var sign = block.getFieldValue('SIGN');
  var numberType = block.getFieldValue('NUMBER_TYPE');
  var decimals = block.getFieldValue('DECIMALS');
  
  var code = '(';
  
  // Voeg teken toe als die er is
  if (sign && sign !== 'NONE') {
    var signMap = {
      'NEGATIVE': 'negatief',
      'NON_NEGATIVE': 'niet-negatief',
      'POSITIVE': 'positief'
    };
    code += signMap[sign] + ' ';
  }
  
  // Voeg nummertype toe
  code += numberType;
  
  // Voeg decimalen toe als numberType getal is en decimalen > 0
  if (numberType === 'getal' && decimals > 0) {
    code += ' met ' + decimals + ' decimalen';
  }
  
  code += ')';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
