import { Arg, Resolver, Mutation } from 'type-graphql';

@Resolver()
export default class MigrationResolver {
  @Mutation(() => Boolean)
  async migrate(@Arg('migrationType') migrationType: string) {
    switch (migrationType) {
      case 'FOO':
        return true;
      case 'BAR':
        return true;
      default:
        return false;
    }
  }
}
