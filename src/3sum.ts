function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];

  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    // avoid duplicates, thanks to sorting!
    if (i !== 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let low = i + 1;
    let high = nums.length - 1;

    // increment low if sum < 0
    // decrement high if sum > 0
    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high];
      if (sum === 0) {
        // avoid duplicates here too!
        result.push([nums[i], nums[low], nums[high]]);
        while (low < high && nums[low] === nums[low + 1]) low++;
        while (low < high && nums[high] === nums[high - 1]) high--;
      } else if (sum < 0) {
        low++;
      } else {
        high++;
      }
    }
  }
  return result;
}

type Pair = {
  index1: number;
  value1: number;
  index2: number;
  value2: number;
};

function threeSumInefficient(nums: number[]): number[][] {
  let stringResult: string[] = [];
  const sums = getSums(nums);
  for (let i: number = 0; i < nums.length; i++) {
    const num: number = nums[i];

    const pairs: Pair[] = sums.get(num * -1);
    if (pairs) {
      pairs.forEach(({ index1, value1, index2, value2 }) => {
        // check for duplicates
        if (i !== index1 && i !== index2) {
          stringResult.push(JSON.stringify([value1, value2, num].sort()));
        }
      });
    }
  }
  stringResult = [...new Set(stringResult)];

  return stringResult.map((res) => {
    return JSON.parse(res);
  });
}

function getSums(nums: number[]) {
  const sums = new Map();
  for (let i: number = 0; i < nums.length - 1; i++) {
    for (let j: number = i + 1; j < nums.length; j++) {
      let a: number = nums[i];
      let b: number = nums[j];
      if (sums.has(a + b)) {
        sums.get(a + b).push({ index1: i, value1: a, index2: j, value2: b });
      } else {
        sums.set(a + b, [{ index1: i, value1: a, index2: j, value2: b }]);
      }
    }
  }
  return sums;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
