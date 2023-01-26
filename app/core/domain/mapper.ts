export abstract class Mapper<Domain, Persistence> {
  public abstract toDomain (data: Persistence): Domain
  public abstract toPersistence (data: Domain): Persistence
}
