export const generateUserErrorInfo = (user) => {
  return `One or more properties were incompleted or not valid.
    List of required properties:
    * firstName : needs to be a String, received ${user.firstName}
    * lastName : needs to be a String, received ${user.lastName}
    * email : needs to be a String, received ${user.email}`;
};

export const generateParamErrorInfo = (param) => {
  const test1 = param ? "passed" : "invalid";
  const test2 = param.match(/\D/) ? "invalid" : "passed";
  const test3 = param.match(/\W/) ? "invalid" : "passed";
  return `The uid is not valid.
  List of required properties:
    - Test1: can not be null or undefined -> ${test1}
    - Test2: can not contain characters -> ${test2}
    - Test3: can not contain negative numbers ${test3}
  `;
};
