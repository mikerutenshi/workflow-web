import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string | null, Date | null> {
  description = 'Date custom scalar type';

  serialize(value: Date | null): string | null {
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (value === null) {
      return null;
    }

    throw new Error('Date scalar value must be an instance of Date or null');
  }

  parseValue(value: string | null): Date | null {
    if (value === null) {
      return null;
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    return date;
  }

  parseLiteral(ast: any): Date | null {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }

      return date;
    }

    if (ast.kind === Kind.NULL) {
      return null;
    }

    throw new Error('Date scalar value must be a string or null');
  }
}
