/**
 * Voorbeeld objectmodellen voor de Blockly Object Model Editor
 * Dit bestand bevat voorgedefinieerde objectmodellen die in de editor geladen kunnen worden
 */

// Voorbeeld objectmodel definities in JSON formaat voor moderne Blockly
const exampleObjectModels = {
  // Eenvoudig vlucht objectmodel voorbeeld
  "flight_object_model_example": {
    "blocks": {
      "blocks": [
        {
          "type": "object_model",
          "id": "modelVlucht",
          "x": 20,
          "y": 20,
          "fields": {
            "MODEL_NAME": "Vlucht"
          }
        }
      ]
    }
  }
};

// Functie om een voorbeeld objectmodel te laden
function loadExampleObjectModel(modelName) {
  if (exampleObjectModels[modelName]) {
    const exampleData = exampleObjectModels[modelName];
    
    try {
      // Get the object model workspace
      const workspace = window.workspaceObjectModel;
      if (!workspace) {
        console.error('Object model workspace not available');
        return;
      }
      
      // Clear workspace and load using modern serialization
      workspace.clear();
      if (Blockly.serialization && Blockly.serialization.workspaces) {
        Blockly.serialization.workspaces.load(exampleData, workspace);
      } else {
        console.error('Blockly serialization not available');
        alert('This version of Blockly does not support loading example object models');
        return;
      }
      
      // Generate object model text
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById('outputObjectModel').textContent = code;
      
      console.log('Successfully loaded example object model:', modelName);
    } catch (err) {
      console.error('Fout bij het laden van het voorbeeld objectmodel:', err);
      alert('Fout bij het laden van het voorbeeld objectmodel: ' + err.message);
    }
  } else {
    console.error('Example object model not found:', modelName);
  }
}

// Export the example loading function for use by main.js
window.loadExampleObjectModel = loadExampleObjectModel;
