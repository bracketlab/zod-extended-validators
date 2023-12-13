```markdown
# Zod Extended Validators

Extended validators for Zod, providing additional validation functionalities to enhance your schema validations in TypeScript.

## Installation

Install the package using npm:

```bash
npm install zod-extended-validators
```

Or using yarn:

```bash
yarn add zod-extended-validators
```

## Usage

Import the validators you need from the package:

```typescript
import {
  textField,
  numberField,
  booleanField,
  requiredTextField,
  // ... more imports
} from 'zod-extended-validators';
```

## Validators

Here are some of the validators provided by this package:

- `textField()`: Returns an optional string schema.
- `numberField()`: Returns an optional number schema.
- `booleanField()`: Returns an optional boolean schema.
- `requiredTextField(customError?)`: Returns a required string schema with a minimum length of 1.
- `requiredNumberField(customError?)`: Returns a required number schema.
- `requiredIntegerField(customError?)`: Returns a required integer schema.
- ... (and more)

## Error Handling

The package also exports `EValidationErrors` and `withArguments` for customized error handling.

## Contributing

Contributions to the package are welcome! Please ensure that your contributions adhere to the following guidelines:

- Write clean, documented, and tested code.
- Follow the existing coding style.
- Update the README with relevant information, if necessary.

## License

This project is licensed under the MIT License.
```

> _See also:_ 
> 📘 [Zod Documentation](https://www.google.com/search?q=zod+documentation)
> 💾 [npm Package Management](https://www.google.com/search?q=npm+package+management)

> _You may also enjoy:_ 
> 🧪 [Typescript Testing Best Practices](https://www.google.com/search?q=typescript+testing+best+practices)
> 🖥️ [Software Engineering Principles](https://www.google.com/search?q=software+engineering+principles)
