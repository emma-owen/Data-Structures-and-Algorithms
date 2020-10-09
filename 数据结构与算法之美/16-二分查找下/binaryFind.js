// 1、查找第一个相等的数
// 2、查找最后一个相等的数
// 3、查找第一个大于等于给定值的元素
// 4、查找最后一个小于等于给定值的元素

// 1、查找第一个相等的数
const binaryFindFirst = (sortedArr, target) => {
  if (sortedArr.length === 0) return -1;
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (target < sortedArr[mid]) {
      high = mid - 1;
    } else if (target > sortedArr[mid]) {
      low = mid + 1;
    } else {
      if (mid === 0 || sortedArr[mid - 1] < target) return mid;
      high = mid - 1;
    }
  }
  return -1;
};

// 2、查找最后一个相等的数
const binaryFindLast = (sortedArr, target) => {
  if (sortedArr.length === 0) return -1;
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (target < sortedArr[mid]) {
      high = mid - 1;
    } else if (target > sortedArr[mid]) {
      low = mid + 1;
    } else {
      if (mid === sortedArr.length - 1 || sortedArr[mid + 1] > target)
        return mid;
      low = mid + 1;
    }
  }
  return -1;
};

// 3、查找第一个大于等于给定值的元素
const binaryFindFirstBig = (sortedArr, target) => {
  if (sortedArr.length === 0) return -1;
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] >= target) {
      if (mid === 0 || sortedArr[mid - 1] < target) return mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

// 查找最后一个小于等于给定值的元素
const binaryFindLastSmall = (sortedArr, target) => {
  if (sortedArr.length === 0) return -1;
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] > target) {
      high = mid - 1;
    } else {
      if (mid === sortedArr.length - 1 || sortedArr[mid + 1] > target)
        return mid;
      low = mid + 1;
    }
  }
  return -1;
};

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];
// const first = binaryFindFirst(arr, 4);
// console.log(`FindFirst: ${first}`);

// const last = binaryFindLast(arr, 4);
// console.log(`FindLast: ${last}`);
const FirstBig = binaryFindFirstBig(arr, 5);
console.log(`FindFirstBig: ${FirstBig}`);
const LastSmall = binaryFindLastSmall(arr, 5);
console.log(`FindLastSmall: ${LastSmall}`);
