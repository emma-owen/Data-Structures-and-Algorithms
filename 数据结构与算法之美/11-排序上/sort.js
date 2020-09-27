/* 冒泡排序
 * 插入排序
 * 选择排序
 */
const bubbleSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return;
  for (let i = 0; i < len; i++) {
    let hasChange = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        hasChange = true;
      }
      if (!hasChange) break;
    }
  }
  console.log(arr);
};

const insertionSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return;
  for (let i = 1; i < len; i++) {
    const temp = arr[i];
    let j = i - 1;
    for (j; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = temp;
  }
  console.log(arr);
};

const selectionSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; jj++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.log(arr);
};

bubbleSort([9, 8, 7, 6, 5, 1, 2, 3, 4]);
