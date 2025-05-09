/**
 * Configuration for the rule editor
 * Contains the object model definition that can be dynamically loaded
 */

// Object model configuration
const objectModel = {
  // Object types
  objectTypes: [
    {
      id: "VLUCHT",
      name: "de vlucht",
      characteristics: [
        { id: "BELASTE_REIS", name: "belaste reis" },
        { id: "ONBELASTE_REIS", name: "onbelaste reis" },
        { id: "RONDVLUCHT", name: "rondvlucht" },
        { id: "KLIMAATNEUTRAAL", name: "klimaatneutraal", isAdjective: true }
      ],
      attributes: [
        { id: "LUCHTHAVEN_VAN_VERTREK", name: "luchthaven van vertrek", type: "Luchthavens" },
        { id: "LUCHTHAVEN_VAN_BESTEMMING", name: "luchthaven van bestemming", type: "Luchthavens" },
        { id: "DATUM_VAN_DE_VLUCHT", name: "datum van de vlucht", type: "Datum in dagen" },
        { id: "AFSTAND_TOT_BESTEMMING", name: "afstand tot bestemming", type: "Numeriek ( geheel getal )", unit: "km" },
        { id: "BEREIKBAAR_PER_TREIN", name: "bereikbaar per trein", type: "Boolean" },
        { id: "REISDUUR_PER_TREIN", name: "reisduur per trein", type: "Numeriek ( geheel getal )", unit: "minuut" },
        { id: "AANTAL_PASSAGIERS", name: "aantal passagiers", type: "Numeriek ( geheel getal )" },
        { id: "TOTALE_BELASTING_OP_BASIS_VAN_AFSTAND", name: "totale belasting op basis van afstand", type: "Bedrag" },
        { id: "TOTALE_BELASTING_OP_BASIS_VAN_REISDUUR", name: "totale belasting op basis van reisduur", type: "Bedrag" },
        { id: "TOTAAL_TE_BETALEN_BELASTING", name: "totaal te betalen belasting", type: "Bedrag" }
      ]
    },
    {
      id: "NATUURLIJK_PERSOON",
      name: "de natuurlijk persoon",
      animate: true,
      characteristics: [
        { id: "PASSAGIER_LAGE_TARIEF", name: "passagier waarvoor het lage tarief voor belasting op basis van afstand van toepassing is" },
        { id: "PASSAGIER_HOGE_TARIEF", name: "passagier waarvoor het hoge tarief voor belasting op basis van afstand van toepassing is" },
        { id: "RECHT_OP_DUURZAAMHEIDSKORTING", name: "recht op duurzaamheidskorting", possessive: true }
      ],
      attributes: [
        { id: "IDENTIFICATIENUMMER", name: "identificatienummer", type: "Numeriek ( geheel getal )" },
        { id: "GEBOORTEDATUM", name: "geboortedatum", type: "Datum in dagen" },
        { id: "LEEFTIJD", name: "leeftijd", type: "Numeriek ( geheel getal )", unit: "jr" },
        { id: "BURGERSERVICENUMMER", name: "burgerservicenummer", type: "Tekst" },
        { id: "BELASTING_OP_BASIS_VAN_AFSTAND", name: "belasting op basis van afstand", type: "Bedrag" },
        { id: "BELASTING_OP_BASIS_VAN_REISDUUR", name: "belasting op basis van reisduur", type: "Bedrag" },
        { id: "TE_BETALEN_BELASTING", name: "te betalen belasting", type: "Bedrag" },
        { id: "PROVINCIE", name: "provincie", type: "Provincies" },
        { id: "WOONREGIOFACTOR", name: "woonregiofactor", type: "Numeriek ( geheel getal )" },
        { id: "TREINMILES", name: "treinmiles", type: "Numeriek ( geheel getal )" },
        { id: "MAXIMAAL_AANTAL_TE_ONTVANGEN_TREINMILES", name: "maximaal aantal te ontvangen treinmiles", type: "Numeriek ( geheel getal )" }
      ]
    },
    {
      id: "CONTINGENT_TREINMILES",
      name: "het contingent treinmiles",
      attributes: [
        { id: "TOTAAL_AANTAL_TREINMILES", name: "totaal aantal treinmiles", type: "Numeriek ( geheel getal )" },
        { id: "AANTAL_TREINMILES_OP_BASIS_VAN_AANTAL_PASSAGIERS", name: "aantal treinmiles op basis van aantal passagiers", type: "Numeriek ( geheel getal )" },
        { id: "RESTANT_NA_VERDELING", name: "restant na verdeling", type: "Numeriek ( geheel getal )" }
      ]
    },
    {
      id: "UITWORPMELDING",
      name: "de uitworpmelding",
      attributes: [
        { id: "TYPE", name: "type", type: "Type uitworp" },
        { id: "TOELICHTING", name: "toelichting", type: "Tekst" }
      ]
    }
  ],
  
  // Relationship types
  relationshipTypes: [
    {
      id: "VLUCHT_VAN_NATUURLIJKE_PERSONEN",
      name: "Vlucht van natuurlijke personen",
      roles: [
        { id: "REIS", name: "reis", objectType: "VLUCHT", multiplicity: "ONE" },
        { id: "PASSAGIER", name: "passagier", objectType: "NATUURLIJK_PERSOON", multiplicity: "MANY" }
      ],
      relationshipString: "één reis betreft de verplaatsing van meerdere passagiers"
    },
    {
      id: "REIS_MET_CONTINGENT_TREINMILES",
      name: "Reis met contingent treinmiles",
      roles: [
        { id: "REIS_MET_TREINMILES", name: "reis met treinmiles", objectType: "VLUCHT", multiplicity: "ONE" },
        { id: "VASTGESTELD_CONTINGENT_TREINMILES", name: "vastgesteld contingent treinmiles", objectType: "CONTINGENT_TREINMILES", multiplicity: "ONE" }
      ],
      relationshipString: "één reis met treinmiles heeft één vastgesteld contingent treinmiles"
    },
    {
      id: "VERDELING_CONTINGENT_TREINMILES_OVER_PASSAGIERS",
      name: "Verdeling contingent treinmiles over passagiers",
      roles: [
        { id: "TE_VERDELEN_CONTINGENT_TREINMILES", name: "te verdelen contingent treinmiles", objectType: "CONTINGENT_TREINMILES", multiplicity: "ONE" },
        { id: "PASSAGIER_MET_RECHT_OP_TREINMILES", name: "passagier met recht op treinmiles", objectType: "NATUURLIJK_PERSOON", multiplicity: "MANY" }
      ],
      relationshipString: "één te verdelen contingent treinmiles wordt verdeeld over meerdere passagiers met recht op treinmiles"
    },
    {
      id: "REDENEN_UITWORP_VAN_VLUCHT",
      name: "Redenen uitworp van vlucht",
      roles: [
        { id: "VLUCHT_MET_GEGEVENS", name: "vlucht met gegevens", objectType: "VLUCHT", multiplicity: "ONE" },
        { id: "REDEN_UITWORP", name: "reden uitworp", objectType: "UITWORPMELDING", multiplicity: "MANY" }
      ],
      relationshipString: "één vlucht met gegevens heeft meerdere redenen uitworp"
    }
  ],
  
  // Parameters
  parameters: [
    { id: "PERCENTAGE_REISDUUR_EERSTE_SCHIJF", name: "PERCENTAGE REISDUUR EERSTE SCHIJF", type: "Percentage ( geheel getal )" },
    { id: "PERCENTAGE_REISDUUR_TWEEDE_SCHIJF", name: "PERCENTAGE REISDUUR TWEEDE SCHIJF", type: "Percentage ( geheel getal )" },
    { id: "PERCENTAGE_REISDUUR_DERDE_SCHIJF", name: "PERCENTAGE REISDUUR DERDE SCHIJF", type: "Percentage ( geheel getal )" },
    { id: "BOVENGRENS_REISDUUR_EERSTE_SCHIJF", name: "BOVENGRENS REISDUUR EERSTE SCHIJF", type: "Numeriek ( geheel getal )", unit: "u" },
    { id: "BOVENGRENS_REISDUUR_TWEEDE_SCHIJF", name: "BOVENGRENS REISDUUR TWEEDE SCHIJF", type: "Numeriek ( geheel getal )", unit: "u" },
    { id: "BOVENGRENS_AFSTAND_EERSTE_SCHIJF", name: "BOVENGRENS AFSTAND EERSTE SCHIJF", type: "Numeriek ( geheel getal )", unit: "km" },
    { id: "BOVENGRENS_AFSTAND_TWEEDE_SCHIJF", name: "BOVENGRENS AFSTAND TWEEDE SCHIJF", type: "Numeriek ( geheel getal )", unit: "km" },
    { id: "LAGE_BASISTARIEF_EERSTE_SCHIJF", name: "LAGE BASISTARIEF EERSTE SCHIJF", type: "Bedrag" },
    { id: "LAGE_BASISTARIEF_TWEEDE_SCHIJF", name: "LAGE BASISTARIEF TWEEDE SCHIJF", type: "Bedrag" },
    { id: "HOGE_BASISTARIEF_EERSTE_SCHIJF", name: "HOGE BASISTARIEF EERSTE SCHIJF", type: "Bedrag" },
    { id: "HOGE_BASISTARIEF_TWEEDE_SCHIJF", name: "HOGE BASISTARIEF TWEEDE SCHIJF", type: "Bedrag" },
    { id: "LAGE_TARIEF_VERMINDERING_EERSTE_SCHIJF", name: "LAGE TARIEF VERMINDERING EERSTE SCHIJF", type: "Bedrag per kilometer" },
    { id: "LAGE_TARIEF_VERMINDERING_TWEEDE_SCHIJF", name: "LAGE TARIEF VERMINDERING TWEEDE SCHIJF", type: "Bedrag per kilometer" },
    { id: "HOGE_TARIEF_VERMINDERING_EERSTE_SCHIJF", name: "HOGE TARIEF VERMINDERING EERSTE SCHIJF", type: "Bedrag per kilometer" },
    { id: "HOGE_TARIEF_VERMINDERING_TWEEDE_SCHIJF", name: "HOGE TARIEF VERMINDERING TWEEDE SCHIJF", type: "Bedrag per kilometer" },
    { id: "AANTAL_TREINMILES_PER_PASSAGIER_VOOR_CONTINGENT", name: "AANTAL TREINMILES PER PASSAGIER VOOR CONTINGENT", type: "Numeriek ( geheel getal )" },
    { id: "BASISCONTINGENT_TREINMILES_PER_VLUCHT", name: "BASISCONTINGENT TREINMILES PER VLUCHT", type: "Numeriek ( geheel getal )" },
    { id: "MAXIMUM_AANTAL_TREINMILES_VOOR_PASSAGIERS_JONGER_DAN_65", name: "MAXIMUM AANTAL TREINMILES VOOR PASSAGIERS JONGER DAN 65", type: "Numeriek ( geheel getal )" },
    { id: "MAXIMUM_AANTAL_TREINMILES_VOOR_PASSAGIERS_VAN_65_JAAR_OF_OUDER", name: "MAXIMUM AANTAL TREINMILES VOOR PASSAGIERS VAN 65 JAAR OF OUDER", type: "Numeriek ( geheel getal )" },
    { id: "KORTING_VOOR_KLIMAATNEUTRALE_VLUCHT", name: "KORTING VOOR KLIMAATNEUTRALE VLUCHT", type: "Bedrag" }
  ],
  
  // Type definitions
  typeDefinitions: [
    { id: "BEDRAG", name: "Bedrag", type: "Numeriek ( getal met 2 decimalen )", unit: "€" },
    { id: "BEDRAG_PER_KILOMETER", name: "Bedrag per kilometer", type: "Numeriek ( getal met 2 decimalen )", unit: "€ / km" }
  ]
};

// Function to dynamically update block definitions based on the object model
function updateBlockDefinitionsFromObjectModel() {
  // This function would take the object model and update the dropdown options
  // in the block definitions to match the model
  
  // For example, it could update the OBJECT_TYPE dropdown in the fact_reference block
  // with options from objectModel.objectTypes
  
  // Similarly, it could update the attribute, role, and characteristic dropdowns
  // based on the selected object type
  
  // This would require a more complex implementation with dynamic block creation
  // That's beyond the scope of this prototype, but this is where you would implement it
}
