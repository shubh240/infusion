import request from "./axios.service";
import { GET, POST, PUT, PATCH, DELETE, BASE_URL, USER, OPTION, COUNT_PER_PAGE, Property, ADMIN, ADVERTISE, COMMON } from "../app.config";
import { Decryption } from "./common.service";
console.log(BASE_URL);

// <-----------------auth------------------>

export const signupApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/signup`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};


export const login = (body) => {
  return request(`${BASE_URL}/auth/${USER}/signin`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('error :', error);
      throw error;
    });
};

export const logout = () => {
  return request(`${BASE_URL}/auth/${USER}/logout`, POST, true, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const postList = (data) => {
  return request(`${BASE_URL}/social/post-details`, POST, true, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Add property */

export const addPost = (body) => {
  return request(`${BASE_URL}/social/add-post`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Edit property */

export const editPost = (post_id, body) => {
  return request(`${BASE_URL}/social/edit-post/${post_id}`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Delete Fav Proeprty */
export const deleteStarUpApi = (body) => {
  return request(`${BASE_URL}/startup/delete-startup-details`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};


