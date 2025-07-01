/**
 * Voorbeeld objectmodellen voor de Blockly Object Model Editor
 * Dit bestand bevat voorgedefinieerde objectmodellen die in de editor geladen kunnen worden
 */

// Voorbeeld objectmodel definities in XML formaat (compatible with all Blockly versions)
const exampleObjectModels = {
  // Vlucht objectmodel voorbeeld
  "flight_object_model_example": `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="object_model" id="modelVlucht" x="20" y="20">
        <field name="MODEL_NAME">Vlucht</field>
        <statement name="OBJECT_TYPES">
          <block type="object_type" id="objectVlucht">
            <field name="ARTICLE">de</field>
            <field name="OBJECT_NAME">vlucht</field>
            <field name="ANIMATE">FALSE</field>
            <statement name="CHARACTERISTICS">
              <block type="characteristic_def" id="charBelast">
                <field name="CHAR_TYPE">de</field>
                <field name="CHAR_NAME">belaste reis</field>
                <field name="CHAR_SUBTYPE">REGULAR</field>
                <next>
                  <block type="characteristic_def" id="charOnbelast">
                    <field name="CHAR_TYPE">de</field>
                    <field name="CHAR_NAME">onbelaste reis</field>
                    <field name="CHAR_SUBTYPE">REGULAR</field>
                    <next>
                      <block type="characteristic_def" id="charRondvlucht">
                        <field name="CHAR_TYPE">de</field>
                        <field name="CHAR_NAME">rondvlucht</field>
                        <field name="CHAR_SUBTYPE">REGULAR</field>
                        <next>
                          <block type="characteristic_def" id="charNeutraal">
                            <field name="CHAR_TYPE">is</field>
                            <field name="CHAR_NAME">klimaatneutraal</field>
                            <field name="CHAR_SUBTYPE">ADJECTIVE</field>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <statement name="ATTRIBUTES">
              <block type="attribute_def" id="attrVertrek">
                <field name="ARTICLE">de</field>
                <field name="ATTR_NAME">luchthaven van vertrek</field>
                <value name="ATTR_TYPE">
                  <block type="type_definition_ref" id="refLuchthavens">
                    <field name="TYPE_REF">Luchthavens</field>
                  </block>
                </value>
                <next>
                  <block type="attribute_def" id="attrBestemming">
                    <field name="ARTICLE">de</field>
                    <field name="ATTR_NAME">luchthaven van bestemming</field>
                    <value name="ATTR_TYPE">
                      <block type="type_definition_ref" id="refLuchthavens2">
                        <field name="TYPE_REF">Luchthavens</field>
                      </block>
                    </value>
                    <next>
                      <block type="attribute_def" id="attrDatum">
                        <field name="ARTICLE">de</field>
                        <field name="ATTR_NAME">datum van de vlucht</field>
                        <value name="ATTR_TYPE">
                          <block type="data_type" id="dataDatum">
                            <field name="DATA_TYPE">DATE_DAYS</field>
                            <field name="UNIT"></field>
                          </block>
                        </value>
                        <next>
                          <block type="attribute_def" id="attrAfstand">
                            <field name="ARTICLE">de</field>
                            <field name="ATTR_NAME">afstand tot bestemming</field>
                            <value name="ATTR_TYPE">
                              <block type="data_type" id="dataNum">
                                <field name="DATA_TYPE">NUMERIC</field>
                                <value name="NUMBER_SPEC">
                                  <block type="number_specification" id="numSpec">
                                    <field name="SIGN">NONE</field>
                                    <field name="NUMBER_TYPE">geheel getal</field>
                                    <field name="DECIMALS">0</field>
                                  </block>
                                </value>
                                <field name="UNIT">km</field>
                              </block>
                            </value>
                            <next>
                              <block type="attribute_def" id="attrBereikbaar">
                                <field name="ARTICLE">de</field>
                                <field name="ATTR_NAME">bereikbaar per trein</field>
                                <value name="ATTR_TYPE">
                                  <block type="data_type" id="dataBool">
                                    <field name="DATA_TYPE">BOOLEAN</field>
                                    <field name="UNIT"></field>
                                  </block>
                                </value>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="object_type" id="objectPersoon">
                <field name="ARTICLE">de</field>
                <field name="OBJECT_NAME">natuurlijk persoon</field>
                <field name="ANIMATE">TRUE</field>
                <statement name="CHARACTERISTICS">
                  <block type="characteristic_def" id="charLaag">
                    <field name="CHAR_TYPE">de</field>
                    <field name="CHAR_NAME">passagier waarvoor het lage tarief voor belasting op basis van afstand van toepassing is</field>
                    <field name="CHAR_SUBTYPE">REGULAR</field>
                    <next>
                      <block type="characteristic_def" id="charHoog">
                        <field name="CHAR_TYPE">de</field>
                        <field name="CHAR_NAME">passagier waarvoor het hoge tarief voor belasting op basis van afstand van toepassing is</field>
                        <field name="CHAR_SUBTYPE">REGULAR</field>
                        <next>
                          <block type="characteristic_def" id="charKorting">
                            <field name="CHAR_TYPE">de</field>
                            <field name="CHAR_NAME">recht op duurzaamheidskorting</field>
                            <field name="CHAR_SUBTYPE">POSSESSIVE</field>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
                <statement name="ATTRIBUTES">
                  <block type="attribute_def" id="attrLeeftijd">
                    <field name="ARTICLE">de</field>
                    <field name="ATTR_NAME">leeftijd</field>
                    <value name="ATTR_TYPE">
                      <block type="data_type" id="dataLeeftijd">
                        <field name="DATA_TYPE">NUMERIC</field>
                        <value name="NUMBER_SPEC">
                          <block type="number_specification" id="numLeeftijd">
                            <field name="SIGN">NONE</field>
                            <field name="NUMBER_TYPE">geheel getal</field>
                            <field name="DECIMALS">0</field>
                          </block>
                        </value>
                        <field name="UNIT">jr</field>
                      </block>
                    </value>
                    <next>
                      <block type="attribute_def" id="attrBelasting">
                        <field name="ARTICLE">de</field>
                        <field name="ATTR_NAME">te betalen belasting</field>
                        <value name="ATTR_TYPE">
                          <block type="type_definition_ref" id="refBedrag">
                            <field name="TYPE_REF">Bedrag</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <statement name="RELATIONSHIP_TYPES">
          <block type="relationship_type" id="relVluchtPersonen">
            <field name="REL_NAME">Vlucht van natuurlijke personen</field>
            <field name="ROLE1_ARTICLE">de</field>
            <field name="ROLE1_NAME">reis</field>
            <field name="ROLE1_OBJECT">vlucht</field>
            <field name="ROLE1_MULTIPLICITY">ONE</field>
            <field name="ROLE2_ARTICLE">de</field>
            <field name="ROLE2_NAME">passagier</field>
            <field name="ROLE2_OBJECT">natuurlijk persoon</field>
            <field name="ROLE2_MULTIPLICITY">MANY</field>
            <field name="REL_STRING">één reis betreft de verplaatsing van meerdere passagiers</field>
          </block>
        </statement>
        <statement name="TYPE_DEFINITIONS">
          <block type="type_definition" id="typeBedrag">
            <field name="TYPE_NAME">Bedrag</field>
            <value name="DATA_TYPE">
              <block type="data_type" id="dataBedrag">
                <field name="DATA_TYPE">NUMERIC</field>
                <value name="NUMBER_SPEC">
                  <block type="number_specification" id="numBedrag">
                    <field name="SIGN">NONE</field>
                    <field name="NUMBER_TYPE">getal</field>
                    <field name="DECIMALS">2</field>
                  </block>
                </value>
                <field name="UNIT">€</field>
              </block>
            </value>
          </block>
        </statement>
        <statement name="PARAMETERS">
          <block type="parameter" id="paramBovengrens">
            <field name="PARAM_ARTICLE">de</field>
            <field name="PARAM_NAME">BOVENGRENS AFSTAND EERSTE SCHIJF</field>
            <value name="PARAM_TYPE">
              <block type="data_type" id="dataBovengrens">
                <field name="DATA_TYPE">NUMERIC</field>
                <value name="NUMBER_SPEC">
                  <block type="number_specification" id="numBovengrens">
                    <field name="SIGN">NONE</field>
                    <field name="NUMBER_TYPE">geheel getal</field>
                    <field name="DECIMALS">0</field>
                  </block>
                </value>
                <field name="UNIT">km</field>
              </block>
            </value>
            <next>
              <block type="parameter" id="paramKorting">
                <field name="PARAM_ARTICLE">de</field>
                <field name="PARAM_NAME">KORTING VOOR KLIMAATNEUTRALE VLUCHT</field>
                <value name="PARAM_TYPE">
                  <block type="type_definition_ref" id="refBedrag2">
                    <field name="TYPE_REF">Bedrag</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </xml>
  `
};

// Functie om een voorbeeld objectmodel te laden
function loadExampleObjectModel(modelName) {
  if (exampleObjectModels[modelName]) {
    const xml = exampleObjectModels[modelName];
    
    try {
      // Get the object model workspace
      const workspace = window.workspaceObjectModel;
      if (!workspace) {
        console.error('Object model workspace not available');
        return;
      }
      
      // Clear workspace
      workspace.clear();
      
      // Try multiple loading methods for compatibility
      let loaded = false;
      
      // Method 1: Try modern Blockly.utils.xml (newest versions)
      if (Blockly.utils && Blockly.utils.xml && Blockly.utils.xml.textToDom) {
        try {
          const xmlDom = Blockly.utils.xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(xmlDom, workspace);
          loaded = true;
        } catch (e) {
          console.log('Method 1 failed, trying method 2:', e.message);
        }
      }
      
      // Method 2: Try older Blockly.Xml.textToDom
      if (!loaded && Blockly.Xml && Blockly.Xml.textToDom) {
        try {
          const xmlDom = Blockly.Xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(xmlDom, workspace);
          loaded = true;
        } catch (e) {
          console.log('Method 2 failed, trying method 3:', e.message);
        }
      }
      
      // Method 3: Try DOMParser as fallback
      if (!loaded) {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xml, 'text/xml');
          if (xmlDoc.documentElement && !xmlDoc.querySelector('parsererror')) {
            Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);
            loaded = true;
          }
        } catch (e) {
          console.log('Method 3 failed:', e.message);
        }
      }
      
      if (!loaded) {
        console.error('All loading methods failed');
        alert('Could not load example object model. Please check console for details.');
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