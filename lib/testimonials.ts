export type Testimonial = {
  quote: string;
  name: string;
  projectType: string;
  country: string;
  source: "FIVERR" | "DIRECT";
  rating?: number;
};

// PASTE REAL CLIENT REVIEWS ONLY. Do not invent quotes.
//
// Example shape (keep commented until you have a genuine review to paste):
// {
//   quote: "…",
//   name: "Sarah",
//   projectType: "Roofing Website",
//   country: "USA",
//   source: "FIVERR",
//   rating: 5,
// }
//
// While this array is empty the Testimonials section renders nothing — it
// simply does not exist until real reviews are added. This is intentional.
export const testimonials: Testimonial[] = [];
