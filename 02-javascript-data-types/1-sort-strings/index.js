/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let newArray = [...arr];

    newArray.sort((a, b) => a.localeCompare(b, ["ru", "en"], {caseFirst: 'upper'}));

    if (param == 'desc') {
        newArray.reverse();
    }

    return newArray;
}