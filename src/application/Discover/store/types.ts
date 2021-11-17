interface bannerItem {
  imageUrl: string;
}
export interface IDiscoverState {
  bannerList: bannerItem[];
  recommendList: any[];
}

export interface IBannerRes {
  banners: any[];
}

export interface IRecommendListRes {
  result: any[];
}
