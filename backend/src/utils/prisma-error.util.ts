import { Prisma } from '@/generated/prisma/client';

// A stable, transport-level code for anything the database refused. The frontend
// maps these to translated copy (error.db.* in the locale files); the English
// message below is only what a client without i18n would fall back to.
export enum DbErrorCode {
  DUPLICATE = 'DUPLICATE',
  IN_USE = 'IN_USE',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED_FIELD = 'REQUIRED_FIELD',
  VALUE_TOO_LONG = 'VALUE_TOO_LONG',
  CONFLICT_RETRY = 'CONFLICT_RETRY',
  DB_UNAVAILABLE = 'DB_UNAVAILABLE',
  DB_ERROR = 'DB_ERROR',
}

export interface MappedDbError {
  code: DbErrorCode;
  message: string;
}

const MESSAGES: Record<DbErrorCode, string> = {
  [DbErrorCode.DUPLICATE]: 'This already exists. Please use a different value.',
  [DbErrorCode.IN_USE]:
    "This record is still linked to other data, so it can't be saved or deleted.",
  [DbErrorCode.NOT_FOUND]:
    'This record no longer exists. It may have been changed or deleted by someone else.',
  [DbErrorCode.REQUIRED_FIELD]: 'A required value is missing.',
  [DbErrorCode.VALUE_TOO_LONG]: 'One of the values is too long.',
  [DbErrorCode.CONFLICT_RETRY]: 'The system was busy. Please try again.',
  [DbErrorCode.DB_UNAVAILABLE]:
    "Can't reach the database right now. Please try again shortly.",
  [DbErrorCode.DB_ERROR]:
    'Something went wrong while saving. Please try again.',
};

// P2003 covers both directions of a foreign key failure -- deleting a row another
// table still points at, and creating one that points at nothing. IN_USE is worded
// to read correctly either way rather than assuming a delete.
const CODES: Record<string, DbErrorCode> = {
  P2000: DbErrorCode.VALUE_TOO_LONG,
  P2002: DbErrorCode.DUPLICATE,
  P2003: DbErrorCode.IN_USE,
  P2011: DbErrorCode.REQUIRED_FIELD,
  P2012: DbErrorCode.REQUIRED_FIELD,
  P2013: DbErrorCode.REQUIRED_FIELD,
  P2014: DbErrorCode.IN_USE,
  P2015: DbErrorCode.NOT_FOUND,
  P2018: DbErrorCode.NOT_FOUND,
  P2024: DbErrorCode.DB_UNAVAILABLE,
  P2025: DbErrorCode.NOT_FOUND,
  P2034: DbErrorCode.CONFLICT_RETRY,
};

// Returns null for anything that did not come out of Prisma. Services throw plain
// Errors with messages already written for the user (see TagService.deleteTag) --
// those must reach the client untouched, so only Prisma's own noise is rewritten.
export function mapPrismaError(err: unknown): MappedDbError | null {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const code = CODES[err.code] ?? DbErrorCode.DB_ERROR;
    return { code, message: MESSAGES[code] };
  }

  if (
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientInitializationError
  ) {
    return {
      code: DbErrorCode.DB_ERROR,
      message: MESSAGES[DbErrorCode.DB_ERROR],
    };
  }

  return null;
}
