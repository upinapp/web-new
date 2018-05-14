/**
 * @param {Map} map that should be transformed to Object
 */
export const mapToObject = (map) => JSON.parse(JSON.stringify(map));
