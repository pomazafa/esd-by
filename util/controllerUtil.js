exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.asyncForEachMap = async (map, callback) => {
  for (let [k, v] of map) {
    await callback(v, k, map);
  }
};

exports.asyncForEachObject = async (object, callback) => {
  for (let [k, v] of Object.entries(object)) {
    await callback(v, k, object);
  }
};
