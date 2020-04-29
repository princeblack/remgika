const url = "http://localhost:8000";

export const checkCredentials = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};
export const signUpUsers = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};

export const addProfileImage = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/images`, {
        method: "POST",
        body: data,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const getProfileImage = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/images/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const authoriseUser = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const handleLogOut = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};

export const deleteProfileImage = async (data) => {
  const id = data;
    try {
      const res = await (
        await fetch(`${url}/images/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
export const getPlayground = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/playground`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const addPlayground = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/playground`, {
        method: "POST",
        body: data,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const getMyPlayground = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/playground/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};

export const deletePlayground = async (data) => {
  const id = data;
    try {
      const res = await (
        await fetch(`${url}/playground/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      return res;
    } catch (error) {
      return [];
    }
  
};

export const updatePlayground = async (data, id) => {
  try {
    const res = await (
      await fetch(`${url}/playground/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

/**********************************************************
 ************************ events **************************
 ***********************************************************/
export const addEvents = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/events`, {
        method: "POST",
        body: data,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};
export const getEventsList = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};

export const getMyEvents = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/events/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [];
  }
};
export const updateEvents = async (data, id) => {
  try {
    const res = await (
      await fetch(`${url}/events/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const deleteEvents = async (data) => {
  const id = data;
    try {
      const res = await (
        await fetch(`${url}/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      return res;
    } catch (error) {
      return [error];
    }
  
};
