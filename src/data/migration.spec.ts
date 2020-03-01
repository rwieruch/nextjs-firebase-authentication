import { THE_ROAD_TO_LEARN_REACT } from './course-keys';
import { THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS as BUNDLE_KEYS } from './bundle-keys';

import migrate from './migration';

describe('migration', () => {
  it('migrates the keys', () => {
    const allowed = migrate(THE_ROAD_TO_LEARN_REACT);

    const migratedKeys = allowed([
      BUNDLE_KEYS.STUDENT,
      BUNDLE_KEYS.INTERMEDIATE,
      BUNDLE_KEYS.PROFESSIONAL,
    ]);

    expect(migratedKeys.length).toBe(4);
    expect(migratedKeys).toContain(BUNDLE_KEYS.STUDENT);
    expect(migratedKeys).toContain(BUNDLE_KEYS.INTERMEDIATE);
    expect(migratedKeys).toContain(BUNDLE_KEYS.PROFESSIONAL);
    expect(migratedKeys).toContain('COMPLETE_COURSE');
  });
});
