import { fetchComment } from "../actions";

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
export const getOneUser = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/${data}`, {
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
    const info = data
    const res = await (
      await fetch(`${url}/users`, {
        method: "POST",
        body: info,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const addProfileImage = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/userImage`, {
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

export const password = async (data) => {
  try {
    const email = data
    const res = await (
      await fetch(`${url}/users/forgotPassword`, {
        method: "POST",
        body: JSON.stringify(email),
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

export const validateResetToken = async (data) => {
  try {
    const info = data
    const res = await (
      await fetch(`${url}/users/validateResetToken`, {
        method: "POST",
        body: JSON.stringify(info),
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

export const resetPassword = async (data) => {
  try {
    const info = data
    const res = await (
      await fetch(`${url}/users/resetPassword`, {
        method: "POST",
        body: JSON.stringify(info),
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
 ************************ Friend ***********************
 ***********************************************************/

export const friendReq = async (data) =>{
  const id= data
  try {
    const res = await(
      await fetch(`${url}/users/friend/${id}`,{
        method: "PUT",
        credentials: "include"
      })
    ).json()
    return res;
  } catch (error) {
    return [error]
  }
}
export const friendReqAccepte = async (data) =>{
  const id= data
  try {
    
    const res = await(
      await fetch(`${url}/users/accepteFriend/${id}`,{
        method: "PUT",
        credentials: "include"
      })
    ).json()
    return res;
  } catch (error) {
    return [error]
  }
}

export const friendReqRefuse = async (data) =>{
  const id= data
  try {
    
    const res = await(
      await fetch(`${url}/users/refuseFriend/${id}`,{
        method: "PUT",
        credentials: "include"
      })
    ).json()
    return res;
  } catch (error) {
    return [error]
  }
}
export const removeOneFriend = async (data) =>{
  const id= data
  try {
    
    const res = await(
      await fetch(`${url}/users/removeFriend/${id}`,{
        method: "PUT",
        credentials: "include"
      })
    ).json()
    return res;
  } catch (error) {
    return [error]
  }
}
/**********************************************************
 ************************ PLAYGROUND ***********************
 ***********************************************************/
export const getPlayground = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/playground?city=${data}`, {
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
export const getPlaygroundPagination = async (skip,location) => {
  try {
    const res = await (
      await fetch(`${url}/playground?skip=${skip}&city=${location}`, {
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
export const getOnePlayground = async (data) => {
  const id = data
  try {
    const res = await (
      await fetch(`${url}/playground/${id}`, {
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

export const likeOnePlayground = async (data) => {
  const id = data
  try {
    const res = await (
      await fetch(`${url}/playground/like/${id}`, {
        method: "PUT",
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const unLikeOnePlayground = async (data) => {
  const id = data
  try {
    const res = await (
      await fetch(`${url}/playground/unlike/${id}`, {
        method: "PUT",
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

export const getOneEvent = async (data) => {
  const id = data
  try {
    const res = await (
      await fetch(`${url}/events/${id}`, {
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
export const eventParticipation = async (data) => {
  const id = data
  try {
    const res = await (
      await fetch(`${url}/events/participation/${id}`, {
        method: "PUT",
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
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/comment/${id}`, {
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
export const deleteGroupNews= async (data) => {
  const id = data;
  try {
    const res = await (
      await fetch(`${url}/news/${id}`, {
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


export const groupChats = async (data,skip,limit) => {
  try {
    const id = await data;
    const res = await (
      await fetch(`${url}/groupChats/${id}?skip=${skip}&limit=${limit}`, {
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

export const addNewAdmin = async (id, user) => {
  try {
    const res = await (
      await fetch(`${url}/group/addNewAdmin/${id}?user=${user}`, {
        method: "PUT",
        body: user,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const removeAdmin = async (id, user) => {
  try {
    const res = await (
      await fetch(`${url}/group/removeAdmin/${id}?user=${user}`, {
        method: "PUT",
        body: user,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};
export const removeMembers = async (id, user) => {
  try {
    const res = await (
      await fetch(`${url}/group/removeMember/${id}?user=${user}`, {
        method: "PUT",
        body: user,
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const joinGroupRequest = async (id) => {
  try {
    const res = await (
      await fetch(`${url}/group/joinGroupRequest/${id}`, {
        method: "PUT",
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};
export const joinAccpet = async (id,user,admin) => {
  try {
    const res = await (
      await fetch(`${url}/group/join/${id}?user=${user}&admin=${admin}`, {
        method: "PUT",
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};
export const joinRefused = async (id,user,admin) => {
  try {
    const res = await (
      await fetch(`${url}/group/joinRefused/${id}?user=${user}&admin=${admin}`, {
        method: "PUT",
        credentials: "include",
      })
    ).json();
    return res;
  } catch (error) {
    return [error];
  }
};

export const updateGroupInfo = async (data,id) => {
  try {
    const res = await (
      await fetch(`${url}/group/${id}`, {
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

export const updateGroupPicture = async (data,id) => {
  try {
    const res = await (
      await fetch(`${url}/group/picture/${id}`, {
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
 ************************ articles **************************
 ***********************************************************/

 export const addNewArticle = async (data) =>{
   try {
     const res = await(
       await fetch(`${url}/articles`,{
         method: "POST",
         body: data,
         credentials: "include"
       })
     ).json()
     return res;
   } catch (error) {
     return [error]
   }
 }
 export const updateArticles = async (newdata,articleId) => {
   const data = newdata;
   const id = articleId;
  try {
    const res = await (
      await fetch(`${url}/articles/${id}`, {
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
export const SaveArticles = async (articleId) => {
  const id = articleId;
 try {
   const res = await (
     await fetch(`${url}/articles/save/${id}`, {
       method: "PUT",
       credentials: "include",
     })
   ).json();
   return res;
 } catch (error) {
   return [error];
 }
};
 export const getOneArticles = async (data) =>{
   try {
     const res = await(
       await fetch(`${url}/articles/${data}`,{
         method: "GET",
         headers: {
          "Content-Type": "application/json",
        },
         credentials: "include"
       })
     ).json()
     return res;
   } catch (error) {
     return[error]
   }
 }

 export const getArticlesCityOrTitle = async (reqCity,reqTitle,reqOption, reqDistance,currentPage) =>{
  const city = reqCity;
  const title = reqTitle;
  const option = reqOption;
  const distance = reqDistance
  const skip = currentPage
  try {
    const res = await(
      await fetch(`${url}/articles/city?city=${city}&title=${title}&option=${option}&distance=${distance}&skip=${skip}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res;
  } catch (error) {
    return[error]
  }
}
export const getArticleTitle = async (reqTitle) =>{
  
  const title = reqTitle;
  try {
    const res = await(
      await fetch(`${url}/articles/title?title=${title}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res;
  } catch (error) {
    return[error]
  }
}

export const getUserArticles = async (id)=>{
  const userid = id;
  try {
    const res = await(
      await fetch(`${url}/articles/user/${userid}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res
  } catch (error) {
    return [error]
  }
}

export const deleteArticles = async (articleId) => {
  const id = articleId;
 try {
   const res = await (
     await fetch(`${url}/articles/${id}`, {
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
 ************************ MESSAGER **************************
 ***********************************************************/
export const getMyMessage = async (id,id2)=>{
  const room = id;
  const room2 = id2
  try {
    const res = await(
      await fetch(`${url}/message/${room}?id=${room2}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res
  } catch (error) {
    return [error]
  }
}

export const getChatMembers = async (id)=>{
  try {
    const res = await(
      await fetch(`${url}/message/getChatMembers`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res
  } catch (error) {
    return [error]
  }
}



export const readMyMsg = async (articleId) => {
  const id = articleId;
 try {
   const res = await (
     await fetch(`${url}/message/${id}`, {
       method: "PUT",
       credentials: "include",
     })
   ).json();
   return res;
 } catch (error) {
   return [error];
 }
};

export const countUnread = async (id)=>{
  const user = id;
  try {
    const res = await(
      await fetch(`${url}/message/count/${user}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json()
    return res
  } catch (error) {
    return [error]
  }
}