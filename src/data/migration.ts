import invert from 'lodash.invert';

import { COURSE } from './course-keys-types';
import BUNDLE_LEGACY from './bundle-legacy';

const applyMigration = (
  courseKey: COURSE,
  allowedKeys: string[]
): string[] => {
  const bundleLegacy = BUNDLE_LEGACY[courseKey];

  const bundleLegacyInverse = invert(bundleLegacy);

  const migratedKeys = allowedKeys.reduce(
    (acc: string[], value: string) => {
      const legacyAllowed = bundleLegacyInverse[value];

      if (legacyAllowed) {
        acc = acc.concat(legacyAllowed);
      }

      return acc.concat(value);
    },
    []
  );

  return migratedKeys;
};

export default (courseKey: COURSE) => (roles: string[]) =>
  applyMigration(courseKey, roles);
