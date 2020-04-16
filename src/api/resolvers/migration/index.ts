import { Arg, Resolver, Mutation, UseMiddleware } from 'type-graphql';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';
import { isAdmin } from '@api/middleware/resolver/isAdmin';

@Resolver()
export default class MigrationResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated, isAdmin)
  async migrate(
    @Arg('migrationType') migrationType: string
  ): Promise<Boolean> {
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
