// export function createUser(userData) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:5001/users",
//       {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function checkUser(loginInfo) {
//   const email = loginInfo.email;
//   const password = loginInfo.password;


//   return new Promise(async (resolve, reject) => {
//     const response = await fetch("http://localhost:5001/users?email="+email );
//     const data = await response.json();
//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] });
//       } else {
//         reject({ message: "wrong credentials" });
//       }
//     } else {
//       reject({ message: "user not found" });
//     }
//   });
// }



export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5001/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5001/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:5001/users?email=" + email);
    const data = await response.json();

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}
