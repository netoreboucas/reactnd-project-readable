/* global fetch, localStorage */

import uuid from 'uuid/v4'
import { normalize, schema } from 'normalizr'

const api = 'http://localhost:3001'

let token = localStorage.token
if (!token) {
  token = localStorage.token = uuid()
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const categorySchema = new schema.Entity('categories', {}, {
  idAttribute: c => c.name
})

const postSchema = new schema.Entity('posts', {
  category: categorySchema
})

const commentSchema = new schema.Entity('comments')

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(({categories}) => normalize(categories, [categorySchema]))

export const getPosts = (category) =>
  fetch(category ? `${api}/${category}/posts` : `${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => normalize(posts, [postSchema]))

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...post,
      id: uuid(),
      timestamp: Date.now()
    })
  }).then(res => res.json())
    .then(post => normalize(post, postSchema))

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(post => normalize(post, postSchema))

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(post => normalize(post, postSchema))

export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())
    .then(post => normalize(post, postSchema))

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
    .then(post => normalize(post, postSchema))

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => normalize(comments, [commentSchema]))

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...comment,
      id: uuid(),
      timestamp: Date.now()
    })
  }).then(res => res.json())
    .then(comment => normalize(comment, commentSchema))

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(comment => normalize(comment, commentSchema))

export const editComment = (id, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: Date.now(), body })
  }).then(res => res.json())
    .then(comment => normalize(comment, commentSchema))

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
    .then(comment => normalize(comment, commentSchema))
