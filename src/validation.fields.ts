import { z } from 'zod';
import { EValidationErrors, withArguments } from './validation.errors';

export const textField = () => {
  return z.string().optional();
};

export const numberField = () => {
  return z.number().optional();
};

export const booleanField = () => {
  return z.boolean().optional();
};

export const requiredTextField = (customError?: EValidationErrors) => {
  return z.string().min(1, { message: customError ?? EValidationErrors.ERROR_MUST_NOT_BE_EMPTY });
};

export const requiredNumberField = (customError?: EValidationErrors) => {
  return z.number({
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_type') {
        return { message: customError ?? EValidationErrors.ERROR_INVALID_NUMBER };
      }
      return { message: ctx.defaultError };
    },
  });
};

export const requiredIntegerField = (customError?: EValidationErrors) => {
  return requiredNumberField(customError).int({
    message: customError ?? EValidationErrors.ERROR_INVALID_NUMBER,
  });
};

export const requiredBooleanField = (customError?: EValidationErrors) => {
  return z.boolean().refine((val) => val === true, {
    message: customError ?? EValidationErrors.ERROR_MUST_BE_TRUE,
  });
};

export const requiredPostalCodeField = (customError?: EValidationErrors) => {
  return z
    .string()
    .length(5, { message: customError ?? EValidationErrors.ERROR_INVALID_POSTAL_CODE });
};

export const requiredPhoneNumberField = (customError?: EValidationErrors) => {
  const numericPattern = /^\d+$/;
  return z
  .string()
  .regex(numericPattern, {
    message: customError ?? EValidationErrors.ERROR_INVALID_PHONE_NUMBER
  })
  .min(4, {
    message: customError ?? EValidationErrors.ERROR_INVALID_PHONE_NUMBER
  });
};

export const requiredPositiveNumberField = (customError?: EValidationErrors) => {
  const REGEX_POSITIVE_DECIMAL_NUMBER = /^\d+(\.\d+)?$/;
  return z
    .union([
      requiredNumberField().min(0, {
        message: customError ?? EValidationErrors.ERROR_MUST_BE_POSITIVE_DECIMAL_NUMBER,
      }),
      requiredTextField().refine((val) => REGEX_POSITIVE_DECIMAL_NUMBER.test(val), {
        message: customError ?? EValidationErrors.ERROR_MUST_BE_POSITIVE_DECIMAL_NUMBER,
      }),
    ])
    .transform((val) => {
      if (typeof val === 'string') {
        return parseFloat(val);
      }
      return val;
    });
};

export const requiredPercentageField = (customError?: EValidationErrors) => {
  const REGEX_PERCENTAGE = /^(?:100(?:\.\d+)?|\d{1,2}(?:\.\d+)?)$/;
  return z
    .union([
      requiredNumberField().min(0, {
        message: customError ?? EValidationErrors.ERROR_MUST_BE_PERCENTAGE,
      }),
      z.string().refine((val) => REGEX_PERCENTAGE.test(val), {
        message: customError ?? EValidationErrors.ERROR_MUST_BE_PERCENTAGE,
      }),
    ])
    .transform((val) => {
      if (typeof val === 'string') {
        return parseFloat(val);
      }
      return val;
    });
};

export const emailField = (customError?: EValidationErrors) => {
  return z.string().email({ message: customError ?? EValidationErrors.ERROR_INVALID_EMAIL });
};

export const personalEmailField = (customError?: EValidationErrors) => {
  const FORBIDDEN_EMAILS = [
    'info',
    'kontakt',
    'contact',
    'hello',
    'noreply',
    'newsletter',
    'marketing',
    'office',
    'team',
    'webmaster',
    'sales',
    'support',
    'admin',
  ];

  return emailField().refine(
    (email: string) => {
      const emailFirstPart = email.split('@')[0]?.toLowerCase();
      return emailFirstPart && !FORBIDDEN_EMAILS.includes(emailFirstPart);
    },
    { message: customError ?? EValidationErrors.ERROR_MUST_BE_PERSONAL_EMAIL }
  )
}
export const passwordField = (customError?: EValidationErrors) => {
  const passwordRegex = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
  );

  return requiredTextField().regex(passwordRegex, {
    message: customError ?? EValidationErrors.ERROR_INVALID_PASSWORD,
  });
};

export const onlyNumbersLettersCommasPointsField = (customError?: EValidationErrors) => {
  const onlyNumbersLettersCommasPointsRegex = /^[a-zA-Z0-9.,äöüÄÖÜß\s]*$/;

  return z.string().regex(onlyNumbersLettersCommasPointsRegex, {
    message: customError ?? EValidationErrors.ERROR_MUST_CONTAIN_ONLY_NUMBERS_LETTERS_COMMAS_POINTS,
  });
};

export const onlyNumbersLettersHyphenField = (customError?: EValidationErrors) => {
  const REGEX_DE_LETTERS_NUMBERS_HYPHEN = /^[a-zA-Z0-9-äÄöÖüÜß]+$/;
  return z.string().regex(REGEX_DE_LETTERS_NUMBERS_HYPHEN, {
    message: customError ?? EValidationErrors.ERROR_MUST_CONTAIN_ONLY_NUMBERS_LETTERS_COMMAS_POINTS,
  });
};

export const IBANField = (customError?: EValidationErrors) => {
  // http://blog.marketto.it/en/2018/06/validate-any-country-iban/
  const IBAN_REGEX =
    /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/;

  return requiredTextField().regex(IBAN_REGEX, {
    message: customError ?? EValidationErrors.ERROR_INVALID_IBAN,
  });
};

export const BICField = (customError?: EValidationErrors) => {
  // https://gist.github.com/Fedik/f050c65fa6cc93973fc65df9d00357f5
  const BIC_REGEX = /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/;
  return requiredTextField().regex(BIC_REGEX, {
    message: customError ?? EValidationErrors.ERROR_INVALID_BIC,
  });
};

export const salesTaxIdField = (customError?: EValidationErrors) => {
  // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s21.html
  const salesTaxIdField_REGEX = new RegExp(
    '^(?:(AT)U[0-9]{8}|' +
      '(BE)0[0-9]{9}|' +
      '(BG)[0-9]{9,10}|' +
      '(CY)[0-9]{8}L|' +
      '(CZ)[0-9]{8,10}|' +
      '(DE)[0-9]{9}|' +
      '(DK)[0-9]{8}|' +
      '(EE)[0-9]{9}|' +
      '(EL|GR)[0-9]{9}|' +
      '(ES)[0-9A-Z][0-9]{7}[0-9A-Z]|' +
      '(FI)[0-9]{8}|' +
      '(FR)[0-9A-Z]{2}[0-9]{9}|' +
      '(GB)([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|' +
      '(HU)[0-9]{8}|' +
      '(IE)[0-9]S[0-9]{5}L|' +
      '(IT)[0-9]{11}|' +
      '(LT)([0-9]{9}|[0-9]{12})|' +
      '(LU)[0-9]{8}|' +
      '(LV)[0-9]{11}|' +
      '(MT)[0-9]{8}|' +
      '(NL)[0-9]{9}B[0-9]{2}|' +
      '(PL)[0-9]{10}|' +
      '(PT)[0-9]{9}|' +
      '(RO)[0-9]{2,10}|' +
      '(SE)[0-9]{12}|' +
      '(SI)[0-9]{8}|' +
      '(SK)[0-9]{10})$'
  );
  return requiredTextField().regex(salesTaxIdField_REGEX, {
    message: customError ?? EValidationErrors.ERROR_INVALID_SALES_TAX_ID,
  });
};

export const withMaxWords = (
  zodField: z.ZodString,
  maxWords: number,
  customError?: EValidationErrors
) => {
    return zodField.refine(
    (value) => {
      if (!value) {
        return true;
      }
      const wordRegex = /\w+/g; // Matches any 1 or more alphanumeric characters (including _)
      const words = value.match(wordRegex) || []; // Extract all matching words
      return words.length <= maxWords;
    },
    {
      message: withArguments(customError ?? EValidationErrors.ERROR_MAX_WORDS_EXCEEDED, { maxWords }),
    }
  );
};
