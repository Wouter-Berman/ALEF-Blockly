/**
 * Example rules for the Blockly Rule Editor with action blocks
 * This file contains predefined rules that can be loaded into the editor
 */

// Example rule definitions in XML format
const exampleRules = {
  // Rule: afstand tot bestemming 01 (using assignment action)
  "distance_init_example": `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleDistanceInit" x="20" y="20">
        <field name="RULE_NAME">afstand tot bestemming 01</field>
        <field name="RULE_ID">distance-init-01</field>
        <field name="VALID_FROM">2018</field>
        <field name="VALID_UNTIL"></field>
        <value name="ACTION">
          <block type="assignment_action" id="actionDistanceInit">
            <value name="TARGET">
              <block type="fact_reference" id="targetDistance">
                <field name="OBJECT_TYPE">VLUCHT</field>
                <value name="ATTRIBUTE">
                  <block type="attribute" id="attrDistance">
                    <field name="ATTRIBUTE_NAME">AFSTAND_TOT_BESTEMMING</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="SOURCE">
              <block type="literal" id="literalZero">
                <field name="VALUE">0</field>
                <field name="UNIT">KM</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </xml>
  `,
  
  // Rule: belasting op basis van afstand 02 (using assignment action with complex expression)
  "tax_calculation_example": `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleTaxCalc" x="20" y="20">
        <field name="RULE_NAME">belasting op basis van afstand 02</field>
        <field name="RULE_ID">distance-tax-02</field>
        <field name="VALID_FROM">2018</field>
        <field name="VALID_UNTIL"></field>
        <value name="ACTION">
          <block type="assignment_action" id="actionTaxCalc">
            <value name="TARGET">
              <block type="fact_reference" id="targetTax">
                <field name="OBJECT_TYPE">NATUURLIJK_PERSOON</field>
                <value name="ATTRIBUTE">
                  <block type="attribute" id="attrTax">
                    <field name="ATTRIBUTE_NAME">BELASTING_OP_BASIS_VAN_AFSTAND</field>
                  </block>
                </value>
                <statement name="ROLES">
                  <block type="role" id="roleLowTaxRate">
                    <field name="ROLE_NAME">PASSAGIER</field>
                  </block>
                </statement>
              </block>
            </value>
            <value name="SOURCE">
              <block type="expression" id="exprCalcTax">
                <field name="FUNCTION_NAME">CALCULATE_AS</field>
                <statement name="PARAMETERS">
                  <block type="math_operation" id="mathSubtract">
                    <field name="OPERATOR">MINUS</field>
                    <value name="LEFT">
                      <block type="parameter_reference" id="paramBasicRate">
                        <field name="PARAMETER_NAME">LAGE_BASISTARIEF_EERSTE_SCHIJF</field>
                      </block>
                    </value>
                    <value name="RIGHT">
                      <block type="math_operation" id="mathMultiply">
                        <field name="OPERATOR">MULTIPLIED BY</field>
                        <value name="LEFT">
                          <block type="parameter_reference" id="paramReduction">
                            <field name="PARAMETER_NAME">LAGE_TARIEF_VERMINDERING_EERSTE_SCHIJF</field>
                          </block>
                        </value>
                        <value name="RIGHT">
                          <block type="fact_reference" id="factDistance">
                            <field name="OBJECT_TYPE">VLUCHT</field>
                            <value name="ATTRIBUTE">
                              <block type="attribute" id="attrTripDistance">
                                <field name="ATTRIBUTE_NAME">AFSTAND_TOT_BESTEMMING</field>
                              </block>
                            </value>
                            <statement name="ROLES">
                              <block type="role" id="roleTrip">
                                <field name="ROLE_NAME">REIS</field>
                              </block>
                            </statement>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </value>
          </block>
        </value>
        <statement name="CONDITIONS">
          <block type="complex_condition" id="complexCond">
            <field name="MULTIPLICITY">ALL</field>
            <statement name="CONDITIONS">
              <block type="simple_condition" id="condTaxed">
                <value name="LEFT">
                  <block type="fact_reference" id="factTaxedTrip">
                    <field name="OBJECT_TYPE">VLUCHT</field>
                    <value name="ATTRIBUTE">
                      <block type="characteristic" id="charTaxed">
                        <field name="CHARACTERISTIC_NAME">BELASTE_REIS</field>
                      </block>
                    </value>
                    <statement name="ROLES">
                      <block type="role" id="roleTripTaxed">
                        <field name="ROLE_NAME">REIS</field>
                      </block>
                    </statement>
                  </block>
                </value>
                <field name="OPERATOR">IS EQUAL TO</field>
                <value name="RIGHT">
                  <block type="boolean_literal" id="boolTrue1">
                    <field name="VALUE">TRUE</field>
                  </block>
                </value>
                <next>
                  <block type="simple_condition" id="condRoundTrip">
                    <value name="LEFT">
                      <block type="fact_reference" id="factRoundTrip">
                        <field name="OBJECT_TYPE">VLUCHT</field>
                        <value name="ATTRIBUTE">
                          <block type="characteristic" id="charRoundTrip">
                            <field name="CHARACTERISTIC_NAME">RONDVLUCHT</field>
                          </block>
                        </value>
                        <statement name="ROLES">
                          <block type="role" id="roleTripRound">
                            <field name="ROLE_NAME">REIS</field>
                          </block>
                        </statement>
                      </block>
                    </value>
                    <field name="OPERATOR">IS NOT EQUAL TO</field>
                    <value name="RIGHT">
                      <block type="boolean_literal" id="boolTrue2">
                        <field name="VALUE">TRUE</field>
                      </block>
                    </value>
                    <next>
                      <block type="simple_condition" id="condDistanceGt0">
                        <value name="LEFT">
                          <block type="fact_reference" id="factDistanceGt0">
                            <field name="OBJECT_TYPE">VLUCHT</field>
                            <value name="ATTRIBUTE">
                              <block type="attribute" id="attrDistanceGt0">
                                <field name="ATTRIBUTE_NAME">AFSTAND_TOT_BESTEMMING</field>
                              </block>
                            </value>
                            <statement name="ROLES">
                              <block type="role" id="roleTripDistGt0">
                                <field name="ROLE_NAME">REIS</field>
                              </block>
                            </statement>
                          </block>
                        </value>
                        <field name="OPERATOR">IS GREATER THAN</field>
                        <value name="RIGHT">
                          <block type="literal" id="literalZeroKm">
                            <field name="VALUE">0</field>
                            <field name="UNIT">KM</field>
                          </block>
                        </value>
                        <next>
                          <block type="simple_condition" id="condDistanceLte">
                            <value name="LEFT">
                              <block type="fact_reference" id="factDistanceLte">
                                <field name="OBJECT_TYPE">VLUCHT</field>
                                <value name="ATTRIBUTE">
                                  <block type="attribute" id="attrDistanceLte">
                                    <field name="ATTRIBUTE_NAME">AFSTAND_TOT_BESTEMMING</field>
                                  </block>
                                </value>
                                <statement name="ROLES">
                                  <block type="role" id="roleTripDistLte">
                                    <field name="ROLE_NAME">REIS</field>
                                  </block>
                                </statement>
                              </block>
                            </value>
                            <field name="OPERATOR">IS LESS THAN OR EQUAL TO</field>
                            <value name="RIGHT">
                              <block type="parameter_reference" id="paramUpperLimit">
                                <field name="PARAMETER_NAME">BOVENGRENS_AFSTAND_EERSTE_SCHIJF</field>
                              </block>
                            </value>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </xml>
  `,
  
  // Rule: te betalen belasting 01 (using compliance action)
  "compliance_rule_example": `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleCompliance" x="20" y="20">
        <field name="RULE_NAME">te betalen belasting 01</field>
        <field name="RULE_ID">tax-payment-01</field>
        <field name="VALID_FROM">2018</field>
        <field name="VALID_UNTIL"></field>
        <value name="ACTION">
          <block type="compliance_action" id="actionCompliance">
            <value name="TARGET">
              <block type="fact_reference" id="targetPayableTax">
                <field name="OBJECT_TYPE">NATUURLIJK_PERSOON</field>
                <value name="ATTRIBUTE">
                  <block type="attribute" id="attrPayableTax">
                    <field name="ATTRIBUTE_NAME">TE_BETALEN_BELASTING</field>
                  </block>
                </value>
              </block>
            </value>
            <field name="COMPARISON">GREATER THAN OR EQUAL TO</field>
            <value name="SOURCE">
              <block type="literal" id="literalZeroEur">
                <field name="VALUE">0</field>
                <field name="UNIT">EUR</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="CONDITIONS">
          <block type="complex_condition" id="complexCondAny">
            <field name="MULTIPLICITY">ANY</field>
            <statement name="CONDITIONS">
              <block type="simple_condition" id="condClimateNeutral">
                <value name="LEFT">
                  <block type="fact_reference" id="factClimateNeutral">
                    <field name="OBJECT_TYPE">VLUCHT</field>
                    <value name="ATTRIBUTE">
                      <block type="characteristic" id="charClimateNeutral">
                        <field name="CHARACTERISTIC_NAME">KLIMAATNEUTRAAL</field>
                      </block>
                    </value>
                    <statement name="ROLES">
                      <block type="role" id="roleTripClimate">
                        <field name="ROLE_NAME">REIS</field>
                      </block>
                    </statement>
                  </block>
                </value>
                <field name="OPERATOR">IS EQUAL TO</field>
                <value name="RIGHT">
                  <block type="boolean_literal" id="boolTrueClimate">
                    <field name="VALUE">TRUE</field>
                  </block>
                </value>
                <next>
                  <block type="simple_condition" id="condDiscount">
                    <value name="LEFT">
                      <block type="fact_reference" id="factDiscount">
                        <field name="OBJECT_TYPE">NATUURLIJK_PERSOON</field>
                        <value name="ATTRIBUTE">
                          <block type="characteristic" id="charDiscount">
                            <field name="CHARACTERISTIC_NAME">RECHT_OP_DUURZAAMHEIDSKORTING</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <field name="OPERATOR">IS EQUAL TO</field>
                    <value name="RIGHT">
                      <block type="boolean_literal" id="boolTrueDiscount">
                        <field name="VALUE">TRUE</field>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </xml>
  `
};

// Functie om een specifiek voorbeeld te laden
function loadExampleRule(ruleName) {
  if (exampleRules[ruleName]) {
    const xml = exampleRules[ruleName];
    
    try {
      // Try modern serialization approach first
      if (Blockly.serialization && Blockly.serialization.workspaces) {
        const dom = new DOMParser().parseFromString(xml, 'text/xml');
        Blockly.getMainWorkspace().clear();
        Blockly.serialization.workspaces.load(dom.documentElement, Blockly.getMainWorkspace());
      }
      // Fall back to older XML approach
      else if (Blockly.Xml) {
        const xmlDom = Blockly.Xml.textToDom(xml);
        Blockly.getMainWorkspace().clear();
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.getMainWorkspace());
      }
      else {
        console.error('Unable to load example rule - Blockly serialization methods not available');
        alert('This version of Blockly does not support loading example rules');
        return;
      }
      
      // Generate rule text
      const code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
      document.getElementById('output').textContent = code;
    } catch (err) {
      console.error('Error loading example rule:', err);
      alert('Error loading example rule: ' + err.message);
    }
  }
}

// Registreer callbacks voor de toolbox buttons
function registerButtonCallbacks(workspace) {
  const callbacks = {
    loadDistanceInitExample: function() {
      loadExampleRule('distance_init_example');
    },
    loadTaxCalculationExample: function() {
      loadExampleRule('tax_calculation_example');
    },
    loadComplianceRuleExample: function() {
      loadExampleRule('compliance_rule_example');
    }
  };
  
  // Registreer alle callbacks
  for (const key in callbacks) {
    workspace.registerButtonCallback(key, callbacks[key]);
  }
}

// Initialiseer de voorbeeld buttons wanneer de pagina is geladen
window.addEventListener('load', function() {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    registerButtonCallbacks(workspace);
  }
});
