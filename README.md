# Zod Extended Validators

Zod Extended Validators is a TypeScript library enhancing Zod, a popular schema validation library, with additional validation functionalities. For more information, check the [npm package page](https://www.npmjs.com/package/zod-extended-validators) and the [GitHub repository](https://github.com/bracketlab/zod-extended-validators).

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
import { z } from 'zod';
import { textField, requiredNumberField } from 'zod-extended-validators';

const schema = z.object({
  name: textField(),
  age: requiredNumberField()
});

// Example data
const data = { name: "John Doe", age: 30 };

// Validation
const validationResult = schema.safeParse(data);

if (validationResult.success) {
  console.log("Validation passed:", validationResult.data);
} else {
  console.log("Validation errors:", validationResult.error.issues);
}
```

**Result:**
```json
Validation passed: { "name": "John Doe", "age": 30 }
```

In this example, a schema is defined using `textField` for an optional string field and `requiredNumberField` for a mandatory number field. The `safeParse` method from Zod is then used to validate a data object, providing either a success response or a detailed error report.

## Detailed Description

Zod Extended Validators offer a variety of validators like `textField`, `numberField`, `booleanField`, `requiredTextField`, and more, each tailored for specific validation needs.

## Error Handling

The package includes `EValidationErrors` and `withArguments` for advanced error handling, allowing custom error messages.

## Contributing

Contributors should adhere to guidelines such as clean, documented, and tested code, following the existing style, and updating the README as needed.

## License

The library is available under the MIT License.