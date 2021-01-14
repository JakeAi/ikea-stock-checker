export interface ExtraData {
  id: string;
  globalId: string;
  name: string;
  typeName: string;
  validDesignText: string;
  mainImage: MainImage;
  pipUrl: string;
  price: string;
  priceNumeral: number;
  priceExclTax: string;
  priceExclTaxNumeral: number;
  currencyCode: string;
  revampPrice: RevampPrice;
  catalogRefs: CatalogRefs;
}
export interface MainImage {
  alt: string;
  id: string;
  imageFileName: string;
  url: string;
  type: string;
}
export interface RevampPrice {
  numDecimals: number;
  separator: string;
  integer: string;
  decimals: string;
  currencySymbol: string;
  currencyPrefix: string;
  currencySuffix: string;
  hasTrailingCurrency: boolean;
  currencySuffixZeroDecimals: boolean;
}
export interface CatalogRefs {
  products: Products;
  genericproducts: Genericproducts;
}
export interface Products {
  id: string;
  name: string;
  url: string;
  elements?: (ElementsEntity)[] | null;
}
export interface ElementsEntity {
  id: string;
  name: string;
  url: string;
}
export interface Genericproducts {
  name: string;
  id: string;
  elements?: (ElementsEntity1)[] | null;
  url: string;
}
export interface ElementsEntity1 {
  name: string;
  id: string;
  type: string;
  url: string;
}
