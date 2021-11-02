import { AnyEntity, EntityName, EntityRepository } from "@mikro-orm/core";
import { EntityClass } from "@mikro-orm/core/typings";
import { ExtractPromiseReturnType } from "@interfaces/utility";
import { getOrm } from "@database/init";


// type PromiseReturnType = Parameters<Parameters<ReturnType<typeof >['then']>[0]>[0]

export class BaseController<T extends AnyEntity<T>> {
  protected entity: AnyEntity<T>;
  protected orm: ExtractPromiseReturnType<typeof getOrm>;
  protected repository: EntityRepository<T>;

  constructor(entity: any) {
    this.entity = entity;
  }

  async init() {
    if (!this.orm || !this.repository) {
      this.orm = await getOrm();
      this.repository = this.orm.em.getRepository<T>(this.entity as EntityName<T>);
    }
  }
}

type EntityClassMap<T> = {
  [Property in keyof T as `${Capitalize<string & Property>}`]: EntityClass<T[Property]>;
};
type EntityMap<T> = {
  [Property in keyof T as `${Capitalize<string & Property>}`]: T[Property];
};
type EntityRepositoryMap<T extends Record<string, AnyEntity>> = {
  [Property in keyof T as `${Lowercase<string & Property>}`]: EntityRepository<T[Property]>;
};
export class MultiEntityController<T extends Record<string, AnyEntity<{ id: number }>>> {
  protected entities: EntityMap<T>;

  protected orm: ExtractPromiseReturnType<typeof getOrm>;

  protected repositories: EntityRepositoryMap<EntityMap<T>>;

  constructor(entities: EntityClassMap<T>) {
    this.repositories = {} as EntityRepositoryMap<EntityMap<T>>;
    this.entities = entities as unknown as EntityMap<T>;
  }

  async init() {
    const alreadyInitialized = Object.values(this.repositories).every((Rep) => Rep instanceof EntityRepository);
    if (!this.orm || !alreadyInitialized) {
      this.orm = await getOrm();

      for (const key in this.entities) {
        this.repositories[key.toLowerCase() as keyof EntityRepositoryMap<EntityClassMap<T>>] = this.orm.em.getRepository<T>(
          this.entities[key] as EntityName<any>
        ) as EntityRepository<any>;
      }
    }
  }
}
