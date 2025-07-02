/**
 * Main JavaScript voor de Blockly editor met tabs voor regels en objectmodel
 */

// Initialiseer de Blockly werkruimtes
let workspaceRules = Blockly.inject('blocklyDivRules', {
  toolbox: document.getElementById('toolboxRules'),
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: true,
});

let workspaceObjectModel = Blockly.inject('blocklyDivObjectModel', {
  toolbox: document.getElementById('toolboxObjectModel'),
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: true,
});

// Referenties opslaan
window.workspaceRules = workspaceRules;
window.workspaceObjectModel = workspaceObjectModel;

// Huidige actieve werkruimte bijhouden
let currentWorkspace = workspaceRules;
let currentWorkspaceType = 'rules';

// Navigation system voor rule references
let navigationStack = [];
let currentRuleName = null;

// Functie om code te genereren uit de actieve werkruimte
function generateCode() {
  try {
    if (currentWorkspaceType === 'rules') {
      const code = Blockly.JavaScript.workspaceToCode(workspaceRules);
      document.getElementById('outputRules').textContent = code;
    } else if (currentWorkspaceType === 'objectModel') {
      const code = Blockly.JavaScript.workspaceToCode(workspaceObjectModel);
      document.getElementById('outputObjectModel').textContent = code;
    }
  } catch (error) {
    console.error('Fout bij het genereren van code:', error);
    if (currentWorkspaceType === 'rules') {
      document.getElementById('outputRules').textContent =
        'Fout bij het genereren van regeltekst: ' + error.message;
    } else {
      document.getElementById('outputObjectModel').textContent =
        'Fout bij het genereren van objectmodel: ' + error.message;
    }
  }
}

// Debug functie om JSON serialisatie te testen
function debugSerializedWorkspace() {
  const state = Blockly.serialization.workspaces.save(currentWorkspace);
  console.log('Current workspace state:', JSON.stringify(state, null, 2));
}

// Luisteraars toevoegen voor veranderingen in de werkruimtes
workspaceRules.addChangeListener(function (event) {
  if (
    event.type === Blockly.Events.BLOCK_CHANGE ||
    event.type === Blockly.Events.BLOCK_CREATE ||
    event.type === Blockly.Events.BLOCK_DELETE ||
    event.type === Blockly.Events.BLOCK_MOVE
  ) {
    // Debounce de generatie
    clearTimeout(workspaceRules.ruleGenTimeout);
    workspaceRules.ruleGenTimeout = setTimeout(function () {
      if (currentWorkspaceType === 'rules') {
        generateCode();
      }
    }, 300);
  }
});

workspaceObjectModel.addChangeListener(function (event) {
  if (
    event.type === Blockly.Events.BLOCK_CHANGE ||
    event.type === Blockly.Events.BLOCK_CREATE ||
    event.type === Blockly.Events.BLOCK_DELETE ||
    event.type === Blockly.Events.BLOCK_MOVE
  ) {
    // Debounce de generatie
    clearTimeout(workspaceObjectModel.modelGenTimeout);
    workspaceObjectModel.modelGenTimeout = setTimeout(function () {
      if (currentWorkspaceType === 'objectModel') {
        generateCode();
      }
    }, 300);
  }
});

// Functies voor tabwissel
function showRulesWorkspace() {
  document.getElementById('rulesWorkspace').classList.add('active');
  document.getElementById('objectModelWorkspace').classList.remove('active');
  document.getElementById('rulesTab').classList.add('active');
  document.getElementById('objectModelTab').classList.remove('active');
  currentWorkspace = workspaceRules;
  currentWorkspaceType = 'rules';

  // Resize Blockly werkruimte om rendering problemen te voorkomen
  setTimeout(function () {
    Blockly.svgResize(workspaceRules);
  }, 10);

  // Genereer code voor deze werkruimte
  generateCode();
}

function showObjectModelWorkspace() {
  document.getElementById('rulesWorkspace').classList.remove('active');
  document.getElementById('objectModelWorkspace').classList.add('active');
  document.getElementById('rulesTab').classList.remove('active');
  document.getElementById('objectModelTab').classList.add('active');
  currentWorkspace = workspaceObjectModel;
  currentWorkspaceType = 'objectModel';

  // Resize Blockly werkruimte om rendering problemen te voorkomen
  setTimeout(function () {
    Blockly.svgResize(workspaceObjectModel);
  }, 10);

  // Genereer code voor deze werkruimte
  generateCode();
}

// Tab-knoppen event listeners toevoegen
document
  .getElementById('rulesTab')
  .addEventListener('click', showRulesWorkspace);
document
  .getElementById('objectModelTab')
  .addEventListener('click', showObjectModelWorkspace);

// Functie om een werkruimte op te slaan (bijgewerkt voor JSON serialisatie)
function saveWorkspace() {
  try {
    let state, fileName;

    if (currentWorkspaceType === 'rules') {
      state = Blockly.serialization.workspaces.save(workspaceRules);
      fileName = 'regel.json';
    } else {
      state = Blockly.serialization.workspaces.save(workspaceObjectModel);
      fileName = 'objectmodel.json';
    }

    // Converteer het state-object naar een JSON-string
    const jsonText = JSON.stringify(state, null, 2);

    // Maak een blob en downloadlink
    const blob = new Blob([jsonText], { type: 'application/json' });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  } catch (error) {
    console.error('Fout bij het opslaan van de werkruimte:', error);
    alert('Fout bij het opslaan van de werkruimte: ' + error.message);
  }
}

// Functie om een werkruimte te laden (bijgewerkt voor JSON serialisatie)
function loadWorkspace() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        // Parse de JSON-string naar een object
        const state = JSON.parse(e.target.result);

        // Controleer welke werkruimte actief is en laad daarin
        if (currentWorkspaceType === 'rules') {
          workspaceRules.clear();
          Blockly.serialization.workspaces.load(state, workspaceRules);
        } else {
          workspaceObjectModel.clear();
          Blockly.serialization.workspaces.load(state, workspaceObjectModel);
        }

        // Genereer code
        generateCode();
      } catch (err) {
        alert('Fout bij het laden van het bestand: ' + err.message);
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

// Navigation functions
function navigateToRule(ruleId) {
  console.log('=== NAVIGATE TO RULE ===');
  console.log('Target rule ID:', ruleId);

  // Map rule IDs to example rule names
  const ruleMap = {
    'zvw-verzekerde-01': 'zvw_verzekerde_status_rule',
    'penitentiaire-beginselenwet-01': 'penitentiaire_beginselenwet_rule',
    'standaardpremie-01': 'standaardpremie_calculation_rule',
    'zorgtoeslag-hoogte-01': 'zorgtoeslag_official_complete_rule_example',
    'minimumleeftijd-01': 'distance_init_example', // placeholder for now
    'leeftijd-controle-01': 'distance_init_example', // placeholder
    'inkomen-alleenstaande-01': 'tax_calculation_example', // placeholder
    'inkomen-partners-01': 'compliance_rule_example', // placeholder
  };

  console.log('Rule map:', ruleMap);

  const exampleRuleName = ruleMap[ruleId];
  if (exampleRuleName && typeof loadExampleRule === 'function') {
    // Save current state to navigation stack
    if (currentRuleName) {
      navigationStack.push({
        ruleName: currentRuleName,
        workspace: Blockly.serialization.workspaces.save(workspaceRules),
      });
    }

    // Load the new rule
    loadExampleRule(exampleRuleName);
    currentRuleName = ruleId;

    // Update UI
    updateNavigationUI();
  } else {
    alert('Regel "' + ruleId + '" niet gevonden.');
  }
}

function navigateBack() {
  if (navigationStack.length > 0) {
    const previousState = navigationStack.pop();

    // Restore previous workspace
    workspaceRules.clear();
    Blockly.serialization.workspaces.load(
      previousState.workspace,
      workspaceRules
    );
    currentRuleName = previousState.ruleName;

    // Update UI
    updateNavigationUI();
    generateCode();
  }
}

function updateNavigationUI() {
  // Update navigation bar (we'll add this to HTML later)
  const navElement = document.getElementById('navigationBar');
  if (navElement) {
    let breadcrumbs = '';
    if (currentRuleName) {
      const ruleNames = {
        'zvw-verzekerde-01': 'ZVW Verzekerde Status',
        'standaardpremie-01': 'Standaardpremie',
        'zorgtoeslag-hoogte-01': 'Zorgtoeslag Hoogte',
        'minimumleeftijd-01': 'Minimumleeftijd',
      };
      breadcrumbs =
        'Huidige regel: ' + (ruleNames[currentRuleName] || currentRuleName);
    }

    if (navigationStack.length > 0) {
      breadcrumbs +=
        ' <button onclick="navigateBack()" style="margin-left: 10px;">← Terug</button>';
    }

    navElement.innerHTML = breadcrumbs;
  }
}

// Setup click handlers for rule_reference blocks
function setupRuleReferenceClickHandlers() {
  console.log('Setting up rule reference click handlers...');

  // Add change listener for new blocks
  workspaceRules.addChangeListener(function (event) {
    if (event.type === Blockly.Events.BLOCK_CREATE) {
      console.log('Block created:', event.blockId);
      // Use setTimeout to ensure SVG is fully rendered
      setTimeout(function () {
        const block = workspaceRules.getBlockById(event.blockId);
        if (block) {
          addClickHandlerToBlock(block);
        }
      }, 100);
    }

    // Handle field changes for rule_output_reference blocks
    if (
      event.type === Blockly.Events.BLOCK_CHANGE &&
      event.element === 'field'
    ) {
      const block = workspaceRules.getBlockById(event.blockId);
      if (
        block &&
        block.type === 'rule_output_reference' &&
        event.name === 'RULE_ID'
      ) {
        console.log(
          'Rule field changed in block:',
          event.blockId,
          'New value:',
          event.newValue
        );

        // Update the output dropdown
        const outputField = block.getField('OUTPUT_NAME');
        if (outputField && window.getOutputsForRule) {
          const newOptions = window.getOutputsForRule(event.newValue);
          console.log('Updating output options to:', newOptions);

          // Try to update the dropdown
          if (outputField.menuGenerator_) {
            outputField.menuGenerator_ = newOptions;
          }

          // Set to first valid option
          if (newOptions.length > 0) {
            outputField.setValue(newOptions[0][1]);
          }
        }
      }
    }
  });

  // Also add handlers to existing blocks
  setTimeout(function () {
    const allBlocks = workspaceRules.getAllBlocks();
    allBlocks.forEach(function (block) {
      addClickHandlerToBlock(block);
    });
  }, 500);
}

function addClickHandlerToBlock(block) {
  if (!block || !block.getSvgRoot()) {
    return;
  }

  console.log('Adding click handler to block type:', block.type);

  // Add dynamic dropdown update for rule_output_reference
  if (block.type === 'rule_output_reference') {
    const ruleField = block.getField('RULE_ID');
    const outputField = block.getField('OUTPUT_NAME');

    if (ruleField && outputField) {
      // Add change listener to update output dropdown when rule changes
      ruleField.setValidator(function (newValue) {
        console.log('Rule changed to:', newValue);
        const newOptions = window.getOutputsForRule
          ? window.getOutputsForRule(newValue)
          : [['loading...', 'loading']];
        console.log('New output options:', newOptions);

        // Force update the dropdown options
        if (outputField.menuGenerator_) {
          outputField.menuGenerator_ = newOptions;
        }

        // For newer Blockly versions, try this approach
        if (outputField.getOptions) {
          outputField.getOptions = function () {
            return newOptions;
          };
        }

        // Set to first option and force re-render
        if (newOptions.length > 0) {
          outputField.setValue(newOptions[0][1]);

          // Force the field to refresh its display
          if (outputField.forceRerender) {
            outputField.forceRerender();
          }
        }

        return newValue;
      });

      // Initialize with current rule
      const currentRule = ruleField.getValue();
      if (currentRule && window.getOutputsForRule) {
        const initialOptions = window.getOutputsForRule(currentRule);
        outputField.menuGenerator_ = initialOptions;
      }
    }
  }

  // Handle rule_reference blocks
  if (block.type === 'rule_reference') {
    const svgRoot = block.getSvgRoot();

    // Remove existing listeners to avoid duplicates
    svgRoot.removeEventListener('click', handleRuleReferenceClick);

    function handleRuleReferenceClick(e) {
      console.log('Rule reference clicked!');
      const ruleId = block.getFieldValue('RULE_ID');
      console.log('Rule ID:', ruleId);
      if (ruleId) {
        e.stopPropagation();
        e.preventDefault();
        navigateToRule(ruleId);
      }
    }

    svgRoot.addEventListener('click', handleRuleReferenceClick);
    svgRoot.style.cursor = 'pointer';
    svgRoot.title = 'Klik om naar deze regel te navigeren';
  }

  // Handle rule_output_reference blocks
  if (block.type === 'rule_output_reference') {
    const svgRoot = block.getSvgRoot();

    function handleRuleOutputClick(e) {
      console.log('Rule output reference clicked!');
      const ruleId = block.getFieldValue('RULE_ID');
      const outputName = block.getFieldValue('OUTPUT_NAME');
      console.log('Rule ID:', ruleId, 'Output:', outputName);
      if (ruleId) {
        e.stopPropagation();
        e.preventDefault();
        navigateToRule(ruleId);
      }
    }

    svgRoot.addEventListener('click', handleRuleOutputClick);
    svgRoot.style.cursor = 'pointer';
    svgRoot.title =
      'Klik om naar de regel te navigeren die deze output produceert';
  }

  // Handle law_parameter_reference blocks
  if (block.type === 'law_parameter_reference') {
    const svgRoot = block.getSvgRoot();

    function handleLawParameterClick(e) {
      console.log('Law parameter reference clicked!');
      const lawId = block.getFieldValue('LAW_ID');
      e.stopPropagation();
      e.preventDefault();
      alert('Navigatie naar wet "' + lawId + '" nog niet geïmplementeerd.');
    }

    svgRoot.addEventListener('click', handleLawParameterClick);
    svgRoot.style.cursor = 'pointer';
    svgRoot.title = 'Klik om naar de wet/parameter definitie te navigeren';
  }
}

// Export navigation functions to global scope
window.navigateToRule = navigateToRule;
window.navigateBack = navigateBack;
window.addClickHandlerToBlock = addClickHandlerToBlock;

// Event listeners voor knoppen
document
  .getElementById('generateButton')
  .addEventListener('click', generateCode);
document.getElementById('saveButton').addEventListener('click', saveWorkspace);
document.getElementById('loadButton').addEventListener('click', loadWorkspace);

// Voorbeeld objectmodel initialiseren
function createSampleObjectModel() {
  // Controleer of objectmodel werkruimte leeg is
  if (workspaceObjectModel.getAllBlocks(false).length === 0) {
    try {
      // Laad het voorbeeld objectmodel als dat beschikbaar is
      if (typeof loadFlightObjectModelExample === 'function') {
        // Wacht even met het laden van het voorbeeld om ervoor te zorgen dat de werkruimte volledig is geïnitialiseerd
        setTimeout(loadFlightObjectModelExample, 500);
      } else {
        console.warn('loadFlightObjectModelExample functie niet beschikbaar');
      }
    } catch (error) {
      console.error('Fout bij het laden van het voorbeeld objectmodel:', error);
    }
  }
}

// Registreer callbacks voor de voorbeeld knoppen
function registerButtonCallbacks() {
  const ruleCallbacks = {
    loadDistanceInitExample: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('distance_init_example');
      }
    },
    loadTaxCalculationExample: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('tax_calculation_example');
      }
    },
    loadComplianceRuleExample: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('compliance_rule_example');
      }
    },
    loadZorgtoeslagOfficialCompleteRuleExample: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('zorgtoeslag_official_complete_rule_example');
      }
    },
    loadZVWVerzekerdStatusRule: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('zvw_verzekerde_status_rule');
      }
    },
    loadStandaardpremieCalculationRule: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('standaardpremie_calculation_rule');
      }
    },
    loadPenitentiaireBeginselenwetRule: function () {
      if (
        typeof loadExampleRule === 'function' &&
        currentWorkspaceType === 'rules'
      ) {
        loadExampleRule('penitentiaire_beginselenwet_rule');
      }
    },
  };

  const objectModelCallbacks = {
    loadFlightObjectModelExample: function () {
      if (
        typeof loadExampleObjectModel === 'function' &&
        currentWorkspaceType === 'objectModel'
      ) {
        loadExampleObjectModel('flight_object_model_example');
      }
    },
    loadZorgtoeslagObjectModelExample: function () {
      if (
        typeof loadExampleObjectModel === 'function' &&
        currentWorkspaceType === 'objectModel'
      ) {
        loadExampleObjectModel('zorgtoeslag_object_model_example');
      }
    },
  };

  // Registreer alle callbacks voor regels
  for (const key in ruleCallbacks) {
    workspaceRules.registerButtonCallback(key, ruleCallbacks[key]);
  }

  // Registreer alle callbacks voor objectmodellen
  for (const key in objectModelCallbacks) {
    workspaceObjectModel.registerButtonCallback(key, objectModelCallbacks[key]);
  }

  // Sla de functies op voor gebruik buiten deze scope
  window.loadFlightObjectModelExample =
    objectModelCallbacks.loadFlightObjectModelExample;
}

// Initialisatie bij het laden van de pagina
window.addEventListener('load', function () {
  // Registreer button callbacks
  registerButtonCallbacks();

  // Setup rule reference click handlers
  setupRuleReferenceClickHandlers();

  // Initialiseer actieve werkruimte
  showRulesWorkspace();

  // Genereer initiële code
  generateCode();

  // Maak een voorbeeld objectmodel aan
  createSampleObjectModel();
});
