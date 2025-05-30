function sumSalary(salaries) {
  let sum = 0;
  for (let property in salaries) {
    const value = salaries[property]
    if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
      sum += salaries[property];
    }
}
return sum;
};
