import { Prisma } from '@/generated/prisma/client';
import { DbErrorCode, mapPrismaError } from './prisma-error.util';

function knownError(code: string): Prisma.PrismaClientKnownRequestError {
  return new Prisma.PrismaClientKnownRequestError('raw prisma noise', {
    code,
    clientVersion: '7.6.0',
  });
}

describe('mapPrismaError', () => {
  it('maps a unique constraint violation to DUPLICATE', () => {
    expect(mapPrismaError(knownError('P2002'))?.code).toBe(
      DbErrorCode.DUPLICATE,
    );
  });

  it('maps a foreign key violation to IN_USE', () => {
    expect(mapPrismaError(knownError('P2003'))?.code).toBe(DbErrorCode.IN_USE);
    expect(mapPrismaError(knownError('P2014'))?.code).toBe(DbErrorCode.IN_USE);
  });

  it('maps a missing record to NOT_FOUND', () => {
    expect(mapPrismaError(knownError('P2025'))?.code).toBe(
      DbErrorCode.NOT_FOUND,
    );
  });

  it('falls back to DB_ERROR for an unmapped Prisma code', () => {
    expect(mapPrismaError(knownError('P2099'))?.code).toBe(
      DbErrorCode.DB_ERROR,
    );
  });

  it('never returns the raw Prisma message', () => {
    const mapped = mapPrismaError(knownError('P2002'));

    expect(mapped?.message).not.toContain('raw prisma noise');
    expect(mapped?.message).toBe(
      'This already exists. Please use a different value.',
    );
  });

  it('maps PrismaClientValidationError to DB_ERROR', () => {
    const err = new Prisma.PrismaClientValidationError('bad args', {
      clientVersion: '7.6.0',
    });

    expect(mapPrismaError(err)?.code).toBe(DbErrorCode.DB_ERROR);
  });

  // Services throw plain Errors whose text is already written for the user --
  // TagService.deleteTag names the blocking count and points at archiving. Those
  // must pass through, or this change would replace good copy with generic copy.
  it('returns null for a hand-written service error', () => {
    expect(
      mapPrismaError(new Error('Tag is used by 3 work order(s)')),
    ).toBeNull();
  });

  it('returns null for non-error values', () => {
    expect(mapPrismaError(undefined)).toBeNull();
    expect(mapPrismaError('boom')).toBeNull();
  });
});
