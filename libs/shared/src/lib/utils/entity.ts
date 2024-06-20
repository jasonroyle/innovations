type EntityUtilPredicate<T, I> = (entity: T, id: I) => boolean;

interface EntityUtilOptions<T, I> {
  predicate?: EntityUtilPredicate<T, I>;
  selectId: EntityUtilSelectId<T, I>;
}

type EntityUtilSelectId<T, I> = (entity: T) => I;

export class EntityUtil<T, I> {
  public readonly predicate: EntityUtilPredicate<T, I> = (entity, id) =>
    this.selectId(entity) === id;
  public readonly selectId: EntityUtilSelectId<T, I>;

  constructor({ predicate, selectId }: EntityUtilOptions<T, I>) {
    if (predicate) this.predicate = predicate;
    this.selectId = selectId;
  }

  public find(entities: T[], id: I): T | undefined {
    return entities.find((entity) => this.predicate(entity, id));
  }

  public findIndex(entities: T[], id: I): number {
    return entities.findIndex((entity) => this.predicate(entity, id));
  }
}
