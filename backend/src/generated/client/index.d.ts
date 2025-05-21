
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Color
 * 
 */
export type Color = $Result.DefaultSelection<Prisma.$ColorPayload>
/**
 * Model ProductCategory
 * 
 */
export type ProductCategory = $Result.DefaultSelection<Prisma.$ProductCategoryPayload>
/**
 * Model ProductGroup
 * 
 */
export type ProductGroup = $Result.DefaultSelection<Prisma.$ProductGroupPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ColorToProduct
 * 
 */
export type ColorToProduct = $Result.DefaultSelection<Prisma.$ColorToProductPayload>
/**
 * Model LaborCost
 * 
 */
export type LaborCost = $Result.DefaultSelection<Prisma.$LaborCostPayload>
/**
 * Model Artisan
 * 
 */
export type Artisan = $Result.DefaultSelection<Prisma.$ArtisanPayload>
/**
 * Model Work
 * 
 */
export type Work = $Result.DefaultSelection<Prisma.$WorkPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Size
 * 
 */
export type Size = $Result.DefaultSelection<Prisma.$SizePayload>
/**
 * Model SizeToWork
 * 
 */
export type SizeToWork = $Result.DefaultSelection<Prisma.$SizeToWorkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MEN: 'MEN',
  WOMEN: 'WOMEN',
  KIDS: 'KIDS'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Job: {
  DRAW_UPPER: 'DRAW_UPPER',
  DRAW_LINING: 'DRAW_LINING',
  STITCH_UPPER: 'STITCH_UPPER',
  STITCH_OUTSOLE: 'STITCH_OUTSOLE',
  STITCH_INSOLE: 'STITCH_INSOLE',
  LAST: 'LAST'
};

export type Job = (typeof Job)[keyof typeof Job]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type Job = $Enums.Job

export const Job: typeof $Enums.Job

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Roles
 * const roles = await prisma.role.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Roles
   * const roles = await prisma.role.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.color`: Exposes CRUD operations for the **Color** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colors
    * const colors = await prisma.color.findMany()
    * ```
    */
  get color(): Prisma.ColorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productCategory`: Exposes CRUD operations for the **ProductCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductCategories
    * const productCategories = await prisma.productCategory.findMany()
    * ```
    */
  get productCategory(): Prisma.ProductCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productGroup`: Exposes CRUD operations for the **ProductGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductGroups
    * const productGroups = await prisma.productGroup.findMany()
    * ```
    */
  get productGroup(): Prisma.ProductGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.colorToProduct`: Exposes CRUD operations for the **ColorToProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ColorToProducts
    * const colorToProducts = await prisma.colorToProduct.findMany()
    * ```
    */
  get colorToProduct(): Prisma.ColorToProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.laborCost`: Exposes CRUD operations for the **LaborCost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LaborCosts
    * const laborCosts = await prisma.laborCost.findMany()
    * ```
    */
  get laborCost(): Prisma.LaborCostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artisan`: Exposes CRUD operations for the **Artisan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artisans
    * const artisans = await prisma.artisan.findMany()
    * ```
    */
  get artisan(): Prisma.ArtisanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.work`: Exposes CRUD operations for the **Work** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Works
    * const works = await prisma.work.findMany()
    * ```
    */
  get work(): Prisma.WorkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.size`: Exposes CRUD operations for the **Size** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sizes
    * const sizes = await prisma.size.findMany()
    * ```
    */
  get size(): Prisma.SizeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sizeToWork`: Exposes CRUD operations for the **SizeToWork** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SizeToWorks
    * const sizeToWorks = await prisma.sizeToWork.findMany()
    * ```
    */
  get sizeToWork(): Prisma.SizeToWorkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Role: 'Role',
    User: 'User',
    Color: 'Color',
    ProductCategory: 'ProductCategory',
    ProductGroup: 'ProductGroup',
    Product: 'Product',
    ColorToProduct: 'ColorToProduct',
    LaborCost: 'LaborCost',
    Artisan: 'Artisan',
    Work: 'Work',
    Task: 'Task',
    Size: 'Size',
    SizeToWork: 'SizeToWork'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "role" | "user" | "color" | "productCategory" | "productGroup" | "product" | "colorToProduct" | "laborCost" | "artisan" | "work" | "task" | "size" | "sizeToWork"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Color: {
        payload: Prisma.$ColorPayload<ExtArgs>
        fields: Prisma.ColorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          findFirst: {
            args: Prisma.ColorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          findMany: {
            args: Prisma.ColorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          create: {
            args: Prisma.ColorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          createMany: {
            args: Prisma.ColorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          delete: {
            args: Prisma.ColorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          update: {
            args: Prisma.ColorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          deleteMany: {
            args: Prisma.ColorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          upsert: {
            args: Prisma.ColorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          aggregate: {
            args: Prisma.ColorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColor>
          }
          groupBy: {
            args: Prisma.ColorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColorCountArgs<ExtArgs>
            result: $Utils.Optional<ColorCountAggregateOutputType> | number
          }
        }
      }
      ProductCategory: {
        payload: Prisma.$ProductCategoryPayload<ExtArgs>
        fields: Prisma.ProductCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          findFirst: {
            args: Prisma.ProductCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          findMany: {
            args: Prisma.ProductCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[]
          }
          create: {
            args: Prisma.ProductCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          createMany: {
            args: Prisma.ProductCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[]
          }
          delete: {
            args: Prisma.ProductCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          update: {
            args: Prisma.ProductCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ProductCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ProductCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          aggregate: {
            args: Prisma.ProductCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductCategory>
          }
          groupBy: {
            args: Prisma.ProductCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCategoryCountAggregateOutputType> | number
          }
        }
      }
      ProductGroup: {
        payload: Prisma.$ProductGroupPayload<ExtArgs>
        fields: Prisma.ProductGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          findFirst: {
            args: Prisma.ProductGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          findMany: {
            args: Prisma.ProductGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>[]
          }
          create: {
            args: Prisma.ProductGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          createMany: {
            args: Prisma.ProductGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>[]
          }
          delete: {
            args: Prisma.ProductGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          update: {
            args: Prisma.ProductGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          deleteMany: {
            args: Prisma.ProductGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>[]
          }
          upsert: {
            args: Prisma.ProductGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductGroupPayload>
          }
          aggregate: {
            args: Prisma.ProductGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductGroup>
          }
          groupBy: {
            args: Prisma.ProductGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductGroupCountArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ColorToProduct: {
        payload: Prisma.$ColorToProductPayload<ExtArgs>
        fields: Prisma.ColorToProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColorToProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColorToProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          findFirst: {
            args: Prisma.ColorToProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColorToProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          findMany: {
            args: Prisma.ColorToProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>[]
          }
          create: {
            args: Prisma.ColorToProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          createMany: {
            args: Prisma.ColorToProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColorToProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>[]
          }
          delete: {
            args: Prisma.ColorToProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          update: {
            args: Prisma.ColorToProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          deleteMany: {
            args: Prisma.ColorToProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColorToProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColorToProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>[]
          }
          upsert: {
            args: Prisma.ColorToProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorToProductPayload>
          }
          aggregate: {
            args: Prisma.ColorToProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColorToProduct>
          }
          groupBy: {
            args: Prisma.ColorToProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColorToProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColorToProductCountArgs<ExtArgs>
            result: $Utils.Optional<ColorToProductCountAggregateOutputType> | number
          }
        }
      }
      LaborCost: {
        payload: Prisma.$LaborCostPayload<ExtArgs>
        fields: Prisma.LaborCostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaborCostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaborCostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          findFirst: {
            args: Prisma.LaborCostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaborCostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          findMany: {
            args: Prisma.LaborCostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>[]
          }
          create: {
            args: Prisma.LaborCostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          createMany: {
            args: Prisma.LaborCostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaborCostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>[]
          }
          delete: {
            args: Prisma.LaborCostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          update: {
            args: Prisma.LaborCostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          deleteMany: {
            args: Prisma.LaborCostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaborCostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LaborCostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>[]
          }
          upsert: {
            args: Prisma.LaborCostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaborCostPayload>
          }
          aggregate: {
            args: Prisma.LaborCostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaborCost>
          }
          groupBy: {
            args: Prisma.LaborCostGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaborCostGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaborCostCountArgs<ExtArgs>
            result: $Utils.Optional<LaborCostCountAggregateOutputType> | number
          }
        }
      }
      Artisan: {
        payload: Prisma.$ArtisanPayload<ExtArgs>
        fields: Prisma.ArtisanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtisanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtisanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          findFirst: {
            args: Prisma.ArtisanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtisanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          findMany: {
            args: Prisma.ArtisanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>[]
          }
          create: {
            args: Prisma.ArtisanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          createMany: {
            args: Prisma.ArtisanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtisanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>[]
          }
          delete: {
            args: Prisma.ArtisanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          update: {
            args: Prisma.ArtisanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          deleteMany: {
            args: Prisma.ArtisanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtisanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtisanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>[]
          }
          upsert: {
            args: Prisma.ArtisanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtisanPayload>
          }
          aggregate: {
            args: Prisma.ArtisanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtisan>
          }
          groupBy: {
            args: Prisma.ArtisanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtisanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtisanCountArgs<ExtArgs>
            result: $Utils.Optional<ArtisanCountAggregateOutputType> | number
          }
        }
      }
      Work: {
        payload: Prisma.$WorkPayload<ExtArgs>
        fields: Prisma.WorkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          findFirst: {
            args: Prisma.WorkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          findMany: {
            args: Prisma.WorkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          create: {
            args: Prisma.WorkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          createMany: {
            args: Prisma.WorkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          delete: {
            args: Prisma.WorkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          update: {
            args: Prisma.WorkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          deleteMany: {
            args: Prisma.WorkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          upsert: {
            args: Prisma.WorkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          aggregate: {
            args: Prisma.WorkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWork>
          }
          groupBy: {
            args: Prisma.WorkGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkCountArgs<ExtArgs>
            result: $Utils.Optional<WorkCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Size: {
        payload: Prisma.$SizePayload<ExtArgs>
        fields: Prisma.SizeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SizeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SizeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          findFirst: {
            args: Prisma.SizeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SizeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          findMany: {
            args: Prisma.SizeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>[]
          }
          create: {
            args: Prisma.SizeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          createMany: {
            args: Prisma.SizeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SizeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>[]
          }
          delete: {
            args: Prisma.SizeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          update: {
            args: Prisma.SizeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          deleteMany: {
            args: Prisma.SizeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SizeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SizeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>[]
          }
          upsert: {
            args: Prisma.SizeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizePayload>
          }
          aggregate: {
            args: Prisma.SizeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSize>
          }
          groupBy: {
            args: Prisma.SizeGroupByArgs<ExtArgs>
            result: $Utils.Optional<SizeGroupByOutputType>[]
          }
          count: {
            args: Prisma.SizeCountArgs<ExtArgs>
            result: $Utils.Optional<SizeCountAggregateOutputType> | number
          }
        }
      }
      SizeToWork: {
        payload: Prisma.$SizeToWorkPayload<ExtArgs>
        fields: Prisma.SizeToWorkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SizeToWorkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SizeToWorkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          findFirst: {
            args: Prisma.SizeToWorkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SizeToWorkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          findMany: {
            args: Prisma.SizeToWorkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>[]
          }
          create: {
            args: Prisma.SizeToWorkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          createMany: {
            args: Prisma.SizeToWorkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SizeToWorkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>[]
          }
          delete: {
            args: Prisma.SizeToWorkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          update: {
            args: Prisma.SizeToWorkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          deleteMany: {
            args: Prisma.SizeToWorkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SizeToWorkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SizeToWorkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>[]
          }
          upsert: {
            args: Prisma.SizeToWorkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeToWorkPayload>
          }
          aggregate: {
            args: Prisma.SizeToWorkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSizeToWork>
          }
          groupBy: {
            args: Prisma.SizeToWorkGroupByArgs<ExtArgs>
            result: $Utils.Optional<SizeToWorkGroupByOutputType>[]
          }
          count: {
            args: Prisma.SizeToWorkCountArgs<ExtArgs>
            result: $Utils.Optional<SizeToWorkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    role?: RoleOmit
    user?: UserOmit
    color?: ColorOmit
    productCategory?: ProductCategoryOmit
    productGroup?: ProductGroupOmit
    product?: ProductOmit
    colorToProduct?: ColorToProductOmit
    laborCost?: LaborCostOmit
    artisan?: ArtisanOmit
    work?: WorkOmit
    task?: TaskOmit
    size?: SizeOmit
    sizeToWork?: SizeToWorkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdUsers: number
    approvedUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdUsers?: boolean | UserCountOutputTypeCountCreatedUsersArgs
    approvedUsers?: boolean | UserCountOutputTypeCountApprovedUsersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ColorCountOutputType
   */

  export type ColorCountOutputType = {
    productColors: number
  }

  export type ColorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productColors?: boolean | ColorCountOutputTypeCountProductColorsArgs
  }

  // Custom InputTypes
  /**
   * ColorCountOutputType without action
   */
  export type ColorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorCountOutputType
     */
    select?: ColorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColorCountOutputType without action
   */
  export type ColorCountOutputTypeCountProductColorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorToProductWhereInput
  }


  /**
   * Count Type ProductCategoryCountOutputType
   */

  export type ProductCategoryCountOutputType = {
    productGroups: number
  }

  export type ProductCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroups?: boolean | ProductCategoryCountOutputTypeCountProductGroupsArgs
  }

  // Custom InputTypes
  /**
   * ProductCategoryCountOutputType without action
   */
  export type ProductCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategoryCountOutputType
     */
    select?: ProductCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCategoryCountOutputType without action
   */
  export type ProductCategoryCountOutputTypeCountProductGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductGroupWhereInput
  }


  /**
   * Count Type ProductGroupCountOutputType
   */

  export type ProductGroupCountOutputType = {
    products: number
    laborCosts: number
  }

  export type ProductGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ProductGroupCountOutputTypeCountProductsArgs
    laborCosts?: boolean | ProductGroupCountOutputTypeCountLaborCostsArgs
  }

  // Custom InputTypes
  /**
   * ProductGroupCountOutputType without action
   */
  export type ProductGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroupCountOutputType
     */
    select?: ProductGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductGroupCountOutputType without action
   */
  export type ProductGroupCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * ProductGroupCountOutputType without action
   */
  export type ProductGroupCountOutputTypeCountLaborCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaborCostWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    productColors: number
    work: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productColors?: boolean | ProductCountOutputTypeCountProductColorsArgs
    work?: boolean | ProductCountOutputTypeCountWorkArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountProductColorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorToProductWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountWorkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkWhereInput
  }


  /**
   * Count Type LaborCostCountOutputType
   */

  export type LaborCostCountOutputType = {
    tasks: number
  }

  export type LaborCostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | LaborCostCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * LaborCostCountOutputType without action
   */
  export type LaborCostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCostCountOutputType
     */
    select?: LaborCostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LaborCostCountOutputType without action
   */
  export type LaborCostCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type ArtisanCountOutputType
   */

  export type ArtisanCountOutputType = {
    tasks: number
  }

  export type ArtisanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ArtisanCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ArtisanCountOutputType without action
   */
  export type ArtisanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtisanCountOutputType
     */
    select?: ArtisanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtisanCountOutputType without action
   */
  export type ArtisanCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type WorkCountOutputType
   */

  export type WorkCountOutputType = {
    sizes: number
    tasks: number
  }

  export type WorkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sizes?: boolean | WorkCountOutputTypeCountSizesArgs
    tasks?: boolean | WorkCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkCountOutputType
     */
    select?: WorkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountSizesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SizeToWorkWhereInput
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type SizeCountOutputType
   */

  export type SizeCountOutputType = {
    works: number
  }

  export type SizeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    works?: boolean | SizeCountOutputTypeCountWorksArgs
  }

  // Custom InputTypes
  /**
   * SizeCountOutputType without action
   */
  export type SizeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeCountOutputType
     */
    select?: SizeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SizeCountOutputType without action
   */
  export type SizeCountOutputTypeCountWorksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SizeToWorkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
    clearanceLevel: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
    clearanceLevel: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    clearanceLevel: number | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    clearanceLevel: number | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    clearanceLevel: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
    clearanceLevel?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
    clearanceLevel?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    clearanceLevel?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    clearanceLevel?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    clearanceLevel?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    description: string | null
    clearanceLevel: number
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    clearanceLevel?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    clearanceLevel?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    clearanceLevel?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    clearanceLevel?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "clearanceLevel", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      clearanceLevel: number
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly clearanceLevel: FieldRef<"Role", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    roleId: number | null
    createdBy: number | null
    updatedBy: number | null
    approvedBy: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    roleId: number | null
    createdBy: number | null
    updatedBy: number | null
    approvedBy: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    roleId: number | null
    createdBy: number | null
    updatedBy: number | null
    approvedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
    approvedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    roleId: number | null
    createdBy: number | null
    updatedBy: number | null
    approvedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
    approvedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    isActive: number
    roleId: number
    createdBy: number
    updatedBy: number
    approvedBy: number
    createdAt: number
    updatedAt: number
    approvedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    roleId?: true
    createdBy?: true
    updatedBy?: true
    approvedBy?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    roleId?: true
    createdBy?: true
    updatedBy?: true
    approvedBy?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    roleId?: true
    createdBy?: true
    updatedBy?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
    approvedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    roleId?: true
    createdBy?: true
    updatedBy?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
    approvedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    roleId?: true
    createdBy?: true
    updatedBy?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
    approvedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string | null
    isActive: boolean
    roleId: number
    createdBy: number | null
    updatedBy: number | null
    approvedBy: number | null
    createdAt: Date
    updatedAt: Date
    approvedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    roleId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    approvedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
    approvedUsers?: boolean | User$approvedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    roleId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    approvedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    roleId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    approvedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    roleId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    approvedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "isActive" | "roleId" | "createdBy" | "updatedBy" | "approvedBy" | "createdAt" | "updatedAt" | "approvedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
    approvedUsers?: boolean | User$approvedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    creator?: boolean | User$creatorArgs<ExtArgs>
    approver?: boolean | User$approverArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
      createdUsers: Prisma.$UserPayload<ExtArgs>[]
      approver: Prisma.$UserPayload<ExtArgs> | null
      approvedUsers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      firstName: string
      lastName: string | null
      isActive: boolean
      roleId: number
      createdBy: number | null
      updatedBy: number | null
      approvedBy: number | null
      createdAt: Date
      updatedAt: Date
      approvedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends User$creatorArgs<ExtArgs> = {}>(args?: Subset<T, User$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdUsers<T extends User$createdUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$createdUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approver<T extends User$approverArgs<ExtArgs> = {}>(args?: Subset<T, User$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    approvedUsers<T extends User$approvedUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly roleId: FieldRef<"User", 'Int'>
    readonly createdBy: FieldRef<"User", 'Int'>
    readonly updatedBy: FieldRef<"User", 'Int'>
    readonly approvedBy: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly approvedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.creator
   */
  export type User$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.createdUsers
   */
  export type User$createdUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.approver
   */
  export type User$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.approvedUsers
   */
  export type User$approvedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Color
   */

  export type AggregateColor = {
    _count: ColorCountAggregateOutputType | null
    _avg: ColorAvgAggregateOutputType | null
    _sum: ColorSumAggregateOutputType | null
    _min: ColorMinAggregateOutputType | null
    _max: ColorMaxAggregateOutputType | null
  }

  export type ColorAvgAggregateOutputType = {
    id: number | null
  }

  export type ColorSumAggregateOutputType = {
    id: number | null
  }

  export type ColorMinAggregateOutputType = {
    id: number | null
    name: string | null
    hexCode: string | null
  }

  export type ColorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    hexCode: string | null
  }

  export type ColorCountAggregateOutputType = {
    id: number
    name: number
    hexCode: number
    _all: number
  }


  export type ColorAvgAggregateInputType = {
    id?: true
  }

  export type ColorSumAggregateInputType = {
    id?: true
  }

  export type ColorMinAggregateInputType = {
    id?: true
    name?: true
    hexCode?: true
  }

  export type ColorMaxAggregateInputType = {
    id?: true
    name?: true
    hexCode?: true
  }

  export type ColorCountAggregateInputType = {
    id?: true
    name?: true
    hexCode?: true
    _all?: true
  }

  export type ColorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Color to aggregate.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colors
    **/
    _count?: true | ColorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColorMaxAggregateInputType
  }

  export type GetColorAggregateType<T extends ColorAggregateArgs> = {
        [P in keyof T & keyof AggregateColor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColor[P]>
      : GetScalarType<T[P], AggregateColor[P]>
  }




  export type ColorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorWhereInput
    orderBy?: ColorOrderByWithAggregationInput | ColorOrderByWithAggregationInput[]
    by: ColorScalarFieldEnum[] | ColorScalarFieldEnum
    having?: ColorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColorCountAggregateInputType | true
    _avg?: ColorAvgAggregateInputType
    _sum?: ColorSumAggregateInputType
    _min?: ColorMinAggregateInputType
    _max?: ColorMaxAggregateInputType
  }

  export type ColorGroupByOutputType = {
    id: number
    name: string
    hexCode: string
    _count: ColorCountAggregateOutputType | null
    _avg: ColorAvgAggregateOutputType | null
    _sum: ColorSumAggregateOutputType | null
    _min: ColorMinAggregateOutputType | null
    _max: ColorMaxAggregateOutputType | null
  }

  type GetColorGroupByPayload<T extends ColorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColorGroupByOutputType[P]>
            : GetScalarType<T[P], ColorGroupByOutputType[P]>
        }
      >
    >


  export type ColorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    hexCode?: boolean
    productColors?: boolean | Color$productColorsArgs<ExtArgs>
    _count?: boolean | ColorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["color"]>

  export type ColorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    hexCode?: boolean
  }, ExtArgs["result"]["color"]>

  export type ColorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    hexCode?: boolean
  }, ExtArgs["result"]["color"]>

  export type ColorSelectScalar = {
    id?: boolean
    name?: boolean
    hexCode?: boolean
  }

  export type ColorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "hexCode", ExtArgs["result"]["color"]>
  export type ColorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productColors?: boolean | Color$productColorsArgs<ExtArgs>
    _count?: boolean | ColorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ColorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ColorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Color"
    objects: {
      productColors: Prisma.$ColorToProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      hexCode: string
    }, ExtArgs["result"]["color"]>
    composites: {}
  }

  type ColorGetPayload<S extends boolean | null | undefined | ColorDefaultArgs> = $Result.GetResult<Prisma.$ColorPayload, S>

  type ColorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ColorCountAggregateInputType | true
    }

  export interface ColorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Color'], meta: { name: 'Color' } }
    /**
     * Find zero or one Color that matches the filter.
     * @param {ColorFindUniqueArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColorFindUniqueArgs>(args: SelectSubset<T, ColorFindUniqueArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Color that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColorFindUniqueOrThrowArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColorFindUniqueOrThrowArgs>(args: SelectSubset<T, ColorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Color that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindFirstArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColorFindFirstArgs>(args?: SelectSubset<T, ColorFindFirstArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Color that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindFirstOrThrowArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColorFindFirstOrThrowArgs>(args?: SelectSubset<T, ColorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Colors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colors
     * const colors = await prisma.color.findMany()
     * 
     * // Get first 10 Colors
     * const colors = await prisma.color.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colorWithIdOnly = await prisma.color.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColorFindManyArgs>(args?: SelectSubset<T, ColorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Color.
     * @param {ColorCreateArgs} args - Arguments to create a Color.
     * @example
     * // Create one Color
     * const Color = await prisma.color.create({
     *   data: {
     *     // ... data to create a Color
     *   }
     * })
     * 
     */
    create<T extends ColorCreateArgs>(args: SelectSubset<T, ColorCreateArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Colors.
     * @param {ColorCreateManyArgs} args - Arguments to create many Colors.
     * @example
     * // Create many Colors
     * const color = await prisma.color.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColorCreateManyArgs>(args?: SelectSubset<T, ColorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colors and returns the data saved in the database.
     * @param {ColorCreateManyAndReturnArgs} args - Arguments to create many Colors.
     * @example
     * // Create many Colors
     * const color = await prisma.color.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colors and only return the `id`
     * const colorWithIdOnly = await prisma.color.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColorCreateManyAndReturnArgs>(args?: SelectSubset<T, ColorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Color.
     * @param {ColorDeleteArgs} args - Arguments to delete one Color.
     * @example
     * // Delete one Color
     * const Color = await prisma.color.delete({
     *   where: {
     *     // ... filter to delete one Color
     *   }
     * })
     * 
     */
    delete<T extends ColorDeleteArgs>(args: SelectSubset<T, ColorDeleteArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Color.
     * @param {ColorUpdateArgs} args - Arguments to update one Color.
     * @example
     * // Update one Color
     * const color = await prisma.color.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColorUpdateArgs>(args: SelectSubset<T, ColorUpdateArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Colors.
     * @param {ColorDeleteManyArgs} args - Arguments to filter Colors to delete.
     * @example
     * // Delete a few Colors
     * const { count } = await prisma.color.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColorDeleteManyArgs>(args?: SelectSubset<T, ColorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colors
     * const color = await prisma.color.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColorUpdateManyArgs>(args: SelectSubset<T, ColorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colors and returns the data updated in the database.
     * @param {ColorUpdateManyAndReturnArgs} args - Arguments to update many Colors.
     * @example
     * // Update many Colors
     * const color = await prisma.color.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colors and only return the `id`
     * const colorWithIdOnly = await prisma.color.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColorUpdateManyAndReturnArgs>(args: SelectSubset<T, ColorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Color.
     * @param {ColorUpsertArgs} args - Arguments to update or create a Color.
     * @example
     * // Update or create a Color
     * const color = await prisma.color.upsert({
     *   create: {
     *     // ... data to create a Color
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Color we want to update
     *   }
     * })
     */
    upsert<T extends ColorUpsertArgs>(args: SelectSubset<T, ColorUpsertArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Colors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorCountArgs} args - Arguments to filter Colors to count.
     * @example
     * // Count the number of Colors
     * const count = await prisma.color.count({
     *   where: {
     *     // ... the filter for the Colors we want to count
     *   }
     * })
    **/
    count<T extends ColorCountArgs>(
      args?: Subset<T, ColorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Color.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColorAggregateArgs>(args: Subset<T, ColorAggregateArgs>): Prisma.PrismaPromise<GetColorAggregateType<T>>

    /**
     * Group by Color.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColorGroupByArgs['orderBy'] }
        : { orderBy?: ColorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Color model
   */
  readonly fields: ColorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Color.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productColors<T extends Color$productColorsArgs<ExtArgs> = {}>(args?: Subset<T, Color$productColorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Color model
   */
  interface ColorFieldRefs {
    readonly id: FieldRef<"Color", 'Int'>
    readonly name: FieldRef<"Color", 'String'>
    readonly hexCode: FieldRef<"Color", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Color findUnique
   */
  export type ColorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where: ColorWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color findUniqueOrThrow
   */
  export type ColorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where: ColorWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color findFirst
   */
  export type ColorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colors.
     */
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color findFirstOrThrow
   */
  export type ColorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colors.
     */
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color findMany
   */
  export type ColorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Colors to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color create
   */
  export type ColorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The data needed to create a Color.
     */
    data: XOR<ColorCreateInput, ColorUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color createMany
   */
  export type ColorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colors.
     */
    data: ColorCreateManyInput | ColorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Color createManyAndReturn
   */
  export type ColorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * The data used to create many Colors.
     */
    data: ColorCreateManyInput | ColorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Color update
   */
  export type ColorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The data needed to update a Color.
     */
    data: XOR<ColorUpdateInput, ColorUncheckedUpdateInput>
    /**
     * Choose, which Color to update.
     */
    where: ColorWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color updateMany
   */
  export type ColorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colors.
     */
    data: XOR<ColorUpdateManyMutationInput, ColorUncheckedUpdateManyInput>
    /**
     * Filter which Colors to update
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to update.
     */
    limit?: number
  }

  /**
   * Color updateManyAndReturn
   */
  export type ColorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * The data used to update Colors.
     */
    data: XOR<ColorUpdateManyMutationInput, ColorUncheckedUpdateManyInput>
    /**
     * Filter which Colors to update
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to update.
     */
    limit?: number
  }

  /**
   * Color upsert
   */
  export type ColorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The filter to search for the Color to update in case it exists.
     */
    where: ColorWhereUniqueInput
    /**
     * In case the Color found by the `where` argument doesn't exist, create a new Color with this data.
     */
    create: XOR<ColorCreateInput, ColorUncheckedCreateInput>
    /**
     * In case the Color was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColorUpdateInput, ColorUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color delete
   */
  export type ColorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter which Color to delete.
     */
    where: ColorWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Color deleteMany
   */
  export type ColorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colors to delete
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to delete.
     */
    limit?: number
  }

  /**
   * Color.productColors
   */
  export type Color$productColorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    where?: ColorToProductWhereInput
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    cursor?: ColorToProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColorToProductScalarFieldEnum | ColorToProductScalarFieldEnum[]
  }

  /**
   * Color without action
   */
  export type ColorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
  }


  /**
   * Model ProductCategory
   */

  export type AggregateProductCategory = {
    _count: ProductCategoryCountAggregateOutputType | null
    _avg: ProductCategoryAvgAggregateOutputType | null
    _sum: ProductCategorySumAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  export type ProductCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type ProductCategorySumAggregateOutputType = {
    id: number | null
  }

  export type ProductCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    gender: $Enums.Gender | null
  }

  export type ProductCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    gender: $Enums.Gender | null
  }

  export type ProductCategoryCountAggregateOutputType = {
    id: number
    name: number
    gender: number
    _all: number
  }


  export type ProductCategoryAvgAggregateInputType = {
    id?: true
  }

  export type ProductCategorySumAggregateInputType = {
    id?: true
  }

  export type ProductCategoryMinAggregateInputType = {
    id?: true
    name?: true
    gender?: true
  }

  export type ProductCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    gender?: true
  }

  export type ProductCategoryCountAggregateInputType = {
    id?: true
    name?: true
    gender?: true
    _all?: true
  }

  export type ProductCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCategory to aggregate.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductCategories
    **/
    _count?: true | ProductCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductCategoryMaxAggregateInputType
  }

  export type GetProductCategoryAggregateType<T extends ProductCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateProductCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductCategory[P]>
      : GetScalarType<T[P], AggregateProductCategory[P]>
  }




  export type ProductCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCategoryWhereInput
    orderBy?: ProductCategoryOrderByWithAggregationInput | ProductCategoryOrderByWithAggregationInput[]
    by: ProductCategoryScalarFieldEnum[] | ProductCategoryScalarFieldEnum
    having?: ProductCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCategoryCountAggregateInputType | true
    _avg?: ProductCategoryAvgAggregateInputType
    _sum?: ProductCategorySumAggregateInputType
    _min?: ProductCategoryMinAggregateInputType
    _max?: ProductCategoryMaxAggregateInputType
  }

  export type ProductCategoryGroupByOutputType = {
    id: number
    name: string
    gender: $Enums.Gender
    _count: ProductCategoryCountAggregateOutputType | null
    _avg: ProductCategoryAvgAggregateOutputType | null
    _sum: ProductCategorySumAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  type GetProductCategoryGroupByPayload<T extends ProductCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ProductCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gender?: boolean
    productGroups?: boolean | ProductCategory$productGroupsArgs<ExtArgs>
    _count?: boolean | ProductCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productCategory"]>

  export type ProductCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gender?: boolean
  }, ExtArgs["result"]["productCategory"]>

  export type ProductCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gender?: boolean
  }, ExtArgs["result"]["productCategory"]>

  export type ProductCategorySelectScalar = {
    id?: boolean
    name?: boolean
    gender?: boolean
  }

  export type ProductCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "gender", ExtArgs["result"]["productCategory"]>
  export type ProductCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroups?: boolean | ProductCategory$productGroupsArgs<ExtArgs>
    _count?: boolean | ProductCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductCategory"
    objects: {
      productGroups: Prisma.$ProductGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      gender: $Enums.Gender
    }, ExtArgs["result"]["productCategory"]>
    composites: {}
  }

  type ProductCategoryGetPayload<S extends boolean | null | undefined | ProductCategoryDefaultArgs> = $Result.GetResult<Prisma.$ProductCategoryPayload, S>

  type ProductCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ProductCategoryCountAggregateInputType | true
    }

  export interface ProductCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductCategory'], meta: { name: 'ProductCategory' } }
    /**
     * Find zero or one ProductCategory that matches the filter.
     * @param {ProductCategoryFindUniqueArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCategoryFindUniqueArgs>(args: SelectSubset<T, ProductCategoryFindUniqueArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductCategoryFindUniqueOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCategoryFindFirstArgs>(args?: SelectSubset<T, ProductCategoryFindFirstArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCategories
     * const productCategories = await prisma.productCategory.findMany()
     * 
     * // Get first 10 ProductCategories
     * const productCategories = await prisma.productCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductCategoryFindManyArgs>(args?: SelectSubset<T, ProductCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductCategory.
     * @param {ProductCategoryCreateArgs} args - Arguments to create a ProductCategory.
     * @example
     * // Create one ProductCategory
     * const ProductCategory = await prisma.productCategory.create({
     *   data: {
     *     // ... data to create a ProductCategory
     *   }
     * })
     * 
     */
    create<T extends ProductCategoryCreateArgs>(args: SelectSubset<T, ProductCategoryCreateArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductCategories.
     * @param {ProductCategoryCreateManyArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCategoryCreateManyArgs>(args?: SelectSubset<T, ProductCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductCategories and returns the data saved in the database.
     * @param {ProductCategoryCreateManyAndReturnArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductCategories and only return the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductCategory.
     * @param {ProductCategoryDeleteArgs} args - Arguments to delete one ProductCategory.
     * @example
     * // Delete one ProductCategory
     * const ProductCategory = await prisma.productCategory.delete({
     *   where: {
     *     // ... filter to delete one ProductCategory
     *   }
     * })
     * 
     */
    delete<T extends ProductCategoryDeleteArgs>(args: SelectSubset<T, ProductCategoryDeleteArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductCategory.
     * @param {ProductCategoryUpdateArgs} args - Arguments to update one ProductCategory.
     * @example
     * // Update one ProductCategory
     * const productCategory = await prisma.productCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductCategoryUpdateArgs>(args: SelectSubset<T, ProductCategoryUpdateArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductCategories.
     * @param {ProductCategoryDeleteManyArgs} args - Arguments to filter ProductCategories to delete.
     * @example
     * // Delete a few ProductCategories
     * const { count } = await prisma.productCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductCategoryDeleteManyArgs>(args?: SelectSubset<T, ProductCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCategories
     * const productCategory = await prisma.productCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductCategoryUpdateManyArgs>(args: SelectSubset<T, ProductCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCategories and returns the data updated in the database.
     * @param {ProductCategoryUpdateManyAndReturnArgs} args - Arguments to update many ProductCategories.
     * @example
     * // Update many ProductCategories
     * const productCategory = await prisma.productCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductCategories and only return the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductCategory.
     * @param {ProductCategoryUpsertArgs} args - Arguments to update or create a ProductCategory.
     * @example
     * // Update or create a ProductCategory
     * const productCategory = await prisma.productCategory.upsert({
     *   create: {
     *     // ... data to create a ProductCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCategory we want to update
     *   }
     * })
     */
    upsert<T extends ProductCategoryUpsertArgs>(args: SelectSubset<T, ProductCategoryUpsertArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryCountArgs} args - Arguments to filter ProductCategories to count.
     * @example
     * // Count the number of ProductCategories
     * const count = await prisma.productCategory.count({
     *   where: {
     *     // ... the filter for the ProductCategories we want to count
     *   }
     * })
    **/
    count<T extends ProductCategoryCountArgs>(
      args?: Subset<T, ProductCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductCategoryAggregateArgs>(args: Subset<T, ProductCategoryAggregateArgs>): Prisma.PrismaPromise<GetProductCategoryAggregateType<T>>

    /**
     * Group by ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ProductCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductCategory model
   */
  readonly fields: ProductCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productGroups<T extends ProductCategory$productGroupsArgs<ExtArgs> = {}>(args?: Subset<T, ProductCategory$productGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductCategory model
   */
  interface ProductCategoryFieldRefs {
    readonly id: FieldRef<"ProductCategory", 'Int'>
    readonly name: FieldRef<"ProductCategory", 'String'>
    readonly gender: FieldRef<"ProductCategory", 'Gender'>
  }
    

  // Custom InputTypes
  /**
   * ProductCategory findUnique
   */
  export type ProductCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory findUniqueOrThrow
   */
  export type ProductCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory findFirst
   */
  export type ProductCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCategories.
     */
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory findFirstOrThrow
   */
  export type ProductCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCategories.
     */
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory findMany
   */
  export type ProductCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategories to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory create
   */
  export type ProductCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductCategory.
     */
    data: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory createMany
   */
  export type ProductCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductCategory createManyAndReturn
   */
  export type ProductCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductCategory update
   */
  export type ProductCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductCategory.
     */
    data: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
    /**
     * Choose, which ProductCategory to update.
     */
    where: ProductCategoryWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory updateMany
   */
  export type ProductCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductCategories.
     */
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductCategories to update
     */
    where?: ProductCategoryWhereInput
    /**
     * Limit how many ProductCategories to update.
     */
    limit?: number
  }

  /**
   * ProductCategory updateManyAndReturn
   */
  export type ProductCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ProductCategories.
     */
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductCategories to update
     */
    where?: ProductCategoryWhereInput
    /**
     * Limit how many ProductCategories to update.
     */
    limit?: number
  }

  /**
   * ProductCategory upsert
   */
  export type ProductCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductCategory to update in case it exists.
     */
    where: ProductCategoryWhereUniqueInput
    /**
     * In case the ProductCategory found by the `where` argument doesn't exist, create a new ProductCategory with this data.
     */
    create: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
    /**
     * In case the ProductCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory delete
   */
  export type ProductCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter which ProductCategory to delete.
     */
    where: ProductCategoryWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductCategory deleteMany
   */
  export type ProductCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCategories to delete
     */
    where?: ProductCategoryWhereInput
    /**
     * Limit how many ProductCategories to delete.
     */
    limit?: number
  }

  /**
   * ProductCategory.productGroups
   */
  export type ProductCategory$productGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    where?: ProductGroupWhereInput
    orderBy?: ProductGroupOrderByWithRelationInput | ProductGroupOrderByWithRelationInput[]
    cursor?: ProductGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductGroupScalarFieldEnum | ProductGroupScalarFieldEnum[]
  }

  /**
   * ProductCategory without action
   */
  export type ProductCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCategory
     */
    omit?: ProductCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
  }


  /**
   * Model ProductGroup
   */

  export type AggregateProductGroup = {
    _count: ProductGroupCountAggregateOutputType | null
    _avg: ProductGroupAvgAggregateOutputType | null
    _sum: ProductGroupSumAggregateOutputType | null
    _min: ProductGroupMinAggregateOutputType | null
    _max: ProductGroupMaxAggregateOutputType | null
  }

  export type ProductGroupAvgAggregateOutputType = {
    id: number | null
    productCategoryId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ProductGroupSumAggregateOutputType = {
    id: number | null
    productCategoryId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ProductGroupMinAggregateOutputType = {
    id: number | null
    skuNumeric: string | null
    productCategoryId: number | null
    name: string | null
    createdAt: Date | null
    createdBy: number | null
    updatedAt: Date | null
    updatedBy: number | null
  }

  export type ProductGroupMaxAggregateOutputType = {
    id: number | null
    skuNumeric: string | null
    productCategoryId: number | null
    name: string | null
    createdAt: Date | null
    createdBy: number | null
    updatedAt: Date | null
    updatedBy: number | null
  }

  export type ProductGroupCountAggregateOutputType = {
    id: number
    skuNumeric: number
    productCategoryId: number
    name: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type ProductGroupAvgAggregateInputType = {
    id?: true
    productCategoryId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductGroupSumAggregateInputType = {
    id?: true
    productCategoryId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductGroupMinAggregateInputType = {
    id?: true
    skuNumeric?: true
    productCategoryId?: true
    name?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ProductGroupMaxAggregateInputType = {
    id?: true
    skuNumeric?: true
    productCategoryId?: true
    name?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ProductGroupCountAggregateInputType = {
    id?: true
    skuNumeric?: true
    productCategoryId?: true
    name?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type ProductGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductGroup to aggregate.
     */
    where?: ProductGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductGroups to fetch.
     */
    orderBy?: ProductGroupOrderByWithRelationInput | ProductGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductGroups
    **/
    _count?: true | ProductGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductGroupMaxAggregateInputType
  }

  export type GetProductGroupAggregateType<T extends ProductGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateProductGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductGroup[P]>
      : GetScalarType<T[P], AggregateProductGroup[P]>
  }




  export type ProductGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductGroupWhereInput
    orderBy?: ProductGroupOrderByWithAggregationInput | ProductGroupOrderByWithAggregationInput[]
    by: ProductGroupScalarFieldEnum[] | ProductGroupScalarFieldEnum
    having?: ProductGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductGroupCountAggregateInputType | true
    _avg?: ProductGroupAvgAggregateInputType
    _sum?: ProductGroupSumAggregateInputType
    _min?: ProductGroupMinAggregateInputType
    _max?: ProductGroupMaxAggregateInputType
  }

  export type ProductGroupGroupByOutputType = {
    id: number
    skuNumeric: string
    productCategoryId: number
    name: string | null
    createdAt: Date
    createdBy: number
    updatedAt: Date
    updatedBy: number | null
    _count: ProductGroupCountAggregateOutputType | null
    _avg: ProductGroupAvgAggregateOutputType | null
    _sum: ProductGroupSumAggregateOutputType | null
    _min: ProductGroupMinAggregateOutputType | null
    _max: ProductGroupMaxAggregateOutputType | null
  }

  type GetProductGroupGroupByPayload<T extends ProductGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupGroupByOutputType[P]>
        }
      >
    >


  export type ProductGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuNumeric?: boolean
    productCategoryId?: boolean
    name?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    products?: boolean | ProductGroup$productsArgs<ExtArgs>
    laborCosts?: boolean | ProductGroup$laborCostsArgs<ExtArgs>
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
    _count?: boolean | ProductGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productGroup"]>

  export type ProductGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuNumeric?: boolean
    productCategoryId?: boolean
    name?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productGroup"]>

  export type ProductGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuNumeric?: boolean
    productCategoryId?: boolean
    name?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productGroup"]>

  export type ProductGroupSelectScalar = {
    id?: boolean
    skuNumeric?: boolean
    productCategoryId?: boolean
    name?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type ProductGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skuNumeric" | "productCategoryId" | "name" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["productGroup"]>
  export type ProductGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ProductGroup$productsArgs<ExtArgs>
    laborCosts?: boolean | ProductGroup$laborCostsArgs<ExtArgs>
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
    _count?: boolean | ProductGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
  }
  export type ProductGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productCategory?: boolean | ProductCategoryDefaultArgs<ExtArgs>
  }

  export type $ProductGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductGroup"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
      laborCosts: Prisma.$LaborCostPayload<ExtArgs>[]
      productCategory: Prisma.$ProductCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      skuNumeric: string
      productCategoryId: number
      name: string | null
      createdAt: Date
      createdBy: number
      updatedAt: Date
      updatedBy: number | null
    }, ExtArgs["result"]["productGroup"]>
    composites: {}
  }

  type ProductGroupGetPayload<S extends boolean | null | undefined | ProductGroupDefaultArgs> = $Result.GetResult<Prisma.$ProductGroupPayload, S>

  type ProductGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ProductGroupCountAggregateInputType | true
    }

  export interface ProductGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductGroup'], meta: { name: 'ProductGroup' } }
    /**
     * Find zero or one ProductGroup that matches the filter.
     * @param {ProductGroupFindUniqueArgs} args - Arguments to find a ProductGroup
     * @example
     * // Get one ProductGroup
     * const productGroup = await prisma.productGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductGroupFindUniqueArgs>(args: SelectSubset<T, ProductGroupFindUniqueArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductGroupFindUniqueOrThrowArgs} args - Arguments to find a ProductGroup
     * @example
     * // Get one ProductGroup
     * const productGroup = await prisma.productGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupFindFirstArgs} args - Arguments to find a ProductGroup
     * @example
     * // Get one ProductGroup
     * const productGroup = await prisma.productGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductGroupFindFirstArgs>(args?: SelectSubset<T, ProductGroupFindFirstArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupFindFirstOrThrowArgs} args - Arguments to find a ProductGroup
     * @example
     * // Get one ProductGroup
     * const productGroup = await prisma.productGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductGroups
     * const productGroups = await prisma.productGroup.findMany()
     * 
     * // Get first 10 ProductGroups
     * const productGroups = await prisma.productGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productGroupWithIdOnly = await prisma.productGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductGroupFindManyArgs>(args?: SelectSubset<T, ProductGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductGroup.
     * @param {ProductGroupCreateArgs} args - Arguments to create a ProductGroup.
     * @example
     * // Create one ProductGroup
     * const ProductGroup = await prisma.productGroup.create({
     *   data: {
     *     // ... data to create a ProductGroup
     *   }
     * })
     * 
     */
    create<T extends ProductGroupCreateArgs>(args: SelectSubset<T, ProductGroupCreateArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductGroups.
     * @param {ProductGroupCreateManyArgs} args - Arguments to create many ProductGroups.
     * @example
     * // Create many ProductGroups
     * const productGroup = await prisma.productGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductGroupCreateManyArgs>(args?: SelectSubset<T, ProductGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductGroups and returns the data saved in the database.
     * @param {ProductGroupCreateManyAndReturnArgs} args - Arguments to create many ProductGroups.
     * @example
     * // Create many ProductGroups
     * const productGroup = await prisma.productGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductGroups and only return the `id`
     * const productGroupWithIdOnly = await prisma.productGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductGroup.
     * @param {ProductGroupDeleteArgs} args - Arguments to delete one ProductGroup.
     * @example
     * // Delete one ProductGroup
     * const ProductGroup = await prisma.productGroup.delete({
     *   where: {
     *     // ... filter to delete one ProductGroup
     *   }
     * })
     * 
     */
    delete<T extends ProductGroupDeleteArgs>(args: SelectSubset<T, ProductGroupDeleteArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductGroup.
     * @param {ProductGroupUpdateArgs} args - Arguments to update one ProductGroup.
     * @example
     * // Update one ProductGroup
     * const productGroup = await prisma.productGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductGroupUpdateArgs>(args: SelectSubset<T, ProductGroupUpdateArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductGroups.
     * @param {ProductGroupDeleteManyArgs} args - Arguments to filter ProductGroups to delete.
     * @example
     * // Delete a few ProductGroups
     * const { count } = await prisma.productGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductGroupDeleteManyArgs>(args?: SelectSubset<T, ProductGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductGroups
     * const productGroup = await prisma.productGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductGroupUpdateManyArgs>(args: SelectSubset<T, ProductGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductGroups and returns the data updated in the database.
     * @param {ProductGroupUpdateManyAndReturnArgs} args - Arguments to update many ProductGroups.
     * @example
     * // Update many ProductGroups
     * const productGroup = await prisma.productGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductGroups and only return the `id`
     * const productGroupWithIdOnly = await prisma.productGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductGroup.
     * @param {ProductGroupUpsertArgs} args - Arguments to update or create a ProductGroup.
     * @example
     * // Update or create a ProductGroup
     * const productGroup = await prisma.productGroup.upsert({
     *   create: {
     *     // ... data to create a ProductGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductGroup we want to update
     *   }
     * })
     */
    upsert<T extends ProductGroupUpsertArgs>(args: SelectSubset<T, ProductGroupUpsertArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupCountArgs} args - Arguments to filter ProductGroups to count.
     * @example
     * // Count the number of ProductGroups
     * const count = await prisma.productGroup.count({
     *   where: {
     *     // ... the filter for the ProductGroups we want to count
     *   }
     * })
    **/
    count<T extends ProductGroupCountArgs>(
      args?: Subset<T, ProductGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductGroupAggregateArgs>(args: Subset<T, ProductGroupAggregateArgs>): Prisma.PrismaPromise<GetProductGroupAggregateType<T>>

    /**
     * Group by ProductGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductGroup model
   */
  readonly fields: ProductGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends ProductGroup$productsArgs<ExtArgs> = {}>(args?: Subset<T, ProductGroup$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    laborCosts<T extends ProductGroup$laborCostsArgs<ExtArgs> = {}>(args?: Subset<T, ProductGroup$laborCostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productCategory<T extends ProductCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductCategoryDefaultArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductGroup model
   */
  interface ProductGroupFieldRefs {
    readonly id: FieldRef<"ProductGroup", 'Int'>
    readonly skuNumeric: FieldRef<"ProductGroup", 'String'>
    readonly productCategoryId: FieldRef<"ProductGroup", 'Int'>
    readonly name: FieldRef<"ProductGroup", 'String'>
    readonly createdAt: FieldRef<"ProductGroup", 'DateTime'>
    readonly createdBy: FieldRef<"ProductGroup", 'Int'>
    readonly updatedAt: FieldRef<"ProductGroup", 'DateTime'>
    readonly updatedBy: FieldRef<"ProductGroup", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductGroup findUnique
   */
  export type ProductGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter, which ProductGroup to fetch.
     */
    where: ProductGroupWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup findUniqueOrThrow
   */
  export type ProductGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter, which ProductGroup to fetch.
     */
    where: ProductGroupWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup findFirst
   */
  export type ProductGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter, which ProductGroup to fetch.
     */
    where?: ProductGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductGroups to fetch.
     */
    orderBy?: ProductGroupOrderByWithRelationInput | ProductGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductGroups.
     */
    cursor?: ProductGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductGroups.
     */
    distinct?: ProductGroupScalarFieldEnum | ProductGroupScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup findFirstOrThrow
   */
  export type ProductGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter, which ProductGroup to fetch.
     */
    where?: ProductGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductGroups to fetch.
     */
    orderBy?: ProductGroupOrderByWithRelationInput | ProductGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductGroups.
     */
    cursor?: ProductGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductGroups.
     */
    distinct?: ProductGroupScalarFieldEnum | ProductGroupScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup findMany
   */
  export type ProductGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter, which ProductGroups to fetch.
     */
    where?: ProductGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductGroups to fetch.
     */
    orderBy?: ProductGroupOrderByWithRelationInput | ProductGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductGroups.
     */
    cursor?: ProductGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductGroups.
     */
    skip?: number
    distinct?: ProductGroupScalarFieldEnum | ProductGroupScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup create
   */
  export type ProductGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductGroup.
     */
    data: XOR<ProductGroupCreateInput, ProductGroupUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup createMany
   */
  export type ProductGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductGroups.
     */
    data: ProductGroupCreateManyInput | ProductGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductGroup createManyAndReturn
   */
  export type ProductGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * The data used to create many ProductGroups.
     */
    data: ProductGroupCreateManyInput | ProductGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductGroup update
   */
  export type ProductGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductGroup.
     */
    data: XOR<ProductGroupUpdateInput, ProductGroupUncheckedUpdateInput>
    /**
     * Choose, which ProductGroup to update.
     */
    where: ProductGroupWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup updateMany
   */
  export type ProductGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductGroups.
     */
    data: XOR<ProductGroupUpdateManyMutationInput, ProductGroupUncheckedUpdateManyInput>
    /**
     * Filter which ProductGroups to update
     */
    where?: ProductGroupWhereInput
    /**
     * Limit how many ProductGroups to update.
     */
    limit?: number
  }

  /**
   * ProductGroup updateManyAndReturn
   */
  export type ProductGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * The data used to update ProductGroups.
     */
    data: XOR<ProductGroupUpdateManyMutationInput, ProductGroupUncheckedUpdateManyInput>
    /**
     * Filter which ProductGroups to update
     */
    where?: ProductGroupWhereInput
    /**
     * Limit how many ProductGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductGroup upsert
   */
  export type ProductGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductGroup to update in case it exists.
     */
    where: ProductGroupWhereUniqueInput
    /**
     * In case the ProductGroup found by the `where` argument doesn't exist, create a new ProductGroup with this data.
     */
    create: XOR<ProductGroupCreateInput, ProductGroupUncheckedCreateInput>
    /**
     * In case the ProductGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductGroupUpdateInput, ProductGroupUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup delete
   */
  export type ProductGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
    /**
     * Filter which ProductGroup to delete.
     */
    where: ProductGroupWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ProductGroup deleteMany
   */
  export type ProductGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductGroups to delete
     */
    where?: ProductGroupWhereInput
    /**
     * Limit how many ProductGroups to delete.
     */
    limit?: number
  }

  /**
   * ProductGroup.products
   */
  export type ProductGroup$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * ProductGroup.laborCosts
   */
  export type ProductGroup$laborCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    where?: LaborCostWhereInput
    orderBy?: LaborCostOrderByWithRelationInput | LaborCostOrderByWithRelationInput[]
    cursor?: LaborCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LaborCostScalarFieldEnum | LaborCostScalarFieldEnum[]
  }

  /**
   * ProductGroup without action
   */
  export type ProductGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductGroup
     */
    select?: ProductGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductGroup
     */
    omit?: ProductGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductGroupInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    sku: string | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    sku: string | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    productGroupId: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    sku: string
    productGroupId: number
    createdBy: number
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productColors?: boolean | Product$productColorsArgs<ExtArgs>
    work?: boolean | Product$workArgs<ExtArgs>
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sku" | "productGroupId" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productColors?: boolean | Product$productColorsArgs<ExtArgs>
    work?: boolean | Product$workArgs<ExtArgs>
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      productColors: Prisma.$ColorToProductPayload<ExtArgs>[]
      work: Prisma.$WorkPayload<ExtArgs>[]
      productGroup: Prisma.$ProductGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sku: string
      productGroupId: number
      createdBy: number
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productColors<T extends Product$productColorsArgs<ExtArgs> = {}>(args?: Subset<T, Product$productColorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    work<T extends Product$workArgs<ExtArgs> = {}>(args?: Subset<T, Product$workArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productGroup<T extends ProductGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductGroupDefaultArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly productGroupId: FieldRef<"Product", 'Int'>
    readonly createdBy: FieldRef<"Product", 'Int'>
    readonly updatedBy: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.productColors
   */
  export type Product$productColorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    where?: ColorToProductWhereInput
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    cursor?: ColorToProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColorToProductScalarFieldEnum | ColorToProductScalarFieldEnum[]
  }

  /**
   * Product.work
   */
  export type Product$workArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    where?: WorkWhereInput
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    cursor?: WorkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ColorToProduct
   */

  export type AggregateColorToProduct = {
    _count: ColorToProductCountAggregateOutputType | null
    _avg: ColorToProductAvgAggregateOutputType | null
    _sum: ColorToProductSumAggregateOutputType | null
    _min: ColorToProductMinAggregateOutputType | null
    _max: ColorToProductMaxAggregateOutputType | null
  }

  export type ColorToProductAvgAggregateOutputType = {
    productId: number | null
    colorId: number | null
    order: number | null
  }

  export type ColorToProductSumAggregateOutputType = {
    productId: number | null
    colorId: number | null
    order: number | null
  }

  export type ColorToProductMinAggregateOutputType = {
    productId: number | null
    colorId: number | null
    order: number | null
  }

  export type ColorToProductMaxAggregateOutputType = {
    productId: number | null
    colorId: number | null
    order: number | null
  }

  export type ColorToProductCountAggregateOutputType = {
    productId: number
    colorId: number
    order: number
    _all: number
  }


  export type ColorToProductAvgAggregateInputType = {
    productId?: true
    colorId?: true
    order?: true
  }

  export type ColorToProductSumAggregateInputType = {
    productId?: true
    colorId?: true
    order?: true
  }

  export type ColorToProductMinAggregateInputType = {
    productId?: true
    colorId?: true
    order?: true
  }

  export type ColorToProductMaxAggregateInputType = {
    productId?: true
    colorId?: true
    order?: true
  }

  export type ColorToProductCountAggregateInputType = {
    productId?: true
    colorId?: true
    order?: true
    _all?: true
  }

  export type ColorToProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColorToProduct to aggregate.
     */
    where?: ColorToProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorToProducts to fetch.
     */
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColorToProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorToProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorToProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ColorToProducts
    **/
    _count?: true | ColorToProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColorToProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColorToProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColorToProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColorToProductMaxAggregateInputType
  }

  export type GetColorToProductAggregateType<T extends ColorToProductAggregateArgs> = {
        [P in keyof T & keyof AggregateColorToProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColorToProduct[P]>
      : GetScalarType<T[P], AggregateColorToProduct[P]>
  }




  export type ColorToProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorToProductWhereInput
    orderBy?: ColorToProductOrderByWithAggregationInput | ColorToProductOrderByWithAggregationInput[]
    by: ColorToProductScalarFieldEnum[] | ColorToProductScalarFieldEnum
    having?: ColorToProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColorToProductCountAggregateInputType | true
    _avg?: ColorToProductAvgAggregateInputType
    _sum?: ColorToProductSumAggregateInputType
    _min?: ColorToProductMinAggregateInputType
    _max?: ColorToProductMaxAggregateInputType
  }

  export type ColorToProductGroupByOutputType = {
    productId: number
    colorId: number
    order: number
    _count: ColorToProductCountAggregateOutputType | null
    _avg: ColorToProductAvgAggregateOutputType | null
    _sum: ColorToProductSumAggregateOutputType | null
    _min: ColorToProductMinAggregateOutputType | null
    _max: ColorToProductMaxAggregateOutputType | null
  }

  type GetColorToProductGroupByPayload<T extends ColorToProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColorToProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColorToProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColorToProductGroupByOutputType[P]>
            : GetScalarType<T[P], ColorToProductGroupByOutputType[P]>
        }
      >
    >


  export type ColorToProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    colorId?: boolean
    order?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorToProduct"]>

  export type ColorToProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    colorId?: boolean
    order?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorToProduct"]>

  export type ColorToProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    colorId?: boolean
    order?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorToProduct"]>

  export type ColorToProductSelectScalar = {
    productId?: boolean
    colorId?: boolean
    order?: boolean
  }

  export type ColorToProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"productId" | "colorId" | "order", ExtArgs["result"]["colorToProduct"]>
  export type ColorToProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }
  export type ColorToProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }
  export type ColorToProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    color?: boolean | ColorDefaultArgs<ExtArgs>
  }

  export type $ColorToProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ColorToProduct"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      color: Prisma.$ColorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: number
      colorId: number
      order: number
    }, ExtArgs["result"]["colorToProduct"]>
    composites: {}
  }

  type ColorToProductGetPayload<S extends boolean | null | undefined | ColorToProductDefaultArgs> = $Result.GetResult<Prisma.$ColorToProductPayload, S>

  type ColorToProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColorToProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ColorToProductCountAggregateInputType | true
    }

  export interface ColorToProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ColorToProduct'], meta: { name: 'ColorToProduct' } }
    /**
     * Find zero or one ColorToProduct that matches the filter.
     * @param {ColorToProductFindUniqueArgs} args - Arguments to find a ColorToProduct
     * @example
     * // Get one ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColorToProductFindUniqueArgs>(args: SelectSubset<T, ColorToProductFindUniqueArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ColorToProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColorToProductFindUniqueOrThrowArgs} args - Arguments to find a ColorToProduct
     * @example
     * // Get one ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColorToProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ColorToProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColorToProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductFindFirstArgs} args - Arguments to find a ColorToProduct
     * @example
     * // Get one ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColorToProductFindFirstArgs>(args?: SelectSubset<T, ColorToProductFindFirstArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColorToProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductFindFirstOrThrowArgs} args - Arguments to find a ColorToProduct
     * @example
     * // Get one ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColorToProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ColorToProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ColorToProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ColorToProducts
     * const colorToProducts = await prisma.colorToProduct.findMany()
     * 
     * // Get first 10 ColorToProducts
     * const colorToProducts = await prisma.colorToProduct.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const colorToProductWithProductIdOnly = await prisma.colorToProduct.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ColorToProductFindManyArgs>(args?: SelectSubset<T, ColorToProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ColorToProduct.
     * @param {ColorToProductCreateArgs} args - Arguments to create a ColorToProduct.
     * @example
     * // Create one ColorToProduct
     * const ColorToProduct = await prisma.colorToProduct.create({
     *   data: {
     *     // ... data to create a ColorToProduct
     *   }
     * })
     * 
     */
    create<T extends ColorToProductCreateArgs>(args: SelectSubset<T, ColorToProductCreateArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ColorToProducts.
     * @param {ColorToProductCreateManyArgs} args - Arguments to create many ColorToProducts.
     * @example
     * // Create many ColorToProducts
     * const colorToProduct = await prisma.colorToProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColorToProductCreateManyArgs>(args?: SelectSubset<T, ColorToProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ColorToProducts and returns the data saved in the database.
     * @param {ColorToProductCreateManyAndReturnArgs} args - Arguments to create many ColorToProducts.
     * @example
     * // Create many ColorToProducts
     * const colorToProduct = await prisma.colorToProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ColorToProducts and only return the `productId`
     * const colorToProductWithProductIdOnly = await prisma.colorToProduct.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColorToProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ColorToProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ColorToProduct.
     * @param {ColorToProductDeleteArgs} args - Arguments to delete one ColorToProduct.
     * @example
     * // Delete one ColorToProduct
     * const ColorToProduct = await prisma.colorToProduct.delete({
     *   where: {
     *     // ... filter to delete one ColorToProduct
     *   }
     * })
     * 
     */
    delete<T extends ColorToProductDeleteArgs>(args: SelectSubset<T, ColorToProductDeleteArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ColorToProduct.
     * @param {ColorToProductUpdateArgs} args - Arguments to update one ColorToProduct.
     * @example
     * // Update one ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColorToProductUpdateArgs>(args: SelectSubset<T, ColorToProductUpdateArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ColorToProducts.
     * @param {ColorToProductDeleteManyArgs} args - Arguments to filter ColorToProducts to delete.
     * @example
     * // Delete a few ColorToProducts
     * const { count } = await prisma.colorToProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColorToProductDeleteManyArgs>(args?: SelectSubset<T, ColorToProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColorToProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ColorToProducts
     * const colorToProduct = await prisma.colorToProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColorToProductUpdateManyArgs>(args: SelectSubset<T, ColorToProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColorToProducts and returns the data updated in the database.
     * @param {ColorToProductUpdateManyAndReturnArgs} args - Arguments to update many ColorToProducts.
     * @example
     * // Update many ColorToProducts
     * const colorToProduct = await prisma.colorToProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ColorToProducts and only return the `productId`
     * const colorToProductWithProductIdOnly = await prisma.colorToProduct.updateManyAndReturn({
     *   select: { productId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColorToProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ColorToProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ColorToProduct.
     * @param {ColorToProductUpsertArgs} args - Arguments to update or create a ColorToProduct.
     * @example
     * // Update or create a ColorToProduct
     * const colorToProduct = await prisma.colorToProduct.upsert({
     *   create: {
     *     // ... data to create a ColorToProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ColorToProduct we want to update
     *   }
     * })
     */
    upsert<T extends ColorToProductUpsertArgs>(args: SelectSubset<T, ColorToProductUpsertArgs<ExtArgs>>): Prisma__ColorToProductClient<$Result.GetResult<Prisma.$ColorToProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ColorToProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductCountArgs} args - Arguments to filter ColorToProducts to count.
     * @example
     * // Count the number of ColorToProducts
     * const count = await prisma.colorToProduct.count({
     *   where: {
     *     // ... the filter for the ColorToProducts we want to count
     *   }
     * })
    **/
    count<T extends ColorToProductCountArgs>(
      args?: Subset<T, ColorToProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColorToProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ColorToProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColorToProductAggregateArgs>(args: Subset<T, ColorToProductAggregateArgs>): Prisma.PrismaPromise<GetColorToProductAggregateType<T>>

    /**
     * Group by ColorToProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorToProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColorToProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColorToProductGroupByArgs['orderBy'] }
        : { orderBy?: ColorToProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColorToProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColorToProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ColorToProduct model
   */
  readonly fields: ColorToProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ColorToProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColorToProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    color<T extends ColorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ColorDefaultArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ColorToProduct model
   */
  interface ColorToProductFieldRefs {
    readonly productId: FieldRef<"ColorToProduct", 'Int'>
    readonly colorId: FieldRef<"ColorToProduct", 'Int'>
    readonly order: FieldRef<"ColorToProduct", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ColorToProduct findUnique
   */
  export type ColorToProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter, which ColorToProduct to fetch.
     */
    where: ColorToProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct findUniqueOrThrow
   */
  export type ColorToProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter, which ColorToProduct to fetch.
     */
    where: ColorToProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct findFirst
   */
  export type ColorToProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter, which ColorToProduct to fetch.
     */
    where?: ColorToProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorToProducts to fetch.
     */
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColorToProducts.
     */
    cursor?: ColorToProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorToProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorToProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColorToProducts.
     */
    distinct?: ColorToProductScalarFieldEnum | ColorToProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct findFirstOrThrow
   */
  export type ColorToProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter, which ColorToProduct to fetch.
     */
    where?: ColorToProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorToProducts to fetch.
     */
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColorToProducts.
     */
    cursor?: ColorToProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorToProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorToProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColorToProducts.
     */
    distinct?: ColorToProductScalarFieldEnum | ColorToProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct findMany
   */
  export type ColorToProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter, which ColorToProducts to fetch.
     */
    where?: ColorToProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorToProducts to fetch.
     */
    orderBy?: ColorToProductOrderByWithRelationInput | ColorToProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ColorToProducts.
     */
    cursor?: ColorToProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorToProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorToProducts.
     */
    skip?: number
    distinct?: ColorToProductScalarFieldEnum | ColorToProductScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct create
   */
  export type ColorToProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * The data needed to create a ColorToProduct.
     */
    data: XOR<ColorToProductCreateInput, ColorToProductUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct createMany
   */
  export type ColorToProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ColorToProducts.
     */
    data: ColorToProductCreateManyInput | ColorToProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ColorToProduct createManyAndReturn
   */
  export type ColorToProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * The data used to create many ColorToProducts.
     */
    data: ColorToProductCreateManyInput | ColorToProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColorToProduct update
   */
  export type ColorToProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * The data needed to update a ColorToProduct.
     */
    data: XOR<ColorToProductUpdateInput, ColorToProductUncheckedUpdateInput>
    /**
     * Choose, which ColorToProduct to update.
     */
    where: ColorToProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct updateMany
   */
  export type ColorToProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ColorToProducts.
     */
    data: XOR<ColorToProductUpdateManyMutationInput, ColorToProductUncheckedUpdateManyInput>
    /**
     * Filter which ColorToProducts to update
     */
    where?: ColorToProductWhereInput
    /**
     * Limit how many ColorToProducts to update.
     */
    limit?: number
  }

  /**
   * ColorToProduct updateManyAndReturn
   */
  export type ColorToProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * The data used to update ColorToProducts.
     */
    data: XOR<ColorToProductUpdateManyMutationInput, ColorToProductUncheckedUpdateManyInput>
    /**
     * Filter which ColorToProducts to update
     */
    where?: ColorToProductWhereInput
    /**
     * Limit how many ColorToProducts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColorToProduct upsert
   */
  export type ColorToProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * The filter to search for the ColorToProduct to update in case it exists.
     */
    where: ColorToProductWhereUniqueInput
    /**
     * In case the ColorToProduct found by the `where` argument doesn't exist, create a new ColorToProduct with this data.
     */
    create: XOR<ColorToProductCreateInput, ColorToProductUncheckedCreateInput>
    /**
     * In case the ColorToProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColorToProductUpdateInput, ColorToProductUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct delete
   */
  export type ColorToProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
    /**
     * Filter which ColorToProduct to delete.
     */
    where: ColorToProductWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * ColorToProduct deleteMany
   */
  export type ColorToProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColorToProducts to delete
     */
    where?: ColorToProductWhereInput
    /**
     * Limit how many ColorToProducts to delete.
     */
    limit?: number
  }

  /**
   * ColorToProduct without action
   */
  export type ColorToProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorToProduct
     */
    select?: ColorToProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorToProduct
     */
    omit?: ColorToProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorToProductInclude<ExtArgs> | null
  }


  /**
   * Model LaborCost
   */

  export type AggregateLaborCost = {
    _count: LaborCostCountAggregateOutputType | null
    _avg: LaborCostAvgAggregateOutputType | null
    _sum: LaborCostSumAggregateOutputType | null
    _min: LaborCostMinAggregateOutputType | null
    _max: LaborCostMaxAggregateOutputType | null
  }

  export type LaborCostAvgAggregateOutputType = {
    id: number | null
    cost: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type LaborCostSumAggregateOutputType = {
    id: number | null
    cost: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type LaborCostMinAggregateOutputType = {
    id: number | null
    type: $Enums.Job | null
    cost: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LaborCostMaxAggregateOutputType = {
    id: number | null
    type: $Enums.Job | null
    cost: number | null
    productGroupId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LaborCostCountAggregateOutputType = {
    id: number
    type: number
    cost: number
    productGroupId: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LaborCostAvgAggregateInputType = {
    id?: true
    cost?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type LaborCostSumAggregateInputType = {
    id?: true
    cost?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type LaborCostMinAggregateInputType = {
    id?: true
    type?: true
    cost?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LaborCostMaxAggregateInputType = {
    id?: true
    type?: true
    cost?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LaborCostCountAggregateInputType = {
    id?: true
    type?: true
    cost?: true
    productGroupId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LaborCostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaborCost to aggregate.
     */
    where?: LaborCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaborCosts to fetch.
     */
    orderBy?: LaborCostOrderByWithRelationInput | LaborCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaborCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaborCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaborCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LaborCosts
    **/
    _count?: true | LaborCostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LaborCostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LaborCostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaborCostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaborCostMaxAggregateInputType
  }

  export type GetLaborCostAggregateType<T extends LaborCostAggregateArgs> = {
        [P in keyof T & keyof AggregateLaborCost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaborCost[P]>
      : GetScalarType<T[P], AggregateLaborCost[P]>
  }




  export type LaborCostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaborCostWhereInput
    orderBy?: LaborCostOrderByWithAggregationInput | LaborCostOrderByWithAggregationInput[]
    by: LaborCostScalarFieldEnum[] | LaborCostScalarFieldEnum
    having?: LaborCostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaborCostCountAggregateInputType | true
    _avg?: LaborCostAvgAggregateInputType
    _sum?: LaborCostSumAggregateInputType
    _min?: LaborCostMinAggregateInputType
    _max?: LaborCostMaxAggregateInputType
  }

  export type LaborCostGroupByOutputType = {
    id: number
    type: $Enums.Job
    cost: number
    productGroupId: number
    createdBy: number
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: LaborCostCountAggregateOutputType | null
    _avg: LaborCostAvgAggregateOutputType | null
    _sum: LaborCostSumAggregateOutputType | null
    _min: LaborCostMinAggregateOutputType | null
    _max: LaborCostMaxAggregateOutputType | null
  }

  type GetLaborCostGroupByPayload<T extends LaborCostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaborCostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaborCostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaborCostGroupByOutputType[P]>
            : GetScalarType<T[P], LaborCostGroupByOutputType[P]>
        }
      >
    >


  export type LaborCostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    cost?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | LaborCost$tasksArgs<ExtArgs>
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
    _count?: boolean | LaborCostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laborCost"]>

  export type LaborCostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    cost?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laborCost"]>

  export type LaborCostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    cost?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laborCost"]>

  export type LaborCostSelectScalar = {
    id?: boolean
    type?: boolean
    cost?: boolean
    productGroupId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LaborCostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "cost" | "productGroupId" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["laborCost"]>
  export type LaborCostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | LaborCost$tasksArgs<ExtArgs>
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
    _count?: boolean | LaborCostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LaborCostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }
  export type LaborCostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productGroup?: boolean | ProductGroupDefaultArgs<ExtArgs>
  }

  export type $LaborCostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LaborCost"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      productGroup: Prisma.$ProductGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: $Enums.Job
      cost: number
      productGroupId: number
      createdBy: number
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["laborCost"]>
    composites: {}
  }

  type LaborCostGetPayload<S extends boolean | null | undefined | LaborCostDefaultArgs> = $Result.GetResult<Prisma.$LaborCostPayload, S>

  type LaborCostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LaborCostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: LaborCostCountAggregateInputType | true
    }

  export interface LaborCostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LaborCost'], meta: { name: 'LaborCost' } }
    /**
     * Find zero or one LaborCost that matches the filter.
     * @param {LaborCostFindUniqueArgs} args - Arguments to find a LaborCost
     * @example
     * // Get one LaborCost
     * const laborCost = await prisma.laborCost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaborCostFindUniqueArgs>(args: SelectSubset<T, LaborCostFindUniqueArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LaborCost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LaborCostFindUniqueOrThrowArgs} args - Arguments to find a LaborCost
     * @example
     * // Get one LaborCost
     * const laborCost = await prisma.laborCost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaborCostFindUniqueOrThrowArgs>(args: SelectSubset<T, LaborCostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaborCost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostFindFirstArgs} args - Arguments to find a LaborCost
     * @example
     * // Get one LaborCost
     * const laborCost = await prisma.laborCost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaborCostFindFirstArgs>(args?: SelectSubset<T, LaborCostFindFirstArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaborCost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostFindFirstOrThrowArgs} args - Arguments to find a LaborCost
     * @example
     * // Get one LaborCost
     * const laborCost = await prisma.laborCost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaborCostFindFirstOrThrowArgs>(args?: SelectSubset<T, LaborCostFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LaborCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LaborCosts
     * const laborCosts = await prisma.laborCost.findMany()
     * 
     * // Get first 10 LaborCosts
     * const laborCosts = await prisma.laborCost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const laborCostWithIdOnly = await prisma.laborCost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LaborCostFindManyArgs>(args?: SelectSubset<T, LaborCostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LaborCost.
     * @param {LaborCostCreateArgs} args - Arguments to create a LaborCost.
     * @example
     * // Create one LaborCost
     * const LaborCost = await prisma.laborCost.create({
     *   data: {
     *     // ... data to create a LaborCost
     *   }
     * })
     * 
     */
    create<T extends LaborCostCreateArgs>(args: SelectSubset<T, LaborCostCreateArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LaborCosts.
     * @param {LaborCostCreateManyArgs} args - Arguments to create many LaborCosts.
     * @example
     * // Create many LaborCosts
     * const laborCost = await prisma.laborCost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaborCostCreateManyArgs>(args?: SelectSubset<T, LaborCostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LaborCosts and returns the data saved in the database.
     * @param {LaborCostCreateManyAndReturnArgs} args - Arguments to create many LaborCosts.
     * @example
     * // Create many LaborCosts
     * const laborCost = await prisma.laborCost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LaborCosts and only return the `id`
     * const laborCostWithIdOnly = await prisma.laborCost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaborCostCreateManyAndReturnArgs>(args?: SelectSubset<T, LaborCostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LaborCost.
     * @param {LaborCostDeleteArgs} args - Arguments to delete one LaborCost.
     * @example
     * // Delete one LaborCost
     * const LaborCost = await prisma.laborCost.delete({
     *   where: {
     *     // ... filter to delete one LaborCost
     *   }
     * })
     * 
     */
    delete<T extends LaborCostDeleteArgs>(args: SelectSubset<T, LaborCostDeleteArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LaborCost.
     * @param {LaborCostUpdateArgs} args - Arguments to update one LaborCost.
     * @example
     * // Update one LaborCost
     * const laborCost = await prisma.laborCost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaborCostUpdateArgs>(args: SelectSubset<T, LaborCostUpdateArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LaborCosts.
     * @param {LaborCostDeleteManyArgs} args - Arguments to filter LaborCosts to delete.
     * @example
     * // Delete a few LaborCosts
     * const { count } = await prisma.laborCost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaborCostDeleteManyArgs>(args?: SelectSubset<T, LaborCostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaborCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LaborCosts
     * const laborCost = await prisma.laborCost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaborCostUpdateManyArgs>(args: SelectSubset<T, LaborCostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaborCosts and returns the data updated in the database.
     * @param {LaborCostUpdateManyAndReturnArgs} args - Arguments to update many LaborCosts.
     * @example
     * // Update many LaborCosts
     * const laborCost = await prisma.laborCost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LaborCosts and only return the `id`
     * const laborCostWithIdOnly = await prisma.laborCost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LaborCostUpdateManyAndReturnArgs>(args: SelectSubset<T, LaborCostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LaborCost.
     * @param {LaborCostUpsertArgs} args - Arguments to update or create a LaborCost.
     * @example
     * // Update or create a LaborCost
     * const laborCost = await prisma.laborCost.upsert({
     *   create: {
     *     // ... data to create a LaborCost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LaborCost we want to update
     *   }
     * })
     */
    upsert<T extends LaborCostUpsertArgs>(args: SelectSubset<T, LaborCostUpsertArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LaborCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostCountArgs} args - Arguments to filter LaborCosts to count.
     * @example
     * // Count the number of LaborCosts
     * const count = await prisma.laborCost.count({
     *   where: {
     *     // ... the filter for the LaborCosts we want to count
     *   }
     * })
    **/
    count<T extends LaborCostCountArgs>(
      args?: Subset<T, LaborCostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaborCostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LaborCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaborCostAggregateArgs>(args: Subset<T, LaborCostAggregateArgs>): Prisma.PrismaPromise<GetLaborCostAggregateType<T>>

    /**
     * Group by LaborCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaborCostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaborCostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaborCostGroupByArgs['orderBy'] }
        : { orderBy?: LaborCostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaborCostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaborCostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LaborCost model
   */
  readonly fields: LaborCostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LaborCost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaborCostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends LaborCost$tasksArgs<ExtArgs> = {}>(args?: Subset<T, LaborCost$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productGroup<T extends ProductGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductGroupDefaultArgs<ExtArgs>>): Prisma__ProductGroupClient<$Result.GetResult<Prisma.$ProductGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LaborCost model
   */
  interface LaborCostFieldRefs {
    readonly id: FieldRef<"LaborCost", 'Int'>
    readonly type: FieldRef<"LaborCost", 'Job'>
    readonly cost: FieldRef<"LaborCost", 'Int'>
    readonly productGroupId: FieldRef<"LaborCost", 'Int'>
    readonly createdBy: FieldRef<"LaborCost", 'Int'>
    readonly updatedBy: FieldRef<"LaborCost", 'Int'>
    readonly createdAt: FieldRef<"LaborCost", 'DateTime'>
    readonly updatedAt: FieldRef<"LaborCost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LaborCost findUnique
   */
  export type LaborCostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter, which LaborCost to fetch.
     */
    where: LaborCostWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost findUniqueOrThrow
   */
  export type LaborCostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter, which LaborCost to fetch.
     */
    where: LaborCostWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost findFirst
   */
  export type LaborCostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter, which LaborCost to fetch.
     */
    where?: LaborCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaborCosts to fetch.
     */
    orderBy?: LaborCostOrderByWithRelationInput | LaborCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaborCosts.
     */
    cursor?: LaborCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaborCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaborCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaborCosts.
     */
    distinct?: LaborCostScalarFieldEnum | LaborCostScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost findFirstOrThrow
   */
  export type LaborCostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter, which LaborCost to fetch.
     */
    where?: LaborCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaborCosts to fetch.
     */
    orderBy?: LaborCostOrderByWithRelationInput | LaborCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaborCosts.
     */
    cursor?: LaborCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaborCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaborCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaborCosts.
     */
    distinct?: LaborCostScalarFieldEnum | LaborCostScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost findMany
   */
  export type LaborCostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter, which LaborCosts to fetch.
     */
    where?: LaborCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaborCosts to fetch.
     */
    orderBy?: LaborCostOrderByWithRelationInput | LaborCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LaborCosts.
     */
    cursor?: LaborCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaborCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaborCosts.
     */
    skip?: number
    distinct?: LaborCostScalarFieldEnum | LaborCostScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost create
   */
  export type LaborCostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * The data needed to create a LaborCost.
     */
    data: XOR<LaborCostCreateInput, LaborCostUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost createMany
   */
  export type LaborCostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LaborCosts.
     */
    data: LaborCostCreateManyInput | LaborCostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaborCost createManyAndReturn
   */
  export type LaborCostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * The data used to create many LaborCosts.
     */
    data: LaborCostCreateManyInput | LaborCostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaborCost update
   */
  export type LaborCostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * The data needed to update a LaborCost.
     */
    data: XOR<LaborCostUpdateInput, LaborCostUncheckedUpdateInput>
    /**
     * Choose, which LaborCost to update.
     */
    where: LaborCostWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost updateMany
   */
  export type LaborCostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LaborCosts.
     */
    data: XOR<LaborCostUpdateManyMutationInput, LaborCostUncheckedUpdateManyInput>
    /**
     * Filter which LaborCosts to update
     */
    where?: LaborCostWhereInput
    /**
     * Limit how many LaborCosts to update.
     */
    limit?: number
  }

  /**
   * LaborCost updateManyAndReturn
   */
  export type LaborCostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * The data used to update LaborCosts.
     */
    data: XOR<LaborCostUpdateManyMutationInput, LaborCostUncheckedUpdateManyInput>
    /**
     * Filter which LaborCosts to update
     */
    where?: LaborCostWhereInput
    /**
     * Limit how many LaborCosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaborCost upsert
   */
  export type LaborCostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * The filter to search for the LaborCost to update in case it exists.
     */
    where: LaborCostWhereUniqueInput
    /**
     * In case the LaborCost found by the `where` argument doesn't exist, create a new LaborCost with this data.
     */
    create: XOR<LaborCostCreateInput, LaborCostUncheckedCreateInput>
    /**
     * In case the LaborCost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaborCostUpdateInput, LaborCostUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost delete
   */
  export type LaborCostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
    /**
     * Filter which LaborCost to delete.
     */
    where: LaborCostWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * LaborCost deleteMany
   */
  export type LaborCostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaborCosts to delete
     */
    where?: LaborCostWhereInput
    /**
     * Limit how many LaborCosts to delete.
     */
    limit?: number
  }

  /**
   * LaborCost.tasks
   */
  export type LaborCost$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * LaborCost without action
   */
  export type LaborCostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaborCost
     */
    select?: LaborCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaborCost
     */
    omit?: LaborCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaborCostInclude<ExtArgs> | null
  }


  /**
   * Model Artisan
   */

  export type AggregateArtisan = {
    _count: ArtisanCountAggregateOutputType | null
    _avg: ArtisanAvgAggregateOutputType | null
    _sum: ArtisanSumAggregateOutputType | null
    _min: ArtisanMinAggregateOutputType | null
    _max: ArtisanMaxAggregateOutputType | null
  }

  export type ArtisanAvgAggregateOutputType = {
    id: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ArtisanSumAggregateOutputType = {
    id: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type ArtisanMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtisanMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtisanCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    jobs: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArtisanAvgAggregateInputType = {
    id?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ArtisanSumAggregateInputType = {
    id?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ArtisanMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtisanMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtisanCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    jobs?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArtisanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artisan to aggregate.
     */
    where?: ArtisanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artisans to fetch.
     */
    orderBy?: ArtisanOrderByWithRelationInput | ArtisanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtisanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artisans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artisans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artisans
    **/
    _count?: true | ArtisanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtisanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtisanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtisanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtisanMaxAggregateInputType
  }

  export type GetArtisanAggregateType<T extends ArtisanAggregateArgs> = {
        [P in keyof T & keyof AggregateArtisan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtisan[P]>
      : GetScalarType<T[P], AggregateArtisan[P]>
  }




  export type ArtisanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtisanWhereInput
    orderBy?: ArtisanOrderByWithAggregationInput | ArtisanOrderByWithAggregationInput[]
    by: ArtisanScalarFieldEnum[] | ArtisanScalarFieldEnum
    having?: ArtisanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtisanCountAggregateInputType | true
    _avg?: ArtisanAvgAggregateInputType
    _sum?: ArtisanSumAggregateInputType
    _min?: ArtisanMinAggregateInputType
    _max?: ArtisanMaxAggregateInputType
  }

  export type ArtisanGroupByOutputType = {
    id: number
    firstName: string
    lastName: string | null
    jobs: $Enums.Job[]
    createdBy: number
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: ArtisanCountAggregateOutputType | null
    _avg: ArtisanAvgAggregateOutputType | null
    _sum: ArtisanSumAggregateOutputType | null
    _min: ArtisanMinAggregateOutputType | null
    _max: ArtisanMaxAggregateOutputType | null
  }

  type GetArtisanGroupByPayload<T extends ArtisanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtisanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtisanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtisanGroupByOutputType[P]>
            : GetScalarType<T[P], ArtisanGroupByOutputType[P]>
        }
      >
    >


  export type ArtisanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    jobs?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | Artisan$tasksArgs<ExtArgs>
    _count?: boolean | ArtisanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artisan"]>

  export type ArtisanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    jobs?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artisan"]>

  export type ArtisanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    jobs?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artisan"]>

  export type ArtisanSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    jobs?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArtisanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "jobs" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["artisan"]>
  export type ArtisanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Artisan$tasksArgs<ExtArgs>
    _count?: boolean | ArtisanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArtisanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArtisanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArtisanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artisan"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string | null
      jobs: $Enums.Job[]
      createdBy: number
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["artisan"]>
    composites: {}
  }

  type ArtisanGetPayload<S extends boolean | null | undefined | ArtisanDefaultArgs> = $Result.GetResult<Prisma.$ArtisanPayload, S>

  type ArtisanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtisanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ArtisanCountAggregateInputType | true
    }

  export interface ArtisanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artisan'], meta: { name: 'Artisan' } }
    /**
     * Find zero or one Artisan that matches the filter.
     * @param {ArtisanFindUniqueArgs} args - Arguments to find a Artisan
     * @example
     * // Get one Artisan
     * const artisan = await prisma.artisan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtisanFindUniqueArgs>(args: SelectSubset<T, ArtisanFindUniqueArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artisan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtisanFindUniqueOrThrowArgs} args - Arguments to find a Artisan
     * @example
     * // Get one Artisan
     * const artisan = await prisma.artisan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtisanFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtisanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artisan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanFindFirstArgs} args - Arguments to find a Artisan
     * @example
     * // Get one Artisan
     * const artisan = await prisma.artisan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtisanFindFirstArgs>(args?: SelectSubset<T, ArtisanFindFirstArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artisan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanFindFirstOrThrowArgs} args - Arguments to find a Artisan
     * @example
     * // Get one Artisan
     * const artisan = await prisma.artisan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtisanFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtisanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artisans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artisans
     * const artisans = await prisma.artisan.findMany()
     * 
     * // Get first 10 Artisans
     * const artisans = await prisma.artisan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artisanWithIdOnly = await prisma.artisan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtisanFindManyArgs>(args?: SelectSubset<T, ArtisanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artisan.
     * @param {ArtisanCreateArgs} args - Arguments to create a Artisan.
     * @example
     * // Create one Artisan
     * const Artisan = await prisma.artisan.create({
     *   data: {
     *     // ... data to create a Artisan
     *   }
     * })
     * 
     */
    create<T extends ArtisanCreateArgs>(args: SelectSubset<T, ArtisanCreateArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artisans.
     * @param {ArtisanCreateManyArgs} args - Arguments to create many Artisans.
     * @example
     * // Create many Artisans
     * const artisan = await prisma.artisan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtisanCreateManyArgs>(args?: SelectSubset<T, ArtisanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artisans and returns the data saved in the database.
     * @param {ArtisanCreateManyAndReturnArgs} args - Arguments to create many Artisans.
     * @example
     * // Create many Artisans
     * const artisan = await prisma.artisan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artisans and only return the `id`
     * const artisanWithIdOnly = await prisma.artisan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtisanCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtisanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artisan.
     * @param {ArtisanDeleteArgs} args - Arguments to delete one Artisan.
     * @example
     * // Delete one Artisan
     * const Artisan = await prisma.artisan.delete({
     *   where: {
     *     // ... filter to delete one Artisan
     *   }
     * })
     * 
     */
    delete<T extends ArtisanDeleteArgs>(args: SelectSubset<T, ArtisanDeleteArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artisan.
     * @param {ArtisanUpdateArgs} args - Arguments to update one Artisan.
     * @example
     * // Update one Artisan
     * const artisan = await prisma.artisan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtisanUpdateArgs>(args: SelectSubset<T, ArtisanUpdateArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artisans.
     * @param {ArtisanDeleteManyArgs} args - Arguments to filter Artisans to delete.
     * @example
     * // Delete a few Artisans
     * const { count } = await prisma.artisan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtisanDeleteManyArgs>(args?: SelectSubset<T, ArtisanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artisans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artisans
     * const artisan = await prisma.artisan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtisanUpdateManyArgs>(args: SelectSubset<T, ArtisanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artisans and returns the data updated in the database.
     * @param {ArtisanUpdateManyAndReturnArgs} args - Arguments to update many Artisans.
     * @example
     * // Update many Artisans
     * const artisan = await prisma.artisan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artisans and only return the `id`
     * const artisanWithIdOnly = await prisma.artisan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtisanUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtisanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artisan.
     * @param {ArtisanUpsertArgs} args - Arguments to update or create a Artisan.
     * @example
     * // Update or create a Artisan
     * const artisan = await prisma.artisan.upsert({
     *   create: {
     *     // ... data to create a Artisan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artisan we want to update
     *   }
     * })
     */
    upsert<T extends ArtisanUpsertArgs>(args: SelectSubset<T, ArtisanUpsertArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artisans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanCountArgs} args - Arguments to filter Artisans to count.
     * @example
     * // Count the number of Artisans
     * const count = await prisma.artisan.count({
     *   where: {
     *     // ... the filter for the Artisans we want to count
     *   }
     * })
    **/
    count<T extends ArtisanCountArgs>(
      args?: Subset<T, ArtisanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtisanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artisan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtisanAggregateArgs>(args: Subset<T, ArtisanAggregateArgs>): Prisma.PrismaPromise<GetArtisanAggregateType<T>>

    /**
     * Group by Artisan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtisanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtisanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtisanGroupByArgs['orderBy'] }
        : { orderBy?: ArtisanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtisanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtisanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artisan model
   */
  readonly fields: ArtisanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artisan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtisanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Artisan$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Artisan$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Artisan model
   */
  interface ArtisanFieldRefs {
    readonly id: FieldRef<"Artisan", 'Int'>
    readonly firstName: FieldRef<"Artisan", 'String'>
    readonly lastName: FieldRef<"Artisan", 'String'>
    readonly jobs: FieldRef<"Artisan", 'Job[]'>
    readonly createdBy: FieldRef<"Artisan", 'Int'>
    readonly updatedBy: FieldRef<"Artisan", 'Int'>
    readonly createdAt: FieldRef<"Artisan", 'DateTime'>
    readonly updatedAt: FieldRef<"Artisan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Artisan findUnique
   */
  export type ArtisanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter, which Artisan to fetch.
     */
    where: ArtisanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan findUniqueOrThrow
   */
  export type ArtisanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter, which Artisan to fetch.
     */
    where: ArtisanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan findFirst
   */
  export type ArtisanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter, which Artisan to fetch.
     */
    where?: ArtisanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artisans to fetch.
     */
    orderBy?: ArtisanOrderByWithRelationInput | ArtisanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artisans.
     */
    cursor?: ArtisanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artisans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artisans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artisans.
     */
    distinct?: ArtisanScalarFieldEnum | ArtisanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan findFirstOrThrow
   */
  export type ArtisanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter, which Artisan to fetch.
     */
    where?: ArtisanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artisans to fetch.
     */
    orderBy?: ArtisanOrderByWithRelationInput | ArtisanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artisans.
     */
    cursor?: ArtisanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artisans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artisans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artisans.
     */
    distinct?: ArtisanScalarFieldEnum | ArtisanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan findMany
   */
  export type ArtisanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter, which Artisans to fetch.
     */
    where?: ArtisanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artisans to fetch.
     */
    orderBy?: ArtisanOrderByWithRelationInput | ArtisanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artisans.
     */
    cursor?: ArtisanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artisans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artisans.
     */
    skip?: number
    distinct?: ArtisanScalarFieldEnum | ArtisanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan create
   */
  export type ArtisanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * The data needed to create a Artisan.
     */
    data: XOR<ArtisanCreateInput, ArtisanUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan createMany
   */
  export type ArtisanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artisans.
     */
    data: ArtisanCreateManyInput | ArtisanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artisan createManyAndReturn
   */
  export type ArtisanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * The data used to create many Artisans.
     */
    data: ArtisanCreateManyInput | ArtisanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artisan update
   */
  export type ArtisanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * The data needed to update a Artisan.
     */
    data: XOR<ArtisanUpdateInput, ArtisanUncheckedUpdateInput>
    /**
     * Choose, which Artisan to update.
     */
    where: ArtisanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan updateMany
   */
  export type ArtisanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artisans.
     */
    data: XOR<ArtisanUpdateManyMutationInput, ArtisanUncheckedUpdateManyInput>
    /**
     * Filter which Artisans to update
     */
    where?: ArtisanWhereInput
    /**
     * Limit how many Artisans to update.
     */
    limit?: number
  }

  /**
   * Artisan updateManyAndReturn
   */
  export type ArtisanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * The data used to update Artisans.
     */
    data: XOR<ArtisanUpdateManyMutationInput, ArtisanUncheckedUpdateManyInput>
    /**
     * Filter which Artisans to update
     */
    where?: ArtisanWhereInput
    /**
     * Limit how many Artisans to update.
     */
    limit?: number
  }

  /**
   * Artisan upsert
   */
  export type ArtisanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * The filter to search for the Artisan to update in case it exists.
     */
    where: ArtisanWhereUniqueInput
    /**
     * In case the Artisan found by the `where` argument doesn't exist, create a new Artisan with this data.
     */
    create: XOR<ArtisanCreateInput, ArtisanUncheckedCreateInput>
    /**
     * In case the Artisan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtisanUpdateInput, ArtisanUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan delete
   */
  export type ArtisanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    /**
     * Filter which Artisan to delete.
     */
    where: ArtisanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Artisan deleteMany
   */
  export type ArtisanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artisans to delete
     */
    where?: ArtisanWhereInput
    /**
     * Limit how many Artisans to delete.
     */
    limit?: number
  }

  /**
   * Artisan.tasks
   */
  export type Artisan$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Artisan without action
   */
  export type ArtisanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
  }


  /**
   * Model Work
   */

  export type AggregateWork = {
    _count: WorkCountAggregateOutputType | null
    _avg: WorkAvgAggregateOutputType | null
    _sum: WorkSumAggregateOutputType | null
    _min: WorkMinAggregateOutputType | null
    _max: WorkMaxAggregateOutputType | null
  }

  export type WorkAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type WorkSumAggregateOutputType = {
    id: number | null
    productId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type WorkMinAggregateOutputType = {
    id: number | null
    date: Date | null
    orderNo: string | null
    productId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    orderNo: string | null
    productId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkCountAggregateOutputType = {
    id: number
    date: number
    orderNo: number
    productId: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkAvgAggregateInputType = {
    id?: true
    productId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type WorkSumAggregateInputType = {
    id?: true
    productId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type WorkMinAggregateInputType = {
    id?: true
    date?: true
    orderNo?: true
    productId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkMaxAggregateInputType = {
    id?: true
    date?: true
    orderNo?: true
    productId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkCountAggregateInputType = {
    id?: true
    date?: true
    orderNo?: true
    productId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Work to aggregate.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Works
    **/
    _count?: true | WorkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkMaxAggregateInputType
  }

  export type GetWorkAggregateType<T extends WorkAggregateArgs> = {
        [P in keyof T & keyof AggregateWork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWork[P]>
      : GetScalarType<T[P], AggregateWork[P]>
  }




  export type WorkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkWhereInput
    orderBy?: WorkOrderByWithAggregationInput | WorkOrderByWithAggregationInput[]
    by: WorkScalarFieldEnum[] | WorkScalarFieldEnum
    having?: WorkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkCountAggregateInputType | true
    _avg?: WorkAvgAggregateInputType
    _sum?: WorkSumAggregateInputType
    _min?: WorkMinAggregateInputType
    _max?: WorkMaxAggregateInputType
  }

  export type WorkGroupByOutputType = {
    id: number
    date: Date
    orderNo: string
    productId: number
    createdBy: number
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: WorkCountAggregateOutputType | null
    _avg: WorkAvgAggregateOutputType | null
    _sum: WorkSumAggregateOutputType | null
    _min: WorkMinAggregateOutputType | null
    _max: WorkMaxAggregateOutputType | null
  }

  type GetWorkGroupByPayload<T extends WorkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkGroupByOutputType[P]>
            : GetScalarType<T[P], WorkGroupByOutputType[P]>
        }
      >
    >


  export type WorkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    orderNo?: boolean
    productId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sizes?: boolean | Work$sizesArgs<ExtArgs>
    tasks?: boolean | Work$tasksArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | WorkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["work"]>

  export type WorkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    orderNo?: boolean
    productId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["work"]>

  export type WorkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    orderNo?: boolean
    productId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["work"]>

  export type WorkSelectScalar = {
    id?: boolean
    date?: boolean
    orderNo?: boolean
    productId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "orderNo" | "productId" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["work"]>
  export type WorkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sizes?: boolean | Work$sizesArgs<ExtArgs>
    tasks?: boolean | Work$tasksArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | WorkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type WorkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $WorkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Work"
    objects: {
      sizes: Prisma.$SizeToWorkPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      orderNo: string
      productId: number
      createdBy: number
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["work"]>
    composites: {}
  }

  type WorkGetPayload<S extends boolean | null | undefined | WorkDefaultArgs> = $Result.GetResult<Prisma.$WorkPayload, S>

  type WorkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: WorkCountAggregateInputType | true
    }

  export interface WorkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Work'], meta: { name: 'Work' } }
    /**
     * Find zero or one Work that matches the filter.
     * @param {WorkFindUniqueArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkFindUniqueArgs>(args: SelectSubset<T, WorkFindUniqueArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Work that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkFindUniqueOrThrowArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Work that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindFirstArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkFindFirstArgs>(args?: SelectSubset<T, WorkFindFirstArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Work that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindFirstOrThrowArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Works that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Works
     * const works = await prisma.work.findMany()
     * 
     * // Get first 10 Works
     * const works = await prisma.work.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workWithIdOnly = await prisma.work.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkFindManyArgs>(args?: SelectSubset<T, WorkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Work.
     * @param {WorkCreateArgs} args - Arguments to create a Work.
     * @example
     * // Create one Work
     * const Work = await prisma.work.create({
     *   data: {
     *     // ... data to create a Work
     *   }
     * })
     * 
     */
    create<T extends WorkCreateArgs>(args: SelectSubset<T, WorkCreateArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Works.
     * @param {WorkCreateManyArgs} args - Arguments to create many Works.
     * @example
     * // Create many Works
     * const work = await prisma.work.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkCreateManyArgs>(args?: SelectSubset<T, WorkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Works and returns the data saved in the database.
     * @param {WorkCreateManyAndReturnArgs} args - Arguments to create many Works.
     * @example
     * // Create many Works
     * const work = await prisma.work.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Works and only return the `id`
     * const workWithIdOnly = await prisma.work.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Work.
     * @param {WorkDeleteArgs} args - Arguments to delete one Work.
     * @example
     * // Delete one Work
     * const Work = await prisma.work.delete({
     *   where: {
     *     // ... filter to delete one Work
     *   }
     * })
     * 
     */
    delete<T extends WorkDeleteArgs>(args: SelectSubset<T, WorkDeleteArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Work.
     * @param {WorkUpdateArgs} args - Arguments to update one Work.
     * @example
     * // Update one Work
     * const work = await prisma.work.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkUpdateArgs>(args: SelectSubset<T, WorkUpdateArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Works.
     * @param {WorkDeleteManyArgs} args - Arguments to filter Works to delete.
     * @example
     * // Delete a few Works
     * const { count } = await prisma.work.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkDeleteManyArgs>(args?: SelectSubset<T, WorkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Works.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Works
     * const work = await prisma.work.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkUpdateManyArgs>(args: SelectSubset<T, WorkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Works and returns the data updated in the database.
     * @param {WorkUpdateManyAndReturnArgs} args - Arguments to update many Works.
     * @example
     * // Update many Works
     * const work = await prisma.work.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Works and only return the `id`
     * const workWithIdOnly = await prisma.work.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Work.
     * @param {WorkUpsertArgs} args - Arguments to update or create a Work.
     * @example
     * // Update or create a Work
     * const work = await prisma.work.upsert({
     *   create: {
     *     // ... data to create a Work
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Work we want to update
     *   }
     * })
     */
    upsert<T extends WorkUpsertArgs>(args: SelectSubset<T, WorkUpsertArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Works.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkCountArgs} args - Arguments to filter Works to count.
     * @example
     * // Count the number of Works
     * const count = await prisma.work.count({
     *   where: {
     *     // ... the filter for the Works we want to count
     *   }
     * })
    **/
    count<T extends WorkCountArgs>(
      args?: Subset<T, WorkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Work.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkAggregateArgs>(args: Subset<T, WorkAggregateArgs>): Prisma.PrismaPromise<GetWorkAggregateType<T>>

    /**
     * Group by Work.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkGroupByArgs['orderBy'] }
        : { orderBy?: WorkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Work model
   */
  readonly fields: WorkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Work.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sizes<T extends Work$sizesArgs<ExtArgs> = {}>(args?: Subset<T, Work$sizesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Work$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Work$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Work model
   */
  interface WorkFieldRefs {
    readonly id: FieldRef<"Work", 'Int'>
    readonly date: FieldRef<"Work", 'DateTime'>
    readonly orderNo: FieldRef<"Work", 'String'>
    readonly productId: FieldRef<"Work", 'Int'>
    readonly createdBy: FieldRef<"Work", 'Int'>
    readonly updatedBy: FieldRef<"Work", 'Int'>
    readonly createdAt: FieldRef<"Work", 'DateTime'>
    readonly updatedAt: FieldRef<"Work", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Work findUnique
   */
  export type WorkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where: WorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work findUniqueOrThrow
   */
  export type WorkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where: WorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work findFirst
   */
  export type WorkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Works.
     */
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work findFirstOrThrow
   */
  export type WorkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Works.
     */
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work findMany
   */
  export type WorkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Works to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work create
   */
  export type WorkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The data needed to create a Work.
     */
    data: XOR<WorkCreateInput, WorkUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work createMany
   */
  export type WorkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Works.
     */
    data: WorkCreateManyInput | WorkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Work createManyAndReturn
   */
  export type WorkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * The data used to create many Works.
     */
    data: WorkCreateManyInput | WorkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Work update
   */
  export type WorkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The data needed to update a Work.
     */
    data: XOR<WorkUpdateInput, WorkUncheckedUpdateInput>
    /**
     * Choose, which Work to update.
     */
    where: WorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work updateMany
   */
  export type WorkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Works.
     */
    data: XOR<WorkUpdateManyMutationInput, WorkUncheckedUpdateManyInput>
    /**
     * Filter which Works to update
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to update.
     */
    limit?: number
  }

  /**
   * Work updateManyAndReturn
   */
  export type WorkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * The data used to update Works.
     */
    data: XOR<WorkUpdateManyMutationInput, WorkUncheckedUpdateManyInput>
    /**
     * Filter which Works to update
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Work upsert
   */
  export type WorkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The filter to search for the Work to update in case it exists.
     */
    where: WorkWhereUniqueInput
    /**
     * In case the Work found by the `where` argument doesn't exist, create a new Work with this data.
     */
    create: XOR<WorkCreateInput, WorkUncheckedCreateInput>
    /**
     * In case the Work was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkUpdateInput, WorkUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work delete
   */
  export type WorkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter which Work to delete.
     */
    where: WorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Work deleteMany
   */
  export type WorkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Works to delete
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to delete.
     */
    limit?: number
  }

  /**
   * Work.sizes
   */
  export type Work$sizesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    where?: SizeToWorkWhereInput
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    cursor?: SizeToWorkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SizeToWorkScalarFieldEnum | SizeToWorkScalarFieldEnum[]
  }

  /**
   * Work.tasks
   */
  export type Work$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Work without action
   */
  export type WorkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    workId: number | null
    artisanId: number | null
    laborCostId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    workId: number | null
    artisanId: number | null
    laborCostId: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    workId: number | null
    type: $Enums.Job | null
    artisanId: number | null
    doneAt: Date | null
    laborCostId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    workId: number | null
    type: $Enums.Job | null
    artisanId: number | null
    doneAt: Date | null
    laborCostId: number | null
    createdBy: number | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    workId: number
    type: number
    artisanId: number
    doneAt: number
    laborCostId: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    workId?: true
    artisanId?: true
    laborCostId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    workId?: true
    artisanId?: true
    laborCostId?: true
    createdBy?: true
    updatedBy?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    workId?: true
    type?: true
    artisanId?: true
    doneAt?: true
    laborCostId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    workId?: true
    type?: true
    artisanId?: true
    doneAt?: true
    laborCostId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    workId?: true
    type?: true
    artisanId?: true
    doneAt?: true
    laborCostId?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    workId: number
    type: $Enums.Job
    artisanId: number | null
    doneAt: Date | null
    laborCostId: number
    createdBy: number
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workId?: boolean
    type?: boolean
    artisanId?: boolean
    doneAt?: boolean
    laborCostId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workId?: boolean
    type?: boolean
    artisanId?: boolean
    doneAt?: boolean
    laborCostId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workId?: boolean
    type?: boolean
    artisanId?: boolean
    doneAt?: boolean
    laborCostId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    workId?: boolean
    type?: boolean
    artisanId?: boolean
    doneAt?: boolean
    laborCostId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workId" | "type" | "artisanId" | "doneAt" | "laborCostId" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    artisan?: boolean | Task$artisanArgs<ExtArgs>
    laborCost?: boolean | LaborCostDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      work: Prisma.$WorkPayload<ExtArgs>
      artisan: Prisma.$ArtisanPayload<ExtArgs> | null
      laborCost: Prisma.$LaborCostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      workId: number
      type: $Enums.Job
      artisanId: number | null
      doneAt: Date | null
      laborCostId: number
      createdBy: number
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    work<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artisan<T extends Task$artisanArgs<ExtArgs> = {}>(args?: Subset<T, Task$artisanArgs<ExtArgs>>): Prisma__ArtisanClient<$Result.GetResult<Prisma.$ArtisanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    laborCost<T extends LaborCostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LaborCostDefaultArgs<ExtArgs>>): Prisma__LaborCostClient<$Result.GetResult<Prisma.$LaborCostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly workId: FieldRef<"Task", 'Int'>
    readonly type: FieldRef<"Task", 'Job'>
    readonly artisanId: FieldRef<"Task", 'Int'>
    readonly doneAt: FieldRef<"Task", 'DateTime'>
    readonly laborCostId: FieldRef<"Task", 'Int'>
    readonly createdBy: FieldRef<"Task", 'Int'>
    readonly updatedBy: FieldRef<"Task", 'Int'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.artisan
   */
  export type Task$artisanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artisan
     */
    select?: ArtisanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artisan
     */
    omit?: ArtisanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtisanInclude<ExtArgs> | null
    where?: ArtisanWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Size
   */

  export type AggregateSize = {
    _count: SizeCountAggregateOutputType | null
    _avg: SizeAvgAggregateOutputType | null
    _sum: SizeSumAggregateOutputType | null
    _min: SizeMinAggregateOutputType | null
    _max: SizeMaxAggregateOutputType | null
  }

  export type SizeAvgAggregateOutputType = {
    id: number | null
  }

  export type SizeSumAggregateOutputType = {
    id: number | null
  }

  export type SizeMinAggregateOutputType = {
    id: number | null
    eu: string | null
    us: string | null
    uk: string | null
    jp: string | null
    gender: $Enums.Gender | null
  }

  export type SizeMaxAggregateOutputType = {
    id: number | null
    eu: string | null
    us: string | null
    uk: string | null
    jp: string | null
    gender: $Enums.Gender | null
  }

  export type SizeCountAggregateOutputType = {
    id: number
    eu: number
    us: number
    uk: number
    jp: number
    gender: number
    _all: number
  }


  export type SizeAvgAggregateInputType = {
    id?: true
  }

  export type SizeSumAggregateInputType = {
    id?: true
  }

  export type SizeMinAggregateInputType = {
    id?: true
    eu?: true
    us?: true
    uk?: true
    jp?: true
    gender?: true
  }

  export type SizeMaxAggregateInputType = {
    id?: true
    eu?: true
    us?: true
    uk?: true
    jp?: true
    gender?: true
  }

  export type SizeCountAggregateInputType = {
    id?: true
    eu?: true
    us?: true
    uk?: true
    jp?: true
    gender?: true
    _all?: true
  }

  export type SizeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Size to aggregate.
     */
    where?: SizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sizes to fetch.
     */
    orderBy?: SizeOrderByWithRelationInput | SizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sizes
    **/
    _count?: true | SizeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SizeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SizeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SizeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SizeMaxAggregateInputType
  }

  export type GetSizeAggregateType<T extends SizeAggregateArgs> = {
        [P in keyof T & keyof AggregateSize]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSize[P]>
      : GetScalarType<T[P], AggregateSize[P]>
  }




  export type SizeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SizeWhereInput
    orderBy?: SizeOrderByWithAggregationInput | SizeOrderByWithAggregationInput[]
    by: SizeScalarFieldEnum[] | SizeScalarFieldEnum
    having?: SizeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SizeCountAggregateInputType | true
    _avg?: SizeAvgAggregateInputType
    _sum?: SizeSumAggregateInputType
    _min?: SizeMinAggregateInputType
    _max?: SizeMaxAggregateInputType
  }

  export type SizeGroupByOutputType = {
    id: number
    eu: string
    us: string | null
    uk: string | null
    jp: string | null
    gender: $Enums.Gender
    _count: SizeCountAggregateOutputType | null
    _avg: SizeAvgAggregateOutputType | null
    _sum: SizeSumAggregateOutputType | null
    _min: SizeMinAggregateOutputType | null
    _max: SizeMaxAggregateOutputType | null
  }

  type GetSizeGroupByPayload<T extends SizeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SizeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SizeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SizeGroupByOutputType[P]>
            : GetScalarType<T[P], SizeGroupByOutputType[P]>
        }
      >
    >


  export type SizeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eu?: boolean
    us?: boolean
    uk?: boolean
    jp?: boolean
    gender?: boolean
    works?: boolean | Size$worksArgs<ExtArgs>
    _count?: boolean | SizeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["size"]>

  export type SizeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eu?: boolean
    us?: boolean
    uk?: boolean
    jp?: boolean
    gender?: boolean
  }, ExtArgs["result"]["size"]>

  export type SizeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eu?: boolean
    us?: boolean
    uk?: boolean
    jp?: boolean
    gender?: boolean
  }, ExtArgs["result"]["size"]>

  export type SizeSelectScalar = {
    id?: boolean
    eu?: boolean
    us?: boolean
    uk?: boolean
    jp?: boolean
    gender?: boolean
  }

  export type SizeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eu" | "us" | "uk" | "jp" | "gender", ExtArgs["result"]["size"]>
  export type SizeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    works?: boolean | Size$worksArgs<ExtArgs>
    _count?: boolean | SizeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SizeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SizeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SizePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Size"
    objects: {
      works: Prisma.$SizeToWorkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eu: string
      us: string | null
      uk: string | null
      jp: string | null
      gender: $Enums.Gender
    }, ExtArgs["result"]["size"]>
    composites: {}
  }

  type SizeGetPayload<S extends boolean | null | undefined | SizeDefaultArgs> = $Result.GetResult<Prisma.$SizePayload, S>

  type SizeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SizeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: SizeCountAggregateInputType | true
    }

  export interface SizeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Size'], meta: { name: 'Size' } }
    /**
     * Find zero or one Size that matches the filter.
     * @param {SizeFindUniqueArgs} args - Arguments to find a Size
     * @example
     * // Get one Size
     * const size = await prisma.size.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SizeFindUniqueArgs>(args: SelectSubset<T, SizeFindUniqueArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Size that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SizeFindUniqueOrThrowArgs} args - Arguments to find a Size
     * @example
     * // Get one Size
     * const size = await prisma.size.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SizeFindUniqueOrThrowArgs>(args: SelectSubset<T, SizeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Size that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeFindFirstArgs} args - Arguments to find a Size
     * @example
     * // Get one Size
     * const size = await prisma.size.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SizeFindFirstArgs>(args?: SelectSubset<T, SizeFindFirstArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Size that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeFindFirstOrThrowArgs} args - Arguments to find a Size
     * @example
     * // Get one Size
     * const size = await prisma.size.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SizeFindFirstOrThrowArgs>(args?: SelectSubset<T, SizeFindFirstOrThrowArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sizes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sizes
     * const sizes = await prisma.size.findMany()
     * 
     * // Get first 10 Sizes
     * const sizes = await prisma.size.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sizeWithIdOnly = await prisma.size.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SizeFindManyArgs>(args?: SelectSubset<T, SizeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Size.
     * @param {SizeCreateArgs} args - Arguments to create a Size.
     * @example
     * // Create one Size
     * const Size = await prisma.size.create({
     *   data: {
     *     // ... data to create a Size
     *   }
     * })
     * 
     */
    create<T extends SizeCreateArgs>(args: SelectSubset<T, SizeCreateArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sizes.
     * @param {SizeCreateManyArgs} args - Arguments to create many Sizes.
     * @example
     * // Create many Sizes
     * const size = await prisma.size.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SizeCreateManyArgs>(args?: SelectSubset<T, SizeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sizes and returns the data saved in the database.
     * @param {SizeCreateManyAndReturnArgs} args - Arguments to create many Sizes.
     * @example
     * // Create many Sizes
     * const size = await prisma.size.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sizes and only return the `id`
     * const sizeWithIdOnly = await prisma.size.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SizeCreateManyAndReturnArgs>(args?: SelectSubset<T, SizeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Size.
     * @param {SizeDeleteArgs} args - Arguments to delete one Size.
     * @example
     * // Delete one Size
     * const Size = await prisma.size.delete({
     *   where: {
     *     // ... filter to delete one Size
     *   }
     * })
     * 
     */
    delete<T extends SizeDeleteArgs>(args: SelectSubset<T, SizeDeleteArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Size.
     * @param {SizeUpdateArgs} args - Arguments to update one Size.
     * @example
     * // Update one Size
     * const size = await prisma.size.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SizeUpdateArgs>(args: SelectSubset<T, SizeUpdateArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sizes.
     * @param {SizeDeleteManyArgs} args - Arguments to filter Sizes to delete.
     * @example
     * // Delete a few Sizes
     * const { count } = await prisma.size.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SizeDeleteManyArgs>(args?: SelectSubset<T, SizeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sizes
     * const size = await prisma.size.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SizeUpdateManyArgs>(args: SelectSubset<T, SizeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sizes and returns the data updated in the database.
     * @param {SizeUpdateManyAndReturnArgs} args - Arguments to update many Sizes.
     * @example
     * // Update many Sizes
     * const size = await prisma.size.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sizes and only return the `id`
     * const sizeWithIdOnly = await prisma.size.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SizeUpdateManyAndReturnArgs>(args: SelectSubset<T, SizeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Size.
     * @param {SizeUpsertArgs} args - Arguments to update or create a Size.
     * @example
     * // Update or create a Size
     * const size = await prisma.size.upsert({
     *   create: {
     *     // ... data to create a Size
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Size we want to update
     *   }
     * })
     */
    upsert<T extends SizeUpsertArgs>(args: SelectSubset<T, SizeUpsertArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeCountArgs} args - Arguments to filter Sizes to count.
     * @example
     * // Count the number of Sizes
     * const count = await prisma.size.count({
     *   where: {
     *     // ... the filter for the Sizes we want to count
     *   }
     * })
    **/
    count<T extends SizeCountArgs>(
      args?: Subset<T, SizeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SizeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Size.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SizeAggregateArgs>(args: Subset<T, SizeAggregateArgs>): Prisma.PrismaPromise<GetSizeAggregateType<T>>

    /**
     * Group by Size.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SizeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SizeGroupByArgs['orderBy'] }
        : { orderBy?: SizeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SizeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSizeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Size model
   */
  readonly fields: SizeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Size.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SizeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    works<T extends Size$worksArgs<ExtArgs> = {}>(args?: Subset<T, Size$worksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Size model
   */
  interface SizeFieldRefs {
    readonly id: FieldRef<"Size", 'Int'>
    readonly eu: FieldRef<"Size", 'String'>
    readonly us: FieldRef<"Size", 'String'>
    readonly uk: FieldRef<"Size", 'String'>
    readonly jp: FieldRef<"Size", 'String'>
    readonly gender: FieldRef<"Size", 'Gender'>
  }
    

  // Custom InputTypes
  /**
   * Size findUnique
   */
  export type SizeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter, which Size to fetch.
     */
    where: SizeWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size findUniqueOrThrow
   */
  export type SizeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter, which Size to fetch.
     */
    where: SizeWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size findFirst
   */
  export type SizeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter, which Size to fetch.
     */
    where?: SizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sizes to fetch.
     */
    orderBy?: SizeOrderByWithRelationInput | SizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sizes.
     */
    cursor?: SizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sizes.
     */
    distinct?: SizeScalarFieldEnum | SizeScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size findFirstOrThrow
   */
  export type SizeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter, which Size to fetch.
     */
    where?: SizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sizes to fetch.
     */
    orderBy?: SizeOrderByWithRelationInput | SizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sizes.
     */
    cursor?: SizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sizes.
     */
    distinct?: SizeScalarFieldEnum | SizeScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size findMany
   */
  export type SizeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter, which Sizes to fetch.
     */
    where?: SizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sizes to fetch.
     */
    orderBy?: SizeOrderByWithRelationInput | SizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sizes.
     */
    cursor?: SizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sizes.
     */
    skip?: number
    distinct?: SizeScalarFieldEnum | SizeScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size create
   */
  export type SizeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * The data needed to create a Size.
     */
    data: XOR<SizeCreateInput, SizeUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size createMany
   */
  export type SizeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sizes.
     */
    data: SizeCreateManyInput | SizeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Size createManyAndReturn
   */
  export type SizeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * The data used to create many Sizes.
     */
    data: SizeCreateManyInput | SizeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Size update
   */
  export type SizeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * The data needed to update a Size.
     */
    data: XOR<SizeUpdateInput, SizeUncheckedUpdateInput>
    /**
     * Choose, which Size to update.
     */
    where: SizeWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size updateMany
   */
  export type SizeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sizes.
     */
    data: XOR<SizeUpdateManyMutationInput, SizeUncheckedUpdateManyInput>
    /**
     * Filter which Sizes to update
     */
    where?: SizeWhereInput
    /**
     * Limit how many Sizes to update.
     */
    limit?: number
  }

  /**
   * Size updateManyAndReturn
   */
  export type SizeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * The data used to update Sizes.
     */
    data: XOR<SizeUpdateManyMutationInput, SizeUncheckedUpdateManyInput>
    /**
     * Filter which Sizes to update
     */
    where?: SizeWhereInput
    /**
     * Limit how many Sizes to update.
     */
    limit?: number
  }

  /**
   * Size upsert
   */
  export type SizeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * The filter to search for the Size to update in case it exists.
     */
    where: SizeWhereUniqueInput
    /**
     * In case the Size found by the `where` argument doesn't exist, create a new Size with this data.
     */
    create: XOR<SizeCreateInput, SizeUncheckedCreateInput>
    /**
     * In case the Size was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SizeUpdateInput, SizeUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size delete
   */
  export type SizeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
    /**
     * Filter which Size to delete.
     */
    where: SizeWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Size deleteMany
   */
  export type SizeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sizes to delete
     */
    where?: SizeWhereInput
    /**
     * Limit how many Sizes to delete.
     */
    limit?: number
  }

  /**
   * Size.works
   */
  export type Size$worksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    where?: SizeToWorkWhereInput
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    cursor?: SizeToWorkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SizeToWorkScalarFieldEnum | SizeToWorkScalarFieldEnum[]
  }

  /**
   * Size without action
   */
  export type SizeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Size
     */
    select?: SizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Size
     */
    omit?: SizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeInclude<ExtArgs> | null
  }


  /**
   * Model SizeToWork
   */

  export type AggregateSizeToWork = {
    _count: SizeToWorkCountAggregateOutputType | null
    _avg: SizeToWorkAvgAggregateOutputType | null
    _sum: SizeToWorkSumAggregateOutputType | null
    _min: SizeToWorkMinAggregateOutputType | null
    _max: SizeToWorkMaxAggregateOutputType | null
  }

  export type SizeToWorkAvgAggregateOutputType = {
    workId: number | null
    sizeId: number | null
    quantity: number | null
  }

  export type SizeToWorkSumAggregateOutputType = {
    workId: number | null
    sizeId: number | null
    quantity: number | null
  }

  export type SizeToWorkMinAggregateOutputType = {
    workId: number | null
    sizeId: number | null
    quantity: number | null
  }

  export type SizeToWorkMaxAggregateOutputType = {
    workId: number | null
    sizeId: number | null
    quantity: number | null
  }

  export type SizeToWorkCountAggregateOutputType = {
    workId: number
    sizeId: number
    quantity: number
    _all: number
  }


  export type SizeToWorkAvgAggregateInputType = {
    workId?: true
    sizeId?: true
    quantity?: true
  }

  export type SizeToWorkSumAggregateInputType = {
    workId?: true
    sizeId?: true
    quantity?: true
  }

  export type SizeToWorkMinAggregateInputType = {
    workId?: true
    sizeId?: true
    quantity?: true
  }

  export type SizeToWorkMaxAggregateInputType = {
    workId?: true
    sizeId?: true
    quantity?: true
  }

  export type SizeToWorkCountAggregateInputType = {
    workId?: true
    sizeId?: true
    quantity?: true
    _all?: true
  }

  export type SizeToWorkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SizeToWork to aggregate.
     */
    where?: SizeToWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeToWorks to fetch.
     */
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SizeToWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeToWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeToWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SizeToWorks
    **/
    _count?: true | SizeToWorkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SizeToWorkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SizeToWorkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SizeToWorkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SizeToWorkMaxAggregateInputType
  }

  export type GetSizeToWorkAggregateType<T extends SizeToWorkAggregateArgs> = {
        [P in keyof T & keyof AggregateSizeToWork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSizeToWork[P]>
      : GetScalarType<T[P], AggregateSizeToWork[P]>
  }




  export type SizeToWorkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SizeToWorkWhereInput
    orderBy?: SizeToWorkOrderByWithAggregationInput | SizeToWorkOrderByWithAggregationInput[]
    by: SizeToWorkScalarFieldEnum[] | SizeToWorkScalarFieldEnum
    having?: SizeToWorkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SizeToWorkCountAggregateInputType | true
    _avg?: SizeToWorkAvgAggregateInputType
    _sum?: SizeToWorkSumAggregateInputType
    _min?: SizeToWorkMinAggregateInputType
    _max?: SizeToWorkMaxAggregateInputType
  }

  export type SizeToWorkGroupByOutputType = {
    workId: number
    sizeId: number
    quantity: number
    _count: SizeToWorkCountAggregateOutputType | null
    _avg: SizeToWorkAvgAggregateOutputType | null
    _sum: SizeToWorkSumAggregateOutputType | null
    _min: SizeToWorkMinAggregateOutputType | null
    _max: SizeToWorkMaxAggregateOutputType | null
  }

  type GetSizeToWorkGroupByPayload<T extends SizeToWorkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SizeToWorkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SizeToWorkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SizeToWorkGroupByOutputType[P]>
            : GetScalarType<T[P], SizeToWorkGroupByOutputType[P]>
        }
      >
    >


  export type SizeToWorkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workId?: boolean
    sizeId?: boolean
    quantity?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sizeToWork"]>

  export type SizeToWorkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workId?: boolean
    sizeId?: boolean
    quantity?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sizeToWork"]>

  export type SizeToWorkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workId?: boolean
    sizeId?: boolean
    quantity?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sizeToWork"]>

  export type SizeToWorkSelectScalar = {
    workId?: boolean
    sizeId?: boolean
    quantity?: boolean
  }

  export type SizeToWorkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"workId" | "sizeId" | "quantity", ExtArgs["result"]["sizeToWork"]>
  export type SizeToWorkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }
  export type SizeToWorkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }
  export type SizeToWorkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    size?: boolean | SizeDefaultArgs<ExtArgs>
  }

  export type $SizeToWorkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SizeToWork"
    objects: {
      work: Prisma.$WorkPayload<ExtArgs>
      size: Prisma.$SizePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      workId: number
      sizeId: number
      quantity: number
    }, ExtArgs["result"]["sizeToWork"]>
    composites: {}
  }

  type SizeToWorkGetPayload<S extends boolean | null | undefined | SizeToWorkDefaultArgs> = $Result.GetResult<Prisma.$SizeToWorkPayload, S>

  type SizeToWorkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SizeToWorkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: SizeToWorkCountAggregateInputType | true
    }

  export interface SizeToWorkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SizeToWork'], meta: { name: 'SizeToWork' } }
    /**
     * Find zero or one SizeToWork that matches the filter.
     * @param {SizeToWorkFindUniqueArgs} args - Arguments to find a SizeToWork
     * @example
     * // Get one SizeToWork
     * const sizeToWork = await prisma.sizeToWork.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SizeToWorkFindUniqueArgs>(args: SelectSubset<T, SizeToWorkFindUniqueArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SizeToWork that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SizeToWorkFindUniqueOrThrowArgs} args - Arguments to find a SizeToWork
     * @example
     * // Get one SizeToWork
     * const sizeToWork = await prisma.sizeToWork.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SizeToWorkFindUniqueOrThrowArgs>(args: SelectSubset<T, SizeToWorkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SizeToWork that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkFindFirstArgs} args - Arguments to find a SizeToWork
     * @example
     * // Get one SizeToWork
     * const sizeToWork = await prisma.sizeToWork.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SizeToWorkFindFirstArgs>(args?: SelectSubset<T, SizeToWorkFindFirstArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SizeToWork that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkFindFirstOrThrowArgs} args - Arguments to find a SizeToWork
     * @example
     * // Get one SizeToWork
     * const sizeToWork = await prisma.sizeToWork.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SizeToWorkFindFirstOrThrowArgs>(args?: SelectSubset<T, SizeToWorkFindFirstOrThrowArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SizeToWorks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SizeToWorks
     * const sizeToWorks = await prisma.sizeToWork.findMany()
     * 
     * // Get first 10 SizeToWorks
     * const sizeToWorks = await prisma.sizeToWork.findMany({ take: 10 })
     * 
     * // Only select the `workId`
     * const sizeToWorkWithWorkIdOnly = await prisma.sizeToWork.findMany({ select: { workId: true } })
     * 
     */
    findMany<T extends SizeToWorkFindManyArgs>(args?: SelectSubset<T, SizeToWorkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SizeToWork.
     * @param {SizeToWorkCreateArgs} args - Arguments to create a SizeToWork.
     * @example
     * // Create one SizeToWork
     * const SizeToWork = await prisma.sizeToWork.create({
     *   data: {
     *     // ... data to create a SizeToWork
     *   }
     * })
     * 
     */
    create<T extends SizeToWorkCreateArgs>(args: SelectSubset<T, SizeToWorkCreateArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SizeToWorks.
     * @param {SizeToWorkCreateManyArgs} args - Arguments to create many SizeToWorks.
     * @example
     * // Create many SizeToWorks
     * const sizeToWork = await prisma.sizeToWork.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SizeToWorkCreateManyArgs>(args?: SelectSubset<T, SizeToWorkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SizeToWorks and returns the data saved in the database.
     * @param {SizeToWorkCreateManyAndReturnArgs} args - Arguments to create many SizeToWorks.
     * @example
     * // Create many SizeToWorks
     * const sizeToWork = await prisma.sizeToWork.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SizeToWorks and only return the `workId`
     * const sizeToWorkWithWorkIdOnly = await prisma.sizeToWork.createManyAndReturn({
     *   select: { workId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SizeToWorkCreateManyAndReturnArgs>(args?: SelectSubset<T, SizeToWorkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SizeToWork.
     * @param {SizeToWorkDeleteArgs} args - Arguments to delete one SizeToWork.
     * @example
     * // Delete one SizeToWork
     * const SizeToWork = await prisma.sizeToWork.delete({
     *   where: {
     *     // ... filter to delete one SizeToWork
     *   }
     * })
     * 
     */
    delete<T extends SizeToWorkDeleteArgs>(args: SelectSubset<T, SizeToWorkDeleteArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SizeToWork.
     * @param {SizeToWorkUpdateArgs} args - Arguments to update one SizeToWork.
     * @example
     * // Update one SizeToWork
     * const sizeToWork = await prisma.sizeToWork.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SizeToWorkUpdateArgs>(args: SelectSubset<T, SizeToWorkUpdateArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SizeToWorks.
     * @param {SizeToWorkDeleteManyArgs} args - Arguments to filter SizeToWorks to delete.
     * @example
     * // Delete a few SizeToWorks
     * const { count } = await prisma.sizeToWork.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SizeToWorkDeleteManyArgs>(args?: SelectSubset<T, SizeToWorkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SizeToWorks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SizeToWorks
     * const sizeToWork = await prisma.sizeToWork.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SizeToWorkUpdateManyArgs>(args: SelectSubset<T, SizeToWorkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SizeToWorks and returns the data updated in the database.
     * @param {SizeToWorkUpdateManyAndReturnArgs} args - Arguments to update many SizeToWorks.
     * @example
     * // Update many SizeToWorks
     * const sizeToWork = await prisma.sizeToWork.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SizeToWorks and only return the `workId`
     * const sizeToWorkWithWorkIdOnly = await prisma.sizeToWork.updateManyAndReturn({
     *   select: { workId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SizeToWorkUpdateManyAndReturnArgs>(args: SelectSubset<T, SizeToWorkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SizeToWork.
     * @param {SizeToWorkUpsertArgs} args - Arguments to update or create a SizeToWork.
     * @example
     * // Update or create a SizeToWork
     * const sizeToWork = await prisma.sizeToWork.upsert({
     *   create: {
     *     // ... data to create a SizeToWork
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SizeToWork we want to update
     *   }
     * })
     */
    upsert<T extends SizeToWorkUpsertArgs>(args: SelectSubset<T, SizeToWorkUpsertArgs<ExtArgs>>): Prisma__SizeToWorkClient<$Result.GetResult<Prisma.$SizeToWorkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SizeToWorks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkCountArgs} args - Arguments to filter SizeToWorks to count.
     * @example
     * // Count the number of SizeToWorks
     * const count = await prisma.sizeToWork.count({
     *   where: {
     *     // ... the filter for the SizeToWorks we want to count
     *   }
     * })
    **/
    count<T extends SizeToWorkCountArgs>(
      args?: Subset<T, SizeToWorkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SizeToWorkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SizeToWork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SizeToWorkAggregateArgs>(args: Subset<T, SizeToWorkAggregateArgs>): Prisma.PrismaPromise<GetSizeToWorkAggregateType<T>>

    /**
     * Group by SizeToWork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeToWorkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SizeToWorkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SizeToWorkGroupByArgs['orderBy'] }
        : { orderBy?: SizeToWorkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SizeToWorkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSizeToWorkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SizeToWork model
   */
  readonly fields: SizeToWorkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SizeToWork.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SizeToWorkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    work<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    size<T extends SizeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SizeDefaultArgs<ExtArgs>>): Prisma__SizeClient<$Result.GetResult<Prisma.$SizePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SizeToWork model
   */
  interface SizeToWorkFieldRefs {
    readonly workId: FieldRef<"SizeToWork", 'Int'>
    readonly sizeId: FieldRef<"SizeToWork", 'Int'>
    readonly quantity: FieldRef<"SizeToWork", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SizeToWork findUnique
   */
  export type SizeToWorkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter, which SizeToWork to fetch.
     */
    where: SizeToWorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork findUniqueOrThrow
   */
  export type SizeToWorkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter, which SizeToWork to fetch.
     */
    where: SizeToWorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork findFirst
   */
  export type SizeToWorkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter, which SizeToWork to fetch.
     */
    where?: SizeToWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeToWorks to fetch.
     */
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SizeToWorks.
     */
    cursor?: SizeToWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeToWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeToWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SizeToWorks.
     */
    distinct?: SizeToWorkScalarFieldEnum | SizeToWorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork findFirstOrThrow
   */
  export type SizeToWorkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter, which SizeToWork to fetch.
     */
    where?: SizeToWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeToWorks to fetch.
     */
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SizeToWorks.
     */
    cursor?: SizeToWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeToWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeToWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SizeToWorks.
     */
    distinct?: SizeToWorkScalarFieldEnum | SizeToWorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork findMany
   */
  export type SizeToWorkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter, which SizeToWorks to fetch.
     */
    where?: SizeToWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeToWorks to fetch.
     */
    orderBy?: SizeToWorkOrderByWithRelationInput | SizeToWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SizeToWorks.
     */
    cursor?: SizeToWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeToWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeToWorks.
     */
    skip?: number
    distinct?: SizeToWorkScalarFieldEnum | SizeToWorkScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork create
   */
  export type SizeToWorkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * The data needed to create a SizeToWork.
     */
    data: XOR<SizeToWorkCreateInput, SizeToWorkUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork createMany
   */
  export type SizeToWorkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SizeToWorks.
     */
    data: SizeToWorkCreateManyInput | SizeToWorkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SizeToWork createManyAndReturn
   */
  export type SizeToWorkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * The data used to create many SizeToWorks.
     */
    data: SizeToWorkCreateManyInput | SizeToWorkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SizeToWork update
   */
  export type SizeToWorkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * The data needed to update a SizeToWork.
     */
    data: XOR<SizeToWorkUpdateInput, SizeToWorkUncheckedUpdateInput>
    /**
     * Choose, which SizeToWork to update.
     */
    where: SizeToWorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork updateMany
   */
  export type SizeToWorkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SizeToWorks.
     */
    data: XOR<SizeToWorkUpdateManyMutationInput, SizeToWorkUncheckedUpdateManyInput>
    /**
     * Filter which SizeToWorks to update
     */
    where?: SizeToWorkWhereInput
    /**
     * Limit how many SizeToWorks to update.
     */
    limit?: number
  }

  /**
   * SizeToWork updateManyAndReturn
   */
  export type SizeToWorkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * The data used to update SizeToWorks.
     */
    data: XOR<SizeToWorkUpdateManyMutationInput, SizeToWorkUncheckedUpdateManyInput>
    /**
     * Filter which SizeToWorks to update
     */
    where?: SizeToWorkWhereInput
    /**
     * Limit how many SizeToWorks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SizeToWork upsert
   */
  export type SizeToWorkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * The filter to search for the SizeToWork to update in case it exists.
     */
    where: SizeToWorkWhereUniqueInput
    /**
     * In case the SizeToWork found by the `where` argument doesn't exist, create a new SizeToWork with this data.
     */
    create: XOR<SizeToWorkCreateInput, SizeToWorkUncheckedCreateInput>
    /**
     * In case the SizeToWork was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SizeToWorkUpdateInput, SizeToWorkUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork delete
   */
  export type SizeToWorkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
    /**
     * Filter which SizeToWork to delete.
     */
    where: SizeToWorkWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * SizeToWork deleteMany
   */
  export type SizeToWorkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SizeToWorks to delete
     */
    where?: SizeToWorkWhereInput
    /**
     * Limit how many SizeToWorks to delete.
     */
    limit?: number
  }

  /**
   * SizeToWork without action
   */
  export type SizeToWorkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeToWork
     */
    select?: SizeToWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeToWork
     */
    omit?: SizeToWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SizeToWorkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    clearanceLevel: 'clearanceLevel'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    isActive: 'isActive',
    roleId: 'roleId',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    approvedAt: 'approvedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ColorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    hexCode: 'hexCode'
  };

  export type ColorScalarFieldEnum = (typeof ColorScalarFieldEnum)[keyof typeof ColorScalarFieldEnum]


  export const ProductCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    gender: 'gender'
  };

  export type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum]


  export const ProductGroupScalarFieldEnum: {
    id: 'id',
    skuNumeric: 'skuNumeric',
    productCategoryId: 'productCategoryId',
    name: 'name',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type ProductGroupScalarFieldEnum = (typeof ProductGroupScalarFieldEnum)[keyof typeof ProductGroupScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    productGroupId: 'productGroupId',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ColorToProductScalarFieldEnum: {
    productId: 'productId',
    colorId: 'colorId',
    order: 'order'
  };

  export type ColorToProductScalarFieldEnum = (typeof ColorToProductScalarFieldEnum)[keyof typeof ColorToProductScalarFieldEnum]


  export const LaborCostScalarFieldEnum: {
    id: 'id',
    type: 'type',
    cost: 'cost',
    productGroupId: 'productGroupId',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LaborCostScalarFieldEnum = (typeof LaborCostScalarFieldEnum)[keyof typeof LaborCostScalarFieldEnum]


  export const ArtisanScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    jobs: 'jobs',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArtisanScalarFieldEnum = (typeof ArtisanScalarFieldEnum)[keyof typeof ArtisanScalarFieldEnum]


  export const WorkScalarFieldEnum: {
    id: 'id',
    date: 'date',
    orderNo: 'orderNo',
    productId: 'productId',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkScalarFieldEnum = (typeof WorkScalarFieldEnum)[keyof typeof WorkScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    workId: 'workId',
    type: 'type',
    artisanId: 'artisanId',
    doneAt: 'doneAt',
    laborCostId: 'laborCostId',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SizeScalarFieldEnum: {
    id: 'id',
    eu: 'eu',
    us: 'us',
    uk: 'uk',
    jp: 'jp',
    gender: 'gender'
  };

  export type SizeScalarFieldEnum = (typeof SizeScalarFieldEnum)[keyof typeof SizeScalarFieldEnum]


  export const SizeToWorkScalarFieldEnum: {
    workId: 'workId',
    sizeId: 'sizeId',
    quantity: 'quantity'
  };

  export type SizeToWorkScalarFieldEnum = (typeof SizeToWorkScalarFieldEnum)[keyof typeof SizeToWorkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Job'
   */
  export type EnumJobFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Job'>
    


  /**
   * Reference to a field of type 'Job[]'
   */
  export type ListEnumJobFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Job[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    clearanceLevel?: IntFilter<"Role"> | number
    users?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clearanceLevel?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringNullableFilter<"Role"> | string | null
    clearanceLevel?: IntFilter<"Role"> | number
    users?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clearanceLevel?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    clearanceLevel?: IntWithAggregatesFilter<"Role"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdBy?: IntNullableFilter<"User"> | number | null
    updatedBy?: IntNullableFilter<"User"> | number | null
    approvedBy?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    approvedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    approvedUsers?: UserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    role?: RoleOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    createdUsers?: UserOrderByRelationAggregateInput
    approver?: UserOrderByWithRelationInput
    approvedUsers?: UserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdBy?: IntNullableFilter<"User"> | number | null
    updatedBy?: IntNullableFilter<"User"> | number | null
    approvedBy?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    approvedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    approvedUsers?: UserListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    roleId?: IntWithAggregatesFilter<"User"> | number
    createdBy?: IntNullableWithAggregatesFilter<"User"> | number | null
    updatedBy?: IntNullableWithAggregatesFilter<"User"> | number | null
    approvedBy?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ColorWhereInput = {
    AND?: ColorWhereInput | ColorWhereInput[]
    OR?: ColorWhereInput[]
    NOT?: ColorWhereInput | ColorWhereInput[]
    id?: IntFilter<"Color"> | number
    name?: StringFilter<"Color"> | string
    hexCode?: StringFilter<"Color"> | string
    productColors?: ColorToProductListRelationFilter
  }

  export type ColorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    hexCode?: SortOrder
    productColors?: ColorToProductOrderByRelationAggregateInput
  }

  export type ColorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ColorWhereInput | ColorWhereInput[]
    OR?: ColorWhereInput[]
    NOT?: ColorWhereInput | ColorWhereInput[]
    hexCode?: StringFilter<"Color"> | string
    productColors?: ColorToProductListRelationFilter
  }, "id" | "name">

  export type ColorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    hexCode?: SortOrder
    _count?: ColorCountOrderByAggregateInput
    _avg?: ColorAvgOrderByAggregateInput
    _max?: ColorMaxOrderByAggregateInput
    _min?: ColorMinOrderByAggregateInput
    _sum?: ColorSumOrderByAggregateInput
  }

  export type ColorScalarWhereWithAggregatesInput = {
    AND?: ColorScalarWhereWithAggregatesInput | ColorScalarWhereWithAggregatesInput[]
    OR?: ColorScalarWhereWithAggregatesInput[]
    NOT?: ColorScalarWhereWithAggregatesInput | ColorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Color"> | number
    name?: StringWithAggregatesFilter<"Color"> | string
    hexCode?: StringWithAggregatesFilter<"Color"> | string
  }

  export type ProductCategoryWhereInput = {
    AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    OR?: ProductCategoryWhereInput[]
    NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    id?: IntFilter<"ProductCategory"> | number
    name?: StringFilter<"ProductCategory"> | string
    gender?: EnumGenderFilter<"ProductCategory"> | $Enums.Gender
    productGroups?: ProductGroupListRelationFilter
  }

  export type ProductCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    productGroups?: ProductGroupOrderByRelationAggregateInput
  }

  export type ProductCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    OR?: ProductCategoryWhereInput[]
    NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    name?: StringFilter<"ProductCategory"> | string
    gender?: EnumGenderFilter<"ProductCategory"> | $Enums.Gender
    productGroups?: ProductGroupListRelationFilter
  }, "id">

  export type ProductCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    _count?: ProductCategoryCountOrderByAggregateInput
    _avg?: ProductCategoryAvgOrderByAggregateInput
    _max?: ProductCategoryMaxOrderByAggregateInput
    _min?: ProductCategoryMinOrderByAggregateInput
    _sum?: ProductCategorySumOrderByAggregateInput
  }

  export type ProductCategoryScalarWhereWithAggregatesInput = {
    AND?: ProductCategoryScalarWhereWithAggregatesInput | ProductCategoryScalarWhereWithAggregatesInput[]
    OR?: ProductCategoryScalarWhereWithAggregatesInput[]
    NOT?: ProductCategoryScalarWhereWithAggregatesInput | ProductCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductCategory"> | number
    name?: StringWithAggregatesFilter<"ProductCategory"> | string
    gender?: EnumGenderWithAggregatesFilter<"ProductCategory"> | $Enums.Gender
  }

  export type ProductGroupWhereInput = {
    AND?: ProductGroupWhereInput | ProductGroupWhereInput[]
    OR?: ProductGroupWhereInput[]
    NOT?: ProductGroupWhereInput | ProductGroupWhereInput[]
    id?: IntFilter<"ProductGroup"> | number
    skuNumeric?: StringFilter<"ProductGroup"> | string
    productCategoryId?: IntFilter<"ProductGroup"> | number
    name?: StringNullableFilter<"ProductGroup"> | string | null
    createdAt?: DateTimeFilter<"ProductGroup"> | Date | string
    createdBy?: IntFilter<"ProductGroup"> | number
    updatedAt?: DateTimeFilter<"ProductGroup"> | Date | string
    updatedBy?: IntNullableFilter<"ProductGroup"> | number | null
    products?: ProductListRelationFilter
    laborCosts?: LaborCostListRelationFilter
    productCategory?: XOR<ProductCategoryScalarRelationFilter, ProductCategoryWhereInput>
  }

  export type ProductGroupOrderByWithRelationInput = {
    id?: SortOrder
    skuNumeric?: SortOrder
    productCategoryId?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    products?: ProductOrderByRelationAggregateInput
    laborCosts?: LaborCostOrderByRelationAggregateInput
    productCategory?: ProductCategoryOrderByWithRelationInput
  }

  export type ProductGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductGroupWhereInput | ProductGroupWhereInput[]
    OR?: ProductGroupWhereInput[]
    NOT?: ProductGroupWhereInput | ProductGroupWhereInput[]
    skuNumeric?: StringFilter<"ProductGroup"> | string
    productCategoryId?: IntFilter<"ProductGroup"> | number
    name?: StringNullableFilter<"ProductGroup"> | string | null
    createdAt?: DateTimeFilter<"ProductGroup"> | Date | string
    createdBy?: IntFilter<"ProductGroup"> | number
    updatedAt?: DateTimeFilter<"ProductGroup"> | Date | string
    updatedBy?: IntNullableFilter<"ProductGroup"> | number | null
    products?: ProductListRelationFilter
    laborCosts?: LaborCostListRelationFilter
    productCategory?: XOR<ProductCategoryScalarRelationFilter, ProductCategoryWhereInput>
  }, "id">

  export type ProductGroupOrderByWithAggregationInput = {
    id?: SortOrder
    skuNumeric?: SortOrder
    productCategoryId?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ProductGroupCountOrderByAggregateInput
    _avg?: ProductGroupAvgOrderByAggregateInput
    _max?: ProductGroupMaxOrderByAggregateInput
    _min?: ProductGroupMinOrderByAggregateInput
    _sum?: ProductGroupSumOrderByAggregateInput
  }

  export type ProductGroupScalarWhereWithAggregatesInput = {
    AND?: ProductGroupScalarWhereWithAggregatesInput | ProductGroupScalarWhereWithAggregatesInput[]
    OR?: ProductGroupScalarWhereWithAggregatesInput[]
    NOT?: ProductGroupScalarWhereWithAggregatesInput | ProductGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductGroup"> | number
    skuNumeric?: StringWithAggregatesFilter<"ProductGroup"> | string
    productCategoryId?: IntWithAggregatesFilter<"ProductGroup"> | number
    name?: StringNullableWithAggregatesFilter<"ProductGroup"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProductGroup"> | Date | string
    createdBy?: IntWithAggregatesFilter<"ProductGroup"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ProductGroup"> | Date | string
    updatedBy?: IntNullableWithAggregatesFilter<"ProductGroup"> | number | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    productGroupId?: IntFilter<"Product"> | number
    createdBy?: IntFilter<"Product"> | number
    updatedBy?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    productColors?: ColorToProductListRelationFilter
    work?: WorkListRelationFilter
    productGroup?: XOR<ProductGroupScalarRelationFilter, ProductGroupWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productColors?: ColorToProductOrderByRelationAggregateInput
    work?: WorkOrderByRelationAggregateInput
    productGroup?: ProductGroupOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    sku?: StringFilter<"Product"> | string
    productGroupId?: IntFilter<"Product"> | number
    createdBy?: IntFilter<"Product"> | number
    updatedBy?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    productColors?: ColorToProductListRelationFilter
    work?: WorkListRelationFilter
    productGroup?: XOR<ProductGroupScalarRelationFilter, ProductGroupWhereInput>
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    sku?: StringWithAggregatesFilter<"Product"> | string
    productGroupId?: IntWithAggregatesFilter<"Product"> | number
    createdBy?: IntWithAggregatesFilter<"Product"> | number
    updatedBy?: IntNullableWithAggregatesFilter<"Product"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ColorToProductWhereInput = {
    AND?: ColorToProductWhereInput | ColorToProductWhereInput[]
    OR?: ColorToProductWhereInput[]
    NOT?: ColorToProductWhereInput | ColorToProductWhereInput[]
    productId?: IntFilter<"ColorToProduct"> | number
    colorId?: IntFilter<"ColorToProduct"> | number
    order?: IntFilter<"ColorToProduct"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    color?: XOR<ColorScalarRelationFilter, ColorWhereInput>
  }

  export type ColorToProductOrderByWithRelationInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
    product?: ProductOrderByWithRelationInput
    color?: ColorOrderByWithRelationInput
  }

  export type ColorToProductWhereUniqueInput = Prisma.AtLeast<{
    productId_colorId?: ColorToProductProductIdColorIdCompoundUniqueInput
    AND?: ColorToProductWhereInput | ColorToProductWhereInput[]
    OR?: ColorToProductWhereInput[]
    NOT?: ColorToProductWhereInput | ColorToProductWhereInput[]
    productId?: IntFilter<"ColorToProduct"> | number
    colorId?: IntFilter<"ColorToProduct"> | number
    order?: IntFilter<"ColorToProduct"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    color?: XOR<ColorScalarRelationFilter, ColorWhereInput>
  }, "productId_colorId">

  export type ColorToProductOrderByWithAggregationInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
    _count?: ColorToProductCountOrderByAggregateInput
    _avg?: ColorToProductAvgOrderByAggregateInput
    _max?: ColorToProductMaxOrderByAggregateInput
    _min?: ColorToProductMinOrderByAggregateInput
    _sum?: ColorToProductSumOrderByAggregateInput
  }

  export type ColorToProductScalarWhereWithAggregatesInput = {
    AND?: ColorToProductScalarWhereWithAggregatesInput | ColorToProductScalarWhereWithAggregatesInput[]
    OR?: ColorToProductScalarWhereWithAggregatesInput[]
    NOT?: ColorToProductScalarWhereWithAggregatesInput | ColorToProductScalarWhereWithAggregatesInput[]
    productId?: IntWithAggregatesFilter<"ColorToProduct"> | number
    colorId?: IntWithAggregatesFilter<"ColorToProduct"> | number
    order?: IntWithAggregatesFilter<"ColorToProduct"> | number
  }

  export type LaborCostWhereInput = {
    AND?: LaborCostWhereInput | LaborCostWhereInput[]
    OR?: LaborCostWhereInput[]
    NOT?: LaborCostWhereInput | LaborCostWhereInput[]
    id?: IntFilter<"LaborCost"> | number
    type?: EnumJobFilter<"LaborCost"> | $Enums.Job
    cost?: IntFilter<"LaborCost"> | number
    productGroupId?: IntFilter<"LaborCost"> | number
    createdBy?: IntFilter<"LaborCost"> | number
    updatedBy?: IntNullableFilter<"LaborCost"> | number | null
    createdAt?: DateTimeFilter<"LaborCost"> | Date | string
    updatedAt?: DateTimeFilter<"LaborCost"> | Date | string
    tasks?: TaskListRelationFilter
    productGroup?: XOR<ProductGroupScalarRelationFilter, ProductGroupWhereInput>
  }

  export type LaborCostOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    productGroup?: ProductGroupOrderByWithRelationInput
  }

  export type LaborCostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productGroupId_type?: LaborCostProductGroupIdTypeCompoundUniqueInput
    AND?: LaborCostWhereInput | LaborCostWhereInput[]
    OR?: LaborCostWhereInput[]
    NOT?: LaborCostWhereInput | LaborCostWhereInput[]
    type?: EnumJobFilter<"LaborCost"> | $Enums.Job
    cost?: IntFilter<"LaborCost"> | number
    productGroupId?: IntFilter<"LaborCost"> | number
    createdBy?: IntFilter<"LaborCost"> | number
    updatedBy?: IntNullableFilter<"LaborCost"> | number | null
    createdAt?: DateTimeFilter<"LaborCost"> | Date | string
    updatedAt?: DateTimeFilter<"LaborCost"> | Date | string
    tasks?: TaskListRelationFilter
    productGroup?: XOR<ProductGroupScalarRelationFilter, ProductGroupWhereInput>
  }, "id" | "productGroupId_type">

  export type LaborCostOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LaborCostCountOrderByAggregateInput
    _avg?: LaborCostAvgOrderByAggregateInput
    _max?: LaborCostMaxOrderByAggregateInput
    _min?: LaborCostMinOrderByAggregateInput
    _sum?: LaborCostSumOrderByAggregateInput
  }

  export type LaborCostScalarWhereWithAggregatesInput = {
    AND?: LaborCostScalarWhereWithAggregatesInput | LaborCostScalarWhereWithAggregatesInput[]
    OR?: LaborCostScalarWhereWithAggregatesInput[]
    NOT?: LaborCostScalarWhereWithAggregatesInput | LaborCostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LaborCost"> | number
    type?: EnumJobWithAggregatesFilter<"LaborCost"> | $Enums.Job
    cost?: IntWithAggregatesFilter<"LaborCost"> | number
    productGroupId?: IntWithAggregatesFilter<"LaborCost"> | number
    createdBy?: IntWithAggregatesFilter<"LaborCost"> | number
    updatedBy?: IntNullableWithAggregatesFilter<"LaborCost"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"LaborCost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LaborCost"> | Date | string
  }

  export type ArtisanWhereInput = {
    AND?: ArtisanWhereInput | ArtisanWhereInput[]
    OR?: ArtisanWhereInput[]
    NOT?: ArtisanWhereInput | ArtisanWhereInput[]
    id?: IntFilter<"Artisan"> | number
    firstName?: StringFilter<"Artisan"> | string
    lastName?: StringNullableFilter<"Artisan"> | string | null
    jobs?: EnumJobNullableListFilter<"Artisan">
    createdBy?: IntFilter<"Artisan"> | number
    updatedBy?: IntNullableFilter<"Artisan"> | number | null
    createdAt?: DateTimeFilter<"Artisan"> | Date | string
    updatedAt?: DateTimeFilter<"Artisan"> | Date | string
    tasks?: TaskListRelationFilter
  }

  export type ArtisanOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    jobs?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ArtisanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArtisanWhereInput | ArtisanWhereInput[]
    OR?: ArtisanWhereInput[]
    NOT?: ArtisanWhereInput | ArtisanWhereInput[]
    firstName?: StringFilter<"Artisan"> | string
    lastName?: StringNullableFilter<"Artisan"> | string | null
    jobs?: EnumJobNullableListFilter<"Artisan">
    createdBy?: IntFilter<"Artisan"> | number
    updatedBy?: IntNullableFilter<"Artisan"> | number | null
    createdAt?: DateTimeFilter<"Artisan"> | Date | string
    updatedAt?: DateTimeFilter<"Artisan"> | Date | string
    tasks?: TaskListRelationFilter
  }, "id">

  export type ArtisanOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    jobs?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArtisanCountOrderByAggregateInput
    _avg?: ArtisanAvgOrderByAggregateInput
    _max?: ArtisanMaxOrderByAggregateInput
    _min?: ArtisanMinOrderByAggregateInput
    _sum?: ArtisanSumOrderByAggregateInput
  }

  export type ArtisanScalarWhereWithAggregatesInput = {
    AND?: ArtisanScalarWhereWithAggregatesInput | ArtisanScalarWhereWithAggregatesInput[]
    OR?: ArtisanScalarWhereWithAggregatesInput[]
    NOT?: ArtisanScalarWhereWithAggregatesInput | ArtisanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Artisan"> | number
    firstName?: StringWithAggregatesFilter<"Artisan"> | string
    lastName?: StringNullableWithAggregatesFilter<"Artisan"> | string | null
    jobs?: EnumJobNullableListFilter<"Artisan">
    createdBy?: IntWithAggregatesFilter<"Artisan"> | number
    updatedBy?: IntNullableWithAggregatesFilter<"Artisan"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Artisan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Artisan"> | Date | string
  }

  export type WorkWhereInput = {
    AND?: WorkWhereInput | WorkWhereInput[]
    OR?: WorkWhereInput[]
    NOT?: WorkWhereInput | WorkWhereInput[]
    id?: IntFilter<"Work"> | number
    date?: DateTimeFilter<"Work"> | Date | string
    orderNo?: StringFilter<"Work"> | string
    productId?: IntFilter<"Work"> | number
    createdBy?: IntFilter<"Work"> | number
    updatedBy?: IntNullableFilter<"Work"> | number | null
    createdAt?: DateTimeFilter<"Work"> | Date | string
    updatedAt?: DateTimeFilter<"Work"> | Date | string
    sizes?: SizeToWorkListRelationFilter
    tasks?: TaskListRelationFilter
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type WorkOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    orderNo?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sizes?: SizeToWorkOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    product?: ProductOrderByWithRelationInput
  }

  export type WorkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderNo?: string
    AND?: WorkWhereInput | WorkWhereInput[]
    OR?: WorkWhereInput[]
    NOT?: WorkWhereInput | WorkWhereInput[]
    date?: DateTimeFilter<"Work"> | Date | string
    productId?: IntFilter<"Work"> | number
    createdBy?: IntFilter<"Work"> | number
    updatedBy?: IntNullableFilter<"Work"> | number | null
    createdAt?: DateTimeFilter<"Work"> | Date | string
    updatedAt?: DateTimeFilter<"Work"> | Date | string
    sizes?: SizeToWorkListRelationFilter
    tasks?: TaskListRelationFilter
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "orderNo">

  export type WorkOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    orderNo?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkCountOrderByAggregateInput
    _avg?: WorkAvgOrderByAggregateInput
    _max?: WorkMaxOrderByAggregateInput
    _min?: WorkMinOrderByAggregateInput
    _sum?: WorkSumOrderByAggregateInput
  }

  export type WorkScalarWhereWithAggregatesInput = {
    AND?: WorkScalarWhereWithAggregatesInput | WorkScalarWhereWithAggregatesInput[]
    OR?: WorkScalarWhereWithAggregatesInput[]
    NOT?: WorkScalarWhereWithAggregatesInput | WorkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Work"> | number
    date?: DateTimeWithAggregatesFilter<"Work"> | Date | string
    orderNo?: StringWithAggregatesFilter<"Work"> | string
    productId?: IntWithAggregatesFilter<"Work"> | number
    createdBy?: IntWithAggregatesFilter<"Work"> | number
    updatedBy?: IntNullableWithAggregatesFilter<"Work"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Work"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Work"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    workId?: IntFilter<"Task"> | number
    type?: EnumJobFilter<"Task"> | $Enums.Job
    artisanId?: IntNullableFilter<"Task"> | number | null
    doneAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    laborCostId?: IntFilter<"Task"> | number
    createdBy?: IntFilter<"Task"> | number
    updatedBy?: IntNullableFilter<"Task"> | number | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    artisan?: XOR<ArtisanNullableScalarRelationFilter, ArtisanWhereInput> | null
    laborCost?: XOR<LaborCostScalarRelationFilter, LaborCostWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    workId?: SortOrder
    type?: SortOrder
    artisanId?: SortOrderInput | SortOrder
    doneAt?: SortOrderInput | SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    work?: WorkOrderByWithRelationInput
    artisan?: ArtisanOrderByWithRelationInput
    laborCost?: LaborCostOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    workId_type?: TaskWorkIdTypeCompoundUniqueInput
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    workId?: IntFilter<"Task"> | number
    type?: EnumJobFilter<"Task"> | $Enums.Job
    artisanId?: IntNullableFilter<"Task"> | number | null
    doneAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    laborCostId?: IntFilter<"Task"> | number
    createdBy?: IntFilter<"Task"> | number
    updatedBy?: IntNullableFilter<"Task"> | number | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    artisan?: XOR<ArtisanNullableScalarRelationFilter, ArtisanWhereInput> | null
    laborCost?: XOR<LaborCostScalarRelationFilter, LaborCostWhereInput>
  }, "id" | "workId_type">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    workId?: SortOrder
    type?: SortOrder
    artisanId?: SortOrderInput | SortOrder
    doneAt?: SortOrderInput | SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    workId?: IntWithAggregatesFilter<"Task"> | number
    type?: EnumJobWithAggregatesFilter<"Task"> | $Enums.Job
    artisanId?: IntNullableWithAggregatesFilter<"Task"> | number | null
    doneAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    laborCostId?: IntWithAggregatesFilter<"Task"> | number
    createdBy?: IntWithAggregatesFilter<"Task"> | number
    updatedBy?: IntNullableWithAggregatesFilter<"Task"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type SizeWhereInput = {
    AND?: SizeWhereInput | SizeWhereInput[]
    OR?: SizeWhereInput[]
    NOT?: SizeWhereInput | SizeWhereInput[]
    id?: IntFilter<"Size"> | number
    eu?: StringFilter<"Size"> | string
    us?: StringNullableFilter<"Size"> | string | null
    uk?: StringNullableFilter<"Size"> | string | null
    jp?: StringNullableFilter<"Size"> | string | null
    gender?: EnumGenderFilter<"Size"> | $Enums.Gender
    works?: SizeToWorkListRelationFilter
  }

  export type SizeOrderByWithRelationInput = {
    id?: SortOrder
    eu?: SortOrder
    us?: SortOrderInput | SortOrder
    uk?: SortOrderInput | SortOrder
    jp?: SortOrderInput | SortOrder
    gender?: SortOrder
    works?: SizeToWorkOrderByRelationAggregateInput
  }

  export type SizeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    eu_gender?: SizeEuGenderCompoundUniqueInput
    us_gender?: SizeUsGenderCompoundUniqueInput
    uk_gender?: SizeUkGenderCompoundUniqueInput
    AND?: SizeWhereInput | SizeWhereInput[]
    OR?: SizeWhereInput[]
    NOT?: SizeWhereInput | SizeWhereInput[]
    eu?: StringFilter<"Size"> | string
    us?: StringNullableFilter<"Size"> | string | null
    uk?: StringNullableFilter<"Size"> | string | null
    jp?: StringNullableFilter<"Size"> | string | null
    gender?: EnumGenderFilter<"Size"> | $Enums.Gender
    works?: SizeToWorkListRelationFilter
  }, "id" | "eu_gender" | "us_gender" | "uk_gender">

  export type SizeOrderByWithAggregationInput = {
    id?: SortOrder
    eu?: SortOrder
    us?: SortOrderInput | SortOrder
    uk?: SortOrderInput | SortOrder
    jp?: SortOrderInput | SortOrder
    gender?: SortOrder
    _count?: SizeCountOrderByAggregateInput
    _avg?: SizeAvgOrderByAggregateInput
    _max?: SizeMaxOrderByAggregateInput
    _min?: SizeMinOrderByAggregateInput
    _sum?: SizeSumOrderByAggregateInput
  }

  export type SizeScalarWhereWithAggregatesInput = {
    AND?: SizeScalarWhereWithAggregatesInput | SizeScalarWhereWithAggregatesInput[]
    OR?: SizeScalarWhereWithAggregatesInput[]
    NOT?: SizeScalarWhereWithAggregatesInput | SizeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Size"> | number
    eu?: StringWithAggregatesFilter<"Size"> | string
    us?: StringNullableWithAggregatesFilter<"Size"> | string | null
    uk?: StringNullableWithAggregatesFilter<"Size"> | string | null
    jp?: StringNullableWithAggregatesFilter<"Size"> | string | null
    gender?: EnumGenderWithAggregatesFilter<"Size"> | $Enums.Gender
  }

  export type SizeToWorkWhereInput = {
    AND?: SizeToWorkWhereInput | SizeToWorkWhereInput[]
    OR?: SizeToWorkWhereInput[]
    NOT?: SizeToWorkWhereInput | SizeToWorkWhereInput[]
    workId?: IntFilter<"SizeToWork"> | number
    sizeId?: IntFilter<"SizeToWork"> | number
    quantity?: IntFilter<"SizeToWork"> | number
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    size?: XOR<SizeScalarRelationFilter, SizeWhereInput>
  }

  export type SizeToWorkOrderByWithRelationInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
    work?: WorkOrderByWithRelationInput
    size?: SizeOrderByWithRelationInput
  }

  export type SizeToWorkWhereUniqueInput = Prisma.AtLeast<{
    workId_sizeId?: SizeToWorkWorkIdSizeIdCompoundUniqueInput
    AND?: SizeToWorkWhereInput | SizeToWorkWhereInput[]
    OR?: SizeToWorkWhereInput[]
    NOT?: SizeToWorkWhereInput | SizeToWorkWhereInput[]
    workId?: IntFilter<"SizeToWork"> | number
    sizeId?: IntFilter<"SizeToWork"> | number
    quantity?: IntFilter<"SizeToWork"> | number
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    size?: XOR<SizeScalarRelationFilter, SizeWhereInput>
  }, "workId_sizeId">

  export type SizeToWorkOrderByWithAggregationInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
    _count?: SizeToWorkCountOrderByAggregateInput
    _avg?: SizeToWorkAvgOrderByAggregateInput
    _max?: SizeToWorkMaxOrderByAggregateInput
    _min?: SizeToWorkMinOrderByAggregateInput
    _sum?: SizeToWorkSumOrderByAggregateInput
  }

  export type SizeToWorkScalarWhereWithAggregatesInput = {
    AND?: SizeToWorkScalarWhereWithAggregatesInput | SizeToWorkScalarWhereWithAggregatesInput[]
    OR?: SizeToWorkScalarWhereWithAggregatesInput[]
    NOT?: SizeToWorkScalarWhereWithAggregatesInput | SizeToWorkScalarWhereWithAggregatesInput[]
    workId?: IntWithAggregatesFilter<"SizeToWork"> | number
    sizeId?: IntWithAggregatesFilter<"SizeToWork"> | number
    quantity?: IntWithAggregatesFilter<"SizeToWork"> | number
  }

  export type RoleCreateInput = {
    name: string
    description?: string | null
    clearanceLevel: number
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    clearanceLevel: number
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    clearanceLevel: number
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    role: RoleCreateNestedOneWithoutUsersInput
    creator?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatorInput
    approver?: UserCreateNestedOneWithoutApprovedUsersInput
    approvedUsers?: UserCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatorInput
    approvedUsers?: UserUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    creator?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatorNestedInput
    approver?: UserUpdateOneWithoutApprovedUsersNestedInput
    approvedUsers?: UserUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatorNestedInput
    approvedUsers?: UserUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ColorCreateInput = {
    name: string
    hexCode: string
    productColors?: ColorToProductCreateNestedManyWithoutColorInput
  }

  export type ColorUncheckedCreateInput = {
    id?: number
    name: string
    hexCode: string
    productColors?: ColorToProductUncheckedCreateNestedManyWithoutColorInput
  }

  export type ColorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
    productColors?: ColorToProductUpdateManyWithoutColorNestedInput
  }

  export type ColorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
    productColors?: ColorToProductUncheckedUpdateManyWithoutColorNestedInput
  }

  export type ColorCreateManyInput = {
    id?: number
    name: string
    hexCode: string
  }

  export type ColorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
  }

  export type ColorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCategoryCreateInput = {
    name: string
    gender: $Enums.Gender
    productGroups?: ProductGroupCreateNestedManyWithoutProductCategoryInput
  }

  export type ProductCategoryUncheckedCreateInput = {
    id?: number
    name: string
    gender: $Enums.Gender
    productGroups?: ProductGroupUncheckedCreateNestedManyWithoutProductCategoryInput
  }

  export type ProductCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    productGroups?: ProductGroupUpdateManyWithoutProductCategoryNestedInput
  }

  export type ProductCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    productGroups?: ProductGroupUncheckedUpdateManyWithoutProductCategoryNestedInput
  }

  export type ProductCategoryCreateManyInput = {
    id?: number
    name: string
    gender: $Enums.Gender
  }

  export type ProductCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type ProductCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type ProductGroupCreateInput = {
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductCreateNestedManyWithoutProductGroupInput
    laborCosts?: LaborCostCreateNestedManyWithoutProductGroupInput
    productCategory: ProductCategoryCreateNestedOneWithoutProductGroupsInput
  }

  export type ProductGroupUncheckedCreateInput = {
    id?: number
    skuNumeric: string
    productCategoryId: number
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductUncheckedCreateNestedManyWithoutProductGroupInput
    laborCosts?: LaborCostUncheckedCreateNestedManyWithoutProductGroupInput
  }

  export type ProductGroupUpdateInput = {
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUpdateManyWithoutProductGroupNestedInput
    laborCosts?: LaborCostUpdateManyWithoutProductGroupNestedInput
    productCategory?: ProductCategoryUpdateOneRequiredWithoutProductGroupsNestedInput
  }

  export type ProductGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    productCategoryId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUncheckedUpdateManyWithoutProductGroupNestedInput
    laborCosts?: LaborCostUncheckedUpdateManyWithoutProductGroupNestedInput
  }

  export type ProductGroupCreateManyInput = {
    id?: number
    skuNumeric: string
    productCategoryId: number
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
  }

  export type ProductGroupUpdateManyMutationInput = {
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    productCategoryId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductCreateInput = {
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductCreateNestedManyWithoutProductInput
    work?: WorkCreateNestedManyWithoutProductInput
    productGroup: ProductGroupCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    sku: string
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductUncheckedCreateNestedManyWithoutProductInput
    work?: WorkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUpdateManyWithoutProductNestedInput
    work?: WorkUpdateManyWithoutProductNestedInput
    productGroup?: ProductGroupUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUncheckedUpdateManyWithoutProductNestedInput
    work?: WorkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    sku: string
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorToProductCreateInput = {
    order: number
    product: ProductCreateNestedOneWithoutProductColorsInput
    color: ColorCreateNestedOneWithoutProductColorsInput
  }

  export type ColorToProductUncheckedCreateInput = {
    productId: number
    colorId: number
    order: number
  }

  export type ColorToProductUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutProductColorsNestedInput
    color?: ColorUpdateOneRequiredWithoutProductColorsNestedInput
  }

  export type ColorToProductUncheckedUpdateInput = {
    productId?: IntFieldUpdateOperationsInput | number
    colorId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColorToProductCreateManyInput = {
    productId: number
    colorId: number
    order: number
  }

  export type ColorToProductUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColorToProductUncheckedUpdateManyInput = {
    productId?: IntFieldUpdateOperationsInput | number
    colorId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type LaborCostCreateInput = {
    type: $Enums.Job
    cost: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutLaborCostInput
    productGroup: ProductGroupCreateNestedOneWithoutLaborCostsInput
  }

  export type LaborCostUncheckedCreateInput = {
    id?: number
    type: $Enums.Job
    cost: number
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutLaborCostInput
  }

  export type LaborCostUpdateInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutLaborCostNestedInput
    productGroup?: ProductGroupUpdateOneRequiredWithoutLaborCostsNestedInput
  }

  export type LaborCostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutLaborCostNestedInput
  }

  export type LaborCostCreateManyInput = {
    id?: number
    type: $Enums.Job
    cost: number
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LaborCostUpdateManyMutationInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaborCostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtisanCreateInput = {
    firstName: string
    lastName?: string | null
    jobs?: ArtisanCreatejobsInput | $Enums.Job[]
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutArtisanInput
  }

  export type ArtisanUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName?: string | null
    jobs?: ArtisanCreatejobsInput | $Enums.Job[]
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutArtisanInput
  }

  export type ArtisanUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutArtisanNestedInput
  }

  export type ArtisanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutArtisanNestedInput
  }

  export type ArtisanCreateManyInput = {
    id?: number
    firstName: string
    lastName?: string | null
    jobs?: ArtisanCreatejobsInput | $Enums.Job[]
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtisanUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtisanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkCreateInput = {
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkCreateNestedManyWithoutWorkInput
    tasks?: TaskCreateNestedManyWithoutWorkInput
    product: ProductCreateNestedOneWithoutWorkInput
  }

  export type WorkUncheckedCreateInput = {
    id?: number
    date: Date | string
    orderNo: string
    productId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkUncheckedCreateNestedManyWithoutWorkInput
    tasks?: TaskUncheckedCreateNestedManyWithoutWorkInput
  }

  export type WorkUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUpdateManyWithoutWorkNestedInput
    tasks?: TaskUpdateManyWithoutWorkNestedInput
    product?: ProductUpdateOneRequiredWithoutWorkNestedInput
  }

  export type WorkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUncheckedUpdateManyWithoutWorkNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutWorkNestedInput
  }

  export type WorkCreateManyInput = {
    id?: number
    date: Date | string
    orderNo: string
    productId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    type: $Enums.Job
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    work: WorkCreateNestedOneWithoutTasksInput
    artisan?: ArtisanCreateNestedOneWithoutTasksInput
    laborCost: LaborCostCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    workId: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    work?: WorkUpdateOneRequiredWithoutTasksNestedInput
    artisan?: ArtisanUpdateOneWithoutTasksNestedInput
    laborCost?: LaborCostUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: number
    workId: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeCreateInput = {
    eu: string
    us?: string | null
    uk?: string | null
    jp?: string | null
    gender: $Enums.Gender
    works?: SizeToWorkCreateNestedManyWithoutSizeInput
  }

  export type SizeUncheckedCreateInput = {
    id?: number
    eu: string
    us?: string | null
    uk?: string | null
    jp?: string | null
    gender: $Enums.Gender
    works?: SizeToWorkUncheckedCreateNestedManyWithoutSizeInput
  }

  export type SizeUpdateInput = {
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    works?: SizeToWorkUpdateManyWithoutSizeNestedInput
  }

  export type SizeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    works?: SizeToWorkUncheckedUpdateManyWithoutSizeNestedInput
  }

  export type SizeCreateManyInput = {
    id?: number
    eu: string
    us?: string | null
    uk?: string | null
    jp?: string | null
    gender: $Enums.Gender
  }

  export type SizeUpdateManyMutationInput = {
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type SizeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type SizeToWorkCreateInput = {
    quantity: number
    work: WorkCreateNestedOneWithoutSizesInput
    size: SizeCreateNestedOneWithoutWorksInput
  }

  export type SizeToWorkUncheckedCreateInput = {
    workId: number
    sizeId: number
    quantity: number
  }

  export type SizeToWorkUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    work?: WorkUpdateOneRequiredWithoutSizesNestedInput
    size?: SizeUpdateOneRequiredWithoutWorksNestedInput
  }

  export type SizeToWorkUncheckedUpdateInput = {
    workId?: IntFieldUpdateOperationsInput | number
    sizeId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type SizeToWorkCreateManyInput = {
    workId: number
    sizeId: number
    quantity: number
  }

  export type SizeToWorkUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type SizeToWorkUncheckedUpdateManyInput = {
    workId?: IntFieldUpdateOperationsInput | number
    sizeId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clearanceLevel?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
    clearanceLevel?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clearanceLevel?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clearanceLevel?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
    clearanceLevel?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    approvedBy?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    approvedBy?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ColorToProductListRelationFilter = {
    every?: ColorToProductWhereInput
    some?: ColorToProductWhereInput
    none?: ColorToProductWhereInput
  }

  export type ColorToProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hexCode?: SortOrder
  }

  export type ColorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ColorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hexCode?: SortOrder
  }

  export type ColorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hexCode?: SortOrder
  }

  export type ColorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type ProductGroupListRelationFilter = {
    every?: ProductGroupWhereInput
    some?: ProductGroupWhereInput
    none?: ProductGroupWhereInput
  }

  export type ProductGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type ProductCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type ProductCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type ProductCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type LaborCostListRelationFilter = {
    every?: LaborCostWhereInput
    some?: LaborCostWhereInput
    none?: LaborCostWhereInput
  }

  export type ProductCategoryScalarRelationFilter = {
    is?: ProductCategoryWhereInput
    isNot?: ProductCategoryWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LaborCostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductGroupCountOrderByAggregateInput = {
    id?: SortOrder
    skuNumeric?: SortOrder
    productCategoryId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductGroupAvgOrderByAggregateInput = {
    id?: SortOrder
    productCategoryId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    skuNumeric?: SortOrder
    productCategoryId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductGroupMinOrderByAggregateInput = {
    id?: SortOrder
    skuNumeric?: SortOrder
    productCategoryId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductGroupSumOrderByAggregateInput = {
    id?: SortOrder
    productCategoryId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type WorkListRelationFilter = {
    every?: WorkWhereInput
    some?: WorkWhereInput
    none?: WorkWhereInput
  }

  export type ProductGroupScalarRelationFilter = {
    is?: ProductGroupWhereInput
    isNot?: ProductGroupWhereInput
  }

  export type WorkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ColorScalarRelationFilter = {
    is?: ColorWhereInput
    isNot?: ColorWhereInput
  }

  export type ColorToProductProductIdColorIdCompoundUniqueInput = {
    productId: number
    colorId: number
  }

  export type ColorToProductCountOrderByAggregateInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
  }

  export type ColorToProductAvgOrderByAggregateInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
  }

  export type ColorToProductMaxOrderByAggregateInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
  }

  export type ColorToProductMinOrderByAggregateInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
  }

  export type ColorToProductSumOrderByAggregateInput = {
    productId?: SortOrder
    colorId?: SortOrder
    order?: SortOrder
  }

  export type EnumJobFilter<$PrismaModel = never> = {
    equals?: $Enums.Job | EnumJobFieldRefInput<$PrismaModel>
    in?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    notIn?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    not?: NestedEnumJobFilter<$PrismaModel> | $Enums.Job
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LaborCostProductGroupIdTypeCompoundUniqueInput = {
    productGroupId: number
    type: $Enums.Job
  }

  export type LaborCostCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaborCostAvgOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type LaborCostMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaborCostMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaborCostSumOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    productGroupId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type EnumJobWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Job | EnumJobFieldRefInput<$PrismaModel>
    in?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    notIn?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    not?: NestedEnumJobWithAggregatesFilter<$PrismaModel> | $Enums.Job
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobFilter<$PrismaModel>
    _max?: NestedEnumJobFilter<$PrismaModel>
  }

  export type EnumJobNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel> | null
    has?: $Enums.Job | EnumJobFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ArtisanCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    jobs?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtisanAvgOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ArtisanMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtisanMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtisanSumOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type SizeToWorkListRelationFilter = {
    every?: SizeToWorkWhereInput
    some?: SizeToWorkWhereInput
    none?: SizeToWorkWhereInput
  }

  export type SizeToWorkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    orderNo?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type WorkMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    orderNo?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    orderNo?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type WorkScalarRelationFilter = {
    is?: WorkWhereInput
    isNot?: WorkWhereInput
  }

  export type ArtisanNullableScalarRelationFilter = {
    is?: ArtisanWhereInput | null
    isNot?: ArtisanWhereInput | null
  }

  export type LaborCostScalarRelationFilter = {
    is?: LaborCostWhereInput
    isNot?: LaborCostWhereInput
  }

  export type TaskWorkIdTypeCompoundUniqueInput = {
    workId: number
    type: $Enums.Job
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    workId?: SortOrder
    type?: SortOrder
    artisanId?: SortOrder
    doneAt?: SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    workId?: SortOrder
    artisanId?: SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    workId?: SortOrder
    type?: SortOrder
    artisanId?: SortOrder
    doneAt?: SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    workId?: SortOrder
    type?: SortOrder
    artisanId?: SortOrder
    doneAt?: SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    workId?: SortOrder
    artisanId?: SortOrder
    laborCostId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type SizeEuGenderCompoundUniqueInput = {
    eu: string
    gender: $Enums.Gender
  }

  export type SizeUsGenderCompoundUniqueInput = {
    us: string
    gender: $Enums.Gender
  }

  export type SizeUkGenderCompoundUniqueInput = {
    uk: string
    gender: $Enums.Gender
  }

  export type SizeCountOrderByAggregateInput = {
    id?: SortOrder
    eu?: SortOrder
    us?: SortOrder
    uk?: SortOrder
    jp?: SortOrder
    gender?: SortOrder
  }

  export type SizeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SizeMaxOrderByAggregateInput = {
    id?: SortOrder
    eu?: SortOrder
    us?: SortOrder
    uk?: SortOrder
    jp?: SortOrder
    gender?: SortOrder
  }

  export type SizeMinOrderByAggregateInput = {
    id?: SortOrder
    eu?: SortOrder
    us?: SortOrder
    uk?: SortOrder
    jp?: SortOrder
    gender?: SortOrder
  }

  export type SizeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SizeScalarRelationFilter = {
    is?: SizeWhereInput
    isNot?: SizeWhereInput
  }

  export type SizeToWorkWorkIdSizeIdCompoundUniqueInput = {
    workId: number
    sizeId: number
  }

  export type SizeToWorkCountOrderByAggregateInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
  }

  export type SizeToWorkAvgOrderByAggregateInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
  }

  export type SizeToWorkMaxOrderByAggregateInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
  }

  export type SizeToWorkMinOrderByAggregateInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
  }

  export type SizeToWorkSumOrderByAggregateInput = {
    workId?: SortOrder
    sizeId?: SortOrder
    quantity?: SortOrder
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedUsersInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCreatorInput = {
    create?: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput> | UserCreateWithoutCreatorInput[] | UserUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatorInput | UserCreateOrConnectWithoutCreatorInput[]
    createMany?: UserCreateManyCreatorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutApprovedUsersInput = {
    create?: XOR<UserCreateWithoutApprovedUsersInput, UserUncheckedCreateWithoutApprovedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutApproverInput = {
    create?: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput> | UserCreateWithoutApproverInput[] | UserUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApproverInput | UserCreateOrConnectWithoutApproverInput[]
    createMany?: UserCreateManyApproverInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput> | UserCreateWithoutCreatorInput[] | UserUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatorInput | UserCreateOrConnectWithoutCreatorInput[]
    createMany?: UserCreateManyCreatorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput> | UserCreateWithoutApproverInput[] | UserUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApproverInput | UserCreateOrConnectWithoutApproverInput[]
    createMany?: UserCreateManyApproverInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneWithoutCreatedUsersNestedInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    upsert?: UserUpsertWithoutCreatedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedUsersInput, UserUpdateWithoutCreatedUsersInput>, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput> | UserCreateWithoutCreatorInput[] | UserUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatorInput | UserCreateOrConnectWithoutCreatorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatorInput | UserUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: UserCreateManyCreatorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatorInput | UserUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatorInput | UserUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateOneWithoutApprovedUsersNestedInput = {
    create?: XOR<UserCreateWithoutApprovedUsersInput, UserUncheckedCreateWithoutApprovedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedUsersInput
    upsert?: UserUpsertWithoutApprovedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedUsersInput, UserUpdateWithoutApprovedUsersInput>, UserUncheckedUpdateWithoutApprovedUsersInput>
  }

  export type UserUpdateManyWithoutApproverNestedInput = {
    create?: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput> | UserCreateWithoutApproverInput[] | UserUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApproverInput | UserCreateOrConnectWithoutApproverInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApproverInput | UserUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: UserCreateManyApproverInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApproverInput | UserUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApproverInput | UserUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput> | UserCreateWithoutCreatorInput[] | UserUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatorInput | UserCreateOrConnectWithoutCreatorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatorInput | UserUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: UserCreateManyCreatorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatorInput | UserUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatorInput | UserUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput> | UserCreateWithoutApproverInput[] | UserUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApproverInput | UserCreateOrConnectWithoutApproverInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApproverInput | UserUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: UserCreateManyApproverInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApproverInput | UserUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApproverInput | UserUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ColorToProductCreateNestedManyWithoutColorInput = {
    create?: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput> | ColorToProductCreateWithoutColorInput[] | ColorToProductUncheckedCreateWithoutColorInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutColorInput | ColorToProductCreateOrConnectWithoutColorInput[]
    createMany?: ColorToProductCreateManyColorInputEnvelope
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
  }

  export type ColorToProductUncheckedCreateNestedManyWithoutColorInput = {
    create?: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput> | ColorToProductCreateWithoutColorInput[] | ColorToProductUncheckedCreateWithoutColorInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutColorInput | ColorToProductCreateOrConnectWithoutColorInput[]
    createMany?: ColorToProductCreateManyColorInputEnvelope
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
  }

  export type ColorToProductUpdateManyWithoutColorNestedInput = {
    create?: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput> | ColorToProductCreateWithoutColorInput[] | ColorToProductUncheckedCreateWithoutColorInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutColorInput | ColorToProductCreateOrConnectWithoutColorInput[]
    upsert?: ColorToProductUpsertWithWhereUniqueWithoutColorInput | ColorToProductUpsertWithWhereUniqueWithoutColorInput[]
    createMany?: ColorToProductCreateManyColorInputEnvelope
    set?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    disconnect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    delete?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    update?: ColorToProductUpdateWithWhereUniqueWithoutColorInput | ColorToProductUpdateWithWhereUniqueWithoutColorInput[]
    updateMany?: ColorToProductUpdateManyWithWhereWithoutColorInput | ColorToProductUpdateManyWithWhereWithoutColorInput[]
    deleteMany?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
  }

  export type ColorToProductUncheckedUpdateManyWithoutColorNestedInput = {
    create?: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput> | ColorToProductCreateWithoutColorInput[] | ColorToProductUncheckedCreateWithoutColorInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutColorInput | ColorToProductCreateOrConnectWithoutColorInput[]
    upsert?: ColorToProductUpsertWithWhereUniqueWithoutColorInput | ColorToProductUpsertWithWhereUniqueWithoutColorInput[]
    createMany?: ColorToProductCreateManyColorInputEnvelope
    set?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    disconnect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    delete?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    update?: ColorToProductUpdateWithWhereUniqueWithoutColorInput | ColorToProductUpdateWithWhereUniqueWithoutColorInput[]
    updateMany?: ColorToProductUpdateManyWithWhereWithoutColorInput | ColorToProductUpdateManyWithWhereWithoutColorInput[]
    deleteMany?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
  }

  export type ProductGroupCreateNestedManyWithoutProductCategoryInput = {
    create?: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput> | ProductGroupCreateWithoutProductCategoryInput[] | ProductGroupUncheckedCreateWithoutProductCategoryInput[]
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductCategoryInput | ProductGroupCreateOrConnectWithoutProductCategoryInput[]
    createMany?: ProductGroupCreateManyProductCategoryInputEnvelope
    connect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
  }

  export type ProductGroupUncheckedCreateNestedManyWithoutProductCategoryInput = {
    create?: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput> | ProductGroupCreateWithoutProductCategoryInput[] | ProductGroupUncheckedCreateWithoutProductCategoryInput[]
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductCategoryInput | ProductGroupCreateOrConnectWithoutProductCategoryInput[]
    createMany?: ProductGroupCreateManyProductCategoryInputEnvelope
    connect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type ProductGroupUpdateManyWithoutProductCategoryNestedInput = {
    create?: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput> | ProductGroupCreateWithoutProductCategoryInput[] | ProductGroupUncheckedCreateWithoutProductCategoryInput[]
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductCategoryInput | ProductGroupCreateOrConnectWithoutProductCategoryInput[]
    upsert?: ProductGroupUpsertWithWhereUniqueWithoutProductCategoryInput | ProductGroupUpsertWithWhereUniqueWithoutProductCategoryInput[]
    createMany?: ProductGroupCreateManyProductCategoryInputEnvelope
    set?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    disconnect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    delete?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    connect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    update?: ProductGroupUpdateWithWhereUniqueWithoutProductCategoryInput | ProductGroupUpdateWithWhereUniqueWithoutProductCategoryInput[]
    updateMany?: ProductGroupUpdateManyWithWhereWithoutProductCategoryInput | ProductGroupUpdateManyWithWhereWithoutProductCategoryInput[]
    deleteMany?: ProductGroupScalarWhereInput | ProductGroupScalarWhereInput[]
  }

  export type ProductGroupUncheckedUpdateManyWithoutProductCategoryNestedInput = {
    create?: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput> | ProductGroupCreateWithoutProductCategoryInput[] | ProductGroupUncheckedCreateWithoutProductCategoryInput[]
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductCategoryInput | ProductGroupCreateOrConnectWithoutProductCategoryInput[]
    upsert?: ProductGroupUpsertWithWhereUniqueWithoutProductCategoryInput | ProductGroupUpsertWithWhereUniqueWithoutProductCategoryInput[]
    createMany?: ProductGroupCreateManyProductCategoryInputEnvelope
    set?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    disconnect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    delete?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    connect?: ProductGroupWhereUniqueInput | ProductGroupWhereUniqueInput[]
    update?: ProductGroupUpdateWithWhereUniqueWithoutProductCategoryInput | ProductGroupUpdateWithWhereUniqueWithoutProductCategoryInput[]
    updateMany?: ProductGroupUpdateManyWithWhereWithoutProductCategoryInput | ProductGroupUpdateManyWithWhereWithoutProductCategoryInput[]
    deleteMany?: ProductGroupScalarWhereInput | ProductGroupScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutProductGroupInput = {
    create?: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput> | ProductCreateWithoutProductGroupInput[] | ProductUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutProductGroupInput | ProductCreateOrConnectWithoutProductGroupInput[]
    createMany?: ProductCreateManyProductGroupInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type LaborCostCreateNestedManyWithoutProductGroupInput = {
    create?: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput> | LaborCostCreateWithoutProductGroupInput[] | LaborCostUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: LaborCostCreateOrConnectWithoutProductGroupInput | LaborCostCreateOrConnectWithoutProductGroupInput[]
    createMany?: LaborCostCreateManyProductGroupInputEnvelope
    connect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
  }

  export type ProductCategoryCreateNestedOneWithoutProductGroupsInput = {
    create?: XOR<ProductCategoryCreateWithoutProductGroupsInput, ProductCategoryUncheckedCreateWithoutProductGroupsInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductGroupsInput
    connect?: ProductCategoryWhereUniqueInput
  }

  export type ProductUncheckedCreateNestedManyWithoutProductGroupInput = {
    create?: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput> | ProductCreateWithoutProductGroupInput[] | ProductUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutProductGroupInput | ProductCreateOrConnectWithoutProductGroupInput[]
    createMany?: ProductCreateManyProductGroupInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type LaborCostUncheckedCreateNestedManyWithoutProductGroupInput = {
    create?: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput> | LaborCostCreateWithoutProductGroupInput[] | LaborCostUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: LaborCostCreateOrConnectWithoutProductGroupInput | LaborCostCreateOrConnectWithoutProductGroupInput[]
    createMany?: LaborCostCreateManyProductGroupInputEnvelope
    connect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutProductGroupNestedInput = {
    create?: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput> | ProductCreateWithoutProductGroupInput[] | ProductUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutProductGroupInput | ProductCreateOrConnectWithoutProductGroupInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutProductGroupInput | ProductUpsertWithWhereUniqueWithoutProductGroupInput[]
    createMany?: ProductCreateManyProductGroupInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutProductGroupInput | ProductUpdateWithWhereUniqueWithoutProductGroupInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutProductGroupInput | ProductUpdateManyWithWhereWithoutProductGroupInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type LaborCostUpdateManyWithoutProductGroupNestedInput = {
    create?: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput> | LaborCostCreateWithoutProductGroupInput[] | LaborCostUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: LaborCostCreateOrConnectWithoutProductGroupInput | LaborCostCreateOrConnectWithoutProductGroupInput[]
    upsert?: LaborCostUpsertWithWhereUniqueWithoutProductGroupInput | LaborCostUpsertWithWhereUniqueWithoutProductGroupInput[]
    createMany?: LaborCostCreateManyProductGroupInputEnvelope
    set?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    disconnect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    delete?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    connect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    update?: LaborCostUpdateWithWhereUniqueWithoutProductGroupInput | LaborCostUpdateWithWhereUniqueWithoutProductGroupInput[]
    updateMany?: LaborCostUpdateManyWithWhereWithoutProductGroupInput | LaborCostUpdateManyWithWhereWithoutProductGroupInput[]
    deleteMany?: LaborCostScalarWhereInput | LaborCostScalarWhereInput[]
  }

  export type ProductCategoryUpdateOneRequiredWithoutProductGroupsNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutProductGroupsInput, ProductCategoryUncheckedCreateWithoutProductGroupsInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductGroupsInput
    upsert?: ProductCategoryUpsertWithoutProductGroupsInput
    connect?: ProductCategoryWhereUniqueInput
    update?: XOR<XOR<ProductCategoryUpdateToOneWithWhereWithoutProductGroupsInput, ProductCategoryUpdateWithoutProductGroupsInput>, ProductCategoryUncheckedUpdateWithoutProductGroupsInput>
  }

  export type ProductUncheckedUpdateManyWithoutProductGroupNestedInput = {
    create?: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput> | ProductCreateWithoutProductGroupInput[] | ProductUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutProductGroupInput | ProductCreateOrConnectWithoutProductGroupInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutProductGroupInput | ProductUpsertWithWhereUniqueWithoutProductGroupInput[]
    createMany?: ProductCreateManyProductGroupInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutProductGroupInput | ProductUpdateWithWhereUniqueWithoutProductGroupInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutProductGroupInput | ProductUpdateManyWithWhereWithoutProductGroupInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type LaborCostUncheckedUpdateManyWithoutProductGroupNestedInput = {
    create?: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput> | LaborCostCreateWithoutProductGroupInput[] | LaborCostUncheckedCreateWithoutProductGroupInput[]
    connectOrCreate?: LaborCostCreateOrConnectWithoutProductGroupInput | LaborCostCreateOrConnectWithoutProductGroupInput[]
    upsert?: LaborCostUpsertWithWhereUniqueWithoutProductGroupInput | LaborCostUpsertWithWhereUniqueWithoutProductGroupInput[]
    createMany?: LaborCostCreateManyProductGroupInputEnvelope
    set?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    disconnect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    delete?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    connect?: LaborCostWhereUniqueInput | LaborCostWhereUniqueInput[]
    update?: LaborCostUpdateWithWhereUniqueWithoutProductGroupInput | LaborCostUpdateWithWhereUniqueWithoutProductGroupInput[]
    updateMany?: LaborCostUpdateManyWithWhereWithoutProductGroupInput | LaborCostUpdateManyWithWhereWithoutProductGroupInput[]
    deleteMany?: LaborCostScalarWhereInput | LaborCostScalarWhereInput[]
  }

  export type ColorToProductCreateNestedManyWithoutProductInput = {
    create?: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput> | ColorToProductCreateWithoutProductInput[] | ColorToProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutProductInput | ColorToProductCreateOrConnectWithoutProductInput[]
    createMany?: ColorToProductCreateManyProductInputEnvelope
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
  }

  export type WorkCreateNestedManyWithoutProductInput = {
    create?: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput> | WorkCreateWithoutProductInput[] | WorkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WorkCreateOrConnectWithoutProductInput | WorkCreateOrConnectWithoutProductInput[]
    createMany?: WorkCreateManyProductInputEnvelope
    connect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
  }

  export type ProductGroupCreateNestedOneWithoutProductsInput = {
    create?: XOR<ProductGroupCreateWithoutProductsInput, ProductGroupUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductsInput
    connect?: ProductGroupWhereUniqueInput
  }

  export type ColorToProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput> | ColorToProductCreateWithoutProductInput[] | ColorToProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutProductInput | ColorToProductCreateOrConnectWithoutProductInput[]
    createMany?: ColorToProductCreateManyProductInputEnvelope
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
  }

  export type WorkUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput> | WorkCreateWithoutProductInput[] | WorkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WorkCreateOrConnectWithoutProductInput | WorkCreateOrConnectWithoutProductInput[]
    createMany?: WorkCreateManyProductInputEnvelope
    connect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
  }

  export type ColorToProductUpdateManyWithoutProductNestedInput = {
    create?: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput> | ColorToProductCreateWithoutProductInput[] | ColorToProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutProductInput | ColorToProductCreateOrConnectWithoutProductInput[]
    upsert?: ColorToProductUpsertWithWhereUniqueWithoutProductInput | ColorToProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ColorToProductCreateManyProductInputEnvelope
    set?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    disconnect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    delete?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    update?: ColorToProductUpdateWithWhereUniqueWithoutProductInput | ColorToProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ColorToProductUpdateManyWithWhereWithoutProductInput | ColorToProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
  }

  export type WorkUpdateManyWithoutProductNestedInput = {
    create?: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput> | WorkCreateWithoutProductInput[] | WorkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WorkCreateOrConnectWithoutProductInput | WorkCreateOrConnectWithoutProductInput[]
    upsert?: WorkUpsertWithWhereUniqueWithoutProductInput | WorkUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WorkCreateManyProductInputEnvelope
    set?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    disconnect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    delete?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    connect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    update?: WorkUpdateWithWhereUniqueWithoutProductInput | WorkUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WorkUpdateManyWithWhereWithoutProductInput | WorkUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WorkScalarWhereInput | WorkScalarWhereInput[]
  }

  export type ProductGroupUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<ProductGroupCreateWithoutProductsInput, ProductGroupUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ProductGroupCreateOrConnectWithoutProductsInput
    upsert?: ProductGroupUpsertWithoutProductsInput
    connect?: ProductGroupWhereUniqueInput
    update?: XOR<XOR<ProductGroupUpdateToOneWithWhereWithoutProductsInput, ProductGroupUpdateWithoutProductsInput>, ProductGroupUncheckedUpdateWithoutProductsInput>
  }

  export type ColorToProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput> | ColorToProductCreateWithoutProductInput[] | ColorToProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ColorToProductCreateOrConnectWithoutProductInput | ColorToProductCreateOrConnectWithoutProductInput[]
    upsert?: ColorToProductUpsertWithWhereUniqueWithoutProductInput | ColorToProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ColorToProductCreateManyProductInputEnvelope
    set?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    disconnect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    delete?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    connect?: ColorToProductWhereUniqueInput | ColorToProductWhereUniqueInput[]
    update?: ColorToProductUpdateWithWhereUniqueWithoutProductInput | ColorToProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ColorToProductUpdateManyWithWhereWithoutProductInput | ColorToProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
  }

  export type WorkUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput> | WorkCreateWithoutProductInput[] | WorkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WorkCreateOrConnectWithoutProductInput | WorkCreateOrConnectWithoutProductInput[]
    upsert?: WorkUpsertWithWhereUniqueWithoutProductInput | WorkUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WorkCreateManyProductInputEnvelope
    set?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    disconnect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    delete?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    connect?: WorkWhereUniqueInput | WorkWhereUniqueInput[]
    update?: WorkUpdateWithWhereUniqueWithoutProductInput | WorkUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WorkUpdateManyWithWhereWithoutProductInput | WorkUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WorkScalarWhereInput | WorkScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutProductColorsInput = {
    create?: XOR<ProductCreateWithoutProductColorsInput, ProductUncheckedCreateWithoutProductColorsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductColorsInput
    connect?: ProductWhereUniqueInput
  }

  export type ColorCreateNestedOneWithoutProductColorsInput = {
    create?: XOR<ColorCreateWithoutProductColorsInput, ColorUncheckedCreateWithoutProductColorsInput>
    connectOrCreate?: ColorCreateOrConnectWithoutProductColorsInput
    connect?: ColorWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutProductColorsNestedInput = {
    create?: XOR<ProductCreateWithoutProductColorsInput, ProductUncheckedCreateWithoutProductColorsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductColorsInput
    upsert?: ProductUpsertWithoutProductColorsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutProductColorsInput, ProductUpdateWithoutProductColorsInput>, ProductUncheckedUpdateWithoutProductColorsInput>
  }

  export type ColorUpdateOneRequiredWithoutProductColorsNestedInput = {
    create?: XOR<ColorCreateWithoutProductColorsInput, ColorUncheckedCreateWithoutProductColorsInput>
    connectOrCreate?: ColorCreateOrConnectWithoutProductColorsInput
    upsert?: ColorUpsertWithoutProductColorsInput
    connect?: ColorWhereUniqueInput
    update?: XOR<XOR<ColorUpdateToOneWithWhereWithoutProductColorsInput, ColorUpdateWithoutProductColorsInput>, ColorUncheckedUpdateWithoutProductColorsInput>
  }

  export type TaskCreateNestedManyWithoutLaborCostInput = {
    create?: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput> | TaskCreateWithoutLaborCostInput[] | TaskUncheckedCreateWithoutLaborCostInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLaborCostInput | TaskCreateOrConnectWithoutLaborCostInput[]
    createMany?: TaskCreateManyLaborCostInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProductGroupCreateNestedOneWithoutLaborCostsInput = {
    create?: XOR<ProductGroupCreateWithoutLaborCostsInput, ProductGroupUncheckedCreateWithoutLaborCostsInput>
    connectOrCreate?: ProductGroupCreateOrConnectWithoutLaborCostsInput
    connect?: ProductGroupWhereUniqueInput
  }

  export type TaskUncheckedCreateNestedManyWithoutLaborCostInput = {
    create?: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput> | TaskCreateWithoutLaborCostInput[] | TaskUncheckedCreateWithoutLaborCostInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLaborCostInput | TaskCreateOrConnectWithoutLaborCostInput[]
    createMany?: TaskCreateManyLaborCostInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EnumJobFieldUpdateOperationsInput = {
    set?: $Enums.Job
  }

  export type TaskUpdateManyWithoutLaborCostNestedInput = {
    create?: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput> | TaskCreateWithoutLaborCostInput[] | TaskUncheckedCreateWithoutLaborCostInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLaborCostInput | TaskCreateOrConnectWithoutLaborCostInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLaborCostInput | TaskUpsertWithWhereUniqueWithoutLaborCostInput[]
    createMany?: TaskCreateManyLaborCostInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLaborCostInput | TaskUpdateWithWhereUniqueWithoutLaborCostInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLaborCostInput | TaskUpdateManyWithWhereWithoutLaborCostInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProductGroupUpdateOneRequiredWithoutLaborCostsNestedInput = {
    create?: XOR<ProductGroupCreateWithoutLaborCostsInput, ProductGroupUncheckedCreateWithoutLaborCostsInput>
    connectOrCreate?: ProductGroupCreateOrConnectWithoutLaborCostsInput
    upsert?: ProductGroupUpsertWithoutLaborCostsInput
    connect?: ProductGroupWhereUniqueInput
    update?: XOR<XOR<ProductGroupUpdateToOneWithWhereWithoutLaborCostsInput, ProductGroupUpdateWithoutLaborCostsInput>, ProductGroupUncheckedUpdateWithoutLaborCostsInput>
  }

  export type TaskUncheckedUpdateManyWithoutLaborCostNestedInput = {
    create?: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput> | TaskCreateWithoutLaborCostInput[] | TaskUncheckedCreateWithoutLaborCostInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLaborCostInput | TaskCreateOrConnectWithoutLaborCostInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLaborCostInput | TaskUpsertWithWhereUniqueWithoutLaborCostInput[]
    createMany?: TaskCreateManyLaborCostInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLaborCostInput | TaskUpdateWithWhereUniqueWithoutLaborCostInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLaborCostInput | TaskUpdateManyWithWhereWithoutLaborCostInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ArtisanCreatejobsInput = {
    set: $Enums.Job[]
  }

  export type TaskCreateNestedManyWithoutArtisanInput = {
    create?: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput> | TaskCreateWithoutArtisanInput[] | TaskUncheckedCreateWithoutArtisanInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutArtisanInput | TaskCreateOrConnectWithoutArtisanInput[]
    createMany?: TaskCreateManyArtisanInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutArtisanInput = {
    create?: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput> | TaskCreateWithoutArtisanInput[] | TaskUncheckedCreateWithoutArtisanInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutArtisanInput | TaskCreateOrConnectWithoutArtisanInput[]
    createMany?: TaskCreateManyArtisanInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ArtisanUpdatejobsInput = {
    set?: $Enums.Job[]
    push?: $Enums.Job | $Enums.Job[]
  }

  export type TaskUpdateManyWithoutArtisanNestedInput = {
    create?: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput> | TaskCreateWithoutArtisanInput[] | TaskUncheckedCreateWithoutArtisanInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutArtisanInput | TaskCreateOrConnectWithoutArtisanInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutArtisanInput | TaskUpsertWithWhereUniqueWithoutArtisanInput[]
    createMany?: TaskCreateManyArtisanInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutArtisanInput | TaskUpdateWithWhereUniqueWithoutArtisanInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutArtisanInput | TaskUpdateManyWithWhereWithoutArtisanInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutArtisanNestedInput = {
    create?: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput> | TaskCreateWithoutArtisanInput[] | TaskUncheckedCreateWithoutArtisanInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutArtisanInput | TaskCreateOrConnectWithoutArtisanInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutArtisanInput | TaskUpsertWithWhereUniqueWithoutArtisanInput[]
    createMany?: TaskCreateManyArtisanInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutArtisanInput | TaskUpdateWithWhereUniqueWithoutArtisanInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutArtisanInput | TaskUpdateManyWithWhereWithoutArtisanInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type SizeToWorkCreateNestedManyWithoutWorkInput = {
    create?: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput> | SizeToWorkCreateWithoutWorkInput[] | SizeToWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutWorkInput | SizeToWorkCreateOrConnectWithoutWorkInput[]
    createMany?: SizeToWorkCreateManyWorkInputEnvelope
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutWorkInput = {
    create?: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput> | TaskCreateWithoutWorkInput[] | TaskUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkInput | TaskCreateOrConnectWithoutWorkInput[]
    createMany?: TaskCreateManyWorkInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProductCreateNestedOneWithoutWorkInput = {
    create?: XOR<ProductCreateWithoutWorkInput, ProductUncheckedCreateWithoutWorkInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWorkInput
    connect?: ProductWhereUniqueInput
  }

  export type SizeToWorkUncheckedCreateNestedManyWithoutWorkInput = {
    create?: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput> | SizeToWorkCreateWithoutWorkInput[] | SizeToWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutWorkInput | SizeToWorkCreateOrConnectWithoutWorkInput[]
    createMany?: SizeToWorkCreateManyWorkInputEnvelope
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutWorkInput = {
    create?: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput> | TaskCreateWithoutWorkInput[] | TaskUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkInput | TaskCreateOrConnectWithoutWorkInput[]
    createMany?: TaskCreateManyWorkInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type SizeToWorkUpdateManyWithoutWorkNestedInput = {
    create?: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput> | SizeToWorkCreateWithoutWorkInput[] | SizeToWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutWorkInput | SizeToWorkCreateOrConnectWithoutWorkInput[]
    upsert?: SizeToWorkUpsertWithWhereUniqueWithoutWorkInput | SizeToWorkUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: SizeToWorkCreateManyWorkInputEnvelope
    set?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    disconnect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    delete?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    update?: SizeToWorkUpdateWithWhereUniqueWithoutWorkInput | SizeToWorkUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: SizeToWorkUpdateManyWithWhereWithoutWorkInput | SizeToWorkUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutWorkNestedInput = {
    create?: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput> | TaskCreateWithoutWorkInput[] | TaskUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkInput | TaskCreateOrConnectWithoutWorkInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutWorkInput | TaskUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: TaskCreateManyWorkInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutWorkInput | TaskUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutWorkInput | TaskUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProductUpdateOneRequiredWithoutWorkNestedInput = {
    create?: XOR<ProductCreateWithoutWorkInput, ProductUncheckedCreateWithoutWorkInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWorkInput
    upsert?: ProductUpsertWithoutWorkInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutWorkInput, ProductUpdateWithoutWorkInput>, ProductUncheckedUpdateWithoutWorkInput>
  }

  export type SizeToWorkUncheckedUpdateManyWithoutWorkNestedInput = {
    create?: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput> | SizeToWorkCreateWithoutWorkInput[] | SizeToWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutWorkInput | SizeToWorkCreateOrConnectWithoutWorkInput[]
    upsert?: SizeToWorkUpsertWithWhereUniqueWithoutWorkInput | SizeToWorkUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: SizeToWorkCreateManyWorkInputEnvelope
    set?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    disconnect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    delete?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    update?: SizeToWorkUpdateWithWhereUniqueWithoutWorkInput | SizeToWorkUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: SizeToWorkUpdateManyWithWhereWithoutWorkInput | SizeToWorkUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutWorkNestedInput = {
    create?: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput> | TaskCreateWithoutWorkInput[] | TaskUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkInput | TaskCreateOrConnectWithoutWorkInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutWorkInput | TaskUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: TaskCreateManyWorkInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutWorkInput | TaskUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutWorkInput | TaskUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type WorkCreateNestedOneWithoutTasksInput = {
    create?: XOR<WorkCreateWithoutTasksInput, WorkUncheckedCreateWithoutTasksInput>
    connectOrCreate?: WorkCreateOrConnectWithoutTasksInput
    connect?: WorkWhereUniqueInput
  }

  export type ArtisanCreateNestedOneWithoutTasksInput = {
    create?: XOR<ArtisanCreateWithoutTasksInput, ArtisanUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ArtisanCreateOrConnectWithoutTasksInput
    connect?: ArtisanWhereUniqueInput
  }

  export type LaborCostCreateNestedOneWithoutTasksInput = {
    create?: XOR<LaborCostCreateWithoutTasksInput, LaborCostUncheckedCreateWithoutTasksInput>
    connectOrCreate?: LaborCostCreateOrConnectWithoutTasksInput
    connect?: LaborCostWhereUniqueInput
  }

  export type WorkUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<WorkCreateWithoutTasksInput, WorkUncheckedCreateWithoutTasksInput>
    connectOrCreate?: WorkCreateOrConnectWithoutTasksInput
    upsert?: WorkUpsertWithoutTasksInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutTasksInput, WorkUpdateWithoutTasksInput>, WorkUncheckedUpdateWithoutTasksInput>
  }

  export type ArtisanUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ArtisanCreateWithoutTasksInput, ArtisanUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ArtisanCreateOrConnectWithoutTasksInput
    upsert?: ArtisanUpsertWithoutTasksInput
    disconnect?: ArtisanWhereInput | boolean
    delete?: ArtisanWhereInput | boolean
    connect?: ArtisanWhereUniqueInput
    update?: XOR<XOR<ArtisanUpdateToOneWithWhereWithoutTasksInput, ArtisanUpdateWithoutTasksInput>, ArtisanUncheckedUpdateWithoutTasksInput>
  }

  export type LaborCostUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<LaborCostCreateWithoutTasksInput, LaborCostUncheckedCreateWithoutTasksInput>
    connectOrCreate?: LaborCostCreateOrConnectWithoutTasksInput
    upsert?: LaborCostUpsertWithoutTasksInput
    connect?: LaborCostWhereUniqueInput
    update?: XOR<XOR<LaborCostUpdateToOneWithWhereWithoutTasksInput, LaborCostUpdateWithoutTasksInput>, LaborCostUncheckedUpdateWithoutTasksInput>
  }

  export type SizeToWorkCreateNestedManyWithoutSizeInput = {
    create?: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput> | SizeToWorkCreateWithoutSizeInput[] | SizeToWorkUncheckedCreateWithoutSizeInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutSizeInput | SizeToWorkCreateOrConnectWithoutSizeInput[]
    createMany?: SizeToWorkCreateManySizeInputEnvelope
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
  }

  export type SizeToWorkUncheckedCreateNestedManyWithoutSizeInput = {
    create?: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput> | SizeToWorkCreateWithoutSizeInput[] | SizeToWorkUncheckedCreateWithoutSizeInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutSizeInput | SizeToWorkCreateOrConnectWithoutSizeInput[]
    createMany?: SizeToWorkCreateManySizeInputEnvelope
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
  }

  export type SizeToWorkUpdateManyWithoutSizeNestedInput = {
    create?: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput> | SizeToWorkCreateWithoutSizeInput[] | SizeToWorkUncheckedCreateWithoutSizeInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutSizeInput | SizeToWorkCreateOrConnectWithoutSizeInput[]
    upsert?: SizeToWorkUpsertWithWhereUniqueWithoutSizeInput | SizeToWorkUpsertWithWhereUniqueWithoutSizeInput[]
    createMany?: SizeToWorkCreateManySizeInputEnvelope
    set?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    disconnect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    delete?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    update?: SizeToWorkUpdateWithWhereUniqueWithoutSizeInput | SizeToWorkUpdateWithWhereUniqueWithoutSizeInput[]
    updateMany?: SizeToWorkUpdateManyWithWhereWithoutSizeInput | SizeToWorkUpdateManyWithWhereWithoutSizeInput[]
    deleteMany?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
  }

  export type SizeToWorkUncheckedUpdateManyWithoutSizeNestedInput = {
    create?: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput> | SizeToWorkCreateWithoutSizeInput[] | SizeToWorkUncheckedCreateWithoutSizeInput[]
    connectOrCreate?: SizeToWorkCreateOrConnectWithoutSizeInput | SizeToWorkCreateOrConnectWithoutSizeInput[]
    upsert?: SizeToWorkUpsertWithWhereUniqueWithoutSizeInput | SizeToWorkUpsertWithWhereUniqueWithoutSizeInput[]
    createMany?: SizeToWorkCreateManySizeInputEnvelope
    set?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    disconnect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    delete?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    connect?: SizeToWorkWhereUniqueInput | SizeToWorkWhereUniqueInput[]
    update?: SizeToWorkUpdateWithWhereUniqueWithoutSizeInput | SizeToWorkUpdateWithWhereUniqueWithoutSizeInput[]
    updateMany?: SizeToWorkUpdateManyWithWhereWithoutSizeInput | SizeToWorkUpdateManyWithWhereWithoutSizeInput[]
    deleteMany?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
  }

  export type WorkCreateNestedOneWithoutSizesInput = {
    create?: XOR<WorkCreateWithoutSizesInput, WorkUncheckedCreateWithoutSizesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutSizesInput
    connect?: WorkWhereUniqueInput
  }

  export type SizeCreateNestedOneWithoutWorksInput = {
    create?: XOR<SizeCreateWithoutWorksInput, SizeUncheckedCreateWithoutWorksInput>
    connectOrCreate?: SizeCreateOrConnectWithoutWorksInput
    connect?: SizeWhereUniqueInput
  }

  export type WorkUpdateOneRequiredWithoutSizesNestedInput = {
    create?: XOR<WorkCreateWithoutSizesInput, WorkUncheckedCreateWithoutSizesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutSizesInput
    upsert?: WorkUpsertWithoutSizesInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutSizesInput, WorkUpdateWithoutSizesInput>, WorkUncheckedUpdateWithoutSizesInput>
  }

  export type SizeUpdateOneRequiredWithoutWorksNestedInput = {
    create?: XOR<SizeCreateWithoutWorksInput, SizeUncheckedCreateWithoutWorksInput>
    connectOrCreate?: SizeCreateOrConnectWithoutWorksInput
    upsert?: SizeUpsertWithoutWorksInput
    connect?: SizeWhereUniqueInput
    update?: XOR<XOR<SizeUpdateToOneWithWhereWithoutWorksInput, SizeUpdateWithoutWorksInput>, SizeUncheckedUpdateWithoutWorksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumJobFilter<$PrismaModel = never> = {
    equals?: $Enums.Job | EnumJobFieldRefInput<$PrismaModel>
    in?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    notIn?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    not?: NestedEnumJobFilter<$PrismaModel> | $Enums.Job
  }

  export type NestedEnumJobWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Job | EnumJobFieldRefInput<$PrismaModel>
    in?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    notIn?: $Enums.Job[] | ListEnumJobFieldRefInput<$PrismaModel>
    not?: NestedEnumJobWithAggregatesFilter<$PrismaModel> | $Enums.Job
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobFilter<$PrismaModel>
    _max?: NestedEnumJobFilter<$PrismaModel>
  }

  export type UserCreateWithoutRoleInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    creator?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatorInput
    approver?: UserCreateNestedOneWithoutApprovedUsersInput
    approvedUsers?: UserCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatorInput
    approvedUsers?: UserUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdBy?: IntNullableFilter<"User"> | number | null
    updatedBy?: IntNullableFilter<"User"> | number | null
    approvedBy?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    approvedAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
    description?: string | null
    clearanceLevel: number
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description?: string | null
    clearanceLevel: number
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutCreatedUsersInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    role: RoleCreateNestedOneWithoutUsersInput
    creator?: UserCreateNestedOneWithoutCreatedUsersInput
    approver?: UserCreateNestedOneWithoutApprovedUsersInput
    approvedUsers?: UserCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutCreatedUsersInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    approvedUsers?: UserUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutCreatedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
  }

  export type UserCreateWithoutCreatorInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    role: RoleCreateNestedOneWithoutUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatorInput
    approver?: UserCreateNestedOneWithoutApprovedUsersInput
    approvedUsers?: UserCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutCreatorInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatorInput
    approvedUsers?: UserUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutCreatorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput>
  }

  export type UserCreateManyCreatorInputEnvelope = {
    data: UserCreateManyCreatorInput | UserCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutApprovedUsersInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    role: RoleCreateNestedOneWithoutUsersInput
    creator?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatorInput
    approver?: UserCreateNestedOneWithoutApprovedUsersInput
  }

  export type UserUncheckedCreateWithoutApprovedUsersInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutApprovedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedUsersInput, UserUncheckedCreateWithoutApprovedUsersInput>
  }

  export type UserCreateWithoutApproverInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    role: RoleCreateNestedOneWithoutUsersInput
    creator?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatorInput
    approvedUsers?: UserCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutApproverInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatorInput
    approvedUsers?: UserUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutApproverInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput>
  }

  export type UserCreateManyApproverInputEnvelope = {
    data: UserCreateManyApproverInput | UserCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clearanceLevel?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutCreatedUsersInput = {
    update: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateWithoutCreatedUsersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    creator?: UserUpdateOneWithoutCreatedUsersNestedInput
    approver?: UserUpdateOneWithoutApprovedUsersNestedInput
    approvedUsers?: UserUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedUsers?: UserUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCreatorInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCreatorInput, UserUncheckedUpdateWithoutCreatorInput>
    create: XOR<UserCreateWithoutCreatorInput, UserUncheckedCreateWithoutCreatorInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCreatorInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCreatorInput, UserUncheckedUpdateWithoutCreatorInput>
  }

  export type UserUpdateManyWithWhereWithoutCreatorInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCreatorInput>
  }

  export type UserUpsertWithoutApprovedUsersInput = {
    update: XOR<UserUpdateWithoutApprovedUsersInput, UserUncheckedUpdateWithoutApprovedUsersInput>
    create: XOR<UserCreateWithoutApprovedUsersInput, UserUncheckedCreateWithoutApprovedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedUsersInput, UserUncheckedUpdateWithoutApprovedUsersInput>
  }

  export type UserUpdateWithoutApprovedUsersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    creator?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatorNestedInput
    approver?: UserUpdateOneWithoutApprovedUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutApproverInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutApproverInput, UserUncheckedUpdateWithoutApproverInput>
    create: XOR<UserCreateWithoutApproverInput, UserUncheckedCreateWithoutApproverInput>
  }

  export type UserUpdateWithWhereUniqueWithoutApproverInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutApproverInput, UserUncheckedUpdateWithoutApproverInput>
  }

  export type UserUpdateManyWithWhereWithoutApproverInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutApproverInput>
  }

  export type ColorToProductCreateWithoutColorInput = {
    order: number
    product: ProductCreateNestedOneWithoutProductColorsInput
  }

  export type ColorToProductUncheckedCreateWithoutColorInput = {
    productId: number
    order: number
  }

  export type ColorToProductCreateOrConnectWithoutColorInput = {
    where: ColorToProductWhereUniqueInput
    create: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput>
  }

  export type ColorToProductCreateManyColorInputEnvelope = {
    data: ColorToProductCreateManyColorInput | ColorToProductCreateManyColorInput[]
    skipDuplicates?: boolean
  }

  export type ColorToProductUpsertWithWhereUniqueWithoutColorInput = {
    where: ColorToProductWhereUniqueInput
    update: XOR<ColorToProductUpdateWithoutColorInput, ColorToProductUncheckedUpdateWithoutColorInput>
    create: XOR<ColorToProductCreateWithoutColorInput, ColorToProductUncheckedCreateWithoutColorInput>
  }

  export type ColorToProductUpdateWithWhereUniqueWithoutColorInput = {
    where: ColorToProductWhereUniqueInput
    data: XOR<ColorToProductUpdateWithoutColorInput, ColorToProductUncheckedUpdateWithoutColorInput>
  }

  export type ColorToProductUpdateManyWithWhereWithoutColorInput = {
    where: ColorToProductScalarWhereInput
    data: XOR<ColorToProductUpdateManyMutationInput, ColorToProductUncheckedUpdateManyWithoutColorInput>
  }

  export type ColorToProductScalarWhereInput = {
    AND?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
    OR?: ColorToProductScalarWhereInput[]
    NOT?: ColorToProductScalarWhereInput | ColorToProductScalarWhereInput[]
    productId?: IntFilter<"ColorToProduct"> | number
    colorId?: IntFilter<"ColorToProduct"> | number
    order?: IntFilter<"ColorToProduct"> | number
  }

  export type ProductGroupCreateWithoutProductCategoryInput = {
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductCreateNestedManyWithoutProductGroupInput
    laborCosts?: LaborCostCreateNestedManyWithoutProductGroupInput
  }

  export type ProductGroupUncheckedCreateWithoutProductCategoryInput = {
    id?: number
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductUncheckedCreateNestedManyWithoutProductGroupInput
    laborCosts?: LaborCostUncheckedCreateNestedManyWithoutProductGroupInput
  }

  export type ProductGroupCreateOrConnectWithoutProductCategoryInput = {
    where: ProductGroupWhereUniqueInput
    create: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput>
  }

  export type ProductGroupCreateManyProductCategoryInputEnvelope = {
    data: ProductGroupCreateManyProductCategoryInput | ProductGroupCreateManyProductCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductGroupUpsertWithWhereUniqueWithoutProductCategoryInput = {
    where: ProductGroupWhereUniqueInput
    update: XOR<ProductGroupUpdateWithoutProductCategoryInput, ProductGroupUncheckedUpdateWithoutProductCategoryInput>
    create: XOR<ProductGroupCreateWithoutProductCategoryInput, ProductGroupUncheckedCreateWithoutProductCategoryInput>
  }

  export type ProductGroupUpdateWithWhereUniqueWithoutProductCategoryInput = {
    where: ProductGroupWhereUniqueInput
    data: XOR<ProductGroupUpdateWithoutProductCategoryInput, ProductGroupUncheckedUpdateWithoutProductCategoryInput>
  }

  export type ProductGroupUpdateManyWithWhereWithoutProductCategoryInput = {
    where: ProductGroupScalarWhereInput
    data: XOR<ProductGroupUpdateManyMutationInput, ProductGroupUncheckedUpdateManyWithoutProductCategoryInput>
  }

  export type ProductGroupScalarWhereInput = {
    AND?: ProductGroupScalarWhereInput | ProductGroupScalarWhereInput[]
    OR?: ProductGroupScalarWhereInput[]
    NOT?: ProductGroupScalarWhereInput | ProductGroupScalarWhereInput[]
    id?: IntFilter<"ProductGroup"> | number
    skuNumeric?: StringFilter<"ProductGroup"> | string
    productCategoryId?: IntFilter<"ProductGroup"> | number
    name?: StringNullableFilter<"ProductGroup"> | string | null
    createdAt?: DateTimeFilter<"ProductGroup"> | Date | string
    createdBy?: IntFilter<"ProductGroup"> | number
    updatedAt?: DateTimeFilter<"ProductGroup"> | Date | string
    updatedBy?: IntNullableFilter<"ProductGroup"> | number | null
  }

  export type ProductCreateWithoutProductGroupInput = {
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductCreateNestedManyWithoutProductInput
    work?: WorkCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutProductGroupInput = {
    id?: number
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductUncheckedCreateNestedManyWithoutProductInput
    work?: WorkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutProductGroupInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput>
  }

  export type ProductCreateManyProductGroupInputEnvelope = {
    data: ProductCreateManyProductGroupInput | ProductCreateManyProductGroupInput[]
    skipDuplicates?: boolean
  }

  export type LaborCostCreateWithoutProductGroupInput = {
    type: $Enums.Job
    cost: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutLaborCostInput
  }

  export type LaborCostUncheckedCreateWithoutProductGroupInput = {
    id?: number
    type: $Enums.Job
    cost: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutLaborCostInput
  }

  export type LaborCostCreateOrConnectWithoutProductGroupInput = {
    where: LaborCostWhereUniqueInput
    create: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput>
  }

  export type LaborCostCreateManyProductGroupInputEnvelope = {
    data: LaborCostCreateManyProductGroupInput | LaborCostCreateManyProductGroupInput[]
    skipDuplicates?: boolean
  }

  export type ProductCategoryCreateWithoutProductGroupsInput = {
    name: string
    gender: $Enums.Gender
  }

  export type ProductCategoryUncheckedCreateWithoutProductGroupsInput = {
    id?: number
    name: string
    gender: $Enums.Gender
  }

  export type ProductCategoryCreateOrConnectWithoutProductGroupsInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutProductGroupsInput, ProductCategoryUncheckedCreateWithoutProductGroupsInput>
  }

  export type ProductUpsertWithWhereUniqueWithoutProductGroupInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutProductGroupInput, ProductUncheckedUpdateWithoutProductGroupInput>
    create: XOR<ProductCreateWithoutProductGroupInput, ProductUncheckedCreateWithoutProductGroupInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutProductGroupInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutProductGroupInput, ProductUncheckedUpdateWithoutProductGroupInput>
  }

  export type ProductUpdateManyWithWhereWithoutProductGroupInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutProductGroupInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    productGroupId?: IntFilter<"Product"> | number
    createdBy?: IntFilter<"Product"> | number
    updatedBy?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type LaborCostUpsertWithWhereUniqueWithoutProductGroupInput = {
    where: LaborCostWhereUniqueInput
    update: XOR<LaborCostUpdateWithoutProductGroupInput, LaborCostUncheckedUpdateWithoutProductGroupInput>
    create: XOR<LaborCostCreateWithoutProductGroupInput, LaborCostUncheckedCreateWithoutProductGroupInput>
  }

  export type LaborCostUpdateWithWhereUniqueWithoutProductGroupInput = {
    where: LaborCostWhereUniqueInput
    data: XOR<LaborCostUpdateWithoutProductGroupInput, LaborCostUncheckedUpdateWithoutProductGroupInput>
  }

  export type LaborCostUpdateManyWithWhereWithoutProductGroupInput = {
    where: LaborCostScalarWhereInput
    data: XOR<LaborCostUpdateManyMutationInput, LaborCostUncheckedUpdateManyWithoutProductGroupInput>
  }

  export type LaborCostScalarWhereInput = {
    AND?: LaborCostScalarWhereInput | LaborCostScalarWhereInput[]
    OR?: LaborCostScalarWhereInput[]
    NOT?: LaborCostScalarWhereInput | LaborCostScalarWhereInput[]
    id?: IntFilter<"LaborCost"> | number
    type?: EnumJobFilter<"LaborCost"> | $Enums.Job
    cost?: IntFilter<"LaborCost"> | number
    productGroupId?: IntFilter<"LaborCost"> | number
    createdBy?: IntFilter<"LaborCost"> | number
    updatedBy?: IntNullableFilter<"LaborCost"> | number | null
    createdAt?: DateTimeFilter<"LaborCost"> | Date | string
    updatedAt?: DateTimeFilter<"LaborCost"> | Date | string
  }

  export type ProductCategoryUpsertWithoutProductGroupsInput = {
    update: XOR<ProductCategoryUpdateWithoutProductGroupsInput, ProductCategoryUncheckedUpdateWithoutProductGroupsInput>
    create: XOR<ProductCategoryCreateWithoutProductGroupsInput, ProductCategoryUncheckedCreateWithoutProductGroupsInput>
    where?: ProductCategoryWhereInput
  }

  export type ProductCategoryUpdateToOneWithWhereWithoutProductGroupsInput = {
    where?: ProductCategoryWhereInput
    data: XOR<ProductCategoryUpdateWithoutProductGroupsInput, ProductCategoryUncheckedUpdateWithoutProductGroupsInput>
  }

  export type ProductCategoryUpdateWithoutProductGroupsInput = {
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type ProductCategoryUncheckedUpdateWithoutProductGroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type ColorToProductCreateWithoutProductInput = {
    order: number
    color: ColorCreateNestedOneWithoutProductColorsInput
  }

  export type ColorToProductUncheckedCreateWithoutProductInput = {
    colorId: number
    order: number
  }

  export type ColorToProductCreateOrConnectWithoutProductInput = {
    where: ColorToProductWhereUniqueInput
    create: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput>
  }

  export type ColorToProductCreateManyProductInputEnvelope = {
    data: ColorToProductCreateManyProductInput | ColorToProductCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type WorkCreateWithoutProductInput = {
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkCreateNestedManyWithoutWorkInput
    tasks?: TaskCreateNestedManyWithoutWorkInput
  }

  export type WorkUncheckedCreateWithoutProductInput = {
    id?: number
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkUncheckedCreateNestedManyWithoutWorkInput
    tasks?: TaskUncheckedCreateNestedManyWithoutWorkInput
  }

  export type WorkCreateOrConnectWithoutProductInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput>
  }

  export type WorkCreateManyProductInputEnvelope = {
    data: WorkCreateManyProductInput | WorkCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductGroupCreateWithoutProductsInput = {
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    laborCosts?: LaborCostCreateNestedManyWithoutProductGroupInput
    productCategory: ProductCategoryCreateNestedOneWithoutProductGroupsInput
  }

  export type ProductGroupUncheckedCreateWithoutProductsInput = {
    id?: number
    skuNumeric: string
    productCategoryId: number
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    laborCosts?: LaborCostUncheckedCreateNestedManyWithoutProductGroupInput
  }

  export type ProductGroupCreateOrConnectWithoutProductsInput = {
    where: ProductGroupWhereUniqueInput
    create: XOR<ProductGroupCreateWithoutProductsInput, ProductGroupUncheckedCreateWithoutProductsInput>
  }

  export type ColorToProductUpsertWithWhereUniqueWithoutProductInput = {
    where: ColorToProductWhereUniqueInput
    update: XOR<ColorToProductUpdateWithoutProductInput, ColorToProductUncheckedUpdateWithoutProductInput>
    create: XOR<ColorToProductCreateWithoutProductInput, ColorToProductUncheckedCreateWithoutProductInput>
  }

  export type ColorToProductUpdateWithWhereUniqueWithoutProductInput = {
    where: ColorToProductWhereUniqueInput
    data: XOR<ColorToProductUpdateWithoutProductInput, ColorToProductUncheckedUpdateWithoutProductInput>
  }

  export type ColorToProductUpdateManyWithWhereWithoutProductInput = {
    where: ColorToProductScalarWhereInput
    data: XOR<ColorToProductUpdateManyMutationInput, ColorToProductUncheckedUpdateManyWithoutProductInput>
  }

  export type WorkUpsertWithWhereUniqueWithoutProductInput = {
    where: WorkWhereUniqueInput
    update: XOR<WorkUpdateWithoutProductInput, WorkUncheckedUpdateWithoutProductInput>
    create: XOR<WorkCreateWithoutProductInput, WorkUncheckedCreateWithoutProductInput>
  }

  export type WorkUpdateWithWhereUniqueWithoutProductInput = {
    where: WorkWhereUniqueInput
    data: XOR<WorkUpdateWithoutProductInput, WorkUncheckedUpdateWithoutProductInput>
  }

  export type WorkUpdateManyWithWhereWithoutProductInput = {
    where: WorkScalarWhereInput
    data: XOR<WorkUpdateManyMutationInput, WorkUncheckedUpdateManyWithoutProductInput>
  }

  export type WorkScalarWhereInput = {
    AND?: WorkScalarWhereInput | WorkScalarWhereInput[]
    OR?: WorkScalarWhereInput[]
    NOT?: WorkScalarWhereInput | WorkScalarWhereInput[]
    id?: IntFilter<"Work"> | number
    date?: DateTimeFilter<"Work"> | Date | string
    orderNo?: StringFilter<"Work"> | string
    productId?: IntFilter<"Work"> | number
    createdBy?: IntFilter<"Work"> | number
    updatedBy?: IntNullableFilter<"Work"> | number | null
    createdAt?: DateTimeFilter<"Work"> | Date | string
    updatedAt?: DateTimeFilter<"Work"> | Date | string
  }

  export type ProductGroupUpsertWithoutProductsInput = {
    update: XOR<ProductGroupUpdateWithoutProductsInput, ProductGroupUncheckedUpdateWithoutProductsInput>
    create: XOR<ProductGroupCreateWithoutProductsInput, ProductGroupUncheckedCreateWithoutProductsInput>
    where?: ProductGroupWhereInput
  }

  export type ProductGroupUpdateToOneWithWhereWithoutProductsInput = {
    where?: ProductGroupWhereInput
    data: XOR<ProductGroupUpdateWithoutProductsInput, ProductGroupUncheckedUpdateWithoutProductsInput>
  }

  export type ProductGroupUpdateWithoutProductsInput = {
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    laborCosts?: LaborCostUpdateManyWithoutProductGroupNestedInput
    productCategory?: ProductCategoryUpdateOneRequiredWithoutProductGroupsNestedInput
  }

  export type ProductGroupUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    productCategoryId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    laborCosts?: LaborCostUncheckedUpdateManyWithoutProductGroupNestedInput
  }

  export type ProductCreateWithoutProductColorsInput = {
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    work?: WorkCreateNestedManyWithoutProductInput
    productGroup: ProductGroupCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutProductColorsInput = {
    id?: number
    sku: string
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    work?: WorkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutProductColorsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutProductColorsInput, ProductUncheckedCreateWithoutProductColorsInput>
  }

  export type ColorCreateWithoutProductColorsInput = {
    name: string
    hexCode: string
  }

  export type ColorUncheckedCreateWithoutProductColorsInput = {
    id?: number
    name: string
    hexCode: string
  }

  export type ColorCreateOrConnectWithoutProductColorsInput = {
    where: ColorWhereUniqueInput
    create: XOR<ColorCreateWithoutProductColorsInput, ColorUncheckedCreateWithoutProductColorsInput>
  }

  export type ProductUpsertWithoutProductColorsInput = {
    update: XOR<ProductUpdateWithoutProductColorsInput, ProductUncheckedUpdateWithoutProductColorsInput>
    create: XOR<ProductCreateWithoutProductColorsInput, ProductUncheckedCreateWithoutProductColorsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutProductColorsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutProductColorsInput, ProductUncheckedUpdateWithoutProductColorsInput>
  }

  export type ProductUpdateWithoutProductColorsInput = {
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    work?: WorkUpdateManyWithoutProductNestedInput
    productGroup?: ProductGroupUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutProductColorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    work?: WorkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ColorUpsertWithoutProductColorsInput = {
    update: XOR<ColorUpdateWithoutProductColorsInput, ColorUncheckedUpdateWithoutProductColorsInput>
    create: XOR<ColorCreateWithoutProductColorsInput, ColorUncheckedCreateWithoutProductColorsInput>
    where?: ColorWhereInput
  }

  export type ColorUpdateToOneWithWhereWithoutProductColorsInput = {
    where?: ColorWhereInput
    data: XOR<ColorUpdateWithoutProductColorsInput, ColorUncheckedUpdateWithoutProductColorsInput>
  }

  export type ColorUpdateWithoutProductColorsInput = {
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
  }

  export type ColorUncheckedUpdateWithoutProductColorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    hexCode?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateWithoutLaborCostInput = {
    type: $Enums.Job
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    work: WorkCreateNestedOneWithoutTasksInput
    artisan?: ArtisanCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutLaborCostInput = {
    id?: number
    workId: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutLaborCostInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput>
  }

  export type TaskCreateManyLaborCostInputEnvelope = {
    data: TaskCreateManyLaborCostInput | TaskCreateManyLaborCostInput[]
    skipDuplicates?: boolean
  }

  export type ProductGroupCreateWithoutLaborCostsInput = {
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductCreateNestedManyWithoutProductGroupInput
    productCategory: ProductCategoryCreateNestedOneWithoutProductGroupsInput
  }

  export type ProductGroupUncheckedCreateWithoutLaborCostsInput = {
    id?: number
    skuNumeric: string
    productCategoryId: number
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
    products?: ProductUncheckedCreateNestedManyWithoutProductGroupInput
  }

  export type ProductGroupCreateOrConnectWithoutLaborCostsInput = {
    where: ProductGroupWhereUniqueInput
    create: XOR<ProductGroupCreateWithoutLaborCostsInput, ProductGroupUncheckedCreateWithoutLaborCostsInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutLaborCostInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutLaborCostInput, TaskUncheckedUpdateWithoutLaborCostInput>
    create: XOR<TaskCreateWithoutLaborCostInput, TaskUncheckedCreateWithoutLaborCostInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutLaborCostInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutLaborCostInput, TaskUncheckedUpdateWithoutLaborCostInput>
  }

  export type TaskUpdateManyWithWhereWithoutLaborCostInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutLaborCostInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    workId?: IntFilter<"Task"> | number
    type?: EnumJobFilter<"Task"> | $Enums.Job
    artisanId?: IntNullableFilter<"Task"> | number | null
    doneAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    laborCostId?: IntFilter<"Task"> | number
    createdBy?: IntFilter<"Task"> | number
    updatedBy?: IntNullableFilter<"Task"> | number | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type ProductGroupUpsertWithoutLaborCostsInput = {
    update: XOR<ProductGroupUpdateWithoutLaborCostsInput, ProductGroupUncheckedUpdateWithoutLaborCostsInput>
    create: XOR<ProductGroupCreateWithoutLaborCostsInput, ProductGroupUncheckedCreateWithoutLaborCostsInput>
    where?: ProductGroupWhereInput
  }

  export type ProductGroupUpdateToOneWithWhereWithoutLaborCostsInput = {
    where?: ProductGroupWhereInput
    data: XOR<ProductGroupUpdateWithoutLaborCostsInput, ProductGroupUncheckedUpdateWithoutLaborCostsInput>
  }

  export type ProductGroupUpdateWithoutLaborCostsInput = {
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUpdateManyWithoutProductGroupNestedInput
    productCategory?: ProductCategoryUpdateOneRequiredWithoutProductGroupsNestedInput
  }

  export type ProductGroupUncheckedUpdateWithoutLaborCostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    productCategoryId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUncheckedUpdateManyWithoutProductGroupNestedInput
  }

  export type TaskCreateWithoutArtisanInput = {
    type: $Enums.Job
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    work: WorkCreateNestedOneWithoutTasksInput
    laborCost: LaborCostCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutArtisanInput = {
    id?: number
    workId: number
    type: $Enums.Job
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutArtisanInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput>
  }

  export type TaskCreateManyArtisanInputEnvelope = {
    data: TaskCreateManyArtisanInput | TaskCreateManyArtisanInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutArtisanInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutArtisanInput, TaskUncheckedUpdateWithoutArtisanInput>
    create: XOR<TaskCreateWithoutArtisanInput, TaskUncheckedCreateWithoutArtisanInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutArtisanInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutArtisanInput, TaskUncheckedUpdateWithoutArtisanInput>
  }

  export type TaskUpdateManyWithWhereWithoutArtisanInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutArtisanInput>
  }

  export type SizeToWorkCreateWithoutWorkInput = {
    quantity: number
    size: SizeCreateNestedOneWithoutWorksInput
  }

  export type SizeToWorkUncheckedCreateWithoutWorkInput = {
    sizeId: number
    quantity: number
  }

  export type SizeToWorkCreateOrConnectWithoutWorkInput = {
    where: SizeToWorkWhereUniqueInput
    create: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput>
  }

  export type SizeToWorkCreateManyWorkInputEnvelope = {
    data: SizeToWorkCreateManyWorkInput | SizeToWorkCreateManyWorkInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutWorkInput = {
    type: $Enums.Job
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artisan?: ArtisanCreateNestedOneWithoutTasksInput
    laborCost: LaborCostCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutWorkInput = {
    id?: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutWorkInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput>
  }

  export type TaskCreateManyWorkInputEnvelope = {
    data: TaskCreateManyWorkInput | TaskCreateManyWorkInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutWorkInput = {
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductCreateNestedManyWithoutProductInput
    productGroup: ProductGroupCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutWorkInput = {
    id?: number
    sku: string
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productColors?: ColorToProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutWorkInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutWorkInput, ProductUncheckedCreateWithoutWorkInput>
  }

  export type SizeToWorkUpsertWithWhereUniqueWithoutWorkInput = {
    where: SizeToWorkWhereUniqueInput
    update: XOR<SizeToWorkUpdateWithoutWorkInput, SizeToWorkUncheckedUpdateWithoutWorkInput>
    create: XOR<SizeToWorkCreateWithoutWorkInput, SizeToWorkUncheckedCreateWithoutWorkInput>
  }

  export type SizeToWorkUpdateWithWhereUniqueWithoutWorkInput = {
    where: SizeToWorkWhereUniqueInput
    data: XOR<SizeToWorkUpdateWithoutWorkInput, SizeToWorkUncheckedUpdateWithoutWorkInput>
  }

  export type SizeToWorkUpdateManyWithWhereWithoutWorkInput = {
    where: SizeToWorkScalarWhereInput
    data: XOR<SizeToWorkUpdateManyMutationInput, SizeToWorkUncheckedUpdateManyWithoutWorkInput>
  }

  export type SizeToWorkScalarWhereInput = {
    AND?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
    OR?: SizeToWorkScalarWhereInput[]
    NOT?: SizeToWorkScalarWhereInput | SizeToWorkScalarWhereInput[]
    workId?: IntFilter<"SizeToWork"> | number
    sizeId?: IntFilter<"SizeToWork"> | number
    quantity?: IntFilter<"SizeToWork"> | number
  }

  export type TaskUpsertWithWhereUniqueWithoutWorkInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutWorkInput, TaskUncheckedUpdateWithoutWorkInput>
    create: XOR<TaskCreateWithoutWorkInput, TaskUncheckedCreateWithoutWorkInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutWorkInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutWorkInput, TaskUncheckedUpdateWithoutWorkInput>
  }

  export type TaskUpdateManyWithWhereWithoutWorkInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutWorkInput>
  }

  export type ProductUpsertWithoutWorkInput = {
    update: XOR<ProductUpdateWithoutWorkInput, ProductUncheckedUpdateWithoutWorkInput>
    create: XOR<ProductCreateWithoutWorkInput, ProductUncheckedCreateWithoutWorkInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutWorkInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutWorkInput, ProductUncheckedUpdateWithoutWorkInput>
  }

  export type ProductUpdateWithoutWorkInput = {
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUpdateManyWithoutProductNestedInput
    productGroup?: ProductGroupUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type WorkCreateWithoutTasksInput = {
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkCreateNestedManyWithoutWorkInput
    product: ProductCreateNestedOneWithoutWorkInput
  }

  export type WorkUncheckedCreateWithoutTasksInput = {
    id?: number
    date: Date | string
    orderNo: string
    productId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sizes?: SizeToWorkUncheckedCreateNestedManyWithoutWorkInput
  }

  export type WorkCreateOrConnectWithoutTasksInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutTasksInput, WorkUncheckedCreateWithoutTasksInput>
  }

  export type ArtisanCreateWithoutTasksInput = {
    firstName: string
    lastName?: string | null
    jobs?: ArtisanCreatejobsInput | $Enums.Job[]
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtisanUncheckedCreateWithoutTasksInput = {
    id?: number
    firstName: string
    lastName?: string | null
    jobs?: ArtisanCreatejobsInput | $Enums.Job[]
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtisanCreateOrConnectWithoutTasksInput = {
    where: ArtisanWhereUniqueInput
    create: XOR<ArtisanCreateWithoutTasksInput, ArtisanUncheckedCreateWithoutTasksInput>
  }

  export type LaborCostCreateWithoutTasksInput = {
    type: $Enums.Job
    cost: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productGroup: ProductGroupCreateNestedOneWithoutLaborCostsInput
  }

  export type LaborCostUncheckedCreateWithoutTasksInput = {
    id?: number
    type: $Enums.Job
    cost: number
    productGroupId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LaborCostCreateOrConnectWithoutTasksInput = {
    where: LaborCostWhereUniqueInput
    create: XOR<LaborCostCreateWithoutTasksInput, LaborCostUncheckedCreateWithoutTasksInput>
  }

  export type WorkUpsertWithoutTasksInput = {
    update: XOR<WorkUpdateWithoutTasksInput, WorkUncheckedUpdateWithoutTasksInput>
    create: XOR<WorkCreateWithoutTasksInput, WorkUncheckedCreateWithoutTasksInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutTasksInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutTasksInput, WorkUncheckedUpdateWithoutTasksInput>
  }

  export type WorkUpdateWithoutTasksInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUpdateManyWithoutWorkNestedInput
    product?: ProductUpdateOneRequiredWithoutWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUncheckedUpdateManyWithoutWorkNestedInput
  }

  export type ArtisanUpsertWithoutTasksInput = {
    update: XOR<ArtisanUpdateWithoutTasksInput, ArtisanUncheckedUpdateWithoutTasksInput>
    create: XOR<ArtisanCreateWithoutTasksInput, ArtisanUncheckedCreateWithoutTasksInput>
    where?: ArtisanWhereInput
  }

  export type ArtisanUpdateToOneWithWhereWithoutTasksInput = {
    where?: ArtisanWhereInput
    data: XOR<ArtisanUpdateWithoutTasksInput, ArtisanUncheckedUpdateWithoutTasksInput>
  }

  export type ArtisanUpdateWithoutTasksInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtisanUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    jobs?: ArtisanUpdatejobsInput | $Enums.Job[]
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaborCostUpsertWithoutTasksInput = {
    update: XOR<LaborCostUpdateWithoutTasksInput, LaborCostUncheckedUpdateWithoutTasksInput>
    create: XOR<LaborCostCreateWithoutTasksInput, LaborCostUncheckedCreateWithoutTasksInput>
    where?: LaborCostWhereInput
  }

  export type LaborCostUpdateToOneWithWhereWithoutTasksInput = {
    where?: LaborCostWhereInput
    data: XOR<LaborCostUpdateWithoutTasksInput, LaborCostUncheckedUpdateWithoutTasksInput>
  }

  export type LaborCostUpdateWithoutTasksInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productGroup?: ProductGroupUpdateOneRequiredWithoutLaborCostsNestedInput
  }

  export type LaborCostUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    productGroupId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeToWorkCreateWithoutSizeInput = {
    quantity: number
    work: WorkCreateNestedOneWithoutSizesInput
  }

  export type SizeToWorkUncheckedCreateWithoutSizeInput = {
    workId: number
    quantity: number
  }

  export type SizeToWorkCreateOrConnectWithoutSizeInput = {
    where: SizeToWorkWhereUniqueInput
    create: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput>
  }

  export type SizeToWorkCreateManySizeInputEnvelope = {
    data: SizeToWorkCreateManySizeInput | SizeToWorkCreateManySizeInput[]
    skipDuplicates?: boolean
  }

  export type SizeToWorkUpsertWithWhereUniqueWithoutSizeInput = {
    where: SizeToWorkWhereUniqueInput
    update: XOR<SizeToWorkUpdateWithoutSizeInput, SizeToWorkUncheckedUpdateWithoutSizeInput>
    create: XOR<SizeToWorkCreateWithoutSizeInput, SizeToWorkUncheckedCreateWithoutSizeInput>
  }

  export type SizeToWorkUpdateWithWhereUniqueWithoutSizeInput = {
    where: SizeToWorkWhereUniqueInput
    data: XOR<SizeToWorkUpdateWithoutSizeInput, SizeToWorkUncheckedUpdateWithoutSizeInput>
  }

  export type SizeToWorkUpdateManyWithWhereWithoutSizeInput = {
    where: SizeToWorkScalarWhereInput
    data: XOR<SizeToWorkUpdateManyMutationInput, SizeToWorkUncheckedUpdateManyWithoutSizeInput>
  }

  export type WorkCreateWithoutSizesInput = {
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutWorkInput
    product: ProductCreateNestedOneWithoutWorkInput
  }

  export type WorkUncheckedCreateWithoutSizesInput = {
    id?: number
    date: Date | string
    orderNo: string
    productId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutWorkInput
  }

  export type WorkCreateOrConnectWithoutSizesInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutSizesInput, WorkUncheckedCreateWithoutSizesInput>
  }

  export type SizeCreateWithoutWorksInput = {
    eu: string
    us?: string | null
    uk?: string | null
    jp?: string | null
    gender: $Enums.Gender
  }

  export type SizeUncheckedCreateWithoutWorksInput = {
    id?: number
    eu: string
    us?: string | null
    uk?: string | null
    jp?: string | null
    gender: $Enums.Gender
  }

  export type SizeCreateOrConnectWithoutWorksInput = {
    where: SizeWhereUniqueInput
    create: XOR<SizeCreateWithoutWorksInput, SizeUncheckedCreateWithoutWorksInput>
  }

  export type WorkUpsertWithoutSizesInput = {
    update: XOR<WorkUpdateWithoutSizesInput, WorkUncheckedUpdateWithoutSizesInput>
    create: XOR<WorkCreateWithoutSizesInput, WorkUncheckedCreateWithoutSizesInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutSizesInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutSizesInput, WorkUncheckedUpdateWithoutSizesInput>
  }

  export type WorkUpdateWithoutSizesInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutWorkNestedInput
    product?: ProductUpdateOneRequiredWithoutWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutSizesInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutWorkNestedInput
  }

  export type SizeUpsertWithoutWorksInput = {
    update: XOR<SizeUpdateWithoutWorksInput, SizeUncheckedUpdateWithoutWorksInput>
    create: XOR<SizeCreateWithoutWorksInput, SizeUncheckedCreateWithoutWorksInput>
    where?: SizeWhereInput
  }

  export type SizeUpdateToOneWithWhereWithoutWorksInput = {
    where?: SizeWhereInput
    data: XOR<SizeUpdateWithoutWorksInput, SizeUncheckedUpdateWithoutWorksInput>
  }

  export type SizeUpdateWithoutWorksInput = {
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type SizeUncheckedUpdateWithoutWorksInput = {
    id?: IntFieldUpdateOperationsInput | number
    eu?: StringFieldUpdateOperationsInput | string
    us?: NullableStringFieldUpdateOperationsInput | string | null
    uk?: NullableStringFieldUpdateOperationsInput | string | null
    jp?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
  }

  export type UserCreateManyRoleInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    createdBy?: number | null
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type UserUpdateWithoutRoleInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatorNestedInput
    approver?: UserUpdateOneWithoutApprovedUsersNestedInput
    approvedUsers?: UserUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatorNestedInput
    approvedUsers?: UserUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateManyCreatorInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    updatedBy?: number | null
    approvedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type UserCreateManyApproverInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    isActive?: boolean
    roleId: number
    createdBy?: number | null
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type UserUpdateWithoutCreatorInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatorNestedInput
    approver?: UserUpdateOneWithoutApprovedUsersNestedInput
    approvedUsers?: UserUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatorNestedInput
    approvedUsers?: UserUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpdateWithoutApproverInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    creator?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatorNestedInput
    approvedUsers?: UserUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatorNestedInput
    approvedUsers?: UserUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ColorToProductCreateManyColorInput = {
    productId: number
    order: number
  }

  export type ColorToProductUpdateWithoutColorInput = {
    order?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutProductColorsNestedInput
  }

  export type ColorToProductUncheckedUpdateWithoutColorInput = {
    productId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColorToProductUncheckedUpdateManyWithoutColorInput = {
    productId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductGroupCreateManyProductCategoryInput = {
    id?: number
    skuNumeric: string
    name?: string | null
    createdAt?: Date | string
    createdBy: number
    updatedAt?: Date | string
    updatedBy?: number | null
  }

  export type ProductGroupUpdateWithoutProductCategoryInput = {
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUpdateManyWithoutProductGroupNestedInput
    laborCosts?: LaborCostUpdateManyWithoutProductGroupNestedInput
  }

  export type ProductGroupUncheckedUpdateWithoutProductCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUncheckedUpdateManyWithoutProductGroupNestedInput
    laborCosts?: LaborCostUncheckedUpdateManyWithoutProductGroupNestedInput
  }

  export type ProductGroupUncheckedUpdateManyWithoutProductCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    skuNumeric?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductCreateManyProductGroupInput = {
    id?: number
    sku: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LaborCostCreateManyProductGroupInput = {
    id?: number
    type: $Enums.Job
    cost: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutProductGroupInput = {
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUpdateManyWithoutProductNestedInput
    work?: WorkUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutProductGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productColors?: ColorToProductUncheckedUpdateManyWithoutProductNestedInput
    work?: WorkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutProductGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaborCostUpdateWithoutProductGroupInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutLaborCostNestedInput
  }

  export type LaborCostUncheckedUpdateWithoutProductGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutLaborCostNestedInput
  }

  export type LaborCostUncheckedUpdateManyWithoutProductGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    cost?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorToProductCreateManyProductInput = {
    colorId: number
    order: number
  }

  export type WorkCreateManyProductInput = {
    id?: number
    date: Date | string
    orderNo: string
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorToProductUpdateWithoutProductInput = {
    order?: IntFieldUpdateOperationsInput | number
    color?: ColorUpdateOneRequiredWithoutProductColorsNestedInput
  }

  export type ColorToProductUncheckedUpdateWithoutProductInput = {
    colorId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColorToProductUncheckedUpdateManyWithoutProductInput = {
    colorId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type WorkUpdateWithoutProductInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUpdateManyWithoutWorkNestedInput
    tasks?: TaskUpdateManyWithoutWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sizes?: SizeToWorkUncheckedUpdateManyWithoutWorkNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutWorkNestedInput
  }

  export type WorkUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderNo?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyLaborCostInput = {
    id?: number
    workId: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutLaborCostInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    work?: WorkUpdateOneRequiredWithoutTasksNestedInput
    artisan?: ArtisanUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutLaborCostInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutLaborCostInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyArtisanInput = {
    id?: number
    workId: number
    type: $Enums.Job
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutArtisanInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    work?: WorkUpdateOneRequiredWithoutTasksNestedInput
    laborCost?: LaborCostUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutArtisanInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutArtisanInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeToWorkCreateManyWorkInput = {
    sizeId: number
    quantity: number
  }

  export type TaskCreateManyWorkInput = {
    id?: number
    type: $Enums.Job
    artisanId?: number | null
    doneAt?: Date | string | null
    laborCostId: number
    createdBy: number
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SizeToWorkUpdateWithoutWorkInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    size?: SizeUpdateOneRequiredWithoutWorksNestedInput
  }

  export type SizeToWorkUncheckedUpdateWithoutWorkInput = {
    sizeId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type SizeToWorkUncheckedUpdateManyWithoutWorkInput = {
    sizeId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type TaskUpdateWithoutWorkInput = {
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artisan?: ArtisanUpdateOneWithoutTasksNestedInput
    laborCost?: LaborCostUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumJobFieldUpdateOperationsInput | $Enums.Job
    artisanId?: NullableIntFieldUpdateOperationsInput | number | null
    doneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    laborCostId?: IntFieldUpdateOperationsInput | number
    createdBy?: IntFieldUpdateOperationsInput | number
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeToWorkCreateManySizeInput = {
    workId: number
    quantity: number
  }

  export type SizeToWorkUpdateWithoutSizeInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    work?: WorkUpdateOneRequiredWithoutSizesNestedInput
  }

  export type SizeToWorkUncheckedUpdateWithoutSizeInput = {
    workId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type SizeToWorkUncheckedUpdateManyWithoutSizeInput = {
    workId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}