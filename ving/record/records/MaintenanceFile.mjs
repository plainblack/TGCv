import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import {eq} from '#ving/drizzle/orm.mjs';

/** Management of individual MaintenanceFiles.
 * @class
 */
export class MaintenanceFileRecord extends VingRecord {
    // add custom Record code here
    
  /**
   * Extends `describe()` in `VingRecord` to add `meta` property `bar`
   *  and the `extra` property `foo`.
   * 
   * Note, these don't do anything, this is just here to explain how to extend
   * the describe method.
   * 
   * @see VingRecord.describe()
   */
  async describe(params = {}) {
      const out = await super.describe(params);
      if (params?.include?.meta && out.meta) {
          out.meta.bar = 'bar';
      }
      if (params?.include?.extra.includes('foo')) {
          if (out.extra === undefined) {
              out.extra = {};
          }
          out.extra.foo = 'foo';
      }
      return out;
  }
  
    
}

/** Management of all MaintenanceFiles.
 * @class
 */
export class MaintenanceFileKind extends VingKind  {
    // add custom Kind code here
    
    /**
     * An example of a shortcut for a common query you might want to make.
     * 
     * @returns a list of `MaintenanceFileRecord`s that are cool
     */
    async findCool() {
        return this.select.findMany(eq(this.table.isCool, true));
    }
    
}