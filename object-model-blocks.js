/**
 * Blockly blokken voor het definiëren van een objectmodel volgens ModelSpecs
 */

// Definieer alle objectmodel blokken met JSON definities
Blockly.defineBlocksWithJsonArray([
  // Hoofdblok voor een objectmodel
  {
    "type": "object_model",
    "message0": "Objectmodel %1",
    "message1": "Objecttypes %1",
    "message2": "Relatietypes %1",
    "message3": "Typedefinities %1",
    "message4": "Parameters %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MODEL_NAME",
        "text": "model naam"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "OBJECT_TYPES",
        "check": "object_type"
      }
    ],
    "args2": [
      {
        "type": "input_statement",
        "name": "RELATIONSHIP_TYPES",
        "check": "relationship_type"
      }
    ],
    "args3": [
      {
        "type": "input_statement",
        "name": "TYPE_DEFINITIONS",
        "check": "type_definition"
      }
    ],
    "args4": [
      {
        "type": "input_statement",
        "name": "PARAMETERS",
        "check": "parameter"
      }
    ],
    "colour": 45,
    "tooltip": "Een compleet objectmodel",
    "helpUrl": ""
  },
  
  // Objecttype blok
  {
    "type": "object_type",
    "message0": "Objecttype %1 %2",
    "message1": "Kenmerken %1",
    "message2": "Attributen %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ARTICLE",
        "options": [
          ["de", "DE"],
          ["het", "HET"],
          ["een", "EEN"]
        ]
      },
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "objectnaam"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "CHARACTERISTICS",
        "check": "characteristic_def"
      }
    ],
    "args2": [
      {
        "type": "input_statement",
        "name": "ATTRIBUTES",
        "check": "attribute_def"
      }
    ],
    "extensions": ["animate_extension"],
    "previousStatement": "object_type",
    "nextStatement": "object_type",
    "colour": 60,
    "tooltip": "Een objecttype definitie",
    "helpUrl": ""
  },
  
  // Animate extensie checkbox voor objecttype
  {
    "type": "animate_extension",
    "message0": "Bezield %1",
    "args0": [
      {
        "type": "field_checkbox",
        "name": "ANIMATE",
        "checked": false
      }
    ],
    "colour": 60,
    "tooltip": "Geeft aan of het objecttype bezield is",
    "helpUrl": ""
  },
  
  // Kenmerk definitie blok
  {
    "type": "characteristic_def",
    "message0": "%1 %2 kenmerk %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "CHAR_TYPE",
        "options": [
          ["de", "CHARACTERISTIC"],
          ["de", "CHARACTERISTIC_POSSESSIVE"],
          ["is", "CHARACTERISTIC_ADJECTIVE"]
        ]
      },
      {
        "type": "field_input",
        "name": "CHAR_NAME",
        "text": "kenmerk naam"
      },
      {
        "type": "field_dropdown",
        "name": "CHAR_SUBTYPE",
        "options": [
          ["", "REGULAR"],
          ["(bezittelijk)", "POSSESSIVE"],
          ["(bijvoeglijk)", "ADJECTIVE"]
        ]
      }
    ],
    "previousStatement": "characteristic_def",
    "nextStatement": "characteristic_def",
    "colour": 80,
    "tooltip": "Een kenmerktypedefinitie",
    "helpUrl": ""
  },
  
  // Attribuut definitie blok
  {
    "type": "attribute_def",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ARTICLE",
        "options": [
          ["de", "DE"],
          ["het", "HET"],
          ["een", "EEN"]
        ]
      },
      {
        "type": "field_input",
        "name": "ATTR_NAME",
        "text": "attribuutnaam"
      },
      {
        "type": "input_value",
        "name": "ATTR_TYPE",
        "check": ["data_type", "type_definition_ref"]
      }
    ],
    "previousStatement": "attribute_def",
    "nextStatement": "attribute_def",
    "colour": 100,
    "tooltip": "Een attribuutdefinitie",
    "helpUrl": ""
  },
  
  // Relatietype blok
  {
    "type": "relationship_type",
    "message0": "Feittype %1",
    "message1": "Rol 1: %1 %2 %3 %4",
    "message2": "Rol 2: %1 %2 %3 %4",
    "message3": "Relatiestring: %1",
    "args0": [
      {
        "type": "field_input",
        "name": "REL_NAME",
        "text": "relatienaam"
      }
    ],
    "args1": [
      {
        "type": "field_dropdown",
        "name": "ROLE1_ARTICLE",
        "options": [
          ["de", "DE"],
          ["het", "HET"],
          ["een", "EEN"]
        ]
      },
      {
        "type": "field_input",
        "name": "ROLE1_NAME",
        "text": "rolnaam"
      },
      {
        "type": "field_input",
        "name": "ROLE1_OBJECT",
        "text": "objecttype"
      },
      {
        "type": "field_dropdown",
        "name": "ROLE1_MULTIPLICITY",
        "options": [
          ["één", "ONE"],
          ["meerdere", "MANY"]
        ]
      }
    ],
    "args2": [
      {
        "type": "field_dropdown",
        "name": "ROLE2_ARTICLE",
        "options": [
          ["de", "DE"],
          ["het", "HET"],
          ["een", "EEN"]
        ]
      },
      {
        "type": "field_input",
        "name": "ROLE2_NAME",
        "text": "rolnaam"
      },
      {
        "type": "field_input",
        "name": "ROLE2_OBJECT",
        "text": "objecttype"
      },
      {
        "type": "field_dropdown",
        "name": "ROLE2_MULTIPLICITY",
        "options": [
          ["één", "ONE"],
          ["meerdere", "MANY"]
        ]
      }
    ],
    "args3": [
      {
        "type": "field_input",
        "name": "REL_STRING",
        "text": "één [rol1] [relatie] [rol2]"
      }
    ],
    "previousStatement": "relationship_type",
    "nextStatement": "relationship_type",
    "colour": 120,
    "tooltip": "Een relatietypedefinitie",
    "helpUrl": ""
  },
  
  // Type definitie blok
  {
    "type": "type_definition",
    "message0": "Domein %1 is van het type %2",
    "args0": [
      {
        "type": "field_input",
        "name": "TYPE_NAME",
        "text": "type naam"
      },
      {
        "type": "input_value",
        "name": "DATA_TYPE",
        "check": "data_type"
      }
    ],
    "previousStatement": "type_definition",
    "nextStatement": "type_definition",
    "colour": 140,
    "tooltip": "Een typedefinitie",
    "helpUrl": ""
  },
  
  // Type definitie referentie blok
  {
    "type": "type_definition_ref",
    "message0": "Type: %1",
    "args0": [
      {
        "type": "field_input",
        "name": "TYPE_REF",
        "text": "type naam"
      }
    ],
    "output": "type_definition_ref",
    "colour": 140,
    "tooltip": "Referentie naar een typedefinitie",
    "helpUrl": ""
  },
  
  // Parameter blok
  {
    "type": "parameter",
    "message0": "Parameter %1 %2 : %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PARAM_ARTICLE",
        "options": [
          ["de", "DE"],
          ["het", "HET"]
        ]
      },
      {
        "type": "field_input",
        "name": "PARAM_NAME",
        "text": "parameter naam"
      },
      {
        "type": "input_value",
        "name": "PARAM_TYPE",
        "check": ["data_type", "type_definition_ref"]
      }
    ],
    "previousStatement": "parameter",
    "nextStatement": "parameter",
    "colour": 160,
    "tooltip": "Een parameterdefinitie",
    "helpUrl": ""
  },
  
  // Datatype blok
  {
    "type": "data_type",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DATA_TYPE",
        "options": [
          ["Numeriek", "NUMERIC"],
          ["Percentage", "PERCENTAGE"],
          ["Tekst", "TEXT"],
          ["Boolean", "BOOLEAN"],
          ["Datum in dagen", "DATE_DAYS"],
          ["Datum en tijd in milliseconden", "DATE_TIME_MS"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER_SPEC",
        "check": "number_specification"
      },
      {
        "type": "field_input",
        "name": "UNIT",
        "text": ""
      }
    ],
    "output": "data_type",
    "colour": 180,
    "tooltip": "Een datatype definitie",
    "helpUrl": ""
  },
  
  // Number specification blok
  {
    "type": "number_specification",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "SIGN",
        "options": [
          ["", "NONE"],
          ["negatief", "NEGATIVE"],
          ["niet-negatief", "NON_NEGATIVE"],
          ["positief", "POSITIVE"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "NUMBER_TYPE",
        "options": [
          ["geheel getal", "INTEGER"],
          ["getal", "NUMBER"]
        ]
      },
      {
        "type": "field_number",
        "name": "DECIMALS",
        "value": 0,
        "min": 0,
        "max": 10
      }
    ],
    "output": "number_specification",
    "colour": 200,
    "tooltip": "Een nummer specificatie",
    "helpUrl": ""
  }
]);

// Registreer de "animate" extensie
Blockly.Extensions.register('animate_extension', function() {
  // Deze extensie voegt een checkbox toe om aan te geven of een object bezield is
  var checkbox = new Blockly.FieldCheckbox('FALSE');
  this.appendDummyInput()
      .appendField("Bezield")
      .appendField(checkbox, 'ANIMATE');
});
