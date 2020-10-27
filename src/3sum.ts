type Pair = {
    index1: number;
    value1: number;
    index2: number;
    value2: number;
  };
  
  function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    const sums = getSums(nums);
    const uniqueNums: number[] = [...new Set(nums)];
    for (let i: number = 0; i < uniqueNums.length; i++) {
      const num: number = uniqueNums[i];
  
      const pairs: Pair[] = sums.get(num * -1);
      if (pairs) {
        pairs.forEach(({ index1, value1, index2, value2 }) => {
          // check for duplicates
          if (i !== index1 && i !== index2) {
              result.push([value1, value2, num]);
          }
        });
      }
    }
    return result;
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
          sums.set(a + b, [
              { index1: i, value1: a, index2: j, value2: b },
          ]);
        }
      }
    }
    return sums;
  }
  
  console.log(threeSum([-1,0,1,2,-1,-4]));