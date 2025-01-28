const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await api 
      .post('/api/users')
      .send({ username: 'root', name: 'Superuser', password: 'password' })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier is named id', async () => {
  const response = await api
    .get('/api/blogs')
  assert(response.body.every(blog => blog.id !== null))
})

test('a valid blog can be added', async () => {

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  const token = loginResponse.body.token

  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const titles = blogsAtEnd.map(blog => blog.title)

  assert.strictEqual(blogsAtEnd.length, 1)
  assert(titles.includes(newBlog.title))
})

test('a blog without likes defaults to 0', async () => {

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  const token = loginResponse.body.token

  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const likes = blogsAtEnd.map(blog => blog.likes)  
  assert.strictEqual(likes[0], 0)
})

test('blog without title is not added', async () => {

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  const token = loginResponse.body.token

  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('delete a blog', async () => {
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  const token = loginResponse.body.token

  const blogToDelete = {
    title: "Blog to delete",
    author: "Author",
    url: "http://example.com",
    likes: 0,
  }

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToDelete)
    .expect(201)

  await api
    .delete(`/api/blogs/${createdBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, 0)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(!titles.includes(blogToDelete.title))
})

test('update a blog', async () => {
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  const token = loginResponse.body.token

  const blogToDelete = {
    title: "Blog to delete",
    author: "Author",
    url: "http://example.com",
    likes: 0,
  }

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToDelete)
    .expect(201)

  const blogToUpdate = createdBlog.body
  blogToUpdate.likes = blogToUpdate.likes + 1
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd[0].likes, blogToUpdate.likes)
})

after(async () => {
  await mongoose.connection.close()
})