<template>
  <div>
    <h1>API Reference</h1>

    <!-- prettier-ignore -->
    <vue-markdown>
## `/parseIngredients` (POST)

### Overview

The `/parseIngredients` endpoint parses a list of raw ingredient strings into structured JSON.

### Request

```javascript
{
  "ingredients": [
    "3 large Granny Smith apples",
    "2 1/2 tablespoons finely chopped parsley",
    "½ tsp brown sugar"
  ]
}
```

#### Fields

* `ingredients`: A list of ingredient strings to parse.
  * This list must contain between 1 and 100 elements.
  * Each string in the list must be 1,024 characters or fewer.
  * Unicode strings are supported.
  * The strings may be HTML- or URL-encoded.
  * Any HTML tags in the ingredient strings will be ignored.

### Response

```javascript
{
  "results": [
    {
      "ingredientRaw": "3 large Granny Smith apples",
      "ingredientParsed": {
        "quantity": 3.0,
        "unit": null,
        "productSizeModifier": "large",
        "product": "Granny Smith apples",
        "preparationNotes": null,
        "usdaInfo": {
            "category": "Fruits and Fruit Juices",
            "description": "Apples, raw, granny smith, with skin (Includes foods for USDA's Food Distribution Program)",
            "fdcId": "168203",
            "matchMethod": "exact"
        }
      },
      "confidence": 0.9242,
      "error": null
    },
    {
      "ingredientRaw": "2 1/2 tablespoons finely chopped parsley",
      "ingredientParsed": {
        "quantity": 2.5,
        "unit": "tablespoon",
        "productSizeModifier": null,
        "product": "parsley",
        "preparationNotes": "finely chopped",
        "usdaInfo": {
            "category": "Vegetables and Vegetable Products",
            "description": "Parsley, fresh",
            "fdcId": "170416",
            "matchMethod": "exact"
        }
      },
      "confidence": 0.9453,
      "error": null
    },
    {
      "ingredientRaw": "½ tsp brown sugar",
      "ingredientParsed": {
        "quantity": 0.5,
        "unit": "teaspoon",
        "productSizeModifier": null,
        "product": "brown sugar",
        "preparationNotes": null,
        "usdaInfo": {
            "category": "Sweets",
            "description": "Sugars, brown",
            "fdcId": "168833",
            "matchMethod": "exact"
        }
      },
      "confidence": 0.9262,
      "error": null
    }
  ],
  "requestsRemaining": 27,
  "error": null
}
```

#### Fields

* `results`: If the request was successful, contains a list of dictionaries with the keys `"ingredientRaw"`, `"ingredientParsed"`, and `"error"`.
  * `ingredientRaw`: The original user-supplied ingredient string that corresponds with this parse result.
  * `ingredientParsed`: A dictionary containing the ingredient as structured data, containing the keys `"quantity"`, `"unit"`, `"productSizeModifier"`, `"product"`, and `"preparationNotes"`.
    * `quantity`: A number representing the quantity represented in the ingredient string, or `null` if no quantity was detected in the ingredient string.
    * `unit`: A string containing the unit of measure in the ingredient string, or `null` if no unit of measure was found.
        * The unit of measure is always in singular form (e.g., `"teaspoon"`, not `"teaspoons"`).
    * `productSizeModifier`: Adjectives that describe `product`'s size (e.g., `"large"`, `"small"`).
    * `product`: The product a user buys to obtain this ingredient (e.g., `"ground beef"`, `"brown sugar"`).
    * `preparationNotes`: Instructions to the user about how to prepare this ingredient for a recipe (e.g., `"finely chopped"`, `"halved"`).
        * Preparation notes refer to actions that a user takes after purchasing an ingredient. In some cases, such as "ground cinnamon" this is ambiguous because a user can purchase whole cinnamon sticks and grind them (which would treat grinding as a preparation step) or a user can purchase the product "ground cinnamon" (which has no preparation steps).
        * For ambiguous cases, the parser attempts to choose the product that is more common. For example, "ground cinnamon" is treated as a product name because most users purchase cinnamon pre-ground. In contrast, "diced celery" is interpreted as `product="celery"`, `preparationNotes="diced"` because users more commonly dice celery instead of buying pre-diced celery.
    * `usdaInfo`: If Zestful can match the ingredient to a food in the USDA database, this contains a dictionary of information about the matching USDA entry.
        * `fdcId`: The FDC ID for the food in the USDA FoodData Central database (e.g., ["168833"](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168833/nutrients))
        * `matchMethod`: The method that Zestful used to match the ingredient to a USDA entry. This can be one of the following values:
            * `exact`: Zestful found an exact match for this product in the USDA database.
            * `closestUnbranded`: Zestful could not find an exact equivalent USDA entry, so it matched the ingredient to a closely related unbranded USDA product.
                * e.g., USDA has no exact match for "light brown sugar", so Zestful would match this ingredient to ["Sugars, brown."](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168833/nutrients)
            * `closestBranded`: Zestful could not find an exact or unbranded equivalent USDA entry, so it matched the ingredient to a branded USDA product.
                * e.g., USDA has no exact match for "apple cider vinegar", so Zestful would match this ingredient to ["BRAGG, ORGANIC APPLE CIDER VINEGAR."](https://fdc.nal.usda.gov/fdc-app.html#/food-details/411851/nutrients)
        * `category`: The USDA category for the ingredient (e.g., "Sweets").
        * `description`: The name of the ingredient in the USDA database (e.g., "Sugars, brown").
  * `confidence`: A value between 0.0 and 1.0 representing Zestful's confidence in the result (higher is better).
  * `error`: An error message that describes what caused `ingredientRaw` to fail parsing.
* `requestsRemaining`: (sandbox-only) The number of free ingredient conversions remaining in the client's quota.
  * This field exists in the sandbox (free demo) server only.
  * Paid plans have no hard daily cap on ingredient conversion requests .
  * Free request quota resets every 24 hours.
* `error`: An error message that describes what caused the full parse request to fail.

## Known Limitations

* Mixtures of units (e.g., `"2 8-oz cans of canned pumpkin"`, `"2 Tbsp + 1 Tsp of cinnamon"`) are not supported.
* Non-numeric quantities (e.g., `"Three tablespoons"`) are not supported.
* Mixtures of ingredients (e.g., `"2 tsp vinegar + 1 tbsp baking powder"`) are not supported.

## Terms

See [Terms of Service](/terms-of-service).
    </vue-markdown>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import Prism from 'prismjs';
import '../node_modules/prismjs/themes/prism-coy.css';

Vue.use(VueMarkdown);

export default {
  components: {
    VueMarkdown,
  },
  mounted() {
    Prism.highlightAll();
  },
  head: {
    title: 'Docs',
  },
};
</script>

<style scoped>
>>> h3 {
  margin-top: 20px;
}

>>> h4 {
  margin-top: 50px;
}

>>> code {
  margin: 20px auto;
}
</style>
