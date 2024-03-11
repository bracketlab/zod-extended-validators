# Zod Extended Validators

<p align="center">
<a href="https://github.com/bracketlab" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@bracketlab-4BBAAB.svg" alt="Created by Bracketlab GmbH"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/colinhacks/zod" alt="License"></a>
<a href="https://www.npmjs.com/package/zod-extended-validators" rel="nofollow"><img src="https://img.shields.io/github/stars/bracketlab/zod-extended-validators" alt="stars"></a>
</p>

Zod Extended Validators is a TypeScript library enhancing [Zod](https://www.npmjs.com/package/zod), a popular schema validation library, with additional validation functionalities. For more information, check the [npm package page](https://www.npmjs.com/package/zod-extended-validators) and the [GitHub repository](https://github.com/bracketlab/zod-extended-validators).

## Installation

To integrate Zod Extended Validators into your project, use npm or yarn:

**Using npm:**

```bash
npm install zod-extended-validators
```

**Using yarn:**

```bash
yarn add zod-extended-validators
```

## Quick Example

**Usage:**

```typescript
import { z } from 'zod'
import { textField, requiredNumberField } from 'zod-extended-validators'

const schema = z.object({
  name: textField(),
  age: requiredNumberField()
})

// Example data
const data = { name: 'John Doe', age: 30 }

// Validation
const validationResult = schema.safeParse(data)

if (validationResult.success) {
  console.log('Validation passed:', validationResult.data)
} else {
  console.log('Validation errors:', validationResult.error.issues)
}
```

**Result:**

```json
Validation passed: { "name": "John Doe", "age": 30 }
```

## Available Validators

Here are some of the validators provided by Zod Extended Validators:

### Basic Field Validators

- `textField()`: Returns an optional string schema, suitable for text inputs.
- `numberField()`: Returns an optional number schema, used for numeric inputs.
- `booleanField()`: Returns an optional boolean schema, typically for checkboxes or toggle inputs.

### Required Field Validators

- `requiredTextField(customError?)`: Ensures a string field is not empty, with a custom error option.
- `requiredNumberField(customError?)`: Validates a number field, ensuring it's provided, with custom error handling.
- `requiredIntegerField(customError?)`: Similar to `requiredNumberField` but ensures the number is an integer.
- `requiredBooleanField(customError?)`: Validates a boolean field, ensuring it's true (useful for agreements or confirmations).

### Specialized Field Validators

- `requiredPostalCodeField(customError?)`: Validates postal codes with a specific length requirement.
- `requiredPhoneNumberField(customError?)`: Ensures a minimum length for phone numbers.
- `requiredPositiveNumberField(customError?)`: Checks for positive numbers, either integers or decimals.
- `requiredPercentageField(customError?)`: Validates percentages, ensuring values are within a valid range.
- `emailField(customError?)`: Validates email addresses.
- `passwordField(customError?)`: Validates passwords with specific complexity requirements.
- `requiredPostalCodeField(customError?)`: Validates postal codes with a specific length requirement that are not required.

### Regex-Based Field Validators

- `onlyNumbersLettersCommasPointsField(customError?)`: Validates input against a regex allowing only specific characters.
- `onlyNumbersLettersHyphenField(customError?)`: Similar to the above but includes hyphens.
- `IBANField(customError?)`: Validates International Bank Account Numbers (IBAN) using a comprehensive regex.
- `BICField(customError?)`: Validates Bank Identifier Codes (BIC).
- `salesTaxIdField(customError?)`: Validates various formats of sales tax IDs.

### Additional Utility Validators

- `withMaxWords(zodField, maxWords, customError?)`: Extends a Zod string field to limit the number of words.
- `nonEmpty(zodField, customError?)`: Extends a Zod string field to not allow whitespaces.

Each of these validators can be imported and used to create robust, fine-tuned validation schemas for your TypeScript applications, ensuring data integrity and user input validation according to specific rules and formats.

## Contributing

Contributors should adhere to guidelines such as clean, documented, and tested code, following the existing style, and updating the README as needed.

## License

The library is available under the MIT License.
