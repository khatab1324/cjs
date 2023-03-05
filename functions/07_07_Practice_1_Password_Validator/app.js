// Write a isValidPassword function
// It accepts 2 arguments: password and username
// Password must:
//	- be at least 8 characters
//  - cannot contain spaces
//  - cannot contain the username
// If all requirements are met, return true.
//Otherwise: false

// isValidPassword('89Fjj1nms', 'dogLuvr');  //true
// isValidPassword('dogLuvr123!', 'dogLuvr') //false
// isValidPassword('hello1', 'dogLuvr') //false

console.log("log in page pls inter your username and password");
console.log("enter isValidPassword(username,password)");

let verify = true;

function isValidPassword(username, password) {
  if (password.length < 8) {
    console.log("your possword should be more than 8 characters");
    verify = false;
  }
  if (password.includes(" ")) {
    console.log("we are so sorry we donot exapt spaces in password");
    verify = false;
  }
  if (password.includes(username)) {
    console.log(
      `be creative . the password shoulde not inculdes anything in username`
    );
    verify = false;
  }
  if (verify === true) {
    return console.log(
      `your username : ${username} . and your password is : ${password}`
    );
  }
}
