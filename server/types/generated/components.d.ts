import type { Struct, Schema } from '@strapi/strapi';

export interface ElementsInstruction extends Struct.ComponentSchema {
  collectionName: 'components_elements_instructions';
  info: {
    displayName: 'Instruction';
  };
  attributes: {
    step: Schema.Attribute.String;
  };
}

export interface ElementsIngredient extends Struct.ComponentSchema {
  collectionName: 'components_elements_ingredients';
  info: {
    displayName: 'Ingredient';
  };
  attributes: {
    name: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.instruction': ElementsInstruction;
      'elements.ingredient': ElementsIngredient;
    }
  }
}
