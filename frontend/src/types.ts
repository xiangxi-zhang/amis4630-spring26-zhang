/**
 * Matches the JSON shape returned by the .NET API.
 *
 * ASP.NET Core serializes C# property names to camelCase by default,
 * so "SellerName" in C# becomes "sellerName" here in TypeScript.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerName: string;
  postedDate: string; // arrives as an ISO string from the API
  imageUrl: string;
}