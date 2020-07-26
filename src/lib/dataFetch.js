// const url = "https://node-server.remgika.com";
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
export const getAllUsers = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/`, {
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
      await fetch(`${url}/images/profileImage`, {
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

export const getwriterImage = async (data) => {
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/images/writer/${id}`, {
        method: "GET",
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

export const authoriseUser = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/auth`, {
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
      await fetch(`${url}/playground/userPlay`, {
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
      await fetch(`${url}/events/userEvent`, {
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
/**********************************************************
 ************************ comment **************************
 ***********************************************************/

export const addComment = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/comment`, {
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
    return [error];
  }
};

export const getcomment = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/comment/`, {
        method: "GET",
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

export const getWriterInfo = async (data) => {
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/users/${id}`, {
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

export const deleteComment = async (data) => {
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/comment/${id}`, {
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
 ************************ Group **************************
 ***********************************************************/
export const addGroup = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/group`, {
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

export const publicGroup = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/group/public`, {
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

export const groupUrlPage = async (data) => {
  try {
    const id = await data;
    const res = await (
      await fetch(`${url}/group/${id}`, {
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

export const groupNews = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/news`, {
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
export const getGroupNews = async (data) => {
  try {
    const id = await data;
    const res = await (
      await fetch(`${url}/news/${id}`, {
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

export const getGroupMembers = async (data) => {
  try {
    const id = await data;
    const res = await (
      await fetch(`${url}/group/members/${id}`, {
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

export const addGroupEvents = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/groupEvent`, {
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

export const getGroupEvent = async (data) => {
  try {
    const id = await data;
    const res = await (
      await fetch(`${url}/groupEvent/${id}`, {
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

export const updateGroupEvents = async (data, id) => {
  try {
    const res = await (
      await fetch(`${url}/groupEvent/${id}`, {
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

export const deleteGroupEvents = async (data) => {
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/groupEvent/${id}`, {
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

export const groupChats = async (data,page) => {
  try {
    debugger
    const id = await data;
    const res = await (
      await fetch(`${url}/groupChats/${id}?skip=${page}`, {
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