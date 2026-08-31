export interface ReviewRatingBreakdown {
  stars: number;
  countDisplay: string;
  percentage: number;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  country: string;
  userTenure: string;
  rating: number;
  date: string;
  content: string;
}

export interface ProductReviewsSummaryData {
  totalReviews: number;
  totalReviewsDisplay: string;
  overallRating: number;
  breakdown: ReviewRatingBreakdown[];
}

export const REVIEWS_SUMMARY_DATA: ProductReviewsSummaryData = {
  totalReviews: 42155,
  totalReviewsDisplay: "42,155",
  overallRating: 5,
  breakdown: [
    { stars: 5, countDisplay: "41K", percentage: 97 },
    { stars: 4, countDisplay: "719", percentage: 1.7 },
    { stars: 3, countDisplay: "62", percentage: 0.15 },
    { stars: 2, countDisplay: "35", percentage: 0.08 },
    { stars: 1, countDisplay: "127", percentage: 0.3 },
  ],
};

export const PRODUCT_REVIEWS_LIST: ProductReviewItem[] = [
  {
    id: "rev-1",
    author: "Audixe",
    country: "France",
    userTenure: "Over 1 year using the app",
    rating: 5,
    date: "July 22, 2026",
    content:
      "The user interface could be a bit simpler for store owners, but it's all and all a good app, with a good amount of free content. Also, the helpers are very reactive, wich is a big plus.",
  },
  {
    id: "rev-2",
    author: "Audixe",
    country: "France",
    userTenure: "Over 1 year using the app",
    rating: 5,
    date: "July 22, 2026",
    content:
      "Great App and works as expected, easy to use and setup and gives you piece of mind, I also like that fact that you are able to set up Smart Templating with the option to change colours and add you own logos to ensure everything is on brand. Also spoke directly to the support staff and Hamza was brilliant in directing in me on an issue I had created A+++",
  },
  {
    id: "rev-3",
    author: "Audixe",
    country: "France",
    userTenure: "Over 1 year using the app",
    rating: 5,
    date: "July 22, 2026",
    content:
      "**The app is easy to use and offers many useful features. I had an Etsy review synchronization issue, and Marina was incredibly patient, professional, and helpful throughout the entire process. She carefully investigated the issue, explained every step, and made sure everything was set up correctly. Thank you, Marina, for the excellent support. Highly recommended!",
  },
  {
    id: "rev-4",
    author: "Audixe",
    country: "France",
    userTenure: "Over 1 year using the app",
    rating: 5,
    date: "July 22, 2026",
    content:
      "The user interface could be a bit simpler for store owners, but it's all and all a good app, with a good amount of free content. Also, the helpers are very reactive, wich is a big plus.",
  }
];
