import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number | null, Date | null> {
  description = 'Date custom scalar type';

  parseValue(value: number | null): Date | null {
    return value ? new Date(value) : null; // value from the client
  }

  serialize(value: Date | null): number | null {
    return value ? value.getTime() : null; // value sent to the client
  }

  parseLiteral(ast: any): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value, 10); // ast value is always in string format
    } else {
      return null;
    }
  }
}
