export interface modType {
  url: string;
  parsedurl: parsedurlType | null;
  parse: FunctionConstructor;
  protocol: Function;
  subdomain: Function;
  domain: Function;
  port: Function;
  domainext: Function;
  onlypath: Function;
  path: Function;
  done: Function;
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
}
