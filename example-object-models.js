/**
 * Voorbeeld objectmodellen voor de Blockly Object Model Editor
 * Dit bestand bevat voorgedefinieerde objectmodellen die in de editor geladen kunnen worden
 */

// Voorbeeld objectmodel definities in XML formaat (compatible with all Blockly versions)
const exampleObjectModels = {
  // Vlucht objectmodel voorbeeld
  flight_object_model_example: `
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
  `,

  // Zorgtoeslag objectmodel voorbeeld (volledig inclusief ZVW en andere wettelijke vereisten)
  zorgtoeslag_object_model_example: `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="object_model" id="modelZorgtoeslag" x="20" y="20">
        <field name="MODEL_NAME">Zorgtoeslag Ecosysteem</field>
        <statement name="OBJECT_TYPES">
          <block type="object_type" id="objectBurger">
            <field name="ARTICLE">de</field>
            <field name="OBJECT_NAME">burger</field>
            <field name="ANIMATE">TRUE</field>
            <statement name="CHARACTERISTICS">
              <block type="characteristic_def" id="charIsVerzekerde">
                <field name="CHAR_TYPE">is</field>
                <field name="CHAR_NAME">verzekerde volgens ZVW</field>
                <field name="CHAR_SUBTYPE">ADJECTIVE</field>
                <next>
                  <block type="characteristic_def" id="charHasPartner">
                    <field name="CHAR_TYPE">heeft</field>
                    <field name="CHAR_NAME">partner</field>
                    <field name="CHAR_SUBTYPE">POSSESSIVE</field>
                    <next>
                      <block type="characteristic_def" id="charIsVerzekerdeZorgtoeslag">
                        <field name="CHAR_TYPE">is</field>
                        <field name="CHAR_NAME">verzekerde zorgtoeslag</field>
                        <field name="CHAR_SUBTYPE">ADJECTIVE</field>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <statement name="ATTRIBUTES">
              <block type="attribute_def" id="attrBSN">
                <field name="ARTICLE">het</field>
                <field name="ATTR_NAME">burgerservicenummer</field>
                <value name="ATTR_TYPE">
                  <block type="data_type" id="dataBSN">
                    <field name="DATA_TYPE">NUMERIC</field>
                    <value name="NUMBER_SPEC">
                      <block type="number_specification" id="numBSN">
                        <field name="SIGN">NONE</field>
                        <field name="NUMBER_TYPE">geheel getal</field>
                        <field name="DECIMALS">0</field>
                      </block>
                    </value>
                    <field name="UNIT"></field>
                  </block>
                </value>
                <next>
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
                        <field name="UNIT">jaar</field>
                      </block>
                    </value>
                    <next>
                      <block type="attribute_def" id="attrWoonland">
                        <field name="ARTICLE">het</field>
                        <field name="ATTR_NAME">woonland</field>
                        <value name="ATTR_TYPE">
                          <block type="data_type" id="dataWoonland">
                            <field name="DATA_TYPE">TEXT</field>
                            <field name="UNIT"></field>
                          </block>
                        </value>
                        <next>
                          <block type="attribute_def" id="attrIncome">
                            <field name="ARTICLE">het</field>
                            <field name="ATTR_NAME">income</field>
                            <value name="ATTR_TYPE">
                              <block type="type_definition_ref" id="refBedrag">
                                <field name="TYPE_REF">Bedrag</field>
                              </block>
                            </value>
                            <next>
                              <block type="attribute_def" id="attrNetWorth">
                                <field name="ARTICLE">het</field>
                                <field name="ATTR_NAME">net_worth</field>
                                <value name="ATTR_TYPE">
                                  <block type="type_definition_ref" id="refBedrag2">
                                    <field name="TYPE_REF">Bedrag</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="attribute_def" id="attrCombinedNetWorth">
                                    <field name="ARTICLE">het</field>
                                    <field name="ATTR_NAME">combined_net_worth</field>
                                    <value name="ATTR_TYPE">
                                      <block type="type_definition_ref" id="refBedrag3">
                                        <field name="TYPE_REF">Bedrag</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="attribute_def" id="attrPartnerIncome">
                                        <field name="ARTICLE">het</field>
                                        <field name="ATTR_NAME">partner_income</field>
                                        <value name="ATTR_TYPE">
                                          <block type="type_definition_ref" id="refBedrag4">
                                            <field name="TYPE_REF">Bedrag</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="attribute_def" id="attrStandaardpremie">
                                            <field name="ARTICLE">de</field>
                                            <field name="ATTR_NAME">standaardpremie</field>
                                            <value name="ATTR_TYPE">
                                              <block type="type_definition_ref" id="refBedrag5">
                                                <field name="TYPE_REF">Bedrag</field>
                                              </block>
                                            </value>
                                        <next>
                                          <block type="attribute_def" id="attrPolisNummer">
                                            <field name="ARTICLE">het</field>
                                            <field name="ATTR_NAME">polisnummer zorgverzekering</field>
                                            <value name="ATTR_TYPE">
                                              <block type="data_type" id="dataPolisnummer">
                                                <field name="DATA_TYPE">TEXT</field>
                                                <field name="UNIT"></field>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="attribute_def" id="attrGeboortedatum">
                                                <field name="ARTICLE">de</field>
                                                <field name="ATTR_NAME">geboortedatum</field>
                                                <value name="ATTR_TYPE">
                                                  <block type="data_type" id="dataGeboortedatum">
                                                    <field name="DATA_TYPE">DATE_DAYS</field>
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
              <block type="object_type" id="objectZorgtoeslag">
                <field name="ARTICLE">de</field>
                <field name="OBJECT_NAME">zorgtoeslag</field>
                <field name="ANIMATE">FALSE</field>
                <statement name="CHARACTERISTICS">
                  <block type="characteristic_def" id="charVoorlopig">
                    <field name="CHAR_TYPE">is</field>
                    <field name="CHAR_NAME">voorlopig toegekend</field>
                    <field name="CHAR_SUBTYPE">ADJECTIVE</field>
                    <next>
                      <block type="characteristic_def" id="charDefinitief">
                        <field name="CHAR_TYPE">is</field>
                        <field name="CHAR_NAME">definitief vastgesteld</field>
                        <field name="CHAR_SUBTYPE">ADJECTIVE</field>
                      </block>
                    </next>
                  </block>
                </statement>
                <statement name="ATTRIBUTES">
                  <block type="attribute_def" id="attrHoogteToeslag">
                    <field name="ARTICLE">de</field>
                    <field name="ATTR_NAME">hoogte_toeslag</field>
                    <value name="ATTR_TYPE">
                      <block type="type_definition_ref" id="refBedrag5">
                        <field name="TYPE_REF">Bedrag</field>
                      </block>
                    </value>
                    <next>
                      <block type="attribute_def" id="attrToeslagjaar">
                        <field name="ARTICLE">het</field>
                        <field name="ATTR_NAME">toeslagjaar</field>
                        <value name="ATTR_TYPE">
                          <block type="data_type" id="dataToeslagjaar">
                            <field name="DATA_TYPE">NUMERIC</field>
                            <value name="NUMBER_SPEC">
                              <block type="number_specification" id="numToeslagjaar">
                                <field name="SIGN">NONE</field>
                                <field name="NUMBER_TYPE">geheel getal</field>
                                <field name="DECIMALS">0</field>
                              </block>
                            </value>
                            <field name="UNIT"></field>
                          </block>
                        </value>
                        <next>
                          <block type="attribute_def" id="attrBerekeningsdatum">
                            <field name="ARTICLE">de</field>
                            <field name="ATTR_NAME">datum van berekening</field>
                            <value name="ATTR_TYPE">
                              <block type="data_type" id="dataBerekeningsdatum">
                                <field name="DATA_TYPE">DATE_DAYS</field>
                                <field name="UNIT"></field>
                              </block>
                            </value>
                            <next>
                              <block type="attribute_def" id="attrDrempelbedrag">
                                <field name="ARTICLE">het</field>
                                <field name="ATTR_NAME">drempelbedrag</field>
                                <value name="ATTR_TYPE">
                                  <block type="type_definition_ref" id="refBedrag6">
                                    <field name="TYPE_REF">Bedrag</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="attribute_def" id="attrNorminkomen">
                                    <field name="ARTICLE">het</field>
                                    <field name="ATTR_NAME">norminkomen</field>
                                    <value name="ATTR_TYPE">
                                      <block type="type_definition_ref" id="refBedrag7">
                                        <field name="TYPE_REF">Bedrag</field>
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
                  <block type="object_type" id="objectZorgverzekeraar">
                    <field name="ARTICLE">de</field>
                    <field name="OBJECT_NAME">zorgverzekeraar</field>
                    <field name="ANIMATE">FALSE</field>
                    <statement name="ATTRIBUTES">
                      <block type="attribute_def" id="attrUZOVI">
                        <field name="ARTICLE">de</field>
                        <field name="ATTR_NAME">UZOVI-code</field>
                        <value name="ATTR_TYPE">
                          <block type="data_type" id="dataUZOVI">
                            <field name="DATA_TYPE">NUMERIC</field>
                            <value name="NUMBER_SPEC">
                              <block type="number_specification" id="numUZOVI">
                                <field name="SIGN">NONE</field>
                                <field name="NUMBER_TYPE">geheel getal</field>
                                <field name="DECIMALS">0</field>
                              </block>
                            </value>
                            <field name="UNIT"></field>
                          </block>
                        </value>
                        <next>
                          <block type="attribute_def" id="attrNaamVerzekeraar">
                            <field name="ARTICLE">de</field>
                            <field name="ATTR_NAME">naam</field>
                            <value name="ATTR_TYPE">
                              <block type="data_type" id="dataNaamVerzekeraar">
                                <field name="DATA_TYPE">TEXT</field>
                                <field name="UNIT"></field>
                              </block>
                            </value>
                          </block>
                        </next>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <statement name="RELATIONSHIP_TYPES">
          <block type="relationship_type" id="relBurgerZorgtoeslag">
            <field name="REL_NAME">Zorgtoeslag van burger</field>
            <field name="ROLE1_ARTICLE">de</field>
            <field name="ROLE1_NAME">aanvrager</field>
            <field name="ROLE1_OBJECT">burger</field>
            <field name="ROLE1_MULTIPLICITY">ONE</field>
            <field name="ROLE2_ARTICLE">de</field>
            <field name="ROLE2_NAME">toeslag</field>
            <field name="ROLE2_OBJECT">zorgtoeslag</field>
            <field name="ROLE2_MULTIPLICITY">MANY</field>
            <field name="REL_STRING">één aanvrager kan meerdere toeslagen hebben voor verschillende jaren</field>
            <next>
              <block type="relationship_type" id="relBurgerPartner">
                <field name="REL_NAME">Toeslagpartners</field>
                <field name="ROLE1_ARTICLE">de</field>
                <field name="ROLE1_NAME">hoofdaanvrager</field>
                <field name="ROLE1_OBJECT">burger</field>
                <field name="ROLE1_MULTIPLICITY">ONE</field>
                <field name="ROLE2_ARTICLE">de</field>
                <field name="ROLE2_NAME">toeslagpartner</field>
                <field name="ROLE2_OBJECT">burger</field>
                <field name="ROLE2_MULTIPLICITY">ONE</field>
                <field name="REL_STRING">één burger kan een toeslagpartner hebben</field>
                <next>
                  <block type="relationship_type" id="relBurgerVerzekeraar">
                    <field name="REL_NAME">Verzekering bij verzekeraar</field>
                    <field name="ROLE1_ARTICLE">de</field>
                    <field name="ROLE1_NAME">verzekerde</field>
                    <field name="ROLE1_OBJECT">burger</field>
                    <field name="ROLE1_MULTIPLICITY">MANY</field>
                    <field name="ROLE2_ARTICLE">de</field>
                    <field name="ROLE2_NAME">verzekeraar</field>
                    <field name="ROLE2_OBJECT">zorgverzekeraar</field>
                    <field name="ROLE2_MULTIPLICITY">ONE</field>
                    <field name="REL_STRING">meerdere verzekerden zijn verzekerd bij één verzekeraar</field>
                  </block>
                </next>
              </block>
            </next>
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
          <block type="parameter" id="paramMinLeeftijd">
            <field name="PARAM_ARTICLE">de</field>
            <field name="PARAM_NAME">MINIMUM_AGE</field>
            <value name="PARAM_TYPE">
              <block type="data_type" id="dataMinLeeftijd">
                <field name="DATA_TYPE">NUMERIC</field>
                <value name="NUMBER_SPEC">
                  <block type="number_specification" id="numMinLeeftijd">
                    <field name="SIGN">NONE</field>
                    <field name="NUMBER_TYPE">geheel getal</field>
                    <field name="DECIMALS">0</field>
                  </block>
                </value>
                <field name="UNIT">jaar</field>
              </block>
            </value>
            <next>
              <block type="parameter" id="paramDrempelIncomeAlleen">
                <field name="PARAM_ARTICLE">het</field>
                <field name="PARAM_NAME">INCOME_THRESHOLD_SINGLE</field>
                <value name="PARAM_TYPE">
                  <block type="type_definition_ref" id="refBedrag8">
                    <field name="TYPE_REF">Bedrag</field>
                  </block>
                </value>
                <next>
                  <block type="parameter" id="paramDrempelIncomePartner">
                    <field name="PARAM_ARTICLE">het</field>
                    <field name="PARAM_NAME">INCOME_THRESHOLD_PARTNER</field>
                    <value name="PARAM_TYPE">
                      <block type="type_definition_ref" id="refBedrag9">
                        <field name="TYPE_REF">Bedrag</field>
                      </block>
                    </value>
                    <next>
                      <block type="parameter" id="paramAssetLimitSingle">
                        <field name="PARAM_ARTICLE">de</field>
                        <field name="PARAM_NAME">ASSET_LIMIT_SINGLE</field>
                        <value name="PARAM_TYPE">
                          <block type="type_definition_ref" id="refBedrag10">
                            <field name="TYPE_REF">Bedrag</field>
                          </block>
                        </value>
                        <next>
                          <block type="parameter" id="paramAssetLimitPartner">
                            <field name="PARAM_ARTICLE">de</field>
                            <field name="PARAM_NAME">ASSET_LIMIT_PARTNER</field>
                            <value name="PARAM_TYPE">
                              <block type="type_definition_ref" id="refBedrag11">
                                <field name="TYPE_REF">Bedrag</field>
                              </block>
                            </value>
                            <next>
                              <block type="parameter" id="paramReductionPercentage">
                                <field name="PARAM_ARTICLE">het</field>
                                <field name="PARAM_NAME">REDUCTION_PERCENTAGE</field>
                                <value name="PARAM_TYPE">
                                  <block type="data_type" id="dataReductionPercentage">
                                    <field name="DATA_TYPE">NUMERIC</field>
                                    <value name="NUMBER_SPEC">
                                      <block type="number_specification" id="numReductionPercentage">
                                        <field name="SIGN">NONE</field>
                                        <field name="NUMBER_TYPE">getal</field>
                                        <field name="DECIMALS">5</field>
                                      </block>
                                    </value>
                                    <field name="UNIT">%</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="parameter" id="paramIncomeThresholdSinglePerc">
                                    <field name="PARAM_ARTICLE">het</field>
                                    <field name="PARAM_NAME">INCOME_THRESHOLD_SINGLE_PERCENTAGE</field>
                                    <value name="PARAM_TYPE">
                                      <block type="data_type" id="dataIncomeThresholdSinglePerc">
                                        <field name="DATA_TYPE">NUMERIC</field>
                                        <value name="NUMBER_SPEC">
                                          <block type="number_specification" id="numIncomeThresholdSinglePerc">
                                            <field name="SIGN">NONE</field>
                                            <field name="NUMBER_TYPE">getal</field>
                                            <field name="DECIMALS">5</field>
                                          </block>
                                        </value>
                                        <field name="UNIT">%</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="parameter" id="paramIncomeThresholdPartnerPerc">
                                        <field name="PARAM_ARTICLE">het</field>
                                        <field name="PARAM_NAME">INCOME_THRESHOLD_PARTNER_PERCENTAGE</field>
                                        <value name="PARAM_TYPE">
                                          <block type="data_type" id="dataIncomeThresholdPartnerPerc">
                                            <field name="DATA_TYPE">NUMERIC</field>
                                            <value name="NUMBER_SPEC">
                                              <block type="number_specification" id="numIncomeThresholdPartnerPerc">
                                                <field name="SIGN">NONE</field>
                                                <field name="NUMBER_TYPE">getal</field>
                                                <field name="DECIMALS">5</field>
                                              </block>
                                            </value>
                                            <field name="UNIT">%</field>
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
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </xml>
  `,
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
        alert(
          'Could not load example object model. Please check console for details.'
        );
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
