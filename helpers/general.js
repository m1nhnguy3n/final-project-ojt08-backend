function findDifferences (arr1, arr2) {
    // Use filter to find objects in arr1 that are not present in arr2
    const differences = arr1.filter((obj1) => {
        // Check if any object in arr2 has the same ID as obj1
        return !arr2.some((obj2) => obj1.id === obj2.id);
    });

    return differences;
};

module.exports = { findDifferences };
