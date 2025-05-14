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
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  trashcan: true
});

let workspaceObjectModel = Blockly.inject('blocklyDivObjectModel', {
  toolbox: document.getElementById('toolboxObjectModel'),
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  trashcan: true
});

// Referenties opslaan
window.workspaceRules = workspaceRules;
window.workspaceObjectModel = workspaceObjectModel;

// Huidige actieve werkruimte bijhouden
let currentWorkspace = workspaceRules;
let currentWorkspaceType = 'rules';

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
      document.getElementById('outputRules').textContent = 'Fout bij het genereren van regeltekst: ' + error.message;
    } else {
      document.getElementById('outputObjectModel').textContent = 'Fout bij het genereren van objectmodel: ' + error.message;
    }
  }
}

// Luisteraars toevoegen voor veranderingen in de werkruimtes
workspaceRules.addChangeListener(function(event) {
  if (event.type === Blockly.Events.BLOCK_CHANGE || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE) {
    // Debounce de generatie
    clearTimeout(workspaceRules.ruleGenTimeout);
    workspaceRules.ruleGenTimeout = setTimeout(function() {
      if (currentWorkspaceType === 'rules') {
        generateCode();
      }
    }, 300);
  }
});

workspaceObjectModel.addChangeListener(function(event) {
  if (event.type === Blockly.Events.BLOCK_CHANGE || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE) {
    // Debounce de generatie
    clearTimeout(workspaceObjectModel.modelGenTimeout);
    workspaceObjectModel.modelGenTimeout = setTimeout(function() {
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
  setTimeout(function() {
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
  setTimeout(function() {
    Blockly.svgResize(workspaceObjectModel);
  }, 10);
  
  // Genereer code voor deze werkruimte
  generateCode();
}

// Tab-knoppen event listeners toevoegen
document.getElementById('rulesTab').addEventListener('click', showRulesWorkspace);
document.getElementById('objectModelTab').addEventListener('click', showObjectModelWorkspace);

// Functie om een werkruimte op te slaan
function saveWorkspace() {
  try {
    let xmlText, fileName;
    
    if (currentWorkspaceType === 'rules') {
      const xml = Blockly.Xml.workspaceToDom(workspaceRules);
      xmlText = Blockly.Xml.domToText(xml);
      fileName = 'regel.xml';
    } else {
      const xml = Blockly.Xml.workspaceToDom(workspaceObjectModel);
      xmlText = Blockly.Xml.domToText(xml);
      fileName = 'objectmodel.xml';
    }
    
    // Maak een blob en downloadlink
    const blob = new Blob([xmlText], {type: 'text/xml'});
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  } catch (error) {
    console.error('Fout bij het opslaan van de werkruimte:', error);
    alert('Fout bij het opslaan van de werkruimte: ' + error.message);
  }
}

// Functie om een werkruimte te laden
function loadWorkspace() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const xml = Blockly.Xml.textToDom(e.target.result);
        
        // Controleer welke werkruimte actief is en laad daarin
        if (currentWorkspaceType === 'rules') {
          workspaceRules.clear();
          Blockly.Xml.domToWorkspace(xml, workspaceRules);
        } else {
          workspaceObjectModel.clear();
          Blockly.Xml.domToWorkspace(xml, workspaceObjectModel);
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

// Event listeners voor knoppen
document.getElementById('generateButton').addEventListener('click', generateCode);
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
    loadDistanceInitExample: function() {
      if (typeof loadExampleRule === 'function' && currentWorkspaceType === 'rules') {
        loadExampleRule('distance_init_example');
      }
    },
    loadTaxCalculationExample: function() {
      if (typeof loadExampleRule === 'function' && currentWorkspaceType === 'rules') {
        loadExampleRule('tax_calculation_example');
      }
    },
    loadComplianceRuleExample: function() {
      if (typeof loadExampleRule === 'function' && currentWorkspaceType === 'rules') {
        loadExampleRule('compliance_rule_example');
      }
    }
  };
  
  const objectModelCallbacks = {
    loadFlightObjectModelExample: function() {
      if (typeof loadExampleObjectModel === 'function' && currentWorkspaceType === 'objectModel') {
        loadExampleObjectModel('flight_object_model_example');
      }
    }
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
  window.loadFlightObjectModelExample = objectModelCallbacks.loadFlightObjectModelExample;
}

// Initialisatie bij het laden van de pagina
window.addEventListener('load', function() {
  // Registreer button callbacks
  registerButtonCallbacks();
  
  // Initialiseer actieve werkruimte
  showRulesWorkspace();
  
  // Genereer initiële code
  generateCode();
  
  // Maak een voorbeeld objectmodel aan
  createSampleObjectModel();
});
