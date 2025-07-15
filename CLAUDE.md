# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ALEF-Blockly is a visual rule editor for creating business rules and object models using Google Blockly. The application is designed for Dutch regulatory contexts, particularly for defining tax rules related to flights (TOKA - vliegbelasting).

## Development Commands

This is a pure client-side application with no build process:

```bash
# Run the application
open index.html

# Or use any local web server
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

## Architecture

### Core Structure

The application follows a modular architecture with clear separation between:

- **Block Definitions**: Define the visual blocks available in Blockly
- **Code Generators**: Transform blocks into rule syntax
- **Configuration**: Object model and relationships definition
- **Main Application**: Orchestrates workspaces and handles UI interactions

### Key Files and Their Purposes

- **main.js**: Application initialization, workspace management, tab switching, save/load functionality
- **config.js**: Central object model configuration defining all object types, relationships, and parameters
- **block-definitions.js** & **block-generators.js**: Rule blocks and their code generation
- **object-model-blocks.js** & **object-model-generators.js**: Object model blocks and generation
- **ModelSpecs.txt**: BNF grammar specification for the rule language
- **modelspecs-schema.json**: JSON Schema for rule document validation

### Two-Mode Architecture

1. **Rules Mode**: Create business rules following the ModelSpecs grammar

   - Uses categories: Rules, Actions, Objects, Expressions, Conditions, Values
   - Generates rule syntax like: `de vliegtijd wordt het aantal minuten tussen de vertrektijd van de vlucht en de aankomsttijd van de vlucht`

2. **Object Model Mode**: Define object structures and relationships
   - Uses categories: Object Model, Object Types, Relations, Types, Parameters
   - Generates object model definitions

## Working with Blockly

### Blockly Version

The application uses Blockly v10.4.0 (pinned for stability). When modifying Blockly-related code:

- Block definitions must follow Blockly's JSON format
- Code generators use the JavaScript generator API
- All blocks must have unique types

### Adding New Blocks

1. Define the block in the appropriate definition file (block-definitions.js or object-model-blocks.js)
2. Create the corresponding generator in the generator file
3. Add the block to the appropriate toolbox category in index.html

### Code Generation Pattern

```javascript
javascriptGenerator.forBlock['block_type'] = function (block) {
  // Get field values
  const value = block.getFieldValue('FIELD_NAME');
  // Get connected blocks
  const input = javascriptGenerator.valueToCode(
    block,
    'INPUT_NAME',
    javascriptGenerator.ORDER_ATOMIC
  );
  // Return generated code
  return `generated syntax`;
};
```

## Domain-Specific Language

The application generates code following the ModelSpecs grammar. Key patterns:

- Object references: `de [attribute] van de [object]`
- Assignments: `[target] wordt [source]`
- Conditions: `indien [expression]`
- Functions: `[function]([param1]; [param2]; ...)`

Example rule:

```
indien de CO2 uitstoot van de vlucht groter is dan 0
dan de belasting van de vlucht wordt de CO2 uitstoot van de vlucht * de CO2 tarief
```

## Testing Approach

Currently no automated tests. Manual testing involves:

1. Creating rules/models using the visual interface
2. Verifying generated code matches expected syntax
3. Checking save/load functionality preserves workspace state
4. Testing example rules load correctly

## Common Tasks

### Modify Object Model

Edit config.js to add/modify object types, relationships, or parameters. The structure must match:

```javascript
window.objectModel = {
  objectTypes: [...],
  relationshipTypes: [...],
  typeDefinitions: [...],
  parameters: [...]
};
```

### Add Custom Functions

Add to the functions array in block-definitions.js:

```javascript
{value: 'new_function', text: 'nieuwe functie'}
```

### Debug Block Generation

1. Check browser console for Blockly errors
2. Use workspace.getAllBlocks() to inspect block state
3. Verify block connections using block.getInput('INPUT_NAME')

## Important Considerations

- The application is entirely client-side - no server communication
- All text is in Dutch to match the business domain
- Local storage is used for persistence (no database)
- The ModelSpecs grammar must be strictly followed for valid output
- TOKA directory contains real-world examples for Dutch flight tax rules
