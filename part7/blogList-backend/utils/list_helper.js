const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (fav,blog) => {
        return blog.likes > fav.likes ? blog : fav 
    }

    const favBlog = blogs.reduce(reducer,blogs[0])

    if(!favBlog) return null

    const result = { 
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes 
    }
    
    return result
}

const mostBlogs = (blogs) => {
    const authorBlogCounts = {};

    blogs.forEach(blog => {
        if (authorBlogCounts[blog.author]) {
            authorBlogCounts[blog.author]++
        } else {
            authorBlogCounts[blog.author] = 1
        }
    })

    let maxBlogs = 0
    let mostProlificAuthor = null

    for (const [author, blogsCount] of Object.entries(authorBlogCounts)) {
        if (blogsCount > maxBlogs) {
            maxBlogs = blogsCount
            mostProlificAuthor = { author, blogs: blogsCount }
        }
    }

    return mostProlificAuthor
}

const mostLikes = (blogs) => {
    const authorBlogCounts = {};
  
    blogs.forEach(blog => {
      if (authorBlogCounts[blog.author]) {
        authorBlogCounts[blog.author] += blog.likes
      } else {
        authorBlogCounts[blog.author] = blog.likes
      }
    })
  
    let maxLikes = 0
    let mostProlificAuthor = null
  
    for (const [author, likesCount] of Object.entries(authorBlogCounts)) {
      if (likesCount > maxLikes) {
        maxLikes = likesCount
        mostProlificAuthor = { author, likes: likesCount }
      }
    }
  
    return mostProlificAuthor
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes,
    mostBlogs,
    mostLikes
}