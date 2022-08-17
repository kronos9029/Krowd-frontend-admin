import { random } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { paramCase } from 'change-case';
// utils
import mock from './mock';
// utils
import mockData from '../../utils/mock-data';
// @types
import { Post } from '../../@types/blog';

// ----------------------------------------------------------------------

// Made with React Quill
const POST_BODY = `
<p>
<img src='https://res.cloudinary.com/trinhmai/image/upload/c_scale,w_1440/v1611411340/upload_minimal/covers/cover_6.jpg'/>
</p>


<br/>
<br/>

<p>
It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.
</p>

<br/>
<br/>

<p>
<img src='https://res.cloudinary.com/trinhmai/image/upload/c_scale,w_1440/v1611411339/upload_minimal/covers/cover_4.jpg'/>
</p>

`;

export const users = [...Array(12)].map((_, index) => {
  return {
    id: mockData.id(index),
    name: mockData.name.fullName(index),
    avatarUrl: mockData.image.avatar(index)
  };
});

const POST_COMMENTS = [
  {
    id: uuidv4(),
    name: users[4].name,
    avatarUrl: users[4].avatarUrl,
    message: mockData.text.sentence(5),
    postedAt: mockData.time(5),
    users: [users[5], users[6], users[7]],
    replyComment: [
      {
        id: uuidv4(),
        userId: users[5].id,
        message: mockData.text.sentence(6),
        postedAt: mockData.time(6)
      }
    ]
  }
];

export const posts = [...Array(23)].map((_, index) => {
  return {
    id: mockData.id(index),
    cover: mockData.image.cover(index),
    title: mockData.text.title(index),
    description: mockData.text.sentence(index),
    createdAt: mockData.time(index),
    view: random(9999),
    comment: random(9999),
    share: random(9999),
    favorite: random(9999),
    author: {
      name: mockData.name.fullName(index),
      avatarUrl: mockData.image.avatar(index)
    },
    tags: ['Lamp', 'A man', 'Human', 'Lantern', 'Festival'],
    body: POST_BODY,
    favoritePerson: [...Array(40)].map((_, index) => {
      return {
        name: mockData.name.fullName(index),
        avatarUrl: mockData.image.avatar(index)
      };
    }),
    comments: POST_COMMENTS
  };
});

// ----------------------------------------------------------------------

mock.onGet('/api/blog/posts/all').reply(200, { posts });

// ----------------------------------------------------------------------

mock.onGet('/api/blog/posts').reply((config) => {
  try {
    const { index, step } = config.params;
    const maxLength = posts.length;
    const loadMore = index + step;

    const sortPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });

    const results = sortPosts.slice(0, loadMore);

    return [200, { results, maxLength }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/blog/post').reply((config) => {
  try {
    const { title } = config.params;
    const post = posts.find((_post) => paramCase(_post.title) === title);

    if (!post) {
      return [404, { message: 'Post not found' }];
    }

    return [200, { post }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/blog/posts/recent').reply((config) => {
  try {
    const { title } = config.params;

    const recentPosts = posts
      .filter((_post) => paramCase(_post.title) !== title)
      .slice(posts.length - 5, posts.length);

    if (!recentPosts) {
      return [404, { message: 'Post not found' }];
    }

    return [200, { recentPosts }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/blog/posts/search').reply((config) => {
  try {
    const { query } = config.params;
    const cleanQuery = query.toLowerCase().trim();
    const results: Post[] = [];

    posts.forEach((post) => {
      if (!query) {
        return results.push(post);
      }

      if (post.title.toLowerCase().includes(cleanQuery)) {
        return results.push(post);
      }
    });

    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
