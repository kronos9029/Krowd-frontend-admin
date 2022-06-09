import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description, header2 } from './text';
import { hook, sentence1, sentence2 } from './content';
import { hook1, data0, data1, data2 } from './contentDB';
import { price, rating, age, percent } from './number';

// ----------------------------------------------------------------------

const mockData = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index: number) => email[index],
  phoneNumber: (index: number) => phoneNumber[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[index],
  role: (index: number) => role[index],
  company: (index: number) => company[index],
  address: {
    fullAddress: (index: number) => fullAddress[index],
    country: (index: number) => country[index]
  },
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index]
  },
  text: {
    title: (index: number) => title[index],
    sentence: (index: number) => sentence[index],
    description: (index: number) => description[index],
    header2: (index: number) => header2[index]
  },
  content: {
    hook: (index: number) => hook[index],
    sentence1: (index: number) => sentence1[index],
    sentence2: (index: number) => sentence2[index]
  },
  contentDB: {
    hook1: (index: number) => hook[index],
    data0: (index: number) => data0[index],
    data1: (index: number) => data1[index],
    data2: (index: number) => data2[index]
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index]
  },
  image: {
    cover: (index: number) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    feed: (index: number) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index: number) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    avatar: (index: number) => `/static/mock-images/avatars/avatar_1.jpg`
  }
};

export default mockData;
