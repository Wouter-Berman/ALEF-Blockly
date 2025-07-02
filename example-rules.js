/**
 * Example rules for the Blockly Rule Editor with action blocks
 * This file contains predefined rules that can be loaded into the editor
 */

// Example rule definitions in XML format (compatible with all Blockly versions)
const exampleRules = {
  // Rule: afstand tot bestemming 01 (using assignment action)
  distance_init_example: `
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
  tax_calculation_example: `
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
                <field name="OPERATOR">EQUALS</field>
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
                    <field name="OPERATOR">NOT_EQUALS</field>
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
                        <field name="OPERATOR">GREATER_THAN</field>
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
                            <field name="OPERATOR">LESS_THAN_EQUALS</field>
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
  compliance_rule_example: `
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
                <field name="OPERATOR">EQUALS</field>
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
                    <field name="OPERATOR">EQUALS</field>
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
  `,

  // Officiële Zorgtoeslagwet 2025: volledige zorgtoeslag hoogte berekening (exact 1-op-1 vertaling)
  zorgtoeslag_official_complete_rule_example: `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleOfficialCompleteCalc" x="20" y="20">
        <field name="RULE_NAME">zorgtoeslag is_verzekerde en hoogte_toeslag volgens Zorgtoeslagwet 2025</field>
        <field name="RULE_ID">zorgtoeslag-volledig-2025</field>
        <field name="VALID_FROM">2025-01-01</field>
        <field name="VALID_UNTIL"></field>
        <statement name="ACTIONS">
          <block type="assignment_action" id="actionIsVerzekerde">
            <value name="TARGET">
              <block type="fact_reference" id="targetIsVerzekerde">
                <field name="OBJECT_TYPE">BURGER</field>
                <value name="ATTRIBUTE">
                  <block type="characteristic" id="charIsVerzekerde">
                    <field name="CHARACTERISTIC_NAME">VERZEKERDE_ZORGTOESLAG</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="SOURCE">
              <block type="rule_output_reference" id="outputZVWVerzekerde">
                <field name="RULE_ID">zvw-verzekerde-01</field>
                <field name="OUTPUT_NAME">is_verzekerde_volgens_zvw</field>
              </block>
            </value>
            <next>
              <block type="assignment_action" id="actionHoogteToeslag">
                <value name="TARGET">
                  <block type="fact_reference" id="targetHoogteToeslagComplete">
                    <field name="OBJECT_TYPE">ZORGTOESLAG</field>
                    <value name="ATTRIBUTE">
                      <block type="attribute" id="attrHoogteToeslagComplete">
                        <field name="ATTRIBUTE_NAME">HOOGTE_TOESLAG</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="SOURCE">
                  <block type="if_then_else" id="ifThenElsePartnerCheck">
                    <value name="CONDITION">
                      <block type="fact_reference" id="factHasPartner">
                        <field name="OBJECT_TYPE">BURGER</field>
                        <value name="ATTRIBUTE">
                          <block type="characteristic" id="charHasPartner">
                            <field name="CHARACTERISTIC_NAME">HEEFT_PARTNER</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="THEN_VALUE">
                      <block type="minimum_maximum" id="minMaxPartnerCalc">
                        <field name="FUNCTION">MAX</field>
                        <value name="LEFT">
                          <block type="literal" id="literalZeroPartner">
                            <field name="VALUE">0</field>
                            <field name="UNIT">EUR</field>
                          </block>
                        </value>
                        <value name="RIGHT">
                          <block type="math_operation" id="mathPartnerFormula">
                            <field name="OPERATOR">MINUS</field>
                            <value name="LEFT">
                              <block type="math_operation" id="mathDoubleStandardPremium">
                                <field name="OPERATOR">MULTIPLY</field>
                                <value name="LEFT">
                                  <block type="literal" id="literalTwo">
                                    <field name="VALUE">2</field>
                                    <field name="UNIT">NONE</field>
                                  </block>
                                </value>
                                <value name="RIGHT">
                                  <block type="law_parameter_reference" id="lawParamStandardPremiumPartner">
                                    <field name="LAW_ID">zorgtoeslagwet</field>
                                    <field name="PARAMETER_NAME">STANDAARDPREMIE</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="RIGHT">
                              <block type="math_operation" id="mathPartnerReductionFormula">
                                <field name="OPERATOR">MULTIPLY</field>
                                <value name="LEFT">
                                  <block type="law_parameter_reference" id="lawParamReductionPercPartner">
                                    <field name="LAW_ID">zorgtoeslagwet</field>
                                    <field name="PARAMETER_NAME">REDUCTION_PERCENTAGE</field>
                                  </block>
                                </value>
                                <value name="RIGHT">
                                  <block type="math_operation" id="mathCombinedIncomeAboveThreshold">
                                    <field name="OPERATOR">MINUS</field>
                                    <value name="LEFT">
                                      <block type="math_operation" id="mathCombinedIncome">
                                        <field name="OPERATOR">PLUS</field>
                                        <value name="LEFT">
                                          <block type="fact_reference" id="factIncomePartner">
                                            <field name="OBJECT_TYPE">BURGER</field>
                                            <value name="ATTRIBUTE">
                                              <block type="attribute" id="attrIncomePartner">
                                                <field name="ATTRIBUTE_NAME">INCOME</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <value name="RIGHT">
                                          <block type="fact_reference" id="factPartnerIncome">
                                            <field name="OBJECT_TYPE">BURGER</field>
                                            <value name="ATTRIBUTE">
                                              <block type="attribute" id="attrPartnerIncome">
                                                <field name="ATTRIBUTE_NAME">PARTNER_INCOME</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="RIGHT">
                                      <block type="law_parameter_reference" id="lawParamCombinedThreshold">
                                        <field name="LAW_ID">zorgtoeslagwet</field>
                                        <field name="PARAMETER_NAME">COMBINED_INCOME_THRESHOLD</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="ELSE_VALUE">
                      <block type="minimum_maximum" id="minMaxSingleCalc">
                        <field name="FUNCTION">MAX</field>
                        <value name="LEFT">
                          <block type="literal" id="literalZeroSingle">
                            <field name="VALUE">0</field>
                            <field name="UNIT">EUR</field>
                          </block>
                        </value>
                        <value name="RIGHT">
                          <block type="math_operation" id="mathSingleFormula">
                            <field name="OPERATOR">MINUS</field>
                            <value name="LEFT">
                              <block type="law_parameter_reference" id="lawParamStandardPremiumSingle">
                                <field name="LAW_ID">zorgtoeslagwet</field>
                                <field name="PARAMETER_NAME">STANDAARDPREMIE</field>
                              </block>
                            </value>
                            <value name="RIGHT">
                              <block type="math_operation" id="mathSingleReductionFormula">
                                <field name="OPERATOR">MULTIPLY</field>
                                <value name="LEFT">
                                  <block type="law_parameter_reference" id="lawParamReductionPercSingle">
                                    <field name="LAW_ID">zorgtoeslagwet</field>
                                    <field name="PARAMETER_NAME">REDUCTION_PERCENTAGE</field>
                                  </block>
                                </value>
                                <value name="RIGHT">
                                  <block type="math_operation" id="mathSingleIncomeAboveThreshold">
                                    <field name="OPERATOR">MINUS</field>
                                    <value name="LEFT">
                                      <block type="fact_reference" id="factIncomeSingle">
                                        <field name="OBJECT_TYPE">BURGER</field>
                                        <value name="ATTRIBUTE">
                                          <block type="attribute" id="attrIncomeSingle">
                                            <field name="ATTRIBUTE_NAME">INCOME</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="RIGHT">
                                      <block type="law_parameter_reference" id="lawParamIncomeThresholdSingle">
                                        <field name="LAW_ID">zorgtoeslagwet</field>
                                        <field name="PARAMETER_NAME">INCOME_THRESHOLD_SINGLE</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <statement name="CONDITIONS">
          <block type="complex_condition" id="complexCondSimpleEligibility">
            <field name="MULTIPLICITY">ALL</field>
            <statement name="CONDITIONS">
              <block type="simple_condition" id="condAgeMinimum">
                <value name="LEFT">
                  <block type="fact_reference" id="factAge">
                    <field name="OBJECT_TYPE">BURGER</field>
                    <value name="ATTRIBUTE">
                      <block type="attribute" id="attrAge">
                        <field name="ATTRIBUTE_NAME">LEEFTIJD</field>
                      </block>
                    </value>
                  </block>
                </value>
                <field name="OPERATOR">GREATER_THAN_EQUALS</field>
                <value name="RIGHT">
                  <block type="law_parameter_reference" id="lawParamMinimumAge">
                    <field name="LAW_ID">zorgtoeslagwet</field>
                    <field name="PARAMETER_NAME">MINIMUM_AGE</field>
                  </block>
                </value>
                <next>
                  <block type="simple_condition" id="condIsVerzekerde">
                    <value name="LEFT">
                      <block type="rule_output_reference" id="outputZVWIsVerzekerde">
                        <field name="RULE_ID">zvw-verzekerde-01</field>
                        <field name="OUTPUT_NAME">is_verzekerde_volgens_zvw</field>
                      </block>
                    </value>
                    <field name="OPERATOR">EQUALS</field>
                    <value name="RIGHT">
                      <block type="boolean_literal" id="boolTrueVerzekerde">
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
  `,

  // ZVW Verzekerde Status regel (aparte regel voor navigation)
  zvw_verzekerde_status_rule: `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleZVWVerzekerde" x="20" y="20">
        <field name="RULE_NAME">ZVW verzekerde status bepaling</field>
        <field name="RULE_ID">zvw-verzekerde-01</field>
        <field name="VALID_FROM">2025-01-01</field>
        <field name="VALID_UNTIL"></field>
        <statement name="ACTIONS">
          <block type="assignment_action" id="actionZVWCheck">
            <value name="TARGET">
              <block type="fact_reference" id="targetZVWStatus">
                <field name="OBJECT_TYPE">BURGER</field>
                <value name="ATTRIBUTE">
                  <block type="characteristic" id="charZVWStatus">
                    <field name="CHARACTERISTIC_NAME">VERZEKERDE_VOLGENS_ZVW</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="SOURCE">
              <block type="boolean_literal" id="boolTrueZVW">
                <field name="VALUE">TRUE</field>
              </block>
            </value>
          </block>
        </statement>
        <statement name="CONDITIONS">
          <block type="complex_condition" id="complexCondZVW">
            <field name="MULTIPLICITY">ALL</field>
            <statement name="CONDITIONS">
              <block type="simple_condition" id="condPolisNummer">
                <value name="LEFT">
                  <block type="fact_reference" id="factPolisNummer">
                    <field name="OBJECT_TYPE">BURGER</field>
                    <value name="ATTRIBUTE">
                      <block type="attribute" id="attrPolisNummer">
                        <field name="ATTRIBUTE_NAME">POLISNUMMER_ZORGVERZEKERING</field>
                      </block>
                    </value>
                  </block>
                </value>
                <field name="OPERATOR">NOT_EQUALS</field>
                <value name="RIGHT">
                  <block type="literal" id="literalEmpty">
                    <field name="VALUE"></field>
                    <field name="UNIT">NONE</field>
                  </block>
                </value>
                <next>
                  <block type="simple_condition" id="condWoonlandNL">
                    <value name="LEFT">
                      <block type="fact_reference" id="factWoonland">
                        <field name="OBJECT_TYPE">BURGER</field>
                        <value name="ATTRIBUTE">
                          <block type="attribute" id="attrWoonland">
                            <field name="ATTRIBUTE_NAME">WOONLAND</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <field name="OPERATOR">EQUALS</field>
                    <value name="RIGHT">
                      <block type="literal" id="literalNL">
                        <field name="VALUE">NL</field>
                        <field name="UNIT">NONE</field>
                      </block>
                    </value>
                    <next>
                      <block type="simple_condition" id="condGeenGedetineerde">
                        <value name="LEFT">
                          <block type="rule_output_reference" id="outputPenitentiaireIsGedetineerde">
                            <field name="RULE_ID">penitentiaire-beginselenwet-01</field>
                            <field name="OUTPUT_NAME">is_gedetineerde</field>
                          </block>
                        </value>
                        <field name="OPERATOR">EQUALS</field>
                        <value name="RIGHT">
                          <block type="boolean_literal" id="boolFalseGedetineerde">
                            <field name="VALUE">FALSE</field>
                          </block>
                        </value>
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

  // Standaardpremie berekening regel
  standaardpremie_calculation_rule: `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="ruleStandaardpremie" x="20" y="20">
        <field name="RULE_NAME">Standaardpremie berekening</field>
        <field name="RULE_ID">standaardpremie-01</field>
        <field name="VALID_FROM">2025-01-01</field>
        <field name="VALID_UNTIL"></field>
        <statement name="ACTIONS">
          <block type="assignment_action" id="actionStandaardpremie">
            <value name="TARGET">
              <block type="fact_reference" id="targetStandaardpremie">
                <field name="OBJECT_TYPE">BURGER</field>
                <value name="ATTRIBUTE">
                  <block type="attribute" id="attrStandaardpremie">
                    <field name="ATTRIBUTE_NAME">STANDAARDPREMIE</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="SOURCE">
              <block type="literal" id="literalStandaardpremie">
                <field name="VALUE">1450</field>
                <field name="UNIT">EUR</field>
              </block>
            </value>
          </block>
        </statement>
        <statement name="CONDITIONS">
          <block type="simple_condition" id="condVerzekerdZVW">
            <value name="LEFT">
              <block type="rule_reference" id="refZVWVerzekerde">
                <field name="RULE_ID">zvw-verzekerde-01</field>
              </block>
            </value>
            <field name="OPERATOR">EQUALS</field>
            <value name="RIGHT">
              <block type="boolean_literal" id="boolTrueStandaard">
                <field name="VALUE">TRUE</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </xml>
  `,

  // Penitentiaire Beginselenwet regel
  penitentiaire_beginselenwet_rule: `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="business_rule" id="rulePenitentiaireBeginselenwet" x="20" y="20">
        <field name="RULE_NAME">Penitentiaire Beginselenwet - zorgverzekering status</field>
        <field name="RULE_ID">penitentiaire-beginselenwet-01</field>
        <field name="VALID_FROM">2025-01-01</field>
        <field name="VALID_UNTIL"></field>
        <statement name="ACTIONS">
          <block type="assignment_action" id="actionIsGedetineerde">
            <value name="TARGET">
              <block type="fact_reference" id="targetIsGedetineerde">
                <field name="OBJECT_TYPE">BURGER</field>
                <value name="ATTRIBUTE">
                  <block type="characteristic" id="charIsGedetineerde">
                    <field name="CHARACTERISTIC_NAME">IS_GEDETINEERDE</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="SOURCE">
              <block type="boolean_literal" id="boolTrueGedetineerde">
                <field name="VALUE">TRUE</field>
              </block>
            </value>
            <next>
              <block type="assignment_action" id="actionZorgverzekeringPlicht">
                <value name="TARGET">
                  <block type="fact_reference" id="targetZorgverzekeringPlicht">
                    <field name="OBJECT_TYPE">BURGER</field>
                    <value name="ATTRIBUTE">
                      <block type="characteristic" id="charZorgverzekeringPlicht">
                        <field name="CHARACTERISTIC_NAME">HEEFT_ZORGVERZEKERING_PLICHT</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="SOURCE">
                  <block type="boolean_literal" id="boolTrueZorgverzekeringPlicht">
                    <field name="VALUE">TRUE</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <statement name="CONDITIONS">
          <block type="simple_condition" id="condVrijheidsbenemendeMaatregel">
            <value name="LEFT">
              <block type="fact_reference" id="factVrijheidsbenemendeMaatregel">
                <field name="OBJECT_TYPE">BURGER</field>
                <value name="ATTRIBUTE">
                  <block type="characteristic" id="charVrijheidsbenemendeMaatregel">
                    <field name="CHARACTERISTIC_NAME">VRIJHEIDSBENEMENDE_MAATREGEL</field>
                  </block>
                </value>
              </block>
            </value>
            <field name="OPERATOR">EQUALS</field>
            <value name="RIGHT">
              <block type="boolean_literal" id="boolTrueVrijheidsbenemend">
                <field name="VALUE">TRUE</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </xml>
  `,
};

// Functie om een specifiek voorbeeld te laden
function loadExampleRule(ruleName) {
  if (exampleRules[ruleName]) {
    const xml = exampleRules[ruleName];

    try {
      // Get the rules workspace
      const workspace = window.workspaceRules;
      if (!workspace) {
        console.error('Rules workspace not available');
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
        alert('Could not load example rule. Please check console for details.');
        return;
      }

      // Generate rule text
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById('outputRules').textContent = code;

      console.log('Successfully loaded example rule:', ruleName);

      // Add click handlers to all blocks in the loaded rule
      setTimeout(function () {
        if (window.addClickHandlerToBlock) {
          const allBlocks = workspace.getAllBlocks();
          allBlocks.forEach(function (block) {
            window.addClickHandlerToBlock(block);
          });
        }
      }, 200);
    } catch (err) {
      console.error('Error loading example rule:', err);
      alert('Error loading example rule: ' + err.message);
    }
  } else {
    console.error('Example rule not found:', ruleName);
  }
}

// Export the example loading function for use by main.js
window.loadExampleRule = loadExampleRule;
