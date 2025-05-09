/**
 * Main JavaScript file for the Blockly Rule Editor
 * Updated version to support action blocks
 */

// Initialize the Blockly workspace
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
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

// Function to generate rule text from blocks
function generateRuleText() {
  try {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('output').textContent = code;
  } catch (error) {
    console.error('Error generating rule text:', error);
    document.getElementById('output').textContent = 'Error generating rule text: ' + error.message;
  }
}

// Add a listener to update the rule text when blocks change
workspace.addChangeListener(function(event) {
  if (event.type === Blockly.Events.BLOCK_CHANGE || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE) {
    // Debounce the generation
    clearTimeout(workspace.ruleGenTimeout);
    workspace.ruleGenTimeout = setTimeout(generateRuleText, 300);
  }
});

// Functions to save and load the workspace
function saveWorkspace() {
  try {
    // Use Blockly.serialization for newer versions of Blockly
    if (Blockly.serialization && Blockly.serialization.workspaces) {
      const state = Blockly.serialization.workspaces.save(workspace);
      const jsonStr = JSON.stringify(state, null, 2);
      
      // Create a blob and download link
      const blob = new Blob([jsonStr], {type: 'application/json'});
      const a = document.createElement('a');
      a.download = 'rule.json';
      a.href = URL.createObjectURL(blob);
      a.click();
    } 
    // Fallback for older versions
    else if (Blockly.Xml) {
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToText(xml);
      
      // Create a blob and download link
      const blob = new Blob([xmlText], {type: 'text/xml'});
      const a = document.createElement('a');
      a.download = 'rule.xml';
      a.href = URL.createObjectURL(blob);
      a.click();
    }
    else {
      alert('Saving is not supported in this version of Blockly');
    }
  } catch (error) {
    console.error('Error saving workspace:', error);
    alert('Error saving workspace: ' + error.message);
  }
}

function loadWorkspace() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml,.json';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        // Try to parse as JSON (for newer Blockly versions)
        if (file.name.endsWith('.json') && Blockly.serialization && Blockly.serialization.workspaces) {
          const state = JSON.parse(e.target.result);
          workspace.clear();
          Blockly.serialization.workspaces.load(state, workspace);
        }
        // Try to parse as XML (for older Blockly versions)
        else if (file.name.endsWith('.xml') && Blockly.Xml) {
          const xml = Blockly.Xml.textToDom(e.target.result);
          workspace.clear();
          Blockly.Xml.domToWorkspace(xml, workspace);
        }
        else {
          alert('Unsupported file format or Blockly version');
        }
        generateRuleText();
      } catch (err) {
        alert('Error loading file: ' + err.message);
        console.error(err);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

// Event listeners for buttons
document.getElementById('generateButton').addEventListener('click', generateRuleText);
document.getElementById('saveButton').addEventListener('click', saveWorkspace);
document.getElementById('loadButton').addEventListener('click', loadWorkspace);

// Create a sample rule on startup
function createSampleRule() {
  // Check if workspace is empty
  if (workspace.getAllBlocks(false).length === 0) {
    try {
      // Load the distance initialization example by default
      if (typeof loadExampleRule === 'function') {
        loadExampleRule('distance_init_example');
      } else {
        console.warn('loadExampleRule function not available');
      }
    } catch (error) {
      console.error('Error loading sample rule:', error);
    }
  }
}

// Initialize with a sample rule and set up tool callbacks
window.addEventListener('load', function() {
  // Register button callbacks if the function exists
  if (typeof registerButtonCallbacks === 'function') {
    registerButtonCallbacks(workspace);
  }
  
  // Create sample rule
  createSampleRule();
  
  // Generate initial rule text
  generateRuleText();
});

// Function to test block generation - useful for debugging
function testBlockGeneration() {
  const topBlocks = workspace.getTopBlocks(false);
  console.log('Top blocks in workspace:', topBlocks);
  
  if (topBlocks.length > 0) {
    try {
      topBlocks.forEach(block => {
        console.log('Block type:', block.type);
        if (Blockly.JavaScript[block.type]) {
          console.log('Generator exists for', block.type);
        } else {
          console.warn('No generator found for', block.type);
        }
      });
    } catch (error) {
      console.error('Error during block analysis:', error);
    }
  } else {
    console.log('No blocks in workspace');
  }
}

// Add to window for easy debugging
window.testBlockGeneration = testBlockGeneration;
