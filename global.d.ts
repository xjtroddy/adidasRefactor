declare module 'config' {
  interface Config {
    app: {
      port: string,
      secret: string,
    },
    storage: {
      mongo: {
        url: string,
        name: string,
        authDB: string,
      },
      mysql: {
        addr: string,
        user: string,
        password: string,
        name: string,
      }
    }
    service: {
      review: {
        host: string,
      },
      adidas: {
        host: string,
      }
    },
  }
  const config: Config
  export = config
}
