/**
 * Verify array is sorted by a date-time field
 * @param {Array} arr - Array of objects
 * @param {string} field - Date field name (e.g. "createdDate")
 * @param {"asc" | "desc"} order - Sort order
 */
function verifySortedByDateTime(arr, field, order = "asc") {
  if (!Array.isArray(arr)) {
    throw new Error("Expected an array for sorting verification");
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const current = new Date(arr[i][field]).getTime();
    const next = new Date(arr[i + 1][field]).getTime();

    if (isNaN(current) || isNaN(next)) {
      throw new Error(`Invalid date value found in field: ${field}`);
    }

    if (order === "asc" && current > next) {
      throw new Error(
        `Sorting failed (ASC) at index ${i}: ${arr[i][field]} > ${arr[i + 1][field]}`
      );
    }

    if (order === "desc" && current < next) {
      throw new Error(
        `Sorting failed (DESC) at index ${i}: ${arr[i][field]} < ${arr[i + 1][field]}`
      );
    }
  }

  return true;
}

module.exports = { verifySortedByDateTime };
