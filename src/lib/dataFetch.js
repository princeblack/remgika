const url = 'http://localhost:8000';

export const checkCredentials = async data => {
  try {
    const res = await (
      await fetch(`${url}/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    ).json();
    return res;    
  } catch (error) {
    return [];
  }
};
export const signUpUsers = async data => {
  try {
    const res = await (
      await fetch(`${url}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    ).json();
    return res;    
  } catch (error) {
    return [];
  }
};


export const authoriseUser = async data => {
  try {
    const res = await (
      await fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const handleLogOut = async data => {
  try {
    const res = await (
      await fetch(`${url}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};

/**********************************************************
************************ PLAYGROUND ***********************
***********************************************************/
export const getPlayground = async data => {
  try {
    const res = await (
      await fetch(`${url}/playground`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const addPlayground = async data => {
  try {
        debugger;
    const res = await (
      await fetch(`${url}/playground`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    ).json();
    return res;    
  } catch (error) {
    return [error];
  }
};
export const getMyPlayground = async data => {
  try {
    const res = await (
      await fetch(`${url}/playground/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};