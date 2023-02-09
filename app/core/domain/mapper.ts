export abstract class Mapper<Domain, Persistence> {
  public abstract toDomain (data: Persistence): Domain | Promise<Domain>
  public abstract toPersistence (data: Domain): Persistence | Promise<Persistence>
}
