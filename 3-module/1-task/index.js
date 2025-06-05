function namify(users) {
  let arr = new Array();
  for(let i = 0; i < users.length; i++) {
    arr.push(users[i].name)
  };
  return arr;
}
