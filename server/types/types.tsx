export interface CoinDataProps {
  id: string | null;
  symbol: string | null;
  name: string | null;
  image: string | null;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: { times: number; currency: string; percentage: number } | null;
  last_updated: string | null;
  sparkline_in_7d: { price: number[] } | null;
}

export interface ExchangeDataProps {
  id: string | null;
  name: string | null;
  year_established: number | null;
  country: string | null;
  description: string | null;
  url: string | null;
  image: string | null;
  has_trading_incentive: boolean | null;
  trust_score: number | null;
  trust_score_rank: number | null;
  trade_volume_24h_btc: number | null;
  trade_volume_24h_btc_normalized: number | null;
}

export interface TrendingDataProps {
  coins: {
    item: {
      id: string | null;
      coin_id: number | null;
      name: string | null;
      symbol: string | null;
      market_cap_rank: number | null;
      thumb: string | null;
      small: string | null;
      large: string | null;
      slug: string | null;
      price_btc: number | null;
      score: number | null;
    };
  }[];
  nfts: {
    id: string | null;
    name: string | null;
    symbol: string | null;
    thumb: string | null;
    nft_contract_id: number | null;
    native_currency_symbol: string | null;
    floor_price_in_native_currency: number | null;
    floor_price_24h_percentage_change: number | null;
  }[];
  exchanges: [];
}

export interface NewsDataProps {
  status: string | null;
  totalResults: number | null;
  articles: {
    source: {
      id: string | null;
      name: string | null;
    } | null;
    author: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    urlToImage: string | null;
    publishedAt: string | null;
    content: string | null;
  }[];
}

export interface GlobalDataProps {
  data: {
    active_cryptocurrencies: number | null;
    upcoming_icos: number | null;
    ongoing_icos: number | null;
    ended_icos: number | null;
    markets: number | null;
    total_market_cap: {
      eth: number | null;
      btc: number | null;
      ltc: number | null;
      bch: number | null;
      bnb: number | null;
      eos: number | null;
      xrp: number | null;
      xlm: number | null;
      link: number | null;
      dot: number | null;
      yfi: number | null;
      usd: number | null;
      aed: number | null;
      ars: number | null;
      aud: number | null;
      bdt: number | null;
      bhd: number | null;
      bmd: number | null;
      brl: number | null;
      cad: number | null;
      chf: number | null;
      clp: number | null;
      cny: number | null;
      czk: number | null;
      dkk: number | null;
      eur: number | null;
      gbp: number | null;
      hkd: number | null;
      huf: number | null;
      idr: number | null;
      ils: number | null;
      inr: number | null;
      jpy: number | null;
      krw: number | null;
      kwd: number | null;
      lkr: number | null;
      mmk: number | null;
      mxn: number | null;
      myr: number | null;
      ngn: number | null;
      nok: number | null;
      nzd: number | null;
      php: number | null;
      pkr: number | null;
      pln: number | null;
      rub: number | null;
      sar: number | null;
      sek: number | null;
      sgd: number | null;
      thb: number | null;
      try: number | null;
      twd: number | null;
      uah: number | null;
      vef: number | null;
      vnd: number | null;
      zar: number | null;
      xdr: number | null;
      xag: number | null;
      xau: number | null;
      bits: number | null;
      sats: number | null;
    };
    total_volume: {
      eth: number | null;
      btc: number | null;
      ltc: number | null;
      bch: number | null;
      bnb: number | null;
      eos: number | null;
      xrp: number | null;
      xlm: number | null;
      link: number | null;
      dot: number | null;
      yfi: number | null;
      usd: number | null;
      aed: number | null;
      ars: number | null;
      aud: number | null;
      bdt: number | null;
      bhd: number | null;
      bmd: number | null;
      brl: number | null;
      cad: number | null;
      chf: number | null;
      clp: number | null;
      cny: number | null;
      czk: number | null;
      dkk: number | null;
      eur: number | null;
      gbp: number | null;
      hkd: number | null;
      huf: number | null;
      idr: number | null;
      ils: number | null;
      inr: number | null;
      jpy: number | null;
      krw: number | null;
      kwd: number | null;
      lkr: number | null;
      mmk: number | null;
      mxn: number | null;
      myr: number | null;
      ngn: number | null;
      nok: number | null;
      nzd: number | null;
      php: number | null;
      pkr: number | null;
      pln: number | null;
      rub: number | null;
      sar: number | null;
      sek: number | null;
      sgd: number | null;
      thb: number | null;
      try: number | null;
      twd: number | null;
      uah: number | null;
      vef: number | null;
      vnd: number | null;
      zar: number | null;
      xdr: number | null;
      xag: number | null;
      xau: number | null;
      bits: number | null;
      sats: number | null;
    };
    market_cap_percentage: {
      btc: number | null;
      eth: number | null;
      usdt: number | null;
      bnb: number | null;
      usdc: number | null;
      xrp: number | null;
      steth: number | null;
      ada: number | null;
      doge: number | null;
      sol: number | null;
    };
    market_cap_change_percentage_24h_usd: number | null;
    updated_at: number | null;
  };
}

export interface RequestBodyProps {
  body: {
    userName: string;
    email: string;
    bio: string;
    password: string;
    picturePath: string;
    friends: string[];
  };
  file: {
    location: string;
  };
}

export interface ControllerProps {
  req: Request & RequestBodyProps;
  res: Response;
}
