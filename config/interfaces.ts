export interface modType {
  readonly url: string;
  readonly parsedurl: parsedurlType | null;
  readonly parse: FunctionConstructor;
  readonly protocol: Function;
  readonly subdomain: Function;
  readonly domain: Function;
  readonly port: Function;
  readonly domainext: Function;
  readonly onlypath: Function;
  readonly path: Function;
  readonly query: Function;
  readonly fragment: Function;
  readonly done: Function;
}

export interface parsedurlType {
  protocol: string | null;
  subdomain: string | null;
  domain: string | null;
  domainext: string | null;
  port: string | null;
  path: string | null;
  query: string | null;
  onlypath: string | null;
  fragment: string | null;
}
