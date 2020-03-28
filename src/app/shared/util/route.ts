export const Route = {
  PRODUCT: {
    PRODUCTS: '/products',
    GET_ALL: '/get-last-added-products',
    GET_ALL_PRODUCTS: '/search/by-options',
    GET_DETAIL: '/fruits-and-vegetables-sub-groups/get-detail',
    GET_USER_PRODUCTS: '/producers/get-products-of-user',
    PRODUCT_ADD: '/products/add-product',
    PRODUCT_UPDATE: '/products/update-product',
  },
  CATEGORY: {
    CATEGORIES: '/product-categories',
    GET_ALL: '/get-all'
  },
  FRUIT_VEGETABLE: {
    FRUITANDVEGETABLES: '/fruits-and-vegetables',
    GET_ALL: '/get-all',
    HARVEST_PERIOD: '/get-harvest-period'
  },
  CITY: {
    CITIES: '/cities',
  },
  PRODUCER_TYPE: {
    PRODUCER: '/producer-types',
    GET_ALL: '/get-all-sub-type'
  },
  PRODUCTION_TYPE: {
    PRODUCTION: '/production-types',
    GET_ALL: '/get-all'
  },
  FILTER: {
    ACTION_SEARCH: '/search/by-options?action=search'
  },
  ADMIN: {
    GET_ALL: 'admin/getAllUser',
    PROFILE: '/admin/profile'
  },
  USER: {
    GET_USER: '/user',
    PROFILE: '/profile',
    USER_INFO: '/profile/get-profile-info',
    UPDATE_USER_INFO: '/profile/update-profile-info',
    PRODUCTS: '/producers/get-products-of-user'
  },
  PUBLIC: {
    GET: '/getPublic',
    LOGIN: '/login',
  },
  PATH: {
    PRODUCTION_TYPE: 'assets/images/farm_logo/'
  },
  PROFILE: {
    PROFILE: 'profile',
    PRODUCTS: 'profile/products'
  }
};

